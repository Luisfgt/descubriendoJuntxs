import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handler";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getParticipantsByService = async (req: Request, res: Response) => {
  const { serviceId } = req.params;

  try {
    const participants = await prisma.participant.findMany({
      where: {
        serviceId: Number(serviceId),
        state: "Activo",
      },
      include: {
        service: true,
        user: true
      }
    });

    res.status(200).json(participants);

  } catch (error) {
    handleHttp(res, "ERROR_GET_PARTICIPANTS_BY_SERVICE");
  }
};

const getParticipantByUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const participants = await prisma.participant.findMany({
      where: {
        userId: Number(userId),
        state: "Activo",
      },
      include:{
        service: true,
        user: true
      }
    });

    res.status(200).json(participants);

  } catch (error) {
    handleHttp(res, "ERROR_GET_PARTICIPANTS_BY_USER");
  }
};


const postParticipant = async (req: Request, res: Response) => {
  const {
    serviceId,
    userId,
  } = req.body;

  try {
    const newParticipant = await prisma.participant.create({
      data: {
        serviceId: serviceId && (serviceId as number),
        userId: userId && (userId as number),
        role: "", // Add the missing property "role"
        state: "Activo", // Add the missing property "state"
      },
    });

    res.status(200).json(newParticipant);
  } catch (error) {
    handleHttp(res, "ERROR_POST_PARTICIPANT");
  }
};

const updateParticipant = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const updatedParticipant = await prisma.participant.update({
      where: { id: Number(id) },

      data: {
        state: "Inactivo",
      },
    });

    res.status(200).json(updatedParticipant);
  } catch (error) {
    return handleHttp(res, "ERROR_UPDATE_PARTICIPANT");
  }
};



export {
  getParticipantsByService,
  getParticipantByUser,
  postParticipant,
  updateParticipant,
};
