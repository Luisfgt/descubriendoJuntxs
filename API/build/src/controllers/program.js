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
exports.paginationProgram = exports.getProgramsByCategory = exports.updateProgram = exports.postProgram = exports.getProgramByType = exports.getProgramById = exports.getPrograms = void 0;
const error_handler_1 = require("../utils/error.handler");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getPrograms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.query;
    try {
        const programs = yield prisma.program.findMany({
            where: {
                state: "Activo"
            }
        });
        const names = name
            ? programs.filter((program) => {
                return program.name.toLowerCase().includes(name.toString().toLowerCase());
            })
            : programs;
        res.status(200).json(names);
    }
    catch (error) {
        console.log(error);
        (0, error_handler_1.handleHttp)(res, 'ERROR_GET_Programs');
    }
});
exports.getPrograms = getPrograms;
const getProgramsByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = req.params;
    try {
        const programs = yield prisma.program.findMany({
            where: {
                state: "Activo",
                categoryId: Number(categoryId)
            }
        });
        res.status(200).json(programs);
    }
    catch (error) {
        console.log(error);
        (0, error_handler_1.handleHttp)(res, 'ERROR_GET_Programs');
    }
});
exports.getProgramsByCategory = getProgramsByCategory;
const getProgramById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const program = yield prisma.program.findUnique({
            where: {
                id: Number(id)
            }
        });
        res.status(200).json(program);
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, 'ERROR_GET_CATEGORYS');
    }
});
exports.getProgramById = getProgramById;
const getProgramByType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { type } = req.params;
    console.log('Type: ', type);
    try {
        const program = yield prisma.program.findMany({
            where: {
                type: type,
                state: "Activo",
            }
        });
        res.status(200).json(program);
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, 'ERROR_GET_PROGRAMS_BY_TYPE');
    }
});
exports.getProgramByType = getProgramByType;
const postProgram = ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, amount, objective, syllabus, state, type, categoryId } = body;
    try {
        const newProgram = yield prisma.program.create({
            data: {
                name: name && name,
                description: description && description,
                amount: amount && amount,
                objective: objective && objective,
                syllabus: syllabus && syllabus,
                state: state && state,
                type: type && type,
                categoryId: categoryId && categoryId
            }
        });
        res.status(200).json(newProgram);
    }
    catch (error) {
        console.log(error);
        (0, error_handler_1.handleHttp)(res, 'ERROR_POST_CATEGORY');
    }
});
exports.postProgram = postProgram;
const updateProgram = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, description, amount, objective, syllabus, state, type, categoryId } = req.body;
    try {
        const updatedProgram = yield prisma.program.update({
            where: { id: Number(id) },
            data: {
                name: name && name,
                description: description && description,
                amount: amount && amount,
                objective: objective && objective,
                syllabus: syllabus && syllabus,
                state: state && state,
                type: type && type,
                categoryId: categoryId && categoryId
            }
        });
        res.status(200).json(updatedProgram);
    }
    catch (error) {
        return (0, error_handler_1.handleHttp)(res, 'ERROR_UPDATE_CATEGORY');
    }
});
exports.updateProgram = updateProgram;
const paginationProgram = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = Number(req.query.page) || 1; //*Número de página
        const pageSize = Number(req.query.pageSize) || 10; //* Tamaño de la página
        console.log('page: ' + page);
        console.log('pageSize: ' + pageSize);
        //* calcular el indice de inicio y limitar la consulta a la página
        const startIndex = (page - 1) * pageSize;
        const programs = yield prisma.program.findMany({
            skip: startIndex,
            take: pageSize
        });
        res.status(200).json(programs);
    }
    catch (error) {
        console.log('Error al obtener programas ', error);
        res.status(500).json({ error: 'error interno del servidor' });
    }
});
exports.paginationProgram = paginationProgram;
