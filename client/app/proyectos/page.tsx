// @ts-nocheck
"use client";

import style from "./proyectos.module.css";
import axios from "axios";
import AllCards from "@/components/allCardsComponent/allCards";
import { useEffect, useState } from "react";

const Proyectos = () => {
  const urlGlobal = "https://juntxs.vercel.app/";

  //El Backup de projects
  const [allProjects, setAllProjects] = useState([]);
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [name, setName] = useState("");

  const fetchProjects = async () => {
    try {
      let response;
      if (name) {
        response = await axios.get(
          `https://juntxs.vercel.app/programs?name=${name}`
        );
      } else {
        response = await axios.get(
          `${urlGlobal}programs/pagination?page=${currentPage}`
        );
      }
      setProjects(response.data);
      if (allProjects.length === 0) {
        setAllProjects(response.data);
      }
    } catch (error) {
      console.error(
        "Error fetching projects:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [currentPage, name]);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    console.log(name);
  };

  const filterStatus = (selectedFilter) => {
    let projectsToFilter = allProjects.length > 0 ? allProjects : projects;
    let filteredProjects = [];


    if (selectedFilter === "Activo") {
      filteredProjects = projectsToFilter.filter(
        (project) => project.state === "Activo"
      );
    } else if (selectedFilter === "Inactivo") {
      filteredProjects = projectsToFilter.filter(
        (project) => project.state === "Inactivo"
      );
    } else if (selectedFilter === "") {
      setProjects(allProjects.length > 0 ? allProjects : projects);
      return;
    }

    setProjects(filteredProjects);
  };

  // const orderAB = (e) => {
  //   if (e.target.name === "AZ") {
  //     const sortedProjects = [...projects].sort((a, b) =>
  //       a.name.localeCompare(b.name)
  //     );
  //     setProjects(sortedProjects);
  //   } else if (e.target.name === "ZA") {
  //     const sortedProjects = [...projects].sort((a, b) =>
  //       b.name.localeCompare(a.name)
  //     );
  //     setProjects(sortedProjects);
  //   }
  // };
  const orderAB = (selectedOption) => {
    if (selectedOption === "AZ") {
      const sortedProjects = [...projects].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setProjects(sortedProjects);
    } else if (selectedOption === "ZA") {
      const sortedProjects = [...projects].sort((a, b) =>
        b.name.localeCompare(a.name)
      );
      setProjects(sortedProjects);
    }
  };

  const orderDate = (selectedOption) => {
    if (selectedOption === "Nuevas") {
      const sortedProjects = [...projects].sort(
        (a, b) => new Date(b.dateIn) - new Date(a.dateIn)
      );
      setProjects(sortedProjects);
    } else if (selectedOption === "Antiguas") {
      const sortedProjects = [...projects].sort(
        (a, b) => new Date(a.dateIn) - new Date(b.dateIn)
      );
      setProjects(sortedProjects);
    }
  };

  return (
    <>
      <div className=" flex flex-col justify-center mb-8">
        <div className="text-2xl mt-10 text-left ml-[120px] md:ml-28 ">
          <div className=" text-2xl font-semibold mb-6 lg:mb-8 text-center lg:text-left text-gray-600 border-t-4 w-[9rem]  border-[#7286ff]">
            PROYECTOS
          </div>
        </div>
        <div className="text-sm md:text-lg mt-1 text-left ml-10 md:ml-28  w-10/12 md:w-3/4 italic text-gray-600 mb-10">
          Nuestra ONG promueve inteligencia emocional con proyectos educativos y
          eventos comunitarios.
        </div>
      </div>
      <div className=" box-border flex items-center justify-center flex-col gap-36 md:gap-24  w-full overflow-x-hidden pb-40 mx-auto ">
        <div className="w-screen h-10 md:h-28  flex justify-center items-center">
          <div className="w-5/6 md:w-3/5  h-full">
            <div className=" flex flex-col md:justify-between md:items-center w-full h-full gap-2">
              <div className="w-full h-1/12 md:shadow-lg" style={{}}>
                <input
                  type="text"
                  value={name}
                  onChange={handleSearchChange}
                  placeholder="Buscar Proyectos"
                  className="border-[#7286ff] border-2 w-full p-3 rounded-md"
                />
              </div>
              <div className="w-full h-full flex gap-3 md:gap-6 ">
                <div className=" w-1/3 ">
                  <select
                    className="rounded-md  border h-full text-[12px] md:text-sm w-full pl-1 text-gray-400 border-[#7286ff] bg-white"
                    onChange={(e) => orderAB(e.target.value)}
                  >
                    <option value="" disabled selected>
                      Ordenar A-Z
                    </option>
                    <option value={null} className="">
                      
                    </option>
                    <option value="AZ">AZ↑</option>
                    <option value="ZA">ZA↓</option>
                  </select>
                </div>
                <div className="border w-1/3 h-full">
                  <select
                    name=""
                    id=""
                    className="rounded-md  border h-full text-[12px] md:text-sm w-full pl-1 text-gray-400 border-[#7286ff] bg-white"
                    onChange={(e) => orderDate(e.target.value)}
                  >
                    <option value="" disabled selected>
                      Orden Fecha
                    </option>
                    <option value={null} className="">
                      
                    </option>
                    <option value="Nuevas">Nuevas</option>
                    <option value="Antiguas">Antiguas</option>
                  </select>
                  {/* 
                <label htmlFor="">Orden por Lanzamiento</label>
                <button
                  className="rounded-md bg-slate-100 border"
                  name="Nuevas"
                  onClick={orderDate}
                >
                  Nuevas
                </button>
                <button
                  className="rounded-md bg-slate-100 border"
                  name="Antiguas"
                  onClick={orderDate}
                >
                  Antiguas
                </button> */}
                </div>
                <div className=" w-1/3 flex">
                  <div className="w-full">
                    <select
                      name=""
                      id=""
                      className="rounded-md  border h-full text-[12px] md:text-sm w-full pl-1 text-gray-400 border-[#7286ff] bg-white"
                      onChange={(e) => filterStatus(e.target.value)}
                    >
                      <option value="" disabled selected>
                        Filtro Estado:
                      </option>
                      <option value="" className="">
                        -Mostrar Todos-
                      </option>
                      <option value="Activo">Activo</option>
                      <option value="Inactivo">Inactivo</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AllCards projects={projects} />

        <div className="flex justify-center items-center gap-6">
          <button
            className=""
            name="prev"
            onClick={() => paginado(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ᐗ
          </button>
          <span>{currentPage}</span>
          <button
            className="home-button-logic"
            name="next"
            onClick={() => paginado(currentPage + 1)}
          >
            ᐓ
          </button>
        </div>
      </div>
    </>
  );
};

export default Proyectos;
