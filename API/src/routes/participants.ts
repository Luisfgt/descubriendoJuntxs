import { Router } from "express";
import {
    getParticipantsByService,
    getParticipantByUser,
    postParticipant,
    updateParticipant,
} from "../controllers/participants"

const router = Router()

router.get('/:serviceId', getParticipantsByService)
router.get('/user/:userId', getParticipantByUser)
router.post('/', postParticipant)
router.put('/:id', updateParticipant)

export default router;