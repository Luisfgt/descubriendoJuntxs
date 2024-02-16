import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import style from './CreateServices.module.css';
import axios from 'axios';


interface FormData {
  name: string;
  description: string;
  userId: number;
  categoryId: number;
  dateIn: string;
  dateOut: string;
  hourIn: string;
  hourOut: string;
  amount: number;
  objective: string;
  syllabus: string;
  type: string;
  state: string;
  coach: number;
}

interface CreateServicesProps {
  modal: boolean;
  closeModal: () => void;
}

const CreateServices: React.FC<CreateServicesProps> = ({ modal, closeModal }) => {
  

  const [input, setInput] = useState({
    name: '',
    description: '',
    userId: 1,
    categoryId: 1,
    dateIn: new Date().toISOString().slice(0, 10),
    dateOut: new Date().toISOString().slice(0, 10),
    hourIn: '',
    hourOut: '',
    amount: 0,
    objective: '',
    syllabus: '',
    type: '',
    state: 'Activo',
    coach: 0,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.preventDefault()
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const API_URL = 'https://juntxs.vercel.app';

  interface Coach {
    id: number;
    name: string;
  }

  const [coaches, setCoaches] = useState<Coach[]>([]);
  useEffect(() => {
    axios.get('https://juntxs.vercel.app/users/Coach')
      .then(response => {
        setCoaches(response.data);
      })
      .catch(error => {
        console.error('Error fetching coaches:', error);
      });
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    for (let key in input) {
      if (input[key as keyof FormData] === '' || input[key as keyof FormData] === 0) {
        alert('Debes completar todos los espacios para poder crear un servicio');
        return;
      }
    }

    if (['coaching', 'taller', 'retiro'].includes(input.type)) {
      try {
        const response = await axios.post('https://juntxs.vercel.app/services', {
          name: input.name,
          description: input.description,
          userId: Number(input.userId),
          categoryId: Number(input.categoryId),
          dateIn: new Date(input.dateIn).toISOString(),
          dateOut: new Date(input.dateOut).toISOString(),
          hourIn: input.hourIn,
          hourOut: input.hourOut,
          amount: Number(input.amount),
          objective: input.objective,
          syllabus: input.syllabus,
          type: input.type,
          state: input.state,
        });
        console.log('Nuevo servicio creado:', response.data);
      alert('Servicio creado con éxito'); 
      window.location.reload();
    } catch (error: any) {
      console.error('Error creating service:', error);
      if (error.response) {
        console.error('Server responded with:', error.response.data);
      } else if (error.request) {
        console.error('No response received from server');
      } else {
        console.error('Error setting up the request:', error.message);
      }
    }
  } else {
    console.error('Invalid type value:', input.type);
  }
};
if (!modal) {
    return null;
  }

  return (
    <>
      <div className={style.background}>
        <div className={style.container}>
          <div className={style.createUserAndCloseModal}>
            <h1>Crear Servicio</h1>
            <button onClick={closeModal}>X</button>
          </div>
          <form className={style.form} onSubmit={handleSubmit}>
            <div className={style.inputsContainer}>
              <div className={style.labelInput}>
                <label htmlFor="">Nombre del servicio</label>
                <input className={style.input} type="text" name="name" value={input.name} onChange={handleChange} placeholder="Nombre del servicio" />
              </div>
              <div className={style.labelInput}>
                <label htmlFor="">Descripción del servicio</label>
                <input className={style.input} type="text" name="description" value={input.description} onChange={handleChange} placeholder="" />
              </div>
            </div>
            <div className={style.inputsContainer}>
              <div className={style.labelInput}>
                <label htmlFor="">Fecha de inicio</label>
                <input className={style.input} type="date" name="dateIn" value={input.dateIn} onChange={handleChange} placeholder="" />
              </div>
              <div className={style.labelInput}>
                <label htmlFor="">Fecha de finalización</label>
                <input className={style.input} type="date" name="dateOut" value={input.dateOut} onChange={handleChange} placeholder="" />
              </div>
            </div>
            <div className={style.inputsContainer}>
              <div className={style.labelInput}>
                <label htmlFor="">Hora de inicio</label>
                <input className={style.input} type="time" name="hourIn" value={input.hourIn} onChange={handleChange} placeholder="" />
              </div>
              <div className={style.labelInput}>
                <label htmlFor="">Hora de finalización</label>
                <input className={style.input} type="time" name="hourOut" value={input.hourOut} onChange={handleChange} placeholder="" />
              </div>
            </div>
            <div className={style.inputsContainer}>
              <div className={style.labelInput}>
                <label htmlFor="">Cantidad</label>
                <input className={style.input} type="number" name="amount" value={input.amount} onChange={handleChange} placeholder="" />
              </div>
              <div className={style.labelInput}>
                <label htmlFor="">Objetivo</label>
                <input className={style.input} type="text" name="objective" value={input.objective} onChange={handleChange} placeholder="" />
              </div>
            </div>
            <div className={style.inputsContainer}>
              <div className={style.labelInput}>
                <label htmlFor="">Sílabo</label>
                <input className={style.input} type="text" name="syllabus" value={input.syllabus} onChange={handleChange} placeholder="" />
              </div>
              <div className={style.labelInput}>
                <label htmlFor="">Tipo</label>
                <input className={style.input} type="text" name="type" value={input.type} onChange={handleChange} placeholder="coaching, talleres o retiros" />
              </div>
              <div className={style.labelInput}>
                <label htmlFor="">Coach</label>
                <select className={style.labelInput} name="coach" value={input.coach} onChange={handleChange}>
                  {coaches.map(coach => (
                    <option key={coach.id} value={coach.id}>{coach.name}</option>
                  ))}
                </select>
              </div>
              <div className={style.labelInput}>
                <label htmlFor="">Estado</label>
                <input className={style.input} type="text" name="state" value={input.state} onChange={handleChange} placeholder="" />
                <button className={style.button}onClick={(e) => handleSubmit(e)}>Crear Servicio</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateServices;