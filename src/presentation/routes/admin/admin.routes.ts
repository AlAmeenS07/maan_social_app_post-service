import { Router } from "express"
import adminPostRoutes from "./admin.post.routes"

const router = Router()

// router.use((req , res , next)=>{
//     console.log("router-came" , req.headers)
//     next()
// })

router.use("/post" , adminPostRoutes)


export default router