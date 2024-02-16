import React, { useState } from 'react'
import { getAuth, sendPasswordResetEmail, updatePassword } from "firebase/auth";

const PasswordChange = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    let isGoogleUser = false;

    if (user) {
        const providerData = user.providerData;
        providerData.forEach((provider) => {
            if (provider.providerId === 'google.com') {
                isGoogleUser = true;
            }
        });
    }

    const handleSubmit = async () => {

        if (user) {
            try {
                await sendPasswordResetEmail(auth, user.email??'');
                alert('Email enviado para cambiar contraseña');
            } catch (error) {
                alert('Error al enviar email para cambiar contraseña');
            }
        } else if (isGoogleUser) {
            alert('No se puede cambiar la contraseña para usuarios de Google');
        } else {
            alert("No hay usuario logueado");
        }
    }

    return (
        <div>
            <button onClick={handleSubmit}>Enviar email para cambiar la contraseña</button>
        </div>
    )
}

export default PasswordChange