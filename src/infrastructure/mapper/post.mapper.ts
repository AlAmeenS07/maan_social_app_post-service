// post.mapper.ts

import { Post } from "../../domain/entities/post";
import { IBaseMapper } from "../../domain/interfaces/common/IBase.mapper";

export class PostMapper implements IBaseMapper<Post, any> {

  toDomain(raw: any): Post {
    return new Post({
      id: raw._id.toString(),
      userId: raw.userId,
      content: raw.content,
      media: raw.media,
      isListed: raw.isListed,
      isDeleted: raw.isDeleted,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt
    });
  }

  toPersistence(post: Post) {
    return {
      userId: post.userId,
      content: post.content,
      media: post.media,
      hashtags: post.hashtags,
      isListed: post.isListed,
      isDeleted: post.isDeleted
    };
  }
}