
import { Post } from "../../../domain/entities/post";
import { IPostRepository } from "../../../domain/interfaces/posts/Ipost.repository";
import { AdminGetPostsDTO } from "../../../domain/types/post";
import { PostModel } from "../../database/post.model";
import { PostMapper } from "../../mapper/post.mapper";
import { BaseRepository } from "../base/base.repository";

export class PostRepository extends BaseRepository<Post, any> implements IPostRepository {

    constructor() {
        super(PostModel, new PostMapper());
    }

    async findByUserId(userId: string): Promise<Post[]> {
        const posts = await this.find({ userId, isDeleted: false , isListed : true});
        return posts
    }

    async findAdminPosts({ search, status, from, to, page, limit }: AdminGetPostsDTO): Promise<{ posts: Post[]; total: number; totalPages: number; }> {

        const filter: any = {};

        if (search) {
            filter.content = {
                $regex: search,
                $options: "i"
            };
        }

        if (status) {
            filter.isListed = status === "listed";
        }

        if (from || to) {

            filter.createdAt = {};

            if (from) {
                filter.createdAt.$gte = from;
            }

            if (to) {
                filter.createdAt.$lte = to;
            }
        }

        const skip = (page as number - 1) * (limit as number);

        const [documents, total] = await Promise.all([

            this.model
                .find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit as number),

            this.model.countDocuments(filter)
        ]);

        return {
            posts: documents.map(doc => this.mapper.toDomain(doc)),
            total,
            totalPages: Math.ceil(total / (limit as number))
        };
    }

}