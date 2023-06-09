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
    query allBooks($genre: String) {
        allBooks(genre: $genre) {
            genres
            author {
                name
            }
            title
            published
        }
    }
`;

export const ALL_GENRES = gql`
    query Query {
        allGenres
    }
`;

export const CREATE_BOOK = gql`
    mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
        addBook(title: $title, author: $author, published: $published, genres: $genres) {
            genres
            author {
                name
            }
            title
            published
        }
    }
`;

export const BOOK_ADDED = gql`
    subscription {
        bookAdded {
            genres
            author {
                name
            }
            title
            published
        }
    }
`;

export const EDIT_AUTHOR = gql`
    mutation editAuthor($name: String!, $setBornTo: Int!) {
        editAuthor(name: $name, setBornTo: $setBornTo) {
            name
            born
        }
    }
`;

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`;

export const FAVORITE_GENRE = gql`
    query Query {
        me {
            favoriteGenre
        }
    }
`;
