'use client'
import React, { useEffect, useRef, useState } from 'react';
import style from './CardServicios.module.css';
import AgendarComponente from './AgendarComponent/TallerModal';
import axios from 'axios';
import CoachingComponent from './AgendarComponent/CoachingModal';
import TallerModal from './AgendarComponent/TallerModal';
import RetiroModal from './AgendarComponent/RetiroModal';

export interface ServicioTypes {
  nombre: string;
  descripcion: string;
  comentarios: string[];
  imagen: string;
  id?: number;
  ruta?: string;
}

interface CardServiciosProps {
  servicio: ServicioTypes;
}

const CardServicios: React.FC<CardServiciosProps> = ({ servicio }) => {

  const [modal, setModal] = useState(false)
  const [modalTaller, setModalTaller] = useState(false)
  const [modalRetiros, setModalRetiros] = useState(false)
  const [coaches, setCoaches] = useState([])
  const [services, setServices] = useState([])
  const [retiros, setRetiros] = useState([])

  const getUser = 'https://juntxs.vercel.app/users/Coach'


  useEffect(() => {

    //Fetcheadores
    const getRetiros = async () => {
      try {
        setRetiros(await (await axios('https://juntxs.vercel.app/services/retiro')).data)
      } catch (error) {
        console.log(error);
      }
    }
    const getServices = async () => {
      try {
        setServices(await (await axios('https://juntxs.vercel.app/services/taller')).data)
      } catch (error) {
        console.log(error);
      }
    }
    const getCoaches = async () => {
      try {
        const getUserCoaches: any = (await axios(getUser)).data
        if (getUserCoaches) {
          setCoaches(getUserCoaches)
        }
      } catch (error) {
        console.log(error);
      }
    }
    //Ejecuciones
    getRetiros()
    getServices()
    getCoaches()
  }, [])
  return (
    <div>
      <RetiroModal
        modal={modalRetiros}
        closeModal={() => setModalRetiros(false)}
        retiros={retiros}
      />
      <TallerModal
        modal={modalTaller}
        closeModal={() => setModalTaller(false)}
        talleres={services}
      />
      <CoachingComponent
        modal={modal}
        closeModal={() => setModal(false)}
        coaches={coaches}
      />
      <div className={style.cardContainer} key={servicio.nombre}>
        <div className={style.infoContainer}>
          <div className={style.titleAndDescription}>
            <h1 className={style.title}>{servicio.nombre}</h1>
            <div className={style.containerDesc}>
              <p className={style.description}>{servicio.descripcion}</p>
            </div>
          </div>
          <div className={style.buttonContainer}>
            <button onClick={() => {
              if (servicio.nombre === 'Coaching') return setModal(true)
              if (servicio.nombre === 'Talleres') return setModalTaller(true)
              if (servicio.nombre === 'Retiros') return setModalRetiros(true)
            }} className={style.buttonFull}>Agendar</button>
          </div>
        </div>
        <div className={style.imageContainer}>
          <img className={style.image} src={servicio.imagen} alt="no se pudo" />
        </div>
      </div>
    </div>
  );
};

export default CardServicios;