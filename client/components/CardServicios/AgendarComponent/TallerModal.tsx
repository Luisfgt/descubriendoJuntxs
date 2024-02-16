import { useAuthContext } from "@/app/contexto/AuthContext"
import axios from "axios"
import { useEffect, useRef, useState } from "react"
import style from './agendar.module.css'
import Coaching from '@/components/Servicios/Coaching';
import SelectComponent from "@/components/SelectComponent/SelectComponent";
import { useRouter } from "next/navigation";


interface taller {
    name: string
    value: number
}

interface talleres {
    id: number
    name: string
    value: number
}

interface AgendarTypes {
    modal: boolean
    closeModal: () => void
    talleres: talleres[]
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

const TallerModal: React.FC<AgendarTypes> = ({ modal, closeModal, talleres }) => {
    const router = useRouter()
    const { infoUserGlobal } = useAuthContext()
    const parseInfoGlobal = JSON.parse(infoUserGlobal ?? '')
    const [serviceSelect, setServiceSelect] = useState(null)
    const [service, setService] = useState<service>({
        id: 1,
        name: 'Coach Personalizado',
        description: '',
        userId: null,
        categoryId: null,
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
                serviceId: service?.categoryId ?? '',
                userId: parseInfoGlobal.id,
                role: parseInfoGlobal.role
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
        setService({
            ...service,
            categoryId: value,
        })
    }


    const options = () => {
        let servicesOptions: taller[] = []
        talleres?.map((taller) => {
            const tallerOp: taller = {
                name: taller.name,
                value: taller.id
            }
            return servicesOptions.push(tallerOp)
        })
        return servicesOptions
    }

    const servicesOptions = options()

    if (!modal) return null

    return (
        <div className={style.backGround}>
            <div className={style.cardContainer}>
                <div className={style.infoOrder}>
                    <div>
                        <SelectComponent
                            label={'Services'}
                            options={servicesOptions}
                            onChange={selectChange}
                            styles={style}
                        />
                    </div>
                </div>
                <div className={style.buttons}>
                    <button className={style.buttonText} onClick={() => {
                        setService({
                            ...service,
                            description: '',
                            categoryId: null,
                            dateIn: null,
                        })
                        closeModal()
                    }
                    }> Cancelar </button>
                    <button className={style.buttonFull} onClick={() => createService()} disabled={!service.categoryId}> Ir a pagar </button>
                </div>
            </div>
        </div>
    )
}


export default TallerModal
