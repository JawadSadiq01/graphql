import { GraphQLError } from 'graphql'

const Query = {
  users: (parent, args, { db }, info) => db.users,
  user: (parent, args, { db }, info) => {
    const userFound = db.users.find(user => user.id === args.id)

    if (!userFound) {
      throw new GraphQLError('User not found.', {
        extensions: {
          code: 'NOT_FOUND',
        },
      })
    }
    
    return userFound
  },

  posts: (parent, args, { db }, info) => db.posts,
  comments: (parent, args, { db }, info) => db.comments,
}

export {Query as default}