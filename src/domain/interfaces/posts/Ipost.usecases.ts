import { Post } from "../../entities/post";
import { AdminGetPostsDTO, CreatePostDTO, DeletePostDTO, UpdatePostDTO } from "../../types/post";


export interface ICreatePost {
    execute(data: CreatePostDTO) : Promise<Post>
}

export interface IUpdatePost {
  execute(data: UpdatePostDTO): Promise<Post>;
}

export interface IDeletePost {
  execute(data: DeletePostDTO): Promise<void>;
}

export interface IGetAllPosts {
    execute(id: string) : Promise<Post[]>
}

export interface IAdminGetPosts { 
    execute(query : AdminGetPostsDTO) : Promise<{posts : Post[], total: number, totalPages: number}>
}

export interface ITogglePostListing{
    execute(postId: string) : Promise<Post | null>
}
export interface IAdminGetUserPosts {
    execute(id: string) : Promise<Post[]>
}
