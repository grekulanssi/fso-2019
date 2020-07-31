import { gql  } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
        born
        bookCount
      }
      published
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!,
    $published: Int!,
    $genres: [String]!,
    $name: String!,
    $born: Int
  ) {
    addBook(
        title: $title,
        published: $published,
        genres: $genres,
        name: $name,
        born: $born
    ) {
        title,
        author {
          name
          bookCount
        },
        published,
        genres
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation addAuthorBorn(
    $name: String!,
    $born: Int!
    ) {
      editAuthor(
        name: $name,
        setBornTo: $born
      ) {
        name,
        born,
        bookCount
      }
    }
`

export const LOGIN = gql`
  mutation login(
    $username: String!,
    $password: String!
    ) {
      login(
        username: $username,
        password: $password
      ) {
        value
    }
  }
`