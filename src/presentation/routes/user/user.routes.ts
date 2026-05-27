import { Router } from "express"
import postRoutes from "./post.routes"

const router = Router()

// router.use((req , res , next)=>{
//     console.log("router-came" , req.headers)
//     next()
// })

router.use("/post" , postRoutes)


export default router