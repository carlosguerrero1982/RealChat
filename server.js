const { ApolloServer } = require('apollo-server')
const jwt = require('jsonwebtoken')

const db = require('./models/index')

const resolvers = require('./graphql/resolvers')
const typeDefs = require('./graphql/typeDefs')
const contextMiddleware =require('./utils/contextMiddleware')
const {JWT_SECRET} = require('./env.json')


const {sequelize}=db

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context:contextMiddleware,
 
  })


server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)

  sequelize
    .authenticate()
    .then(() => console.log('Database connected!!'))
    .catch((err) => console.log(err))
})