import { Router } from "express";
import {
    getCommentaryByProgramAndUser,
    postCommentary,
    putCommentary
} from "../controllers/commentary"


const router = Router()

router.get('/program/:programId/user/:userId', getCommentaryByProgramAndUser)
router.post('/', postCommentary)
router.post('/', putCommentary)


export default router;