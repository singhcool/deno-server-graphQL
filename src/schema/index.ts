import { gql } from "../config/deps.ts";
import { UserTypes } from "./user.ts";
import { AuthorTypes } from "./author.ts";


export const Schema = (gql as any)`
    type Query{
        _empty: String
    }
    type Mutation {
        _empty: String
    }
    ${UserTypes}
    ${AuthorTypes}
`;