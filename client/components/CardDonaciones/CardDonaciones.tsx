import React, { useEffect, useState } from 'react';
import style from './cardDonaciones.module.css';
import DonacionesDetail from '../DonacionesDetail/DonacionesDetail';
import { Donation, DonationResponse, FormattedDonation, UserData } from '@/app/pages/admin/donaciones/page';




interface CardDonacionesProps {
  
  formattedDonations: FormattedDonation[];
  onCloseDetail: () => void;
  onUserClick: (userId: number) => Promise<void>;
  donations: DonationResponse[];
  selectedUserId: number | null;
}

const CardDonaciones: React.FC<CardDonacionesProps> = ({ formattedDonations, onCloseDetail, onUserClick, selectedUserId }) => {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState<DonationResponse | null>(null);  

  const openDetailModal = (donation: DonationResponse) => {
    setSelectedDonation(donation); 
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
  };

  const getUserName = (donationUser: UserData | UserData[] | undefined): string => {
    if (Array.isArray(donationUser)) {
      return donationUser[0]?.name || 'Usuario desconocido';
    } else {
      return donationUser?.name || 'Usuario desconocido';
    }
  };

  const getProjectName = (donation: Donation): string => {
  return donation.project ? donation.project.name : 'Sin proyecto';
};

  

  return (
    <div className={style.gridContainer}>
      <div className={style.containerDonations}>
        <div className={style.titlePage}> Donaciones </div>
        <div className={style.allDonations}>
          {formattedDonations.map((donation) => (
            <div key={donation.id} className={style.cardDonation} onClick={() => onUserClick(donation.userId)}>
              <div className={style.projectAndProjectType}>
                <div className={style.imageAndTitle}>
                  <div className={style.imageProject}></div>
                  <div className={style.titleAndButton}>
                    <div className={style.titleProyect}>{getUserName(donation.user)}</div>
                    <button className={style.buttonProyect} onClick={(event) => {event.stopPropagation(); openDetailModal(donation as DonationResponse);}}>Ver Detalle</button>
                  </div>
                </div>
                <div className={style.tipoDeProyecto}> {donation.type}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
  
      {showDetailModal && selectedDonation && (
        <DonacionesDetail
          donation={selectedDonation}
          onClose={closeDetailModal}
        />
      )}
    </div>
  );
};

export default CardDonaciones;