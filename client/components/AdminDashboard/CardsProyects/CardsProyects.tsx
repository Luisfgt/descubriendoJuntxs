'use client'
import React, { useState } from 'react';
import style from './CardProyect.module.css';
import { ServicioTypes } from '@/app/pages/admin/services/page';
import ServiciosDetail from '@/components/ServicesDetail/ServicesDetail';
import CreateServices from '@/components/DashboardAdmin/CreateServices/CreateServices';



interface CardServiciosProps {
  servicios: ServicioTypes[];
}

const CardSer: React.FC<CardServiciosProps> = ({ servicios }) => {
  

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false); 
  const [selectedServicio, setSelectedServicio] = useState<ServicioTypes | null>(null);

  const openDetailModal = (servicio: ServicioTypes) => {
    setSelectedServicio(servicio); 
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
  };

  const openCreateModal = () => {
    setShowCreateModal(true);
  };

  const closeCreateModal = () => { 
    setShowCreateModal(false);
  };

  if (!servicios) {
    return null; 
  }

  return (
    <div className={style.gridContainer}>
      <div className={style.containerDonations}>
        <div className={style.titlePage}> Participacion de Servicios </div>
        <div className={style.allDonations}>
          <div className={style.cardHeader}>
            <div className={style.subtitle}>Nombre de servicios</div>
            <div className={style.subtitleRight}>Tipo de servicios</div>

          </div>
          {servicios.map(servicio => (
            <div key={servicio.name} className={style.cardDonation}>
              <div className={style.projectAndProjectType}>
                <div className={style.imageAndTitle}>
                  <div className={style.imageProject}></div>
                  <div className={style.titleAndButton}>
                    <div className={style.titleProyect}>{servicio.name}</div>
                    <button className={style.buttonProyect} onClick={() => openDetailModal(servicio)}>Ver Agenda</button>
                  </div>
                </div>
                <div className={style.type}>{servicio.type}</div>
              </div>
            </div>
          ))}
        </div>
        <button className={style.buttonCrear} onClick={openCreateModal}>Crear Servicios</button>
      </div>
      {showDetailModal && selectedServicio && (
        <ServiciosDetail
          servicio={selectedServicio}
          onClose={closeDetailModal}
        />
      )}
      {showCreateModal && (
        <CreateServices
          modal={showCreateModal}
          closeModal={closeCreateModal}
        />
      )}

    </div>
  );
};

export default CardSer;