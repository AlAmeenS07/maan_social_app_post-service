import { Post } from "../../../../domain/entities/post";
import { IPostRepository } from "../../../../domain/interfaces/posts/Ipost.repository";
import { ITogglePostListing } from "../../../../domain/interfaces/posts/Ipost.usecases";
import { publishPostSyncEvent } from "../../../../infrastructure/kafka/producer/post.sync.producer";
import { messages } from "../../../../presentation/constants/messages";
import { statusCodes } from "../../../../presentation/constants/status.codes";
import { AppError } from "../../../../presentation/middlewares/error.middleware";

export class TogglePostListing implements ITogglePostListing {

    constructor(
        private readonly postRepo: IPostRepository
    ) { }

    async execute(postId: string): Promise<Post | null> {

        const post = await this.postRepo.findById(postId);

        if (!post) {
            throw new AppError(messages.POST_NOT_FOUND);
        }

        const updatedPost = new Post({
            id: post.id,
            userId: post.userId,
            content: post.content,
            media: post.media,
            hashtags: post.hashtags,
            isListed: !post.isListed,
            isDeleted: post.isDeleted,
            createdAt: post.createdAt,
            updatedAt: new Date()
        });

        const updatedPostRes =  await this.postRepo.update(postId, updatedPost);

        if(!updatedPostRes){
            throw new AppError(messages.POST_NOT_FOUND , statusCodes.NOT_FOUND)
        }

        await publishPostSyncEvent(updatedPostRes.id as string)

        return updatedPostRes
    }
}