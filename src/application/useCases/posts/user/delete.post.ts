import { IPostRepository } from "../../../../domain/interfaces/posts/Ipost.repository";
import { IDeletePost } from "../../../../domain/interfaces/posts/Ipost.usecases";
import { DeletePostDTO } from "../../../../domain/types/post";
import { publishPostSyncEvent } from "../../../../infrastructure/kafka/producer/post.sync.producer";
import { messages } from "../../../../presentation/constants/messages";
import { statusCodes } from "../../../../presentation/constants/status.codes";
import { AppError } from "../../../../presentation/middlewares/error.middleware";

export class DeletePost implements IDeletePost {

  constructor(
    private readonly postRepository: IPostRepository
  ) {}

  async execute(data: DeletePostDTO): Promise<void> {

    const post = await this.postRepository.findById(data.postId);

    if (!post) {
      throw new AppError(messages.POST_NOT_FOUND , statusCodes.NOT_FOUND);
    }

    if (post.userId !== data.userId) {
      throw new AppError(messages.USER_MISMATCH, statusCodes.FORBIDDEN);
    }

    post.softDelete();

    const deleted = await this.postRepository.update(post?.id as string, post);

    if (!deleted) {
      throw new AppError(messages.FAILED_TO_DELETE);
    }

    await publishPostSyncEvent(post.id as string)

  }
}