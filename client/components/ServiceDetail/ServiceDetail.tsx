'use client'
import style from './serviceDetail.module.css'

// interface ServiceUser {
//     name: string;
//     description: string;
//     dateIn: string;
//     hourIn: string;
//     amount: number;
//     type: string;
//     payment: string;
// }

// interface services {
//     serviceUser: ServiceUser;
//     closeModal: () => void;
//     openModal: boolean
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
    service: Service;
}

interface services {
    service: Service;
    closeModal: () => void;
    openModal: boolean
}


const ServiceDetail: React.FC<services> = ({ service, openModal, closeModal }) => {

    if (!openModal) return null

    return (
        <>
            <div className={style.backgroundModal}>
                <div className={style.gridPadre}>
                    <div className={style.portada}></div>
                    <div className={style.profileUser}></div>
                    <div onClick={() => closeModal()} className={style.retornar}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#24275A" style={{ transform: "scaleX(-1)" }}>
                            <path d="M0 0h24v24H0V0z" fill="none" />
                            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z" />
                        </svg>
                        Volver </div>
                    <div className={style.bodyWhite}>
                        <div className={style.containerTitleButton}>
                            <div className={style.titleAndValue}>
                                <div className={style.title}> Nombre del servicio </div>
                                <div className={style.value}> {service.name} </div>
                            </div>
                            <button className={style.buttonProjectDetail}> Ver Proyecto </button>
                        </div>
                        <div className={style.containerTitleButton}>
                            <div className={style.titleAndValue}>
                                <div className={style.title}> Tipo de servicio </div>
                                <div className={style.value}> {service.type} </div>
                            </div>
                            {/* <button className={style.buttonCancel}> Cancelar Suscripción </button> */}
                        </div>
                        <div>
                            <div className={style.titleAndValue}>
                                <div className={style.title}>  Monto </div>
                                <div className={style.value}>
                                    {service.amount}
                                </div>
                            </div>
                        </div>
                        <div className={style.menusOrder}>
                            {/* <div className={style.titleAndValue}>
                                <div className={style.title}> Frecuencia </div>
                                <div className={style.value}> Mensual </div>
                            </div> */}
                            <div className={style.containerFechas}>
                                <div className={style.titleAndValue2}>
                                    <div className={style.title}> Fecha </div>
                                    <div className={style.value}> {service.dateIn.substring(0, 10)} </div>
                                </div>
                                {/* <div className={style.titleAndValue2}>
                                    <div className={style.title}> Proxima donación </div>
                                    <div className={style.value}> 27/12/24 </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ServiceDetail;

