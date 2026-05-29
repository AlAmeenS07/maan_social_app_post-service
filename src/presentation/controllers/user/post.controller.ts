// post.controller.ts

import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { messages } from "../../constants/messages";
import { statusCodes } from "../../constants/status.codes";
import { ICreatePost, IDeletePost, IGetAllPosts, IUpdatePost } from "../../../domain/interfaces/posts/Ipost.usecases";
import { successResponse } from "../../utils/response.hanlder";
import { AppError } from "../../middlewares/error.middleware";

export class PostController {
    constructor(
        private readonly _createPostUseCase: ICreatePost,
        private readonly _updatePostUseCase: IUpdatePost,
        private readonly _deletePostUseCase: IDeletePost,
        private readonly _getAllPostsUseCase: IGetAllPosts
    ) { }

    createPost = expressAsyncHandler(
        async (req: Request, res: Response): Promise<void> => {
            const { content, media = [] } = req.body;
            const userId = req.headers["x-user-id"] as string

            const post = await this._createPostUseCase.execute({
                userId,
                content,
                media,
            });

            successResponse(res, post, messages.POST_CREATED, statusCodes.CREATED)
        }
    );

    updatePost = expressAsyncHandler(
        async (req: Request, res: Response): Promise<void> => {
            const postId = req.params.postId as string;
            const { content, media } = req.body;
            const userId = req.headers["x-user-id"] as string

            const post = await this._updatePostUseCase.execute({
                postId,
                userId,
                content,
                media,
            });

            successResponse(res, post, messages.POST_UPDATED)
        }
    );

    deletePost = expressAsyncHandler(
        async (req: Request, res: Response): Promise<void> => {
            const postId = req.params.postId as string;
            const userId = req.headers["x-user-id"] as string

            await this._deletePostUseCase.execute({
                postId,
                userId,
            });

            successResponse(res, "", messages.POST_DELETED)
        }
    );

    getAllPosts = expressAsyncHandler(async (req: Request, res: Response) => {
        const userId = req.headers["x-user-id"] as string

        if(!userId){
            throw new AppError(messages.USER_NOT_FOUND)
        }

        const posts = await this._getAllPostsUseCase.execute(userId)

        successResponse(res, posts, messages.POST_FETCHED_SUCCESSFULLY)
    })

}