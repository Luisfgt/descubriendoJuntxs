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
exports.getAllUsers = exports.getUsersByRole = exports.updateUserById = exports.postUser = void 0;
const error_handler_1 = require("../utils/error.handler");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const postUser = ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, surName, identification, phone, dateIn, dateOut, description, linkedin, languaje, position, role } = body;
    if (!email || !name) {
        (0, error_handler_1.handleHttp)(res, 'EMAIL_AND_NAME_REQUIRED');
        return;
    }
    try {
        const newUser = yield prisma.user.create({
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
        });
        res.status(200).json(newUser);
    }
    catch (error) {
        console.error('Error creating user:', error);
        (0, error_handler_1.handleHttp)(res, 'ERROR_POST_USER');
    }
});
exports.postUser = postUser;
const updateUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.userId); // Obtener el ID de la solicitud
    const userData = req.body; // Datos actualizados del usuario
    try {
        const updatedUser = yield prisma.user.update({
            where: { id: userId }, // Filtrar por ID
            data: userData // Datos actualizados
        });
        res.status(200).json(updatedUser); // Devolver el usuario modificado
    }
    catch (error) {
        console.error('Error updating user by ID:', error);
        (0, error_handler_1.handleHttp)(res, 'ERROR_UPDATE_USER');
    }
});
exports.updateUserById = updateUserById;
const getUsersByRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const role = req.params.role; // Obtener el rol de la solicitud
    try {
        // Obtener la lista de usuarios filtrados por rol y estado "Activo"
        const users = yield prisma.user.findMany({
            where: {
                role: role === 'Coach' ? 'Coach' : 'Usuario', // Filtrar por el rol especificado
                AND: {
                    state: 'Activo' // Filtrar por el estado "Activo"
                }
            }
        });
        res.status(200).json(users); // Devolver la lista de usuarios
    }
    catch (error) {
        console.error('Error fetching users by role and status:', error);
        (0, error_handler_1.handleHttp)(res, 'ERROR_FETCH_USERS_BY_ROLE_AND_STATUS');
    }
});
exports.getUsersByRole = getUsersByRole;
const getAllUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obtener todos los usuarios
        const users = yield prisma.user.findMany();
        res.status(200).json(users); // Devolver la lista de usuarios
    }
    catch (error) {
        console.error('Error al obtener todos los usuarios:', error);
        (0, error_handler_1.handleHttp)(res, 'ERROR_GET_ALL_USERS');
    }
});
exports.getAllUsers = getAllUsers;
