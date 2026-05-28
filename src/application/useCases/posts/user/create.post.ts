import { Post } from "../../../../domain/entities/post";
import { IPostRepository } from "../../../../domain/interfaces/posts/Ipost.repository";
import { ICreatePost } from "../../../../domain/interfaces/posts/Ipost.usecases";
import { CreatePostDTO, CreatePostType } from "../../../../domain/types/post";

export class CreatePost implements ICreatePost {

    constructor(
        private readonly postRepository: IPostRepository
    ) { }

    async execute(data: CreatePostDTO): Promise<Post> {

        const post = new Post({
            userId: data.userId,
            content: data.content,
            media: data.media
        });

        const createdPost = await this.postRepository.create(post);

        return createdPost;
    }
}