const { GraphQLError } = require('graphql');
const Author = require('./models/author');
const Book = require('./models/book');

const resolvers = {
    Query: {
        authorCount: async () => await Author.collection.countDocuments(),
        bookCount: async () => await Book.collection.countDocuments(),
        allGenres: async () => {
            let genres = [];
            const result = await Book.find({});
            for (const book of result) {
                genres = genres.concat(book.genres);
            }
            return genres.filter((genre, index) => genre.length > 0 && genres.indexOf(genre) === index);
        },
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

            let author = await Author.findOne({ name: args.author });

            if (!author) {
                author = new Author({ name: args.author });
                await author.save();
            }
            const book = new Book({ ...args, author: author._id });

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

            return { title: book.title, published: book.published, author: { name: author.name } };
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

            const author = await Author.findOne({ name: args.name });
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

module.exports = resolvers;
