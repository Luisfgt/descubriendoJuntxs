import { Router } from "express";
import {
  getProgramById,
  paginationProgram,
  getPrograms,
  postProgram,
  updateProgram,
} from "../controllers/program";

const router = Router();

router.get("/pagination", paginationProgram);

router.get("/", getPrograms);
router.get("/:id", getProgramById);
router.post("/", postProgram);
router.put("/:id", updateProgram);


export default router;
