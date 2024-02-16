import { useAuthContext } from "@/app/contexto/AuthContext"
import axios from "axios"
import { useState } from "react"
import style from './agendar.module.css'
import Coaching from '@/components/Servicios/Coaching';
import SelectComponent from "@/components/SelectComponent/SelectComponent";
import { logout } from '@/app/firebase/auth/signOut';
import { useRouter } from "next/navigation";


interface coach {
    id: number
    name: string
    surName: string
}

interface coaching {
    name: string
    value: number
}

interface AgendarTypes {
    modal: boolean
    closeModal: () => void
    coaches: coach[]
}

interface service {
    name: string,
    description: string,
    userId: number | null,
    amount: number | null,
    dateIn: Date | null,
    dateOut: Date | null,
    hourIn: string,
    hourOut: string,
    objective: string,
    syllabus: string,
    type: string
    participantUserId: number
}

const CoachingComponent: React.FC<AgendarTypes> = ({ modal, closeModal, coaches }) => {
    const { infoUserGlobal } = useAuthContext()
    const parseInfoGlobal = JSON.parse(infoUserGlobal ?? '')
    const router = useRouter()
    const [service, setService] = useState<service>({
        name: 'Coach Personalizado',
        userId: null,
        amount: 200,
        description: '',
        hourIn: '',
        hourOut: '',
        objective: 'coaching',
        syllabus: 'coaching',
        type: 'coaching',
        dateIn: new Date(),
        dateOut: new Date(),
        participantUserId: parseInfoGlobal.id
    })


    const createServiceCoaching = async() => {
        try {
            const createPayment = (await axios.post(`https://juntxs.vercel.app/payments/services`, service)).data
            if(createPayment) {
                    window.open(createPayment.init_point, '_blank');
                    router.push('/pages/user/services')
            }
        } catch (error) {
            console.log(error);
        }
    }

    // const createServiceCoaching = async () => {
    //     try {
    //         const createCoachService: any = (await axios.post('https://juntxs.vercel.app/services', service)).data
    //         if (createCoachService) {
    //             const infoService = {
    //                 serviceId: createCoachService.id,
    //                 name: 'Coach Personalizado',
    //                 amount: service.amount,
    //                 userId: parseInfoGlobal.id
    //             }
    //             console.log(parseInfoGlobal.role);
    //             const userParticipant = {
    //                 serviceId: createCoachService.id,
    //                 userId: parseInfoGlobal.id,
    //                 role: parseInfoGlobal.role
    //             }
    //             const participant = await axios.post('https://juntxs.vercel.app/participants', userParticipant)
    //             if (participant) {
    //                 const data = (await axios.post('https://juntxs.vercel.app/payments/services', infoService)).data
    //                 window.open(data.init_point, '_blank');
    //                 router.push('/pages/user/donations')

    //             }
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.target.name === 'dateIn') {
            return setService({
                ...service,
                dateIn: new Date(e.target.value + 'T00:00:00')
            })
        }
        if (e.target.name === 'hourIn') {
            return setService({
                ...service,
                hourIn: e.target.value
            })
        }
        setService({
            ...service,
            [e.target.name]: e.target.value
        })
    }

    const changeCoach = (value: number) => {
        setService({
            ...service,
            userId: value
        })
    }

    const options = () => {
        let coachOptions: coaching[] = []
        coaches?.map((coach) => {
            const coachOp = {
                name: coach.name + ' ' + coach.surName,
                value: coach.id,
            }
            return coachOptions.push(coachOp)
        })
        return coachOptions
    }

    const coachesOptions = options()

    if (!modal) return null

    return (
        <div className={style.backGround}>
            <div className={style.cardContainer}>
                <div className={style.infoOrder}>
                    <div className={style.labelAndImput}>
                        <label className={style.labelDesign} htmlFor=""> Elige la fecha </label>
                        <input
                            className={style.input}
                            name="dateIn"
                            type="date"
                            value={service.dateIn instanceof Date && !isNaN(service.dateIn.getTime()) ? service.dateIn.toISOString().split('T')[0] : ''}
                            onChange={onChange}
                        />
                    </div>
                    <div className={style.labelAndImput}>
                        <label className={style.labelDesign} htmlFor=""> Elige la hora </label>
                        <input
                            className={style.input}
                            name="hourIn"
                            type="time"
                            value={service.hourIn}
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <SelectComponent
                            label={'Coach'}
                            options={coachesOptions}
                            onChange={changeCoach}
                            styles={style}
                        />
                    </div>
                    <div className={style.labelAndImput}>
                        <label className={style.labelDesign} htmlFor=""> ¿Que deseas del coaching? </label>
                        <textarea
                            className={style.textArea}
                            name="description"
                            value={service.description}
                            onChange={onChange}
                            placeholder="Descríbenos el motivo de tu solicitud de coaching"
                        />
                    </div>
                </div>
                <div className={style.buttons}>
                    <button className={style.buttonText} onClick={() => {
                        setService({
                            ...service,
                            description: '',
                            dateIn: null,
                        })
                        closeModal()
                    }
                    }> Cancelar </button>
                    <button className={style.buttonFull} onClick={() => createServiceCoaching()} disabled={!service.dateIn || !service.hourIn || !service.description || !service.userId}> Ir a pagar </button>
                </div>
            </div>

        </div>
    )
}


export default CoachingComponent