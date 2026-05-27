import { Post } from "../../entities/post";
import { AdminGetPostsDTO } from "../../types/post";
import { IBaseRepository } from "../common/Ibase.repository";

export interface IPostRepository extends IBaseRepository<Post> {

  findByUserId(userId: string): Promise<Post[]>;

  findAdminPosts({search,status,from,to,page,limit} : AdminGetPostsDTO) : Promise<{posts : Post[] , total : number , totalPages : number}>
}