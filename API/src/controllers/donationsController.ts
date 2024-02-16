import { Request, Response } from "express"
import { handleHttp } from "../utils/error.handler"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

const getDonations = async (_req: Request, res: Response) => {
    try {
        const donations = await prisma.donation.findMany({
            include: {
                user: true,
            },
        });
        const donationsWithTransactionIdAsString = donations.map(donation => {
            const { transactionId, ...otherProps } = donation;
            return { ...otherProps, transactionId: transactionId.toString() };
        });
        res.status(200).json(donationsWithTransactionIdAsString);
    } catch (error) {
        console.log(error)
        handleHttp(res, 'ERROR_GET_DONATIONS')
    }
}

const getDonationsByProgram = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const donations = await prisma.donation.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                program: true
            }
        });

        res.status(200).json(donations);
    } catch (error) {
        console.log(error);
    }
}



const getDonationsByUser = async (req: Request, res: Response) => {

    try {
        const { id } = req.params;
        const category = await prisma.donation.findUnique({
            where: {
                id: Number(id)
            },
        });
        res.json(category)
    } catch (error) {
        console.log(error)
        handleHttp(res, 'ERROR_GET_CATEGORY')
    }
}

const getDonationsByUserAndProgram = async (req: Request, res: Response) => {
    const { userId, programId } = req.query;

    try {
        const donation = await prisma.donation.findMany({
            where: {
                userId: Number(userId),
                programId: Number(programId)
            }
        });
        res.status(200).json(donation);
    } catch (error) {
        handleHttp(res, 'ERROR_GET_DonationsByUserAndProgram')
    }
}

const postDonation = async (req: Request, res: Response) => {
    const { programId, userId, amount, date, type, frequency, message, contact_phone, contact_email, state, transactionId } = req.body;

    try {
        const newDonation = await prisma.donation.create({
            data: {
                programId: programId && programId,
                transactionId: transactionId ? transactionId : "0",
                userId: userId && userId,
                amount: amount && amount as number,
                date: date ? new Date(date) : new Date(),
                type: type && type as string,
                frequency: frequency && frequency as string,
                message: message && message as string,
                contact_phone: contact_phone && contact_phone as string,
                contact_email: contact_email && contact_email as string,
                state: state && state as string
            }
        });

        const donationResponse = { ...newDonation, transactionId: newDonation.transactionId.toString() };
        res.status(200).json(donationResponse);

    } catch (error: any) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}

export {
    getDonations,
    getDonationsByProgram,
    getDonationsByUser,
    getDonationsByUserAndProgram,
    postDonation
}