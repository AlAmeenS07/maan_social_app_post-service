import { consumer } from "../../../config/kafka";
import { syncPostToElasticsearch } from "../../elasticsearch/service/post.sync";


export const startPostSyncConsumer = async () => {

   await consumer.subscribe({
      topic: "post.search.sync",
      fromBeginning: true
   });

   await consumer.run({

      eachMessage: async ({ message }) => {

         try {

            const value = JSON.parse(message.value?.toString() || "{}");

            console.log("consuming-data sync")

            await syncPostToElasticsearch(value.postId);

         } catch (error) {

            console.error("Post sync consumer error", error);
         }
      }
   });
};