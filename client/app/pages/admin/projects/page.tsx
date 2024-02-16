import AllCardsProjects from "@/components/AdminDashboard/AllCardsProjects/AllCardsProjects"
import axios from "axios"





const DashBoardProjects = async () => {

    // const URL_BASE = 'https://juntxs.vercel.app/'
    // const response = (await axios.get(`${URL_BASE}programs/pagination`)).data
    const urlGlobal = 'https://juntxs.vercel.app/'
    const proyectsFetch: any = (await axios.get(`${urlGlobal}programs/pagination`)).data

    return (
        <>
            <AllCardsProjects
                projects={proyectsFetch}
            />
        </>
    )

}

export default DashBoardProjects