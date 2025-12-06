const Subscription = {
  count: {
    subscribe: (parent, args, { pubsub }, info) => {
      let count = 0

      setInterval(() => {
        count++
        pubsub.publish('count', { count })
      }, 1000)

      return pubsub.subscribe('count')
    }
  },

  comment: {
    subscribe: (parent, { postId }, { db, pubsub }, info) => {
      return pubsub.subscribe('New Comment')
    }
  }
}

export { Subscription as default}