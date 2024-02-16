'use client';
import { useState, useEffect } from "react";
import ProjectsOption from "./ProyectosDonaciones";


interface Project {
    id: number;
    name: string;
    // Add more properties if needed
}

interface ProjectsOptionProps {
    onProjectChange: (projectId: number) => void;
}

const ProjectsSelect: React.FC<ProjectsOptionProps> = ({ onProjectChange }) => {

    const [projects, setProjects] = useState<Project[]>([]);
    // const proyectsFetch: any = (await axios.get(`${urlGlobal}programs/pagination`)).data

    useEffect(() => {
        const fetchProjects = async () => {
            const projectsFetch = await ProjectsOption();
            setProjects(projectsFetch);
        };

        fetchProjects();
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onProjectChange(Number(event.target.value));
    };

    return (
        <select
            className="bg-blue-50 rounded-lg"
            onChange={handleChange}
        >
            <option value="" selected hidden>
                Selecciona un proyecto
            </option>
            {projects.map((project, index) => (
                <option key={index} value={project.id}>
                    {project.name}
                </option>
            ))}
        </select>
    )
}


export default ProjectsSelect;