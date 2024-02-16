import { Router } from "express";
import { mail } from "../controllers/mail";

const router = Router()



router.post("/", mail)




export default router;