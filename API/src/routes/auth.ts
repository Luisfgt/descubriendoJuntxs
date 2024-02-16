import { Router } from "express";
import { createUser } from "../controllers/firebase";


const router = Router()

router.post('/', createUser)
// router.delete('/:id', deleteCategory)


export default router;