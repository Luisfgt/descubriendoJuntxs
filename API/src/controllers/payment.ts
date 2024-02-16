import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handler";
import { PaymentState, PrismaClient } from "@prisma/client";
import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';

const prisma = new PrismaClient();

const client = new MercadoPagoConfig({ accessToken: 'APP_USR-2980126963536437-020119-4e286ecf46944fbb0eeca10c524a8e8a-1663162309' });

const payment = new Payment(client);

const postPayment = async (req: Request, res: Response) => {
  const { name, userId, participantUserId, amount, description, hourIn, hourOut, objective, syllabus, type, dateIn, dateOut } = req.body;
  const preference = new Preference(client);
  try {
    const response = await preference.create({
      body: {
        items: [
          {
            id: "1234",
            title: name,
            quantity: 1,
            unit_price: amount
          }
        ],
        purpose: "wallet_purchase",
        back_urls: {
          success: "https://client-gamma-three-32.vercel.app/",
          failure: "https://client-gamma-three-32.vercel.app/",
          pending: "https://client-gamma-three-32.vercel.app/"
        },
        auto_return: "approved",
        notification_url: "https://juntxs.vercel.app/payments/reciveMP",
        metadata: {
          userId: userId,
          description: description,
          hourIn: hourIn,
          hourOut: hourOut,
          objective: objective,
          syllabus: syllabus,
          type: type,
          dateIn: dateIn,
          dateOut: dateOut,
          participantUserId: participantUserId
        }

      }

    });

    res.send(response)

  } catch (error) {

    console.log(error);

  }

};

const reciveMP = async (req: Request, res: Response) => {
  try {
    if (req.query.topic === 'payment') {
      const paymentId = req.query.id as string;

      console.log(paymentId);
      const paymentInfo = await (payment as any).get({ id: paymentId });
      console.log(paymentInfo);

      if (paymentInfo.status === 'approved') {
        const payment = await prisma.payment.findFirst({
          where: {
            transactionId: paymentInfo.id.toString()
          }
        });
        if (!payment) {

          const newService = await prisma.service.create({
            data: {
              name: 'Coach Personalizado',
              description: paymentInfo.metadata.description,
              userId: paymentInfo.metadata.user_id,
              categoryId: 1,
              amount: paymentInfo.transaction_amount,
              dateIn: paymentInfo.date_in,
              dateOut: paymentInfo.date_out,
              hourIn: paymentInfo.metadata.hour_in,
              hourOut: paymentInfo.metadata.hour_out,
              objective: paymentInfo.metadata.objective,
              syllabus: paymentInfo.metadata.syllabus,
              type: paymentInfo.metadata.type
            }

          })

          const newPayment = await prisma.payment.create({
            data: {
              serviceId: newService.id,
              userId: paymentInfo.metadata.user_id,
              amount: paymentInfo.transaction_amount,
              instrument: paymentInfo.payment_method_id,
              transactionId: paymentInfo.id.toString(),
              state: "Aceptado"
            }
          });
          if (newPayment) {
            await prisma.participant.create({
              data: {
                serviceId: newService.id,
                userId: paymentInfo.metadata.participant_user_id,
                role: "Participante",
              }
            })

          }
        }
        res.status(200).json("Pago Aceptado");
      }
    }
  } catch (error) {
    console.log(error);
  }
}
const getPaymentsByService = async (req: Request, res: Response) => {
  const { serviceId } = req.params;

  try {
    const participants = await prisma.participant.findMany({
      where: {
        id: Number(serviceId),
        state: "Activo",
      },
    });

    res.status(200).json(participants);

  } catch (error) {
    handleHttp(res, "ERROR_GET_PARTICIPANTS_BY_SERVICE");
  }
};

const getPaymentsByUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const participants = await prisma.participant.findMany({
      where: {
        id: Number(userId),
        state: "Activo",
      },
    });

    res.status(200).json(participants);

  } catch (error) {
    handleHttp(res, "ERROR_GET_PARTICIPANTS_BY_USER");
  }
};


const postPaymentService = async (req: Request, res: Response) => {
  const { serviceId, userId, role } = req.body;

  try {
    const newParticipant = await prisma.participant.create({
      data: {
        serviceId: Number(serviceId),
        userId: Number(userId),
        role: role,
      },
    });
    if (newParticipant) {
      const service = await prisma.service.findFirst({
        where: {
          id: Number(serviceId)
        }
      });
      if (service) {
        const preference = new Preference(client);
        const response = await preference.create({
          body: {
            items: [
              {
                id: "1234",
                title: service.name,
                quantity: 1,
                unit_price: service.amount
              }
            ],
            purpose: "wallet_purchase",
            back_urls: {
              success: "https://client-gamma-three-32.vercel.app/",
              failure: "https://client-gamma-three-32.vercel.app/",
              pending: "https://client-gamma-three-32.vercel.app/"
            },
            auto_return: "approved",
            notification_url: "https://juntxs.vercel.app/payments/reciveServiceMP",
            metadata: {
              serviceId: service.id,
              userId: userId,
              amount: service.amount,
              newParticipantId: newParticipant.id
            }

          }
        });
        res.send(response);
      }
    }

  } catch (error) {
    return handleHttp(res, "ERROR_POST_PARTICIPANT");
  }
};


const reciveServiceMP = async (req: Request, res: Response) => {
  try {
    if (req.query.topic === 'payment') {
      const paymentId = req.query.id as string;

      console.log(paymentId);
      const paymentInfo = await (payment as any).get({ id: paymentId });
      console.log(paymentInfo);

      if (paymentInfo.status === 'approved') {
        const payment = await prisma.payment.findFirst({
          where: {
            transactionId: paymentInfo.id.toString()
          }
        });
        if (!payment) {
          await prisma.payment.create({
            data: {
              serviceId: paymentInfo.metadata.service_id,
              userId: Number(paymentInfo.metadata.user_id),
              amount: paymentInfo.transaction_amount,
              instrument: paymentInfo.payment_method_id,
              transactionId: paymentInfo.id.toString(),
              state: "Aceptado"
            }
          });

        }
        res.status(200).json("Pago Aceptado");
      }
      else if (paymentInfo.status === 'rejected') {
        await prisma.participant.delete({
          where: {
            id: paymentInfo.metadata.new_participant_id
          }
        });
        res.status(200).json("Pago Rechazado");
      }

    }
  } catch (error) {
    console.log(error);
  }
};



const updatePayment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { amount, instrument, transactionId, state } = req.body;

  try {
    const updatedPayment = await prisma.payment.update({
      where: { id: Number(id) },

      data: {
        amount: amount && (amount as number),
        instrument: instrument && (instrument as string),
        transactionId: transactionId && (transactionId as string),
        state: state && (state as PaymentState)
      },
    });

    res.status(200).json(updatedPayment);
  } catch (error) {
    return handleHttp(res, "ERROR_UPDATE_PAYMENT");
  }
};



export {
  getPaymentsByService,
  getPaymentsByUser,
  postPayment,
  updatePayment,
  reciveMP,
  postPaymentService,
  reciveServiceMP

};
