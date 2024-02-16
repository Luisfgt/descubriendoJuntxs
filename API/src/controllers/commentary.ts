import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handler";
import { PrismaClient, State } from "@prisma/client";

const prisma = new PrismaClient();

const getCommentaryByProgramAndUser = async (req: Request, res: Response) => {
  const { programId, userId } = req.params;

  try {
    const commentary = await prisma.commentary.findMany({
      where: {
        programId: Number(programId),
        userId: Number(userId),
      },
    });

    res.status(200).json(commentary);

  } catch (error) {
    handleHttp(res, "ERROR_GET_FAVORITES_BY_SERVICE");
  }
};


const postCommentary = async ({ programId, userId, commentary }: { programId: number, userId: number, commentary: string }) => {
  try {
    const newCommentary = await prisma.commentary.create({
      data: {
        programId: programId && (programId as number),
        userId: userId && (userId as number),
        commentary: commentary && (commentary as string),
        state: "Activo"
      }
    })
    
    return {
      error: false,
      newCommentary
    }
  } catch (error: any) {
    return {
      error: true,
      message: error.message
    }
  }
};

const putCommentary = async (req: Request, res: Response) => {
  const { id } = req.params;

  const {
    commentary,
    state
  } = req.body;

  try {
    const updatedCommentary = await prisma.commentary.update({
      where: {
        id: Number(id)
      },
      data: {
        commentary: commentary && (commentary as string),
        state: state && (state as State)
      },
    })

    res.status(200).json(updatedCommentary);
  } catch (error) {
    handleHttp(res, "ERROR_POST_COMMENTARY");
  }
};


export {
  getCommentaryByProgramAndUser,
  postCommentary,
  putCommentary
};
