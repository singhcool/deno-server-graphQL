
export const UserResolvers = {
    Query: {
      getUser: (parent: any, { id }: any, context: any, info: any) => {
        return {
          firstName: "wooseok",
          lastName: "lee",
        };
      },
    },
    Mutation: {
      setUser: (parent: any, { input: { firstName, lastName } }: any, context: any, info: any) => {
        console.log("input:", firstName, lastName);
        return {
          done: true,
        };
      },
    },
  };
