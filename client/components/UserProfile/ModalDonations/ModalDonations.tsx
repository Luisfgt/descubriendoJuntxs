import ProyectDetail from "@/components/ProyectDetail/ProyectDetail";
import { useState } from "react";

interface program {
    description: string;
    name: string;
    image: string;
}

interface donation {
    donation: {
        amount: number;
        date: string;
        type: string;
        program: program;
    }
}


const DonationsUser: React.FC<any> = ({ donation }) => {

    const [modal, setModal] = useState(false)

    // const { infoUserGlobal } = useAuthContext()
    // const infoUserParsed = JSON.parse(infoUserGlobal ?? '')
    // const userId = infoUserParsed.id

    return (
        <>
            <div onClick={() => setModal(true)} className="text-[#7286FF] select-none text-[0.75rem] cursor-pointer">
                Ver detalle de donación
            </div>
            <ProyectDetail
                donation={donation}
                closeModal={() => setModal(false)}
                openModal={modal}
            />
        </>
    )
}

export default DonationsUser;