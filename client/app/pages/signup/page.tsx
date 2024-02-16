'use client';

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import signUp from "@/app/firebase/auth/signup";
import signUpWithGoogle from "@/app/firebase/auth/signInWithGoogle";
import axios from "axios";
import { ValidateForm } from "@/app/firebase/validation";
import style from './signup.module.css'
import googleLogo from '../../../public/googleLogo.png'
import { useAuthContext } from "@/app/contexto/AuthContext";

const SignUpPage = () => {
    const [infoUser, setInfoUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const urlGlobal = 'https://juntxs.vercel.app/'
    const { persistirSesion } = useAuthContext()
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setInfoUser(prevState => ({
            ...prevState,
            [name]: value
        }));

        let error = '';

        switch (name) {
            case 'name':
                error = !value ? 'El nombre es obligatorio' : '';
                break;
            case 'email':
                if (!value) {
                    error = 'El correo electrónico es obligatorio';
                } else if (!/\S+@\S+\.\S+/.test(value)) {
                    error = 'El correo electrónico no es válido';
                }
                break;
            case 'password':
                if (!value) {
                    error = 'La contraseña es obligatoria';
                } else if (value.length < 7 || !/[A-Za-z]/.test(value) || !/\d/.test(value)) {
                    error = 'La contraseña debe tener al menos 7 caracteres, un numero y una letra';
                }
                break;
            case 'confirmPassword':
                if (!value) {
                    error = 'La confirmación de la contraseña es obligatoria';
                } else if (value !== infoUser.password) {
                    error = 'Las contraseñas no coinciden';
                }
                break;
        }

        setErrors(prevState => ({
            ...prevState,
            [name]: error
        }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            if (!infoUser.name) {
                alert('Debes escribir un nombre')
            }
            if (!infoUser.email) {
                alert('Debes escribir un email')
            }
            if (!infoUser.password) {
                alert('Debes escribir una contraseña ')
            }
            console.log('hola');
            const { result, error } = await signUp(infoUser.email, infoUser.password)
            if (error) {
                setErrorMessage('Error al registrarse');
                return console.log(error);
            }
            else {
                const token = await result?.user.getIdToken();
                if (token) {
                    console.log(token);
                    const userInfoCreate = (await axios.post(`${urlGlobal}auth`, { token, name: infoUser.name })).data
                    if (userInfoCreate.status) {
                        console.log(userInfoCreate);
                        // alert('Todo bien')
                        persistirSesion(userInfoCreate.createUserFinal)
                        return router.push('/')
                    }
                    return console.log(
                        'error al logearse'
                    );
                }
            }
        } catch (error) {
            alert(error)
        }
    };

    const handleGoogleSignUp = async (event: any) => {
        event.preventDefault()
        try {
            console.log('hola');
            const { result, error } = await signUpWithGoogle()
            if (error) {
                setErrorMessage('Error al registrarse con Google');
                return console.log(error);
            }
            else {

                const token = await result?.user.getIdToken();
                if (token) {
                    const name = result?.user.displayName
                    const userInfoCreate = (await axios.post(`${urlGlobal}auth`, { token, name })).data
                    if (userInfoCreate.status) {
                        alert('Todo bien')
                        persistirSesion(userInfoCreate.createUserFinal)
                        return router.push('/')
                    }
                    return console.log(
                        'error amigo'
                    );

                }

            }
        } catch (error: any) {
            alert('ya estás registrado con este correo')
        }
    }
    return (
        <div className={style.backgroundSignin}>
            <div className={style.cardContainer}>
                <div className={style.formAndImage}>
                    <div className={style.textInfo}>
                        <div className={style.registerAndInit}>
                            <h1 className={style.titleCard}>Registrarse</h1>
                            <p> ¿Ya tienes una cuenta? <Link href="/pages/signin" className={style.register}> Inicia sesión </Link></p>
                        </div>
                        <form onSubmit={handleSubmit} className={style.formDesign}>
                            <div className={style.labelAndInput}>
                                <label >
                                    Nombre Completo
                                </label>
                                <input className={style.input} type="text" name="name" value={infoUser.name} placeholder="Escribe un nombre" onChange={handleChange} />
                                {errors.name && <p>{errors.name}</p>}
                            </div>
                            <div className={style.labelAndInput}>
                                <label>
                                    Correo Electronico
                                </label>
                                <input className={style.input} type="text" name="email" value={infoUser.email} placeholder="ejemplo@dominio.com" onChange={handleChange} />
                                {errors.email && <p>{errors.email}</p>}
                            </div>
                            <div className={style.labelAndInput}>
                                <label>
                                    Contraseña
                                </label>
                                <input className={style.input} type="password" name="password" value={infoUser.password} placeholder="Contraseña segura" onChange={handleChange} />
                                {errors.password && <p>{errors.password}</p>}
                            </div>
                            <div className={style.labelAndInput}>
                                <label>
                                    Confirmar Contraseña
                                </label>
                                <input className={style.input} type="password" name="confirmPassword" value={infoUser.confirmPassword} placeholder="Confirma tu contraseña" onChange={handleChange} />
                                {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                            </div>

                            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                            <div className={style.buttons}>
                                <button
                                    disabled={Object.values(errors).some(error => error !== '') || !infoUser.name || !infoUser.email || !infoUser.password || !infoUser.confirmPassword}
                                    type="submit" className={style.buttonFull}>Registrarse</button>
                                <button className={style.buttonGoogle}
                                    onClick={handleGoogleSignUp}>
                                    <img src={googleLogo.src} style={{ width: '3rem' }} alt="google" /> Registrarse Con Google </button>
                            </div>
                        </form>
                    </div>
                    <div className={style.illu}></div>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage;