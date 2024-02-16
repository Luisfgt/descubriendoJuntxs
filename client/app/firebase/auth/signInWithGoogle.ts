import firebase_app from "../firebase-config";
import { getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth";


const auth = getAuth(firebase_app);


export default async function signUpWithGoogle() {
    let result = null,
        error = null;
    try {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({
            prompt: 'select_account'
        });
        
        result = await signInWithPopup(auth, provider);
    } catch (e) {
        error = e;
    }
    return { result, error };
}


