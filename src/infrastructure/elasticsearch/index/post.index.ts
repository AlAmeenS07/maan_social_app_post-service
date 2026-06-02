import { esClient } from "../../../config/elastic.search";

export const createPostsIndex = async () => {

   const exists =
      await esClient.indices.exists({
         index: "posts"
      });

   if (exists) {
      console.log("Posts index already exists");
      return;
   }

   await esClient.indices.create({

      index: "posts",

      mappings: {

         properties: {

            id: {
               type: "keyword"
            },

            userId: {
               type: "keyword"
            },

            content: {
               type: "search_as_you_type"
            },

            hashtags: {
               type: "keyword"
            },

            isListed: {
               type: "boolean"
            },

            isDeleted: {
               type: "boolean"
            },

            createdAt: {
               type: "date"
            }
         }
      }
   });

   console.log("Posts index created");
};