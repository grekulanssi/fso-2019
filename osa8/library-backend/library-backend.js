const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const config = require('./config')

const MONGODB_URI = config.MONGODB_URI
console.log('connecting to', MONGODB_URI)

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('* * * connected to MongoDB * * *')
  })
  .catch((e) => {
    console.log('error connecting to MongoDB:', e.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(
      author: String
      genre: String
    ): [Book]!
    allAuthors: [Author]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      genres: [String]!
      name: String!
      born: Int
    ): Book,
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let books = await Book.find({}).populate('author')
      if(args.author) {
        books = books.filter(b => b.author.name === args.author)
      }
      if(args.genre) {
        books = books.filter(b => b.genres.includes(args.genre))
      }
      return books
    },
    allAuthors: async () => await Author.find({})
  },
  Author: {
    bookCount: async (root) => (await Book.find( { author: root.id } )).length
  },
  Mutation: {
    addBook: async (root, args) => {
      let [author] = await Author.find({ name: args.name })
      if(!author) {
        try {
          author = await new Author({
            name: args.name,
            born: (args.born ? args.born : null)
          }).save()
        } catch(e) {
          throw new UserInputError(e.message, {
            invalidArgs: args
          })
        }
      }
      const book = new Book({
        title: args.title,
        published: args.published,
        author: author,
        genres: args.genres
      })
      try {
        const savedBook = await book.save()
        console.log('SAVED NEW BOOK:', savedBook)
        return savedBook
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args
        })
      }
    },
    editAuthor: async (root, args) => {
      let [author] = await Author.find({ name: args.name })
      if(!author) return null
      author.born = args.setBornTo
      try {
        const editedAuthor = await Author.findByIdAndUpdate(author.id, author, { new: true })
        console.log('EDITED AUTHOR:', editedAuthor)
        return editedAuthor
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args
        })
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})