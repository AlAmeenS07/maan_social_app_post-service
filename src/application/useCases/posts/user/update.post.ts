import { Post } from "../../../../domain/entities/post";
import { IPostRepository } from "../../../../domain/interfaces/posts/Ipost.repository";
import { IUpdatePost } from "../../../../domain/interfaces/posts/Ipost.usecases";
import { UpdatePostDTO } from "../../../../domain/types/post";
import { publishPostSyncEvent } from "../../../../infrastructure/kafka/producer/post.sync.producer";
import { messages } from "../../../../presentation/constants/messages";
import { statusCodes } from "../../../../presentation/constants/status.codes";
import { AppError } from "../../../../presentation/middlewares/error.middleware";

export class UpdatePost implements IUpdatePost {

    constructor(
        private readonly postRepository: IPostRepository
    ) { }

    async execute(data: UpdatePostDTO): Promise<Post> {

        const post = await this.postRepository.findById(data.postId);

        if (!post) {
            throw new AppError(messages.POST_NOT_FOUND, statusCodes.NOT_FOUND);
        }

        if (post.userId !== data.userId) {
            throw new AppError(messages.USER_MISMATCH, statusCodes.FORBIDDEN);
        }

        post.updateContent(data?.content || "");

        post.updateMedia(data?.media || []);

        const updatedPost = await this.postRepository.update(post?.id as string, post);

        if (!updatedPost) {
            throw new AppError(messages.FAILED_TO_UPDATE)
        }

        await publishPostSyncEvent(updatedPost.id as string)

        return updatedPost;
    }
}