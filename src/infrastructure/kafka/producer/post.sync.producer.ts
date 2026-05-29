import { producer } from "../../../config/kafka";

export const publishPostSyncEvent = async (postId: string) => {

   await producer.send({

      topic: "post.search.sync",

      messages: [
         {
            value: JSON.stringify({ postId })
         }
      ]
   });
};