import { Router } from "express";
import {
    getServices,
    getServiceById,
    getServicesByType,
    getServicesByUser,
    postService,
    updateService,
    paginationService,
} from "../controllers/service";

const router = Router();

router.get("/pagination", paginationService);

router.get("/", getServices);
router.get("/:type", getServicesByType);
router.get("/:userId", getServicesByUser);
router.get("/user/:id", getServiceById);
router.post("/", postService);
router.put("/:id", updateService);

export default router;
