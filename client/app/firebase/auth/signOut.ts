import { getAuth, signOut } from 'firebase/auth';
import firebase_app from '../firebase-config';

// Obtén la instancia de autenticación utilizando la configuración de Firebase
const auth = getAuth(firebase_app);

// Función para realizar el logout
export async function logout(): Promise<void> {
    try {
        await signOut(auth);
        console.log('Logout exitoso');
    } catch (error) {
        console.error('Error durante el logout', error);
    }
}