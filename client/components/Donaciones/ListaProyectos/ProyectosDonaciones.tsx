import axios from "axios";



const ProjectsOption = async () => {
    const urlGlobal = 'https://juntxs.vercel.app/'
    const proyectsFetch: any = (await axios.get(`${urlGlobal}programs/pagination`))
    return proyectsFetch.data
}


export default ProjectsOption;