import { createServer } from 'http'
import { readFileSync } from 'fs'
import { createSchema, createYoga, createPubSub } from 'graphql-yoga'
import { resolve } from 'path'
import { Query, Mutation, Subscription, User, Post, Comment } from './resolvers'
import db from './db'

const pubsub = createPubSub()
const typeDefs = readFileSync(resolve(process.cwd(), 'src', 'schema.graphql'), 'utf-8')
const schema = createSchema({ 
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    Subscription,
    User,
    Post,
    Comment
  }
 })

const yoga = createYoga({ 
  schema,
  context: { db, pubsub }
})

const server = createServer(yoga);
server.listen(4000, () => console.log('Server is running on http://localhost:4000/graphql'))