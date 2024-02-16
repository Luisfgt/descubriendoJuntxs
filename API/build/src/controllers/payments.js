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
exports.reciveWebhook = exports.postCreatePayment = void 0;
const mercadopago_1 = require("mercadopago");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
require('dotenv').config();
if (!process.env.MP_TOKEN) {
    throw new Error('No se ha encontrado el token de mercado pago');
}
const client = new mercadopago_1.MercadoPagoConfig({ accessToken: 'APP_USR-2980126963536437-020119-4e286ecf46944fbb0eeca10c524a8e8a-1663162309' });
const payment = new mercadopago_1.Payment(client);
const postCreatePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { programId, userId, amount, type, message, contact_phone, contact_email } = req.body;
    const preference = new mercadopago_1.Preference(client);
    try {
        const infoUser = {
            userId: userId ? userId : 1,
            contact_phone: contact_phone ? contact_phone : "anonimo",
            contact_email: contact_email ? contact_email : "anonimo"
        };
        let program;
        try {
            program = yield prisma.program.findUnique({
                where: {
                    id: Number(programId)
                }
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                program = { name: "Default Program", id: 0 };
            }
            else {
                throw error;
            }
        }
        const programToUse = program;
        const response = yield preference.create({
            body: {
                items: [
                    {
                        id: 'item_id',
                        title: (_a = programToUse === null || programToUse === void 0 ? void 0 : programToUse.name) !== null && _a !== void 0 ? _a : "Default Program Name",
                        quantity: 1,
                        unit_price: amount
                    }
                ],
                purpose: "wallet_purchase",
                back_urls: {
                    success: "http://localhost:3000",
                    failure: "http://localhost:3000",
                    pending: "http://localhost:3000",
                },
                auto_return: "approved",
                notification_url: "https://793e-181-167-76-221.ngrok-free.app/payments/webhook",
                metadata: {
                    programId: programId,
                    userId: infoUser.userId,
                    message: message,
                    type: type,
                    state: "Active",
                    contact_email: infoUser.contact_email,
                    contact_phone: infoUser.contact_phone
                }
            },
        });
        res.send(response);
    }
    catch (error) {
        console.log(error);
    }
});
exports.postCreatePayment = postCreatePayment;
const reciveWebhook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.query.topic === 'payment') {
            const paymentId = req.query.id;
            console.log('paymentId', req.query);
            const paymentInfo = yield payment.get({ id: paymentId });
            console.log('meta', paymentInfo);
            if (paymentInfo.status === 'approved') {
                const donation = yield prisma.donation.findUnique({
                    where: {
                        transactionId: Number(paymentId)
                    },
                });
                if (!donation) {
                    yield prisma.donation.create({
                        data: {
                            transactionId: Number(paymentId),
                            programId: Number(paymentInfo.metadata.program_id),
                            userId: paymentInfo.metadata.user_id,
                            amount: paymentInfo.transaction_amount,
                            date: paymentInfo.date_created,
                            message: paymentInfo.metadata.message,
                            contact_email: paymentInfo.metadata.contact_email,
                            contact_phone: paymentInfo.metadata.contact_phone,
                        },
                    });
                }
            }
        }
        res.status(400).send('No es un pago');
    }
    catch (error) {
        console.log('Error al obtener el pago:', error);
        res.status(500).send('Error al obtener el pago');
    }
});
exports.reciveWebhook = reciveWebhook;
