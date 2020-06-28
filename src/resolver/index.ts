export * from './user.ts';
import { UserResolvers } from "./user.ts";
import { AuthorResolvers } from "./author.ts";

export const resolvers = [ UserResolvers, AuthorResolvers ];
