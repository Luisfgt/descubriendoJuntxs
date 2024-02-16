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
exports.paginationService = exports.updateService = exports.postService = exports.getServiceByType = exports.getServiceById = exports.getServices = void 0;
const error_handler_1 = require("../utils/error.handler");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getServices = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const service = yield prisma.service.findMany({
            where: {
                state: "Activo",
            },
        });
        res.status(200).json(service);
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, "ERROR_GET_SERVICE_BY_ID");
    }
});
exports.getServices = getServices;
const getServiceById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const service = yield prisma.service.findUnique({
            where: {
                id: Number(id),
            },
        });
        res.status(200).json(service);
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, "ERROR_GET_SERVICE_BY_ID");
    }
});
exports.getServiceById = getServiceById;
const getServiceByType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { type } = req.params;
    try {
        const event = yield prisma.service.findMany({
            where: {
                type: type,
                state: "Activo",
            },
        });
        res.status(200).json(event);
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, "ERROR_GET_SERVICES_BY_TYPE");
    }
});
exports.getServiceByType = getServiceByType;
const postService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, userId, dateIn, dateOut, hourIn, duration, amount, objective, syllabus, } = req.body;
    try {
        const newEvent = yield prisma.service.create({
            data: {
                userId: userId && userId,
                name: name && name,
                dateIn: dateIn && dateIn,
                dateOut: dateOut && dateOut,
                hourIn: hourIn && hourIn,
                duration: duration && duration,
                amount: amount && amount,
                objective: objective && objective,
                syllabus: syllabus && syllabus,
                state: "Activo"
            },
        });
        res.status(200).json(newEvent);
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, "ERROR_POST_SERVICE");
    }
});
exports.postService = postService;
const updateService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, dateIn, dateOut, hourIn, duration, amount, objective, syllabus, type, state } = req.body;
    try {
        const updatedEvent = yield prisma.service.update({
            where: { id: Number(id) },
            data: {
                name: name && name,
                dateIn: dateIn && dateIn,
                dateOut: dateOut && dateOut,
                hourIn: hourIn && hourIn,
                duration: duration && duration,
                amount: amount && amount,
                objective: objective && objective,
                syllabus: syllabus && syllabus,
                type: type && type,
                state: state && state
            },
        });
        res.status(200).json(updatedEvent);
    }
    catch (error) {
        return (0, error_handler_1.handleHttp)(res, "ERROR_UPDATE_SERVICE");
    }
});
exports.updateService = updateService;
const paginationService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = Number(req.query.page) || 1; //*Número de página
        const pageSize = Number(req.query.pageSize) || 10; //* Tamaño de la página
        //* calcular el indice de inicio y limitar la consulta a la página
        const startIndex = (page - 1) * pageSize;
        const events = yield prisma.service.findMany({
            skip: startIndex,
            take: pageSize,
        });
        res.status(200).json(events);
    }
    catch (error) {
        res.status(500).json({ error: "error interno del servidor" });
    }
});
exports.paginationService = paginationService;
