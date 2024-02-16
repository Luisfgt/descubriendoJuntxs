import firebase_app from "../firebase-config";
import { getAuth, deleteUser } from "firebase/auth";


const auth = getAuth(firebase_app)

export default async function deleteUserCurrent() {
    let result = null;
    let error = null;

    try {
        const user = auth.currentUser
        if (user) {
            result = await deleteUser(user)
        }
    } catch (errors) {
        error = errors
    }
    return { result, error };
}