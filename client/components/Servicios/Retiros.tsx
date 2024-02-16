'use client'

import React, { useState } from 'react';

const Retiros = () => {
  const [fechaRetiro, setFechaRetiro] = useState<string>('');
  const [tematica, setTematica] = useState<string>('');
  const [sitioRetiro, setSitioRetiro] = useState<string>('');

  const handlePagarPaypal = () => {
    console.log('Realizando pago con Paypal...');
  };

  return (
    <div>
      <h2>Retiros</h2>
      <form>
        <div>
          <label>Elige la fecha del retiro:</label>
          <input
            type="date"
            value={fechaRetiro}
            onChange={(e) => setFechaRetiro(e.target.value)}
          />
        </div>
        <div>
          <label>Tematica del Retiro:</label>
          <select
            value={tematica}
            onChange={(e) => setTematica(e.target.value)}
          >
            <option value="meditacion">Meditación</option>
            <option value="yoga">Yoga</option>
            <option value="espiritualidad">Espiritualidad</option>
          </select>
        </div>
        <div>
          <label>Sitio del Retiro:</label>
          <select
            value={sitioRetiro}
            onChange={(e) => setSitioRetiro(e.target.value)}
          >
            <option value="playa">Playa</option>
            <option value="montaña">Montaña</option>
            <option value="retiroEco">Retiro Ecológico</option>
          </select>
        </div>
            <button type="button" onClick={handlePagarPaypal}>
              Pagar con Paypal
            </button>
      </form>
    </div>
  );
};

export default Retiros;