import { Router } from "express";
import { getDonations, getDonationsByProgram, getDonationsByUser, getDonationsByUserAndProgram, postDonation } from "../controllers/donationsController";

const router = Router()

router.get('/', getDonations)
router.get('/program/:id', getDonationsByProgram)

router.get('/user/:id', getDonationsByUser)
router.get('/programAndUser/:id', getDonationsByUserAndProgram)

router.post('/', postDonation)

export default router;