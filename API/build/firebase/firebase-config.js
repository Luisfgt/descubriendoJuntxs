"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const descubriendo_juntxs_1 = require("./descubriendo-juntxs");
const inicializar = firebase_admin_1.default;
inicializar.initializeApp({
    credential: firebase_admin_1.default.credential.cert(descubriendo_juntxs_1.ServiceAccount),
});
exports.default = inicializar;
