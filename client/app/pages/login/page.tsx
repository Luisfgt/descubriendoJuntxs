'use client'
import { useState } from "react";
import SignUpPage from "../signup/page";
import SignInPage from "../signin/page";

const AuthPage = () => {
    const [isSignUp, setIsSignUp] = useState(false);

    return (
        <div>
            {isSignUp ? <SignUpPage /> : <SignInPage />}
            {/* {isSignUp ? (
                <p>¿Ya tienes una cuenta? <button onClick={() => setIsSignUp(false)}>Inicia sesión</button></p>
            ) : (
                <p>¿No tienes cuenta aún? <button onClick={() => setIsSignUp(true)}>Registrarme</button></p>
            )} */}
        </div>
    );
}

export default AuthPage;