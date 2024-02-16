'use client'
import { useState } from 'react'
import ListUsers from '@/components/ListaUsuariosAdmin/ListaUsuarios'
import style from './createUser.module.css'

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
const UsersPage: React.FC<useInfoType> = ({ users }) => {

    return (
        <>
            <ListUsers
                users={users}
            />
        </>
    )
}

export default UsersPage;