'use client'
import ProyectDetail from '@/components/ProyectDetail/ProyectDetail'
import style from './donations.module.css'
import { useEffect, useState } from 'react'
import { useAuthContext } from '@/app/contexto/AuthContext'
import { Project } from 'next/dist/build/swc'
import DonationsUser from '../ModalDonations/ModalDonations'
import axios from 'axios'



interface donation {
    amount: number;
    date: string;
    type: string;
    program: program;
}

interface program {
    description: string;
    name: string;
    image: string;
}

interface ProjectReady {
    user: {
        name: string;
        description: string;
        image: string;
        amount: number;
        date: string;
        donation: donation[]
    }
    closeModal: () => void;
    openModal: boolean
}



const DonationsUserComponent = () => {


    const { infoUserGlobal } = useAuthContext()
    const infoUserParsed = JSON.parse(infoUserGlobal ?? '')
    const userId = infoUserParsed.id

    const [modal, setModal] = useState(false)
    const [donations, setDonations] = useState<ProjectReady['user'] | null>(null)

    const donationsByUser = async (userId: number) => {


        const URL_BASE = 'https://juntxs.vercel.app/users/donations/'
        const info = await axios.get(`${URL_BASE}${userId}`)
        console.log('Donations by user:', info.data);

        return info.data
    }

    useEffect(() => {
        const fetchDonations = async () => {
            const data = await donationsByUser(userId)
            setDonations(data)
        }

        fetchDonations()
    }, [])

    // const proyecto = {
    //     nombre: 'Mujeres',
    //     tipoDonacion: '1092012746',
    //     monto: '$82',
    //     frecuencia: 'Mensual',
    //     fechaInicial: '27/12/24',
    //     proximaDonacion: '28/12/24'
    // }

    // const handleSubmit = (e) => {
    //     e.
    //         DonationsByUser()
    // }

    return (
        <div className={style.gridContainer}>
            {/* <ProyectDetail
                project={proyecto}
                closeModal={() => setModal(false)}
                openModal={modal}
            /> */}
            {/* <DonationsByUser
                closeModal={() => setModal(false)}
                openModal={modal}
            /> */}
            <div className={style.containerDonations}>
                <div className={style.titlePage}> Donaciones </div>
                {/* <input className={style.select} placeholder='Buscar Proyecto' />
                <input className={style.select} placeholder='Tipo de donación' /> */}
                <div className={style.allDonations}>
                    <div className={style.projectAndProjectType}>
                        <div>Proyecto</div>
                        <div>Tipo de proyecto</div>
                    </div>
                    <div className={style.cardsDonation}>
                        {donations?.donation.map((donation: donation, index) => {
                            return (
                                <div className={style.cardDonation} key={index}>
                                    <div className={style.imageAndTitle}>
                                        <div className={style.imageProject}></div>
                                        <div className={style.titleAndButton}>
                                            <div className={style.titleProyect}> {donation.program.name} </div>
                                            <DonationsUser
                                                donation={donation}
                                            />
                                        </div>
                                    </div>
                                    <div className={style.tipoDeProyecto}> {donation.type} </div>
                                </div>)
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DonationsUserComponent