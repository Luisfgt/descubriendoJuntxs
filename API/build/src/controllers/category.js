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
exports.updateCategory = exports.postCategory = exports.getCategories = exports.getCategory = void 0;
const error_handler_1 = require("../utils/error.handler");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const category = yield prisma.category.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                project: true
            }
        });
        res.json(category);
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, 'ERROR_GET_CATEGORY');
    }
});
exports.getCategory = getCategory;
const getCategories = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield prisma.category.findMany();
        res.json(categories);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getCategories = getCategories;
const postCategory = ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = body;
    console.log(body);
    if (!name) {
        res.status(400).json({ error: "El nombre de la categoría es requerido" });
        return;
    }
    try {
        const newCategory = yield prisma.category.create({
            data: {
                name: name,
            }
        });
        res.json(newCategory);
    }
    catch (error) {
        const message = error.message;
        console.log(error);
        res.status(500).json({ error: message });
    }
});
exports.postCategory = postCategory;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name } = req.body;
        console.log(id, name);
        const updatedCategory = yield prisma.category.update({
            where: {
                id: Number(id)
            },
            data: {
                name: name
            }
        });
        res.json(updatedCategory);
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, 'ERROR_UPDATE_CATEGORY');
    }
});
exports.updateCategory = updateCategory;
