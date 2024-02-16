"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controllers/users");
const router = (0, express_1.Router)();
// Definir las rutas
router.post('/users', users_1.postUser); // Crear un nuevo usuario
router.put('/users/:userId', users_1.updateUserById); // Actualizar un usuario por ID
router.get('/users/:role', users_1.getUsersByRole); // Obtener usuarios por rol y estado
router.get('/users', users_1.getAllUsers); // Obtener todos los usuarios
router.get('/users/:userId', users_1.getUserById); // Obtener todos los usuarios
exports.default = router;
