'use client'
import { useState } from 'react'
import style from './listaUsers.module.css'
import CreateUser from '@/components/AdminDashboard/CreateUser/CreateUser'
interface useInfoType {
    users: {
        id: number,
        name: string,
        surname: string,
        identification: string,
        phone: string,
        dateIn: string,
        dateOut: string,
        description: string,
        languaje: string,
        email: string,
        linkedin: string,
        position: string,
        state: string,
        role: string,
    }[]
}
const ListUsers: React.FC<useInfoType> = ({ users }) => {
    const [modal, setModal] = useState(false)
    return (
        <>
            <CreateUser
                modal={modal}
                closeModal={() => setModal(false)}
            />
            <div className={style.container}>
                <div className={style.cardContainer}>
                    <div className={style.usersList}>
                        <h1>Lista de Usuarios</h1>
                        <div className={style.containerUsers}>
                            {users.map((user) => {
                                return (
                                    <>
                                        <div className={style.cardUser}>
                                            <div>
                                                {user.name}
                                            </div>
                                            <div className={style.role}>
                                                {user.role}
                                            </div>
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                    </div>
                    <div className='w-full'>
                        <button className={style.buttonFull} onClick={() => setModal(true)}>Crear Usuario +</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListUsers;