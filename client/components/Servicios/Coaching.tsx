'use client'

import React, { useState } from 'react';

const Coaching = () => {
  const [fechaCoaching, setFechaCoaching] = useState<string>('');
  const [tematica, setTematica] = useState<string>('');
  const [coachSeleccionado, setCoachSeleccionado] = useState<string>('');

  const handlePagarPaypal = () => {
    console.log('Realizando pago con Paypal...');
  };

  return (
    <div>
      <h2>Coaching</h2>
      <form>
        <div>
          <label>Elige la fecha del coaching:</label>
          <input
            type="date"
            value={fechaCoaching}
            onChange={(e) => setFechaCoaching(e.target.value)}
          />
        </div>
        <div>
          <label>Tematica del Coach:</label>
          <select
            value={tematica}
            onChange={(e) => setTematica(e.target.value)}
          >
            <option value="liderazgo">Liderazgo</option>
            <option value="motivacion">Motivación</option>
            <option value="desarrolloPersonal">Desarrollo Personal</option>
          </select>
        </div>
        <div>
          <label>Elegir Coach:</label>
          <select
            value={coachSeleccionado}
            onChange={(e) => setCoachSeleccionado(e.target.value)}
          >
            <option value="coach1">Coach 1</option>
            <option value="coach2">Coach 2</option>
            <option value="coach3">Coach 3</option>
          </select>
        </div>
        <button type="button" onClick={handlePagarPaypal}>
          Pagar con Paypal
        </button>
      </form>

     
    </div>
  );
};

export default Coaching;