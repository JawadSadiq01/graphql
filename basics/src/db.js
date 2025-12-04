const users = [
  { id: '1', name: 'Jawad Sadiq', email: 'jawad@example.com', location: 'Lahore, Pakistan', age: 27 },
  { id: '2', name: 'John Doe', email: 'john@example.com', location: 'New York, USA', age: 30 },
  { id: '3', name: 'Jane Smith', email: 'jane@example.com', location: 'London, UK' },
]

const posts = [
  { id: '1', title: 'GraphQL Basics', body: 'This is a post about GraphQL basics.', published: true, author: '1' },
  { id: '2', title: 'Advanced GraphQL', body: 'This is a post about advanced GraphQL topics.', published: true, author: '2' },
]

const comments = [
  { id: '1', text: 'Great post!', post: '1', author: '2' },
  { id: '2', text: 'Very informative.', post: '1', author: '3' },
  { id: '3', text: 'Advance is Easy', post: '2', author: '3' },
  { id: '4', text: 'Glad to hear that.', post: '2', author: '1' },
]

const db = {
  users,
  posts,
  comments,
}

export { db as default }