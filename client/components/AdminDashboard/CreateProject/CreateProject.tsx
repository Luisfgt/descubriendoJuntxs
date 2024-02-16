import { useState } from 'react'
import style from './CreateProject.module.css'
// import { ProyectTypes } from '@/app/proyectos/page'
import axios from 'axios'


interface CreateProjectProps {
    modal: boolean,
    closeModal: () => void
}

const CreateProject: React.FC<CreateProjectProps> = ({ modal, closeModal }) => {
   

    const URL_BASE = "https://juntxs.vercel.app/"

    const [input, setInput] = useState({
        image: null as File | null,
        // id: "",
        name: "",
        description: "",
        dateIn: new Date().toISOString(),
        dateOut: new Date().toISOString(),
        state: "Activo",
        urlYoutube: "",
        objective: "",
        syllabus: "",
        categoryId: 1,

    })
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setInput({ ...input, image: e.target.files[0] });
        } else {
            setInput({ ...input, image: null });
        }
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('name', input.name);
            formData.append('description', input.description);
            formData.append('objective', input.objective);
            formData.append('dateIn', input.dateIn);
            formData.append('dateOut', input.dateOut);
            formData.append('state', input.state);
            formData.append('syllabus', input.syllabus);
            formData.append('urlYoutube', input.urlYoutube);
            formData.append('categoryId', String(input.categoryId));

            if (input.image) {
                formData.append('', input.image);
            }
            const response = await axios.post('https://juntxs.vercel.app/programs', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response) {
                location.reload();
                closeModal();
            }
        } catch (error) {
            console.log(error);
        }
    };

     if (!modal) {
        return null
    }

    return (
        <div className={style.background}>
            <div className={style.container}>
                <div className={style.createProjectAndCloseModal}>
                    <h1>Crear Proyecto</h1>
                    <button onClick={closeModal}>X</button>
                </div>
                <div>
                    <form action="" className={style.form}>
                        <div className={style.inputsContainer}>
                            <div className={style.labelInput}>
                                <label htmlFor="" >Nombre</label>
                                <input className={style.input} type="text" name="name" value={input.name} onChange={handleChange} />
                            </div>
                            <div className={style.labelInput}>
                                <label htmlFor="" >Descripción</label>
                                <input className={style.input} type="text" name="description" value={input.description} onChange={handleChange} />
                            </div>
                        </div>
                        <div className={style.inputsContainer}>
                            <div className={style.labelInput}>
                                <label htmlFor="" >Objetivo</label>
                                <input className={style.input} type="text" name="objective" value={input.objective} onChange={handleChange} />
                            </div>
                            <div className={style.labelInput}>
                                <label htmlFor="" >Syllabus</label>
                                <input className={style.input} type="text" name="syllabus" value={input.syllabus} onChange={handleChange} />
                            </div>
                        </div>
                        <div className={style.inputsContainer}>
                            <div className={style.labelInput}>
                                <label htmlFor="" >URL YouTube</label>
                                <input className={style.input} type="text" name="urlYoutube" value={input.urlYoutube} onChange={handleChange} />
                            </div>
                            <div className={style.labelInput}>
                                <label htmlFor="" >Imagen</label>
                                <input type="file" onChange={handleFileChange} />
                            </div>
                        </div>
                    </form>

                    <button onClick={() => handleSubmit()}>Crear Proyecto</button>
                </div>
            </div>
        </div>
    )
}

export default CreateProject