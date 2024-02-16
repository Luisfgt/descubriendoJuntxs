'use client'

import React, { useState } from 'react';

const Talleres = () => {
  const [fechaTaller, setFechaTaller] = useState<string>('');
  const [tematica, setTematica] = useState<string>('');

  const handlePagarPaypal = () => {
    console.log('Realizando pago con Paypal...');
  };

  return (
    <div>
      <h2>Talleres</h2>
      <form>
        <div>
          <label>Elige la fecha del taller:</label>
          <select
            value={fechaTaller}
            onChange={(e) => setFechaTaller(e.target.value)}
          >
            <option value="fecha1">Fecha 1</option>
            <option value="fecha2">Fecha 2</option>
            <option value="fecha3">Fecha 3</option>
          </select>
        </div>
        <div>
          <label>Tematica del taller:</label>
          <select
            value={tematica}
            onChange={(e) => setTematica(e.target.value)}
          >
            <option value="tecnologia">Tecnología</option>
            <option value="arte">Arte</option>
            <option value="salud">Salud</option>
          </select>
        </div>
        <button type="button" onClick={handlePagarPaypal}>
          Pagar con Paypal
        </button>
      </form>
    </div>
  );
};

export default Talleres;