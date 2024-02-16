import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const postCommentary = async ({ programId, userId, commentary }) => {
    try {
      const newCommentary = await prisma.commentary.create({
        data: {
          programId: programId && programId,
          userId: userId && userId,
          commentary: commentary && commentary,
          state: "Activo"
        }
      })
      
      return {
        error: false,
        newCommentary
      }
    } catch (error) {
      return {
        error: true,
        message: error.message
      }
    }
  };

  export {
    postCommentary
  }