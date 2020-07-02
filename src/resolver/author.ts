import { db } from "../config/db.ts";
let author =  db.getDatabase().collection("author");
let post =  db.getDatabase().collection("post");

export const AuthorResolvers = {
    Query: {
        getAuthor: async (parent: any, { _id }: any, context: any, info: any) => {
            const authorSelect  = await author.findOne({
                _id: {
                  $oid:_id,
                },
              });
            const postSelect  = await post.find({ authorId: { $eq: _id } });
            let allPost = await postSelect.map((post : any)  => { return {
                 ...post, _id:  post._id.$oid
            } })
            authorSelect._id = _id;
            authorSelect.post = allPost;
            return authorSelect;
        },

      getPost: async (parent: any, { _id }: any, context: any, info: any) => {
        const postSelect  = await post.findOne({
            _id: {
              $oid:_id,
            },
          });
          postSelect._id = _id;
         return postSelect;
      },
  },

    Mutation: {
      createAuthor: async (parent: any, { input: { firstName, lastName, email } }: any, context: any, info: any) => {
        const insertAuthor = await author.insertOne({
            firstName,
            lastName,
            email,
          });
          const authorSelect  = await author.findOne({
            _id: {
              $oid: insertAuthor.$oid,
            },
          });
          authorSelect._id = insertAuthor.$oid;
         return authorSelect;
      },

      createPost: async (parent: any, { input: { authorId, postTitle, postCategory, postDate } }: any, context: any, info: any) => {
        console.log("input:", postCategory, postTitle);
        const insertPost = await post.insertOne({
            authorId,
            postTitle,
            postCategory,
            postDate
          });
          const postSelect  = await post.findOne({
            _id: {
              $oid: insertPost.$oid,
            },
          });
          postSelect._id = insertPost.$oid;
         return postSelect;
      },

    },
  };
