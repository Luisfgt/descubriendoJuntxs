"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
// middlewares
app.use(express_1.default.json()); // middleware que transforma  los req.body a  un json
const PORT = 3000;
app.get('/ping', (_req, res) => {
    console.log('respuesta de prueba');
    res.send("todo bien");
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
