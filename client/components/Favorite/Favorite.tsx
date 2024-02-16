import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useAuthContext } from "@/app/contexto/AuthContext";
import ModalProject from "../modal/Modal";
import style from '../Favorite/favorite.module.css'
import { Socket } from "socket.io-client";
import { useSocketContext } from "@/app/contexto/SocketContext";

interface User {
    id: number,
    email: string,
    name: string,
    surName: string,
    identification: string,
    phone: string,
    dateIn: string,
    dateOut: string,
    description: string,
    linkedin: string,
    languaje: string,
    position: string,
    state: number,
    role: string,
    favorite: Favorite[]
}

type Comment = {
    userId: number,
    programId: number,
    commentary: string
}

interface Program {
    id: number,
    name: string,
    description: string,
    dateIn: string,
    dateOut: string,
    urlYoutube: string,
    objective: string,
    syllabus: string,
    state: string,
    categoryId: number,
    type: string,
    image: string,
    commentary: Comment[]
}

interface Favorite {
    programId: number
    userId: number
    program: Program;
}

const UserFavorite: React.FC = () => {

    const [favoriteProjects, setFavoriteProjects] = useState<User['favorite'] | null>(null);
    const [modal, setModal] = useState(false);
    const { socket } = useSocketContext()
    const { infoUserGlobal }: any = useAuthContext();
    const parseinfo = JSON.parse(infoUserGlobal);

    useEffect(() => {
        const fetchFavoriteProjects = async () => {
            try {
                const userId = parseinfo.id;
                const response = (await axios.get<User>(`https://juntxs.vercel.app/users/favorites/${userId}`)).data
                setFavoriteProjects(response.favorite);
            } catch (error) {
                console.error("Error al obtener los proyectos favoritos del usuario:", error);
            }
        };
        fetchFavoriteProjects();
    }, [parseinfo.id]);

    const handlerDeleteFavorite = async (programId: number) => {
        try {
            const userId = parseinfo.id
            await axios.delete(`https://juntxs.vercel.app/favorites/${programId}/${userId}`)
            setFavoriteProjects(favoriteProjects && favoriteProjects?.length > 0 ? favoriteProjects.filter((item: any) => item.programId !== programId) : null);
            console.log('aqui', userId);
        } catch (error) {
            console.log('Error eliminando el proyecto a favorito', error);
        }
    }

    return (
        <div>
            {favoriteProjects && favoriteProjects?.length > 0 && favoriteProjects.map((user, index) => (
                <div  key={index}>
                    <div className={style.cardContainer} key={user.program.id}>
                        <div className={style.infoContainer}>
                            <h2 className={style.meta}>{user.program.objective}</h2>
                            <div className={style.titleAndDescription}>
                                <h1 className={style.title}>{user.program.name}</h1>
                                <div className={style.containerDesc}>
                                    <p className={style.description}>{user.program.description}</p>
                                </div>
                            </div>
                            <div className={style.buttonContainer}>
                                <button onClick={() => setModal(true)}
                                    className={style.buttonText}>Ver Proyecto</button>
                            </div>
                            <button onClick={() => handlerDeleteFavorite(user.program.id)}>X</button>
                        </div>
                        <div className={style.imageContainer}>
                            <img className={style.image} src={user.program.image} alt="no se pudo" />
                        </div>
                    </div>
                    {modal && (
                        <div className={style.ModalView}>
                            <ModalProject
                                openModal={modal}
                                closeModal={() => setModal(false)}
                                project={user.program}
                                socket={socket}
                            />
                        </div>
                    )}
                </div>

            ))}
        </div>
    );
};

export default UserFavorite;