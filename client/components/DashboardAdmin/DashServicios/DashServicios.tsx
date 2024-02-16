import React from 'react';
import style from './DashServicios.module.css';

export interface Servicio {
  nombre: string;
  descripcion: string;
  comentarios: string[];
  imagen: string;
  id?: number;
  ruta?: string;
}

interface DashServiciosProps {
  servicios: Servicio[];
}

const DashServicios: React.FC<DashServiciosProps> = ({ servicios }) => {
  return (
    <div>
      <div>
        <ul>
          {servicios.map((servicio, index) => (
            <li key={index}>
              <button>{servicio.nombre}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashServicios;