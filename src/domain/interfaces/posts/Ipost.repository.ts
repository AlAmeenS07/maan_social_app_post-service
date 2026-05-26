import { Post } from "../../entities/post";
import { IBaseRepository } from "../common/Ibase.repository";

export interface IPostRepository extends IBaseRepository<Post> {

  findByUserId(userId: string): Promise<Post[]>;
}