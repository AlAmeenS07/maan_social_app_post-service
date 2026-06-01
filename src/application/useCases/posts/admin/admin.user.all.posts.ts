import { Post } from "../../../../domain/entities/post"
import { IPostRepository } from "../../../../domain/interfaces/posts/Ipost.repository"
import { IAdminGetUserPosts } from "../../../../domain/interfaces/posts/Ipost.usecases"

export class GetAllPosts implements IAdminGetUserPosts{

    constructor(
        private readonly _postRepo : IPostRepository
    ){}

    async execute(id: string): Promise<Post[]> {
        const posts = await this._postRepo.findAllByUserId(id)
        return posts
    }
}