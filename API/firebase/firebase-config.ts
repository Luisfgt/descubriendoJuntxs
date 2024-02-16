import admin from "firebase-admin";
import { ServiceAccount } from "./descubriendo-juntxs";
const inicializar = admin

inicializar.initializeApp({
    credential: admin.credential.cert(ServiceAccount as admin.ServiceAccount),
});

export default inicializar