'use client'
import Link from "next/link";
import { FormEvent, FormEventHandler, useState } from "react";
import style from './signin.module.css'
import googleLogo from '../../../public/googleLogo.png'
import { useRouter } from 'next/navigation'
import signIn from "@/app/firebase/auth/signIn";
import signInWithGoogle from "@/app/firebase/auth/signInWithGoogle";
import ResetPassword from "@/components/ResetPassword/ResetPassword";
import { userInfo } from 'os';
import axios from "axios";
import { useAuthContext } from "@/app/contexto/AuthContext";
import deleteUserCurrent from "@/app/firebase/auth/deleteUser";
import { logout } from "@/app/firebase/auth/signOut";


const SignInPage = () => {
    const [infoUser, setInfoUser] = useState({
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: ''
    });
    const { persistirSesion } = useAuthContext()

    const urlGlobal = 'https://juntxs.vercel.app/'
    const [errorMessage, setErrorMessage] = useState('');

    const router = useRouter()

    const [heOlvidado, setHeOlvidado] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInfoUser({
            ...infoUser,
            [e.target.name]: e.target.value
        })
        let error = '';

        switch (name) {
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
        }
        setErrors(prevState => ({
            ...prevState,
            [name]: error
        }));
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            console.log('hola');

            const { result, error } = await signIn(infoUser.email, infoUser.password)

            if (error) {
                setErrorMessage('Usuario o contraseña incorrectos');
                return console.log(error);
            }

            const token = await result?.user.getIdToken();
            if (token) {
                const userInfoCreate = (await axios.post(`${urlGlobal}users/authToken`, { token })).data
                if (userInfoCreate.status) {
                    console.log(userInfoCreate);
                    persistirSesion(userInfoCreate.user)
                    return router.push('/')
                }

            }
            return console.log(
                'error amigo'
            );
        } catch (error) {
            alert(error)
        }
    };
    const handleGoogleSignIn = async (event: any) => {
        // Handle Google sign in here with firebase
        event.preventDefault()
        try {
            console.log('hola');
            const { result, error } = await signInWithGoogle()
            if (error) {
                setErrorMessage('Error iniciando sesión con Google');
                return console.log(error);
            }

            const token = await result?.user.getIdToken();
            if (token) {
                const userInfoCreate = (await axios.post(`${urlGlobal}users/authToken, { token }`)).data

                if (userInfoCreate.status) {
                    console.log(userInfoCreate);
                    persistirSesion(userInfoCreate.user)
                    return router.push('/')
                }
                else {
                    logout()
                    deleteUserCurrent()
                    alert('El usuario no se ha registrado')
                }
            }
            return console.log(
                'error amigo'
            );
        } catch (error) {
            alert(error)
        }
    }


    return (
        <div className={style.backgroundSignin}>
            <div className={style.cardContainer}>
                <div className={style.formAndImage}>
                    <div className={style.illu}>
                    </div>
                    <div className={heOlvidado ? style.textInfoHeOlvidado : style.textInfo}>
                        <div className={style.registerAndInit}>
                            <h1 className={style.titleCard}>{heOlvidado ? 'Recuperar Contraseña' : 'Inicio de Sesión'}</h1>
                            <p> ¿No tienes cuenta aún? <Link href="/pages/signup" className={style.register}> Registrarme </Link></p>
                            <p onClick={() => setHeOlvidado(true)} className={style.heOlvidado}> {!heOlvidado && 'He olvidado mi contraseña'}</p>
                            {heOlvidado &&
                                <ResetPassword
                                    closeHeOlvidado={() => setHeOlvidado(false)}
                                />
                            }
                        </div>

                        {!heOlvidado &&
                            <form onSubmit={handleSubmit} className={style.formDesign}>
                                <div className={style.labelAndInput}>
                                    <label>
                                        Correo Electronico
                                    </label>
                                    <input className={style.input} type="text" value={infoUser.email} name='email' placeholder="ejemplo@dominio.com" onChange={handleChange} />
                                    {errors.email && <p>{errors.email}</p>}
                                </div>
                                <div className={style.labelAndInput}>
                                    <label>
                                        Contraseña
                                    </label>
                                    <input className={style.input} type="password" value={infoUser.password} name='password' placeholder="Contraseña segura" onChange={handleChange} />
                                    {errors.password && <p>{errors.password}</p>}
                                </div>
                                <div className={style.buttons}>
                                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                                    <button className={style.buttonFull} type="submit"
                                        disabled={Object.values(errors).some(error => error !== '') || !infoUser.email || !infoUser.password}
                                    > Iniciar Sesión
                                    </button>

                                    <button className={style.buttonGoogle} onClick={handleGoogleSignIn}>
                                        <img src={googleLogo.src} style={{ width: '3rem' }} alt="google" /> Iniciar Sesión Con Google</button>
                                </div>
                            </form>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignInPage;