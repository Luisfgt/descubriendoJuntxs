import { Request, Response } from "express"
import { handleHttp } from "../utils/error.handler"
import { PrismaClient } from "@prisma/client"
import admin from "../../firebase/firebase-config"

const prisma = new PrismaClient();

const postUser = async ({ body }: Request, res: Response) => {
    const { email, name, surName, identification, phone, dateIn, dateOut, description, linkedin, languaje, position, role, token } = body;
    if (!email || !name) {
        handleHttp(res, 'EMAIL_AND_NAME_REQUIRED');
        return;
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token)
        if (decodedToken) {
            const newUser = await prisma.user.create({
                data: {
                    email: email,
                    name: name,
                    surName: surName,
                    identification: identification,
                    phone: phone,
                    dateIn: dateIn,
                    dateOut: dateOut,
                    description: description,
                    linkedin: linkedin,
                    languaje: languaje,
                    position: position,
                    role: role
                }
            })
            res.status(200).json(newUser);
        } else
            res.status(400).json({
                status: false,
                message: 'No se pudo crear el usuario'
            });

    } catch (error) {
        console.error('Error creating user:', error);
        handleHttp(res, 'ERROR_POST_USER')
    }
}

const updateUserById = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId); // Obtener el ID de la solicitud
    const userData = req.body; // Datos actualizados del usuario

    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId }, // Filtrar por ID
            data: userData // Datos actualizados
        });
        res.status(200).json(updatedUser); // Devolver el usuario modificado
    } catch (error) {
        console.error('Error updating user by ID:', error);
        handleHttp(res, 'ERROR_UPDATE_USER');
    }
}
const getUserByEmail = async (req: Request, res: Response) => {
    try {
        const { token } = req.body
        const decodedToken = await admin.auth().verifyIdToken(token);
        console.log(decodedToken);
        if (decodedToken) {
            const email = decodedToken.email
            const user = await prisma.user.findUnique({
                where: { email: email } // Filtrar por ID
            });
            if (user) {
                res.status(200).json({
                    status: true,
                    user
                }); // Devolver el usuario
            } else {
                res.status(200).json({
                    status: false,
                    message: 'el usuario no está logeado'
                }); // Devolver el usuario
            }
        }
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        handleHttp(res, 'ERROR_FETCH_USER_BY_ID');
    }
}
const getUsersByRole = async (req: Request, res: Response) => {
    const role = req.params.role; // Obtener el rol de la solicitud
    try {
        // Obtener la lista de usuarios filtrados por rol y estado "Activo"
        const users = await prisma.user.findMany({
            where: {
                role: role === 'Coach' ? 'Coach' : 'Usuario', // Filtrar por el rol especificado
                AND: {
                    state: 'Activo' // Filtrar por el estado "Activo"
                }
            }
        });
        res.status(200).json(users); // Devolver la lista de usuarios
    } catch (error) {
        console.error('Error fetching users by role and status:', error);
        handleHttp(res, 'ERROR_FETCH_USERS_BY_ROLE_AND_STATUS');
    }
}
const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error al obtener todos los usuarios:', error);
        handleHttp(res, 'ERROR_GET_ALL_USERS');
    }
}

const getUserByDonations = async (_req: Request, _res: Response) => {
    try {
        const { id } = _req.params
        const response = await prisma.user.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                donation: {
                    include: {
                        program: true
                    }
                }
            }
        })
        _res.json(response)
    } catch (error) {
        console.log(error)
    }
}

const getUserFavorites = async (_req: Request, _res: Response) => {
    try {
        const { id } = _req.params
        const response = await prisma.user.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                favorite: {
                    include: {
                        program: {
                            include: {
                                commentary: true
                            }
                        }
                    }
                }
            }
        })
        _res.json(response)
    } catch (error) {
        // manejar el error
    }
}

const getUserService = async (_req: Request, _res: Response) => {
    try {
        const { id } = _req.params
        const response = await prisma.user.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                service: true
            }
        })
        _res.json(response)
    } catch (error) {
        // manejar el error
    }

}
export {
    postUser,
    updateUserById,
    getUsersByRole,
    getAllUsers,
    getUserByEmail,
    getUserByDonations,
    getUserFavorites,
    getUserService
}