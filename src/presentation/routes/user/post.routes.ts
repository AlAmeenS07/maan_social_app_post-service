
import { Router } from "express"
import { PostController } from "../../controllers/user/post.controller"
import { CreatePost } from "../../../application/useCases/posts/user/create.post"
import { PostRepository } from "../../../infrastructure/repositories/posts/post.repository"
import { UpdatePost } from "../../../application/useCases/posts/user/update.post"
import { DeletePost } from "../../../application/useCases/posts/user/delete.post"
import { GetAllPosts } from "../../../application/useCases/posts/user/get.all.posts"
import { validate } from "../../middlewares/validation.middleware"
import { createPostSchema, updatePostSchema } from "../../validations/post.validation"

const router = Router()

// router.use((req , res , next)=>{
//     console.log("router-came" , req.headers)
//     next()
// })

const postRepo = new PostRepository()
const createPostUseCase = new CreatePost(postRepo)
const updatePostUseCase = new UpdatePost(postRepo)
const deletePostUseCase = new DeletePost(postRepo)
const getAllPosts = new GetAllPosts(postRepo)
const postController = new PostController(createPostUseCase, updatePostUseCase, deletePostUseCase , getAllPosts)

router.get("/" , postController.getAllPosts)
router.post("/" , validate(createPostSchema) , postController.createPost)
router.put("/:postId" , validate(updatePostSchema) , postController.updatePost)
router.patch("/:postId" , postController.deletePost)


export default router