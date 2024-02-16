import { Router } from "express";
import {
    postUser,
    updateUserById,
    getUsersByRole,
    getAllUsers,
    getUserByEmail,
    getUserByDonations,
    getUserFavorites,
    getUserService
} from '../controllers/users';


const router = Router()

// Definir las rutas
router.post('/', postUser); // Crear un nuevo usuario
router.put('/:userId', updateUserById); // Actualizar un usuario por ID
router.post('/authToken', getUserByEmail); // Obtener todos los usuarios
router.get('/:role', getUsersByRole); // Obtener usuarios por rol y estado
router.get('/', getAllUsers); // Obtener todos los usuarios
router.get('/donations/:id', getUserByDonations);
router.get('/favorites/:id', getUserFavorites);
router.get('/service/:id', getUserService);


export default router;