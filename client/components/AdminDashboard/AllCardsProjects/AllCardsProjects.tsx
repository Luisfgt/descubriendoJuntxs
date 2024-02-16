'use client'
import { useState } from "react"
import CreateProject from "@/components/AdminDashboard/CreateProject/CreateProject"
import style from './AllProjects.module.css'
import AllCards from "@/components/allCardsComponent/allCards"



export interface ProyectTypes {
    projects: {
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
    }[]
}

const AllCardsProjects: React.FC<ProyectTypes> = ({ projects }) => {

    // const URL_BASE = 'https://juntxs.vercel.app/'
    // const response = (await axios.get(`${URL_BASE}programs/pagination`)).data
    const [modal, setModal] = useState(false)

    return (
        <>
            <CreateProject
                modal={modal}
                closeModal={() => setModal(false)}
            />
            <div className={style.container}>
                <h1>Proyectos</h1>
                <div>
                    <AllCards
                        projects={projects}
                    />
                </div>
                <button className={style.buttonFull} onClick={() => setModal(true)}>Crear Proyecto +</button>
             
            </div>
        </>
    )

}

export default AllCardsProjects