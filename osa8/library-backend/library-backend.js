const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const config = require('./config')
const { v1: uuid } = require('uuid')
const init = require('./init')

const MONGODB_URI = config.MONGODB_URI
console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((e) => {
    console.log('error connecting to MongoDB:', e.message)
  })

/**
puuttuvia kenttiä t. 8.13, jotka pitää lisätä t. 8.14:
Query
  allBooks(author, genre)
Author
  bookCount
Book
  author
Mutation
  editAuthor
 */
const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    genres: [String]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks: [Book]!
    allAuthors: [Author]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      genres: [String]!
    ): Book
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: () => Book.find({}),
    /* DOESN'T NEED TO WORK YET
    allBooks: (root, args) => {
      let allBooks = books
      if(args.author) {
        allBooks = allBooks.filter(b => b.author === args.author)
      }
      if(args.genre) {
        allBooks = allBooks.filter(b => b.genres.includes(args.genre))
      }
      return allBooks
    },
    */
    allAuthors: () => Author.find({})
  },
  /* DOESN'T NEED TO WORK YET
  Author: {
    bookCount: (root) => books.filter(b => b.author === root.name).length
  },
  */
  /* DOESN'T NEED TO WORK YET
  Book: {
    author: (?) => ?
  },
  */
  Mutation: {
    addBook: (root, args) => {
      const book = new Book({ ...args })
      /*if(!Author.find(a => a.name === args.author.name)) {
        console.log('NEW AUTHOR:', args.author.name)
        const author = new Author({ ...args.author })
        author.save()
      }*/
      return book.save()
    },
    /* DOESN'T NEED TO WORK YET
    editAuthor: (root, args) => {
      let author = authors.find(a => a.name === args.name)
      if(!author) return null
      author.born = args.setBornTo
      return author
    }
    ADD THIS TO typeDefs:
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author

    */
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})