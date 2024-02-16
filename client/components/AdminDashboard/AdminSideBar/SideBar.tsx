'use client'

import Link from "next/link"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faWindowRestore, faHandHoldingDollar, faPeopleLine, faComment, faUserGear } from '@fortawesome/free-solid-svg-icons'
import style from "./sideBar.module.css"
import { usePathname } from "next/navigation"


const  AdminDashboard = () => {
    const path = usePathname()
    if (!path.includes('/pages/admin')) return null


    return (
        <div className={style.container}>
            <div className={style.Buttons}>
                <Link href="/pages/admin">
                    <div className={style.iconAndText}>
                        <div className={style.inPage}>{path === '/pages/admin' && '|'}</div>
                        <div className={style.iconsContainer}>
                            <FontAwesomeIcon icon={faUser} className={style.icon} />
                        </div>
                        <div className={style.textSideBar}>
                            Mi Perfil
                        </div>
                    </div>
                </Link>
                <Link href="/pages/admin/colaboradores">
                    <div className={style.iconAndText}>
                        <div className={style.inPage}>{path === '/pages/admin/colaboradores' && '|'}</div>
                        <div className={style.iconsContainer}>
                            <FontAwesomeIcon icon={faWindowRestore} className={style.icon} />
                        </div>
                        <div className={style.textSideBar}>
                            Usuarios
                        </div>
                    </div>
                </Link>
                <Link href="/pages/admin/donaciones">
                    <div className={style.iconAndText}>
                        <div className={style.inPage}>{path === '/pages/admin/donaciones' && '|'}</div>
                        <div className={style.iconsContainer}>
                            <FontAwesomeIcon icon={faHandHoldingDollar} className={style.icon} />
                        </div>
                        <div className={style.textSideBar}>
                            Donaciones
                        </div>
                    </div>
                </Link>
                <Link href="/pages/admin/projects">
                    <div className={style.iconAndText}>
                        <div className={style.inPage}>{path === '/pages/admin/projects' && '|'}</div>
                        <div className={style.iconsContainer}>
                            <FontAwesomeIcon icon={faPeopleLine} className={style.icon} />
                        </div>
                        <div className={style.textSideBar}>
                            Proyectos
                        </div>
                    </div>
                </Link>
                <Link href="/pages/admin/services">
                    <div className={style.iconAndText}>
                        <div className={style.inPage}>{path === '/pages/admin/services' && '|'}</div>
                        <div className={style.iconsContainer}>
                            <FontAwesomeIcon icon={faPeopleLine} className={style.icon} />
                        </div>
                        <div className={style.textSideBar}>
                            Servicios
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default AdminDashboard