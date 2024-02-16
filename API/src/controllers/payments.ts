import { Request, Response } from "express"
import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';
import { PrismaClient, Prisma } from "@prisma/client"

const prisma = new PrismaClient();

require('dotenv').config()

if (!process.env.MP_TOKEN) {
    throw new Error('No se ha encontrado el token de mercado pago')
}

const client = new MercadoPagoConfig({ accessToken: 'APP_USR-2980126963536437-020119-4e286ecf46944fbb0eeca10c524a8e8a-1663162309' });

const payment = new Payment(client);



const postCreatePayment = async (req: Request, res: Response) => {
    const { programId, userId, amount, type, message, contact_phone, contact_email } = req.body;
    const preference = new Preference(client);
    try {
        const infoUser = {
            userId: userId ? userId : 1,
            contact_phone: contact_phone ? contact_phone : "anonimo",
            contact_email: contact_email ? contact_email : "anonimo"
        }

        let program;
        try {
            program = await prisma.program.findUnique({
                where: {
                    id: Number(programId)
                }
            })
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                program = { name: "Default Program", id: 0 };
            } else {

                throw error;
            }
        }

        const programToUse = program;

        const response = await preference.create({
            body: {
                items: [
                    {
                        id: programToUse?.id.toString() ?? "0",
                        title: programToUse?.name ?? "Default Program Name",
                        quantity: 1,
                        unit_price: amount
                    }
                ],
                purpose: "wallet_purchase",
                back_urls: {
                    success: "https://client-gamma-three-32.vercel.app/",

                    failure: "https://client-gamma-three-32.vercel.app/",
                    pending: "https://client-gamma-three-32.vercel.app/",

                },
                auto_return: "approved",
                notification_url: "https://juntxs.vercel.app/payments/webhook",
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

    } catch (error) {
        console.log(error);
    }
}

const reciveWebhook = async (req: Request, res: Response) => {




    try {
        if (req.query.topic === 'payment') {
            const paymentId = req.query.id as string;

            console.log(paymentId);
            const paymentInfo = await (payment as any).get({ id: paymentId });
            console.log(paymentInfo);

            if (paymentInfo.status === 'approved') {
                // Convertir paymentInfo.id a BigInt
                const transactionId = BigInt(paymentInfo.id);

                // Buscar un pago con el mismo transactionId
                const payment = await prisma.payment.findFirst({
                    where: {
                        transactionId: transactionId.toString()
                    }
                });

                // Si no se encontró ningún pago (es decir, payment es null), crear un nuevo pago
                if (!payment) {
                    await prisma.donation.create({
                        data: {
                            programId: paymentInfo.metadata.program_id,
                            userId: paymentInfo.metadata.user_id,
                            amount: paymentInfo.transaction_amount,
                            type: paymentInfo.metadata.type,
                            message: paymentInfo.metadata.message,
                            contact_phone: paymentInfo.metadata.contact_phone,
                            contact_email: paymentInfo.metadata.contact_email,
                            transactionId: transactionId.toString(),
                            date: new Date(),
                        }
                    });
                    res.status(200).json("Payment created");
                }
            }

        }


    } catch (error) {
        console.log(error);
    }
}



export {
    postCreatePayment,
    reciveWebhook,


}