import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { IAdminGetPosts, ITogglePostListing } from "../../../domain/interfaces/posts/Ipost.usecases";
import { successResponse } from "../../utils/response.hanlder";
import { messages } from "../../constants/messages";

export class AdminPostController {

    constructor(
        private readonly _getAllPostsUseCase: IAdminGetPosts,
        private readonly _togglePostListingUseCase: ITogglePostListing
    ) { }


    getAllPosts = expressAsyncHandler(

        async (req: Request, res: Response) => {

            const {search, status, from, to, page = 10, limit = 10} = req.query;

            const data = {
                search: search as string,
                status: status as "listed" | "unlisted",
                from: from ? new Date(from as string) : undefined,
                to: to ? new Date(to as string) : undefined,
                page: Number(page),
                limit: Number(limit)
            }

            const posts = await this._getAllPostsUseCase.execute(data);

            successResponse(res, posts, messages.POST_FETCHED_SUCCESSFULLY)
        }
    );


    togglePostListing = expressAsyncHandler(

        async (req: Request, res: Response) => {

            const { postId } = req.params;

            const updatedPost = await this._togglePostListingUseCase.execute(postId as string);

            successResponse(res, updatedPost, messages.POST_STATUS_UPDATED)
        }
    );
}