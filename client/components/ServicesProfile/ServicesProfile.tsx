'use client'
import { useAuthContext } from '@/app/contexto/AuthContext'
import style from './Services.module.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import ServicesUser from '../UserProfile/ModalServices/ModalServices'


// interface ServiceUser {
//     name: string;
//     description: string;
//     dateIn: string;
//     hourIn: string;
//     amount: number;
//     type: string;
//     payment: string;
// }
interface Service {
    id: number;
    name: string;
    description: string;
    userId: number;
    categoryId: number;
    dateIn: string;
    dateOut: string;
    hourIn: string;
    hourOut: string;
    amount: number;
    objective: string;
    syllabus: string;
    type: string;
    state: string;
}

interface User {
    id: number;
    email: string;
    name: string;
    surName: string | null;
    identification: string | null;
    phone: string | null;
    dateIn: string;
    dateOut: string | null;
    description: string | null;
    linkedin: string | null;
    languaje: string | null;
    position: string | null;
    state: string;
    role: string;
    service: Service[];
}

interface Participant {
    id: number;
    serviceId: string;
    userId: string;
    role: string | null;
    state: string | null;
    service: Service
}

interface services {
    closeModal: () => void;
    openModal: boolean
}

const ServicesProfile = () => {

    const { infoUserGlobal } = useAuthContext()
    const infoUserParsed = JSON.parse(infoUserGlobal ?? '')
    const userId = infoUserParsed.id

    const [services, setServices] = useState<Participant[] | null>(null)

    const servicesByUser = async (userId: number) => {
        const URL_BASE = 'https://juntxs.vercel.app/participants/user/'
        const info = await axios.get(`${URL_BASE}${userId}`)
        console.log('Services by user:', info.data);

        return info.data
    }

    useEffect(() => {
        const fetchServices = async () => {
            const services = await servicesByUser(userId)
            setServices(services);
            console.log(services);
        }
        fetchServices()
    }, [])

    return (
        <>
            <div className={style.servicesContainer}>
                <div className={style.titlePage}>
                    Participación de Servicios
                </div>
                <div className={style.cardContainerServices}>
                    <div className={style.titleServices}>
                        <div className={style.titleService}>Nombre del Servicio</div>
                        <div className={style.titleService}>Tipo de Servicio</div>
                    </div>
                    <div className={style.overFlowContainer}>
                        {services && services.length > 0 &&
                            services?.map((service, index) => {
                                return (
                                    <div key={index} className={style.cardServices}>
                                        <div className={style.imageAndTitle}>
                                                <div className={style.image}></div>
                                                <div className={style.cardDonation} key={index}>
                                                    <div className={style.imageAndTitle}>
                                                        <div className={style.imageProject}></div>
                                                        <div className={style.titleAndButton}>
                                                            <div className={style.titleProyect}> {service.service.name} </div>
                                                            <ServicesUser
                                                                service={service.service}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                        </div>
                                    </div>
                                )
                            })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ServicesProfile