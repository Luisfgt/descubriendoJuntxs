'use client'
import { use, useEffect, useState } from 'react';
import style from './profilePage.module.css'
import PasswordChange from '@/components/CambiarContraseña/ChangePassword';
import { useAuthContext } from '@/app/contexto/AuthContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';


const ProfilePage = (): React.ReactNode => {
    const [vistaDeComponente, setVistaDeComponente] = useState('')
    const vistaComponente = (name: string) => {
        if (name === 'datos') return setVistaDeComponente('datos')
        if (name === 'seguridad') return setVistaDeComponente('seguridad')
        if (name === 'condiciones') return setVistaDeComponente('condiciones')
    }
    const { infoUserGlobal } = useAuthContext()
    const infoUserGlobalParse = infoUserGlobal && JSON.parse(infoUserGlobal)
    const userId = infoUserGlobalParse.id

    const [isEditing, setIsEditing] = useState(false);
    const [userInfo, setUserInfo] = useState({
        // name: "",
        // surName: "",
        identification: "",
        phone: "",
        email: "",
        linkedin: "",
        languaje: ""
    })

    const router = useRouter()
    if (infoUserGlobalParse?.role === 'Admin')  router.push('/pages/admin')

    console.log('me gusta comer' + infoUserGlobalParse);
    console.log(infoUserGlobalParse);

    const handleEditClick = () => {
        setIsEditing(true);
    };

  

    const handleDoneClick = async (e: any) => {
        setIsEditing(false);
        try {
            const URL_BASE = "https://juntxs.vercel.app/users/";
            await axios.put(`${URL_BASE}${userId}`, {
                // name: userInfo.name,
                // surName: userInfo.surName,
                identification: userInfo.identification,
                phone: userInfo.phone,
                email: userInfo.email,
                linkedin: userInfo.linkedin,
                languaje: userInfo.languaje,
            });
        } catch (error) {
            console.error('Failed to update user information:', error);
        }

    }

    const estiloTransition = () => {
        const datos = {
            width: '55vw',
            height: 'fit-content',
            gridTemplateRows: '0.1fr 0.7fr 0.7fr 1fr 1fr'
        }
        const seguridad = {
            width: '55vw',
            height: '70vh',
            gridTemplateRows: '0.5fr 0.8fr 0.8fr 1fr 1fr'
        }
        const condiciones = {
            width: '55vw',
            height: '70vh',
            gridTemplateRows: '0.1fr 0.5fr 0.5fr 1fr 1fr'
        }
        const normal = {
            width: '55vw'
        }
        if (vistaDeComponente === 'datos') return datos
        if (vistaDeComponente === 'seguridad') return seguridad
        if (vistaDeComponente === 'condiciones') return condiciones
        return normal
    }
    const estilo = estiloTransition()
    const userName = infoUserGlobalParse?.name
    const userNameLast = !infoUserGlobalParse.surName ? '' : infoUserGlobalParse.surName
    console.log();

    return (
        <>
            <div className={style.userProfile} style={estilo}>
                {
                    vistaDeComponente === '' &&
                    <>
                        <div className={style.portadaImage}></div>
                        <div className={style.bodyInfo}>
                            <div className={style.nombreYData}>
                                <div className={style.nombreCompleto}>{userName + ' ' + userNameLast}</div>
                                <div className={style.optionsContainerOfAll}>
                                    <div className={style.contanerOptions}>
                                        <div className={style.menuDescriptionTitle}>
                                            <div className={style.titleMenu}>Mis datos</div>
                                            <div className={style.descriptionMenu}>Maneja tu información</div>
                                        </div>
                                        <button onClick={() => vistaComponente('datos')} name='datos' className={style.buttonIn}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="white "><path d="M0 0h24v24H0V0z" fill="none" /><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z" /></svg>
                                        </button>
                                    </div>
                                    <div className={style.contanerOptions}>
                                        <div className={style.menuDescriptionTitle}>
                                            <div className={style.titleMenu}>Seguridad</div>
                                            <div className={style.descriptionMenu}>Autentificaciones de seguridad</div>
                                        </div>
                                        <button onClick={() => vistaComponente('seguridad')} name='seguridad' className={style.buttonIn}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="white "><path d="M0 0h24v24H0V0z" fill="none" /><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z" /></svg>
                                        </button>
                                    </div>
                                    <div className={style.contanerOptions}>
                                        <div className={style.menuDescriptionTitle}>
                                            <div className={style.titleMenu}>Términos y condiciones</div>
                                            <div className={style.descriptionMenu}>Acceso a los acuerdos</div>
                                        </div>
                                        <button
                                            onClick={() => vistaComponente('condiciones')}
                                            name='condiciones'
                                            className={style.buttonIn}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="white "><path d="M0 0h24v24H0V0z" fill="none" /><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z" /></svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={style.profilePhoto}>
                            <div className={style.profilePhotoCircle}> LG </div>
                        </div>
                    </>
                }
                {
                    vistaDeComponente === 'datos' &&
                    <>
                        <div className={style.portadaImage}></div>
                        <div className={style.bodyInfo} style={{ gap: '1.5rem', paddingBottom: '3rem' }}>
                            <div className={style.titleAndButton}>
                                <div className={style.nombreCompleto}> Mis datos </div>
                                <button className={style.buttonBack} onClick={() => setVistaDeComponente('')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#7286FF" style={{ transform: "scaleX(-1)" }}>
                                        <path d="M0 0h24v24H0V0z" fill="none" />
                                        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z" />
                                    </svg>
                                    Volver
                                </button>
                            </div>
                            <div className={style.infoPeople}>
                                <div className={style.nombre}>
                                    <div className={style.titleMenu}>Nombre
                                        <div className={style.descriptionMenu}>{userName}</div>
                                    </div>
                                </div>
                                <div className={style.apellido}>

                                    <div className={style.titleMenu}>Apellido
                                        <div className={style.descriptionMenu}>{userNameLast}</div>
                                    </div>
                                </div>
                                <div className={style.identificacion}>
                                    <div className={style.titleMenu}>
                                        Identificación
                                        <div className={style.descriptionMenu}>{infoUserGlobalParse.identificacion ? infoUserGlobalParse.identificacion : 'Insert id'}</div>
                                    </div>
                                </div>
                                <div className={style.fechaNaci}>

                                    <div className={style.titleMenu}>
                                        Fecha de Nacimiento
                                        <div className={style.descriptionMenu}>{infoUserGlobalParse.dateIn ? infoUserGlobalParse.dateIn : 'Insert date'}</div>
                                    </div>
                                </div>
                                <div className={style.idiomas}>

                                    <div className={style.titleMenu}>
                                        Idiomas
                                        <div className={style.descriptionMenu}>{infoUserGlobalParse.languaje ? infoUserGlobalParse.languaje : 'Insert languages'}</div>
                                    </div>
                                </div>
                                <div className={style.telefono}>

                                    <div className={style.titleMenu}>
                                        Teléfono
                                        <div className={style.descriptionMenu}>{infoUserGlobalParse.phone ? infoUserGlobalParse.phone : 'Insert phone'}</div>
                                    </div>
                                </div>
                                <div className={style.email}>

                                    <div className={style.titleMenu}>
                                        Email
                                        <div className={style.descriptionMenu}>{infoUserGlobalParse.email ? infoUserGlobalParse.email : 'Insert mail'}</div>
                                    </div>
                                </div>
                                <div className={style.linkedin}>

                                    <div className={style.titleMenu}>
                                        Linkedin
                                        <div className={style.descriptionMenu}>{infoUserGlobalParse.linkedin ? infoUserGlobalParse.linkedin : 'insert linkedin'}</div>
                                    </div>
                                </div>
                            </div>
                            {/* <div>
                                <button>Editar Información</button>
                            </div> */}
                        </div>

                        <div className={style.profilePhoto}>
                            <div className={style.profilePhotoCircle}> LG </div>
                            <button className={style.addAPhoto}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="white"><path d="M0 0h24v24H0z" fill="none" /><path d="M21 6h-3.17L16 4h-6v2h5.12l1.83 2H21v12H5v-9H3v9c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM8 14c0 2.76 2.24 5 5 5s5-2.24 5-5-2.24-5-5-5-5 2.24-5 5zm5-3c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3zM5 6h3V4H5V1H3v3H0v2h3v3h2z" /></svg>
                            </button>
                        </div>
                    </>
                }
                {
                    vistaDeComponente === 'seguridad' &&
                    <>
                        <div className={style.portadaImage}></div>
                        <div className={style.bodyInfo} style={{ gap: '1.5rem', paddingBottom: '3rem' }}>
                            <div className={style.titleAndButton}>
                                <div className={style.nombreCompleto}> Seguridad </div>
                                <button className={style.buttonBack} onClick={() => setVistaDeComponente('')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#7286FF" style={{ transform: "scaleX(-1)" }}>
                                        <path d="M0 0h24v24H0V0z" fill="none" />
                                        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z" />
                                    </svg>
                                    Volver
                                </button>
                            </div>
                            <div className={style.infoPeople} style={{ position: 'relative', transform: 'translateY(-1rem)' }}>
                                <div className={style.nombre}>
                                    <div className={style.titleMenu}>Contraseña
                                        <div>
                                            <PasswordChange />
                                        </div>
                                        <div className={style.descriptionMenu}>info</div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className={style.profilePhoto}>
                            <div className={style.profilePhotoCircle}> LG </div>
                        </div>
                    </>
                }
                {
                    vistaDeComponente === 'condiciones' &&
                    <>
                        <div className={style.portadaImage}></div>

                        <div className={style.bodyInfo} style={{ gap: '1.5rem', paddingBottom: '3rem' }}>
                            <div className={style.titleAndButton}>
                                <div className={style.nombreCompleto}> Terminos y condiciones </div>
                                <button className={style.buttonBack} onClick={() => setVistaDeComponente('')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#7286FF" style={{ transform: "scaleX(-1)" }}>
                                        <path d="M0 0h24v24H0V0z" fill="none" />
                                        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z" />
                                    </svg>
                                    Volver
                                </button>
                            </div>
                            <div className={style.infoPeople}>
                                <div className={style.descriptionCondiciones}>1. Aceptación de los Términos
                                    Al acceder y utilizar este sitio web, aplicación móvil o cualquier otro servicio proporcionado por [Nombre de la Empresa], acepta los siguientes términos y condiciones. Si no está de acuerdo con alguno de estos términos, le recomendamos que no utilice nuestros servicios.

                                    2. Uso del Servicio
                                    El usuario se compromete a utilizar el servicio de manera adecuada y de acuerdo con todas las leyes y regulaciones aplicables. Queda prohibido el uso del servicio con fines ilegales o que violen los derechos de terceros.

                                    3. Privacidad
                                    La información personal proporcionada por el usuario estará sujeta a nuestra política de privacidad, que puede consultarse en [enlace a la política de privacidad].

                                    4. Propiedad Intelectual
                                    Todo el contenido proporcionado en este servicio, incluyendo pero no limitado a textos, gráficos, logotipos, imágenes y software, está protegido por derechos de autor y otras leyes de propiedad intelectual. El usuario no tiene el derecho de copiar, modificar, distribuir o reproducir dicho contenido sin el consentimiento previo por escrito de [Nombre de la Empresa].
                                    5. Responsabilidad
                                    La empresa no será responsable de cualquier pérdida, daño o perjuicio derivado del uso o la imposibilidad de uso de nuestros servicios. El usuario utiliza el servicio bajo su propio riesgo.
                                    6. Modificaciones
                                    Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Las modificaciones entrarán en vigencia tan pronto como se publiquen en el servicio. Se recomienda a los usuarios revisar periódicamente los términos y condiciones para estar informados de cualquier cambio.
                                    7. Terminación del Servicio
                                    Nos reservamos el derecho de suspender o terminar el servicio en cualquier momento y por cualquier motivo, sin previo aviso.
                                    8. Ley Aplicable
                                    Estos términos y condiciones se regirán e interpretarán de acuerdo con las leyes del [país], y cualquier disputa estará sujeta a la jurisdicción exclusiva de los tribunales de [ciudad].</div>
                            </div>
                        </div>
                        <div className={style.profilePhoto}>
                            <div className={style.profilePhotoCircle}> LG </div>
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default ProfilePage