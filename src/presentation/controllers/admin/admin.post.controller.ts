import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { IAdminGetPosts, IAdminGetUserPosts, IGetAllPosts, ITogglePostListing } from "../../../domain/interfaces/posts/Ipost.usecases";
import { successResponse } from "../../utils/response.hanlder";
import { messages } from "../../constants/messages";
import { AppError } from "../../middlewares/error.middleware";
import { statusCodes } from "../../constants/status.codes";
import { ps } from "zod/locales";

export class AdminPostController {

    constructor(
        private readonly _getAllPostsUseCase: IAdminGetPosts,
        private readonly _togglePostListingUseCase: ITogglePostListing,
        private readonly _userPostsUseCase : IAdminGetUserPosts
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

    getUserPosts = expressAsyncHandler(async(req : Request , res : Response) => {
        const { userId } = req.params

        if(!userId){
            throw new AppError(messages.USER_NOT_FOUND , statusCodes.BAD_REQUEST)
        }

        const posts = await this._userPostsUseCase.execute(userId as string)

        successResponse(res , posts , messages.POST_FETCHED_SUCCESSFULLY)

    })


    togglePostListing = expressAsyncHandler(

        async (req: Request, res: Response) => {

            const { postId } = req.params;

            const updatedPost = await this._togglePostListingUseCase.execute(postId as string);

            successResponse(res, updatedPost, messages.POST_STATUS_UPDATED)
        }
    );
}