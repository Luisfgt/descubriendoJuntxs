import React from 'react';
import CardSer from '@/components/AdminDashboard/CardsProyects/CardsProyects';

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
        <CardSer servicios={servicios} />
      </div>
  );
};

export default ServiciosServer;