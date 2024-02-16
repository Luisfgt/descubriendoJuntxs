import React, { useEffect, useState } from 'react';
import style from './dDetail.module.css';
import { DonationResponse, ProjectData } from '@/app/pages/admin/donaciones/page';
import axios from 'axios';


interface DonacionesDetailProps {
  donation: DonationResponse;
  project?: ProjectData;
  onClose: () => void;
}

const DonacionesDetail: React.FC<DonacionesDetailProps> = ({ donation, onClose }) => {
  const userName = Array.isArray(donation.user) ? donation.user[0]?.name : donation.user.name;
  const [project, setProject] = useState<ProjectData | null>(null);
  
  useEffect(() => {
      axios.get('https://juntxs.vercel.app/programs/1')
        .then(response => {
          setProject(response.data);
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
  }, [donation.project]);

  const projectName = project ? project.name : 'Sin proyecto';

 
  let donationDateString = 'Fecha desconocida';
  if (typeof donation.date === 'string' || typeof donation.date === 'number') {
    const donationDate = new Date(donation.date);
    donationDateString = `${donationDate.getDate().toString().padStart(2, '0')}/${(donationDate.getMonth() + 1).toString().padStart(2, '0')}/${donationDate.getFullYear()}`;
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
        <div className={style.title}>Nombre del proyecto</div>
        <div className={style.value}>{projectName}</div>
      </div>
            <div className={style.titleAndValue}>
              <div className={style.title}>Nombre del donante</div>
              <div className={style.value}>{userName || 'Usuario anónimo'}</div>
            </div>
            <div className={style.titleAndValue}>
              <div className={style.title}>Fecha de la donación</div>
              <div className={style.value}>{donationDateString}</div>
            </div>
            <div className={style.titleAndValue}>
              <div className={style.title}>Tipo de donación</div>
              <div className={style.value}>{donation.type}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default DonacionesDetail;