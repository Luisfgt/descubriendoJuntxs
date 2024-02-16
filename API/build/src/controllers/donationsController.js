"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postDonation = exports.getDonationsByUserAndProgram = exports.getDonationsByUser = exports.getDonationsByProgram = exports.getDonations = void 0;
const error_handler_1 = require("../utils/error.handler");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getDonations = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const donations = yield prisma.donation.findMany();
        res.status(200).json(donations);
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, 'ERROR_GET_DONATIONS');
    }
});
exports.getDonations = getDonations;
const getDonationsByProgram = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { programId } = req.query;
    try {
        const donation = yield prisma.donation.findMany({
            where: {
                programId: Number(programId)
            }
        });
        res.status(200).json(donation);
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, 'ERROR_GET_DonationsByProgram');
    }
});
exports.getDonationsByProgram = getDonationsByProgram;
const getDonationsByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.query;
    try {
        const donation = yield prisma.donation.findMany({
            where: {
                userId: Number(userId)
            }
        });
        res.status(200).json(donation);
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, 'ERROR_GET_DonationsByUser');
    }
});
exports.getDonationsByUser = getDonationsByUser;
const getDonationsByUserAndProgram = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, programId } = req.query;
    try {
        const donation = yield prisma.donation.findMany({
            where: {
                userId: Number(userId),
                programId: Number(programId)
            }
        });
        res.status(200).json(donation);
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, 'ERROR_GET_DonationsByUserAndProgram');
    }
});
exports.getDonationsByUserAndProgram = getDonationsByUserAndProgram;
const postDonation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { programId, userId, amount, date, type, frequency, message, contact_phone, contact_email, state } = req.body;
    try {
        const newDonation = yield prisma.donation.create({
            data: {
                programId: programId && programId,
                userId: userId && userId,
                amount: amount && amount,
                date: date && date,
                type: type && type,
                frequency: frequency && frequency,
                message: message && message,
                contact_phone: contact_phone && contact_phone,
                contact_email: contact_email && contact_email,
                state: state && state
            }
        });
        res.status(200).json(newDonation);
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, 'ERROR_POST_DONATION');
    }
});
exports.postDonation = postDonation;
