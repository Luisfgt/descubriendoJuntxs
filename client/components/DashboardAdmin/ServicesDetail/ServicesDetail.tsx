import { ServicioTypes } from "@/app/pages/admin/services/page";
import { useState } from "react";
import style from './ServicesDetail.module.css'


interface ServiciosDetailProps {
    servicio: ServicioTypes;
    onClose: () => void;
  }

  const ServiciosDetail: React.FC<ServiciosDetailProps> = ({ servicio, onClose }) => {
    let dateInString = 'N/A'; 
    let dateOutString = 'N/A'; 
  
    if (servicio.dateIn !== undefined) {
      if (typeof servicio.dateIn === 'number') {
        dateInString = new Date(servicio.dateIn).toDateString();
      } else if (typeof servicio.dateIn === 'string') {
        const date = new Date(servicio.dateIn);
        if (!isNaN(date.getTime())) {
          dateInString = date.toDateString();
        }
      }
    }
  
    if (servicio.dateOut !== undefined) {
      if (typeof servicio.dateOut === 'number') {
        dateOutString = new Date(servicio.dateOut).toDateString();
      } else if (typeof servicio.dateOut === 'string') {
        const date = new Date(servicio.dateOut);
        if (!isNaN(date.getTime())) {
          dateOutString = date.toDateString();
        }
      }
    }

    return (
      <>
        <div className={style.backgroundModal}>
          <div className={style.gridPadre}>
            <div className={style.portada}></div>
            <div className={style.profileUser}></div>
            <div onClick={onClose} className={style.retornar}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#24275A" style={{ transform: "scaleX(-1)" }}>
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z" />
              </svg>
              Volver
            </div>
            <div className={style.bodyWhite}>
              <div className={style.titleAndValue}>
                <div className={style.title}>Nombre del servicio</div>
                <div className={style.value}>{servicio.name}</div>
              </div>
              <div className={style.titleAndValue}>
                <div className={style.title}>Descripción del servicio</div>
                <div className={style.value}>{servicio.description}</div>
              </div>
              <div className={style.titleAndValue}>
      <div className={style.title}>Fecha de inicio del servicio</div>
      <div className={style.value}>{dateInString}</div>
    </div>
    <div className={style.titleAndValue}>
      <div className={style.title}>Fecha de finalización del servicio</div>
      <div className={style.value}>{dateOutString}</div>
    </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default ServiciosDetail;