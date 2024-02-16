import { useAuthContext } from "@/app/contexto/AuthContext"
import axios from "axios"
import { useEffect, useRef, useState } from "react"
import style from './agendar.module.css'
import Coaching from '@/components/Servicios/Coaching';
import SelectComponent from "@/components/SelectComponent/SelectComponent";
import { useRouter } from 'next/navigation';


interface retiro {
    name: string
    value: number
}

interface retiros {
    id: number
    name: string
    value: number
    amount: number
}

interface AgendarTypes {
    modal: boolean
    closeModal: () => void
    retiros: retiros[]
}

interface service {
    id: number
    name: string,
    description: string,
    userId: number | null,
    categoryId: number | null,
    amount: number | null,
    dateIn: Date | null,
    dateOut: Date | null,
    hourIn: string,
    hourOut: Date | null,
    objective: string,
    syllabus: string
}

const RetiroModal: React.FC<AgendarTypes> = ({ modal, closeModal, retiros }) => {
    const router = useRouter()
    const { infoUserGlobal } = useAuthContext()
    const parseInfoGlobal = JSON.parse(infoUserGlobal ?? '')
    const [serviceSelect, setServiceSelect] = useState<service | null>(null)
    const [service, setService] = useState<service>({
        id: 1,
        name: 'Coach Personalizado',
        description: '',
        userId: null,
        categoryId: 1,
        amount: 200,
        dateIn: null,
        dateOut: new Date(),
        hourIn: '',
        hourOut: new Date(),
        objective: 'coaching',
        syllabus: 'coaching'
    })

    const createService = async () => {
        try {
            const infoCreate = {
                serviceId: serviceSelect?.categoryId ?? '',
                userId: parseInfoGlobal.id,
                role: parseInfoGlobal.role,
            }
            const data = (await axios.post('https://juntxs.vercel.app/payments/servicesPayments', infoCreate)).data
            if (data) {
                window.open(data.init_point, '_blank');
                router.push('/pages/user/services')
            }
        } catch (error) {
            console.log(error);
        }
    }

    const selectChange = (value: any) => {
        setServiceSelect({
            ...service,
            categoryId: value,
            amount: retiros.filter((retiro) => retiro.id === value)[0].amount
        })
    }

    const options = () => {
        let servicesOptions: retiro[] = []
        retiros?.map((taller) => {
            const tallerOp: retiro = {
                name: taller.name,
                value: taller.id
            }
            return servicesOptions.push(tallerOp)
        })
        return servicesOptions
    }

    const retiroOptions = options()
    console.log(retiroOptions);

    if (!modal) return null

    return (
        <div className={style.backGround}>
            <div className={style.cardContainer}>
                <div className={style.infoOrder}>
                    <div>
                        <SelectComponent
                            label={'Retiros'}
                            options={retiroOptions}
                            onChange={selectChange}
                            styles={style}
                        />
                    </div>
                </div>
                <div className={style.buttons}>
                    <button className={style.buttonText} onClick={() => {
                        setServiceSelect({
                            ...service,
                            description: '',
                            categoryId: null,
                            dateIn: null
                        })
                        closeModal()
                    }
                    }> Cancelar </button>
                    <button className={style.buttonFull} onClick={() => createService()} disabled={!serviceSelect?.categoryId}> Ir a pagar </button>
                </div>
            </div>
        </div>
    )
}


export default RetiroModal
