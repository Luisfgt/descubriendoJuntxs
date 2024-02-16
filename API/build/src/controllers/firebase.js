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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const client_1 = require("@prisma/client");
const firebase_config_1 = __importDefault(require("../../firebase/firebase-config"));
const prisma = new client_1.PrismaClient();
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, name } = req.body;
        console.log(token, name);
        const decodedToken = yield firebase_config_1.default.auth().verifyIdToken(token);
        if (decodedToken) {
            console.log(decodedToken);
            const email = decodedToken.email || 'null@gmail.com';
            const createUserFinal = yield prisma.user.create({
                data: {
                    email: email,
                    name: name,
                }
            });
            if (createUserFinal) {
                return res.status(200).json({
                    status: true,
                    createUserFinal
                });
            }
            else {
                return res.status(400).json({
                    status: false,
                    message: 'no se pudo crear el usuario'
                });
            }
        }
        else {
            return res.status(400).json({
                status: false,
                messagE: 'No se pudo decodificar el  token'
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
});
exports.createUser = createUser;
