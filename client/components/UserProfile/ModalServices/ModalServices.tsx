import ServiceDetail from "@/components/ServiceDetail/ServiceDetail";
import { useState } from "react";

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

// interface ServiceUser {
//     name: string;
//     description: string;
//     dateIn: string;
//     hourIn: string;
//     amount: number;
//     type: string;
//     payment: string;
// }

interface services {
    service: Service;
}

const ServicesUser: React.FC<services> = ({ service }) => {
    const [modal, setModal] = useState(false)

    return (
        <>
            <div onClick={() => setModal(true)} className="text-[#7286FF] select-none text-[0.75rem] cursor-pointer">
                Ver detalle de servicio
            </div>
            <ServiceDetail
                service={service}
                closeModal={() => setModal(false)}
                openModal={modal}
            />
        </>
    )
}

export default ServicesUser;