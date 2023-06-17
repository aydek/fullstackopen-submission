const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { GraphQLError } = require('graphql');
const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');

require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log('connecting to', MONGODB_URI);

mongoose
    .connect(MONGODB_URI)
    .then(async () => {
        console.log('connected to MongoDB');
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message);
    });

const typeDefs = `
    type Author {
        name: String!
        id: ID!
        born: Int
        bookCount: Int!
    }

    type Book {
        title: String!
        published: Int!
        author: Author!
        id: ID!
        genres: [String!]!
    }

    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }
     
    type Token {
        value: String!
    }
      

    type Mutation {
        addBook(
          title: String!
          author: String!
          published: Int!
          genres: [String!]!
        ): Book!

        editAuthor(
            name: String!
            setBornTo: Int!
        ): Author

        createUser(
            username: String!
        ): User

        login(
            username: String!
            password: String!
        ): Token
    }

    type Query {
        authorCount: Int!
        bookCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
        me: User
    }

`;

const resolvers = {
    Query: {
        authorCount: async () => await Author.collection.countDocuments(),
        bookCount: async () => await Book.collection.countDocuments(),
        me: (root, args, context) => {
            return context.currentUser;
        },
        allBooks: async (root, args) => {
            let books = [];

            if (!args.author && !args.genre) {
                books = await Book.find({}).populate('author');
            } else if (args.author && args.genre) {
                books = await Book.find({ author: args.author, genres: { $all: [args.genre] } }).populate('author');
            } else if (args.author) {
                books = await Book.find({ author: args.author }).populate('author');
            } else if (args.genre) {
                books = await Book.find({ genres: { $all: [args.genre] } }).populate('author');
            }
            return books.map((book) => ({
                title: book.title,
                published: book.published,
                author: {
                    name: book.author.name,
                    born: book.author.born,
                    bookCount: books.filter((b) => b.author.toString() === book.author.toString()).length,
                },
                id: book.id,
                genres: book.genres,
            }));
        },
        allAuthors: async () => {
            const authors = await Author.find({});
            const books = await Book.find({});

            return authors.map((author) => ({
                name: author.name,
                born: author.born,
                bookCount: books.filter((book) => book.author.toString() === author._id.toString()).length,
            }));
        },
    },
    Mutation: {
        addBook: async (root, args, context) => {
            const currentUser = context.currentUser;

            if (!currentUser) {
                throw new GraphQLError('not authenticated', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    },
                });
            }

            let author = await Author.findOne({ name: args.name });
            if (!author) {
                author = new Author({ name: args.name });
                await author.save();
            }
            const book = new Book({ ...args, author: author._id });
            console.log(author);
            try {
                await book.save();
            } catch (error) {
                throw new GraphQLError('Saving book failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name,
                        error,
                    },
                });
            }
            return book;
        },
        editAuthor: async (root, args, context) => {
            const currentUser = context.currentUser;

            if (!currentUser) {
                throw new GraphQLError('not authenticated', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    },
                });
            }

            const author = Author.findOne({ name: args.name });
            if (!author) {
                return null;
            }
            author.born = args.setBornTo;
            try {
                await author.save();
            } catch (error) {
                throw new GraphQLError('Saving year failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name,
                        error,
                    },
                });
            }
            return author;
        },
        createUser: async (root, args) => {
            const user = new User({ username: args.username, favoriteGenre: '' });
            try {
                await user.save();
            } catch (error) {
                throw new GraphQLError('Creating the user failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name,
                        error,
                    },
                });
            }
            return user;
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username });

            if (!user || args.password !== 'secret') {
                throw new GraphQLError('wrong credentials', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    },
                });
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            };

            return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

startStandaloneServer(server, {
    listen: { port: process.env.PORT },

    context: async ({ req, res }) => {
        const auth = req ? req.headers.authorization : null;
        if (auth && auth.startsWith('Bearer ')) {
            const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET);
            const currentUser = await User.findById(decodedToken.id);
            return { currentUser };
        }
    },
}).then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
