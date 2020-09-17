const graphql = require("graphql")
const Author = require("./models/Author")
const Book = require("./models/Book")

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
} = graphql

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    gender: { type: GraphQLString },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({ authorId: parent.id })
      },
    },
  }),
})

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    price: { type: GraphQLInt },
    genre: { type: GraphQLString },
    description: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return Author.findById(parent.authorId)
      },
    },
  }),
})

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Book.findById(args.id)
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Author.findById(args.id)
      },
    },
    books: {
      type: BookType,
      resolve(parent, args) {
        return Book.find()
      },
    },
    authors: {
      type: AuthorType,
      resolve(parent, args) {
        return Author.find()
      },
    },
  },
})

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        gender: { type: GraphQLString },
      },
      resolve(parent, args) {
        const author = new Author({
          name: args.name,
          age: args.age,
          gender: args.gender,
        })

        return author.save()
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLString },
        price: { type: GraphQLInt },
        genre: { type: GraphQLString },
        description: { type: GraphQLString },
        authorId: { type: GraphQLID },
      },
      resolve(parent, args) {
        const book = new Book({
          name: args.name,
          price: args.price,
          genre: args.genre,
          description: args.description,
          authorId: args.authorId,
        })

        return book.save()
      },
    },
  },
})

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
})
