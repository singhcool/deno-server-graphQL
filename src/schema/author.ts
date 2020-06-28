import { gql } from "../config/deps.ts";

export const AuthorTypes = (gql as any)`

scalar Date

type Author {
  _id : ID
  firstName: String!
  lastName: String!
  email: String!
  post: [Post!]
}

input AuthorInput {
    firstName: String!
    lastName: String!
    email: String!
}

type Post {
    _id : ID
    authorId : String!
    postTitle : String!
    postCategory : String!
    postDate: Date
}

input PostInput {
    authorId : String!
    postTitle : String!
    postCategory : String!
    postDate: Date
}

extend type Query {
  getAuthor(_id: ID): Author
  getPost(_id: ID): Post
}

extend type Mutation {
  createAuthor(input: AuthorInput): Author
  createPost(input: PostInput): Post
}
`;