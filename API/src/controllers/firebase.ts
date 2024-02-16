import { Request, Response } from "express"
import { PrismaClient } from '@prisma/client';
import admin from "../../firebase/firebase-config"

const prisma = new PrismaClient();

const createUser = async (req: Request, res: Response) => {
    try {
        const { token, name } = req.body
        console.log(token, name);
        
        const decodedToken = await admin.auth().verifyIdToken(token);

        if (decodedToken) {

            const email = decodedToken.email || 'null@gmail.com'
            const createUserFinal = await prisma.user.create({
                data: {
                    email: email,
                    name: name,
                }
            })
            if (createUserFinal) {
                return res.status(200).json({
                    status: true,
                    createUserFinal
                })
            } else {
                return res.status(400).json({
                    status: false,
                    message: 'no se pudo crear el usuario'
                })
            }
        } else {
            return res.status(400).json({
                status: false,
                messagE: 'No se pudo decodificar el  token'
            })
        }
    } catch (error: any) {
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
}


export {
    createUser
}
