import { Router } from "express";

import { uploadController } from "../controllers/upload";

const router = Router();


router.post('/', uploadController);

export default router;