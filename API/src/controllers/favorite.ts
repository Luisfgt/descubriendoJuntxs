import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handler";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const countFavoritesByProgram = async (req: Request, res: Response) => {
  const { programId } = req.params;
  console.log('count: ', programId);

  try {
    const countFavorites = await prisma.favorite.count({
      where: {
        programId: Number(programId),
      },
    });

    res.status(200).json({ programId: programId, count: countFavorites });

  } catch (error) {
    handleHttp(res, "ERROR_GET_FAVORITES_BY_SERVICE");
  }
};

const getFavoritesByProgramAndUser = async (req: Request, res: Response) => {
  const { programId, userId } = req.params;

  try {
    const favorites = await prisma.favorite.findMany({
      where: {
        programId: Number(programId),
        userId: Number(userId),
      },
    });

    res.status(200).json(favorites);

  } catch (error) {
    handleHttp(res, "ERROR_GET_FAVORITES_BY_PROMGRAM_AND_USER");
  }
};


const postFavorite = async (req: Request, res: Response) => {
  const { programId, userId } = req.body;

  if (!programId || !userId) {
    res.status(400).json({ error: "El programId y el userId son requeridos" });
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    });

    if (!user) {
      res.status(400).json({ error: "El usuario no existe" });
      return;
    }

    const newFavorite = await prisma.favorite.create({
      data: {
        programId: programId,
        userId: userId
      }
    });
    res.json(newFavorite);
  } catch (error) {
    const message = (error as Error).message;
    console.log(error);
    res.status(500).json({ error: message });
  }
}

const deleteFavorite = async (req: Request, res: Response) => {
  const { programId, userId } = req.params;
  try {

    const favorite = await prisma.favorite.delete({
      where: {
        programId_userId: {
          programId: Number(programId),
          userId: Number(userId)
        }
      }
    })
    res.status(200).json(favorite)
  } catch (error) {
    handleHttp(res, 'ERROR_DELETE_FAVORITE')
  }
}

const getFavoritesByUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const favorites = await prisma.favorite.findMany({
      where: {
        userId: Number(userId),
      },
      include: {
        program: true,
      },
    });

    res.status(200).json(favorites);

  } catch (error) {
    const message = (error as Error).message;
    console.log(error);
    res.status(500).json({ error: message });
  }
};

export {
  getFavoritesByProgramAndUser,
  countFavoritesByProgram,
  postFavorite,
  deleteFavorite,
  getFavoritesByUser
};
