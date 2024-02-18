'use client'
import style from './pDetail.module.css'


interface donation {
    amount: number;
    date: string;
    type: string;
    message: string;
    program: program;
}

interface program {
    description: string;
    name: string;
    image: string;
}

interface ProjectReady {
    donation: donation;
    closeModal: () => void;
    openModal: boolean
}



const ProyectDetail: React.FC<ProjectReady> = ({ donation
    , openModal, closeModal, }) => {

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
                                <div className={style.title}> Nombre del proyecto </div>
                                <div className={style.value}> {donation.program.name} </div>
                            </div>
                            <button className={style.buttonProjectDetail}> Ver Proyecto </button>
                        </div>
                        <div className={style.containerTitleButton}>
                            <div className={style.titleAndValue}>
                                <div className={style.title}> Tipo de donación </div>
                                <div className={style.value}> {donation.type} </div>
                            </div>
                            {/* <button className={style.buttonCancel}> Cancelar Suscripción </button> */}
                        </div>
                        <div>
                            <div className={style.titleAndValue}>
                                <div className={style.title}>
                                    {donation.type === 'Corporativo' || donation.type === 'Especies' ? 'Mensaje' : 'Monto'}
                                </div>
                                <div className={style.value}>
                                    {donation.type === 'Corporativo' || donation.type === 'Especies' ? donation.message : donation.amount}
                                </div>
                            </div>
                            {/* <div className={style.titleAndValue}>
                                <div className={style.title}>  Monto 
                                </div>
                                <div className={style.value}>
                                    {donation.amount}
                                </div>
                            </div> */}
                        </div>
                        <div className={style.menusOrder}>
                            {/* <div className={style.titleAndValue}>
                                <div className={style.title}> Frecuencia </div>
                                <div className={style.value}> Mensual </div>
                            </div> */}
                            <div className={style.containerFechas}>
                                <div className={style.titleAndValue2}>
                                    <div className={style.title}> Fecha Inicial </div>
                                    <div className={style.value}> {donation.date.substring(0, 10)} </div>
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

export default ProyectDetail;