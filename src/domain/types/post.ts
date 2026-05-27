
export type CreatePostType = {
    content: string;
    media?: string[];
};


export type CreatePostDTO = {
  userId: string;
  content: string;
  media?: string[];
};

export type UpdatePostDTO = {
  postId: string;
  userId: string;
  content?: string;
  media?: string[];
};

export type DeletePostDTO = {
  postId: string;
  userId: string;
};

export type CreatePostParams = {
  id?: string;
  userId: string;
  content: string;
  media?: string[];
  hashtags?: string[];
  isListed?: boolean;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export type AdminGetPostsDTO = {
   search?: string;
   status?: "listed" | "unlisted";
   from?: Date;
   to?: Date;
   page?: number;
   limit?: number;
}