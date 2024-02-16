import React from 'react';
import CardServicios from '../../../components/CardServicios/CardServicios';

function formatService(service) {
  const formattedService = {
    id: service.id,
    name: service.name,
    description: service.description,
    comentarios: service.comentarios,
    imagen: service.imagen,
    ruta: service.ruta,
  };

  return formattedService;
}

function ServiciosServer({ servicios }) {
  return (
      <div>
        <CardServicios servicios={servicios} />
      </div>
  );
};

export default ServiciosServer;