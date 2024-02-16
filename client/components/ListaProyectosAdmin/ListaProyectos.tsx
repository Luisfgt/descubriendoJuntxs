import axios from "axios";
import AllCards from "../allCardsComponent/allCards";
import style from './ListaProyectos.module.css'

export interface ProyectTypes {
    nombre: string,
    descripcion: string,
    amount: number,
    objetiuve: string,
    syllabus: string,
    state: string,
    categoryId: number,
    type: string,
    donation: [],
    commentary: [],
    favorite: []
}

const ListaProyectos = async () => {
    const urlGlobal = 'https://juntxs.vercel.app/'
    const proyectsFetch: any = (await axios.get(`${urlGlobal}programs/pagination`)).data
    return (
        <>
            <div className={style.backgroundProyecto}>
                <AllCards
                    projects={proyectsFetch}
                />
            </div>
        </>
    )
}
export default ListaProyectos;