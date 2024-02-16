import axios from 'axios'
import ListUsers from '@/components/ListaUsuariosAdmin/ListaUsuarios'
import style from './createUser.module.css'
import UsersPage from '@/components/AdminDashboard/userPage/userPage'


const Users = async () => {

    const URL_BASE = "https://juntxs.vercel.app/"
    const users = (await axios.get(`${URL_BASE}users`)).data

    return (
        <>
            <div className={style.gridColumns}>
                <UsersPage
                    users={users}
                />
            </div>
        </>
    )
}

export default Users;