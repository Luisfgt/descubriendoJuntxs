
import { Router } from "express";
import {
    getFavoritesByProgramAndUser,
    postFavorite,
    deleteFavorite,
    countFavoritesByProgram,
    getFavoritesByUser
} from "../controllers/favorite"


const router = Router()

router.get('/count/:programId', countFavoritesByProgram);
router.get('/program/:programId/user/:userId', getFavoritesByProgramAndUser)
router.get('/:userId', getFavoritesByUser)
router.post('/', postFavorite)
router.delete('/:programId/:userId', deleteFavorite);

export default router;