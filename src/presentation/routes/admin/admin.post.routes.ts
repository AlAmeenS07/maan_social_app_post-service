import { Router } from "express";
import { AdminPostController } from "../../controllers/admin/admin.post.controller";
import { AdminGetPosts } from "../../../application/useCases/posts/admin/admin.get.all.posts";
import { PostRepository } from "../../../infrastructure/repositories/posts/post.repository";
import { TogglePostListing } from "../../../application/useCases/posts/admin/admin.list.unlist.post";
import { GetAllPosts } from "../../../application/useCases/posts/user/get.all.posts";


const router = Router()

const postRepo = new PostRepository()
const adminGetPostsUseCase = new AdminGetPosts(postRepo)
const adminTogglePostUseCase = new TogglePostListing(postRepo)
const adminUserPosts = new GetAllPosts(postRepo)
const adminPostController = new AdminPostController(adminGetPostsUseCase, adminTogglePostUseCase, adminUserPosts)

router.get("/" , adminPostController.getAllPosts)
router.get("/:userId", adminPostController.getUserPosts)
router.patch("/:postId", adminPostController.togglePostListing)

export default router