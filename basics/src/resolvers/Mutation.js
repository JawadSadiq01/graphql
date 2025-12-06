import { GraphQLError } from 'graphql'
import { v4 as uuidv4 } from 'uuid'

const Mutation = {
  createUser: (parent, args, { db }, info) => {
    const { data } = args
    const alreadyExists = db.users.some(user => user.email === data.email)
    
    if (alreadyExists) {
      throw new GraphQLError('Email already in use.', {
        extensions: {
          code: 'BAD_USER_INPUT',
        },
      })
    }

    const newUser = {
      id: uuidv4(),
      ...data
    }
    
    db.users.push(newUser)
    return newUser
  },

  updateUser: (parent, args, { db }, info) => {
    const userFound = db.users.find(user => user.id === args.id)
    if (!userFound) {
      throw new GraphQLError('User not found.')
    }

    const { id, ...updateData } = args
    const updatedUser = {
      ...userFound,
      ...updateData
    }

    db.users[db.users.indexOf(userFound)] = updatedUser
    return updatedUser
  },
  
  deleteUser: (parent, args, { db }, info) => {
    const userFound = db.users.find(user => user.id === args.id)
    if (!userFound) {
      throw new GraphQLError('User not found.')
    }

    db.users.splice(db.users.indexOf(userFound), 1)
    return userFound
  },

  createPost: (parent, args, { db }, info) => {
    const { data } = args
    const userFound = db.users.some(user => user.id === data.author)
    
    if (!userFound) {
      throw new GraphQLError('User not found.')
    }

    const newPost = {
      id: uuidv4(),
      ...data
    }

    db.posts.push(newPost)
    return newPost
  },

  createComment: (parent, args, { db, pubsub }, info) => {
    const { data } = args
    const userFound = db.users.some(user => user.id === data.author)
    if (!userFound) {
      throw new GraphQLError('User not found.')
    }

    const postFound = db.posts.some(post => post.id === data.post && post.published)
    if (!postFound) {
      throw new GraphQLError('Post not found.')
    }

    const comment = {
      id: uuidv4(),
      ...data
    }

    db.comments.push(comment)
    pubsub.publish("New Comment", { comment })

    return comment
  },
}

export {Mutation as default}