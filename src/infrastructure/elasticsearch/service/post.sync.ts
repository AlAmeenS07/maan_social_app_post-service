import { esClient } from "../../../config/elastic.search";
import { PostRepository } from "../../repositories/posts/post.repository";
import { transformPostSearchDocument } from "../transform/post.transform";


const _postRepo = new PostRepository();

export const syncPostToElasticsearch = async (postId: string) => {

   const post = await _postRepo.findById(postId);

   if (!post) return;

   const document = transformPostSearchDocument(post);

   await esClient.update({
      index: "posts",
      id: postId,
      doc: document,
      doc_as_upsert: true
   });

   console.log("Post synced:", postId);
};