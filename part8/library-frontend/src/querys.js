import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
    query AllAuthors {
        allAuthors {
            born
            bookCount
            name
        }
    }
`;

export const ALL_BOOKS = gql`
    query AllBooks {
        allBooks {
            author
            published
            title
        }
    }
`;

export const CREATE_BOOK = gql`
    mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
        addBook(title: $title, author: $author, published: $published, genres: $genres) {
            author
            published
            title
        }
    }
`;
//addBook(
//     title: String!
//     author: String!
//     published: Int!
//     genres: [String!]!
//   ): Book!
