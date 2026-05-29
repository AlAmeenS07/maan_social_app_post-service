import { IPostRepository } from "../../../../domain/interfaces/posts/Ipost.repository";
import { IAdminGetPosts } from "../../../../domain/interfaces/posts/Ipost.usecases";
import { AdminGetPostsDTO } from "../../../../domain/types/post";
import { searchPostsElasticsearch } from "../../../../infrastructure/elasticsearch/service/post.search";

export class AdminGetPosts implements IAdminGetPosts {

   constructor(
      private readonly postRepo: IPostRepository
   ) {}

   async execute(query: AdminGetPostsDTO) {

      const {
         search,
         status,
         from,
         to,
         page = 1,
         limit = 10
      } = query;

      // return await this.postRepo.findAdminPosts({
      //    search,
      //    status,
      //    from,
      //    to,
      //    page,
      //    limit
      // });

      const posts =  await searchPostsElasticsearch({search, status, from, to, page, limit})

      return posts
   }
}