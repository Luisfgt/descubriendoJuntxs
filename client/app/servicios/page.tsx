'use client'

import React, { useState } from 'react';
import CardServicios from '@/components/CardServicios/CardServicios';
import style from './servicios.module.css';
import Filter from '@/components/filters/Filter';
import coachingImage from '../../components/Icons/images/Coaching.png'
import TallerImage from '../../components/Icons/images/Taller.png'
import retirosImage from '../../components/Icons/images/Retiro.png'

const ServiciosPage: React.FC = () => {
  const serviciosData: any[] = [
    {
      id: 1,
      nombre: 'Coaching',
      descripcion: 'Servicio de coaching personalizado para alcanzar tus metas.',
      ruta: '/servicios/coaching',
      comentarios: [],
      imagen: coachingImage.src,
    },
    {
      id: 2,
      nombre: 'Talleres',
      descripcion: 'Participa en nuestros talleres para adquirir nuevas habilidades.',
      ruta: '/servicios/talleres',
      comentarios: [],
      imagen: TallerImage.src,
    },
    {
      id: 3,
      nombre: 'Retiros',
      descripcion: 'Experimenta la tranquilidad en nuestros retiros.',
      ruta: '/servicios/retiros',
      comentarios: [],
      imagen: retirosImage.src,
    }
  ];

  const [serviciosFinales, setServiciosFinales] = useState<any[]>(serviciosData);

  const handleFilter = (filtro: string) => {
    setServiciosFinales(serviciosData.filter(servicio => servicio.nombre.includes(filtro)));
  };

  return (
    <div className={style.backgroundServicios}>
      
      
      {serviciosFinales.map((servicio) => (
        <CardServicios key={servicio.nombre} servicio={servicio} />
        ))}
    </div>
  );
};

export default ServiciosPage;