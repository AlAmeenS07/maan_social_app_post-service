import { Post } from "../../../domain/entities/post";
import { IPostRepository } from "../../../domain/interfaces/posts/Ipost.repository";
import { PostModel } from "../../database/post.model";
import { BaseRepository } from "../base/base.repository";


export class PostRepository extends BaseRepository<Post> implements IPostRepository {

    constructor() {
        super(PostModel);
    }

    async findByUserId(userId: string): Promise<Post[]> {
        return await this.model.find({
            userId,
            is_deleted: false
        });
    }
}