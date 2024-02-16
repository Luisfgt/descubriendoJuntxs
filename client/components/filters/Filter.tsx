import React, { useState } from "react";

const Filter: React.FC<{ onFilter: (filter: any) => void }> = ({ onFilter }) => {
  const [filtro, setFiltro] = useState({ categoria: "", fecha: "" });
  
  const categorias = ["isa", "brigitte", "luciana"]

  const handleCategoriaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFiltro({ ...filtro, categoria: event.target.value });
  };

  const handleFechaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiltro({ ...filtro, fecha: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onFilter(filtro);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="categoria">Categoría:</label>
        <select id="categoria" onChange={handleCategoriaChange} value={filtro.categoria}>
          {categorias.map((categoria, index) => (
            <option key={index} value={categoria}>{categoria}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="fecha">Fecha:</label>
        <input type="date" id="fecha" onChange={handleFechaChange} value={filtro.fecha} />
      </div>
      <button type="submit">Filtrar</button>
    </form>
  );
};

export default Filter;