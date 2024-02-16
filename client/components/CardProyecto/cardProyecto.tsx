'use client'
import  {  useState } from "react"
import style from './card.module.css'
import ModalProject from "../modal/Modal"
import { useSocketContext } from "@/app/contexto/SocketContext";
import { useAuthContext } from "@/app/contexto/AuthContext"
import axios from 'axios'
import { useRouter } from "next/navigation";

export interface Proyect {
    project: {
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
        commentary: [],
        favorite: {
            userId: number,
            programId: number  
        }
    }
}


const CardProyect: React.FC<Proyect> = ({ project }) => {

    const { name, description, image, objective, favorite} = project
    const { socket } = useSocketContext()

    const [modal, setModal] = useState(false)
    const {infoUserGlobal}: any = useAuthContext()
    const parseinfo = JSON.parse(infoUserGlobal)
    
    
    const [favorited, setFavorited] = useState(false)
   

    const favoriteHandler = async () => {
        try {
            if (!favorite) {
                
                
                const programId = project.id;
                const  userId = parseinfo.id;
                
                // Realiza la solicitud al servidor para añadir a favoritos
                const { data } = await axios.post('https://juntxs.vercel.app/favorites', {
                    userId: userId,
                    programId: programId
                });
                console.log("Proyecto añadido a favoritos:", data);
                setFavorited(true);
                }

        } catch (error) {
            console.error("Error al añadir a favoritos:", error);
        }
    };
    const router = useRouter() 

    return (
        <>
            {modal && <div className={style.ModalView}>
                <ModalProject
                    openModal={modal}
                    closeModal={() => setModal(false)}
                    project={project}
                    socket={socket}
                />
            </div>}
            <div className={style.cardContainer}>
                <div className={style.infoContainer}>
                    <h2 className={style.meta}>{objective}</h2>
                    <div className={style.titleAndDescription}>
                        <h1 className={style.title}>{name}</h1>
                        <div className={style.containerDesc}>
                            <p className={style.description}>{description}</p>
                        </div>
                    </div>
                    <div className={style.buttonContainer}>
                        <button onClick={() =>
                            setModal(true)
                        } className={style.buttonText}>
                            Ver Proyecto
                        </button>
                        <button onClick={() => {
                            router.push('/donaciones')
                        }} className={style.buttonFull}>
                            Donar Proyecto
                        </button>
                        <button onClick={favoriteHandler}>
                            {favorited ? '🤍' : '❤'}
                        </button>
                    </div>
                </div>
                <div className={style.imageContainer}>
                    <img className={style.image} src={image} alt="no se pudo" />
                </div>
            </div>
        </>
    )
}
export default CardProyect

