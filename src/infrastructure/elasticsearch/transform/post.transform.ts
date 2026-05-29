import { Post } from "../../../domain/entities/post";

export const transformPostSearchDocument = (post: Post) => {

   return {
      id: post.id,
      userId: post.userId,
      content: post.content,
      media: post.media,
      hashtags: post.hashtags,
      isListed: post.isListed,
      isDeleted: post.isDeleted,
      createdAt: post.createdAt
   };
};