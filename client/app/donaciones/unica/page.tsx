"use client";
import Image from "next/image";
import React, { useState, FormEvent, ChangeEvent } from "react";
import Donaciones from "../../../public/assets/donaciones-icon.svg";
import axios from "axios";
import ProjectsSelect from "@/components/Donaciones/ListaProyectos/SelectProyectos";
import { useAuthContext } from "@/app/contexto/AuthContext";

interface FormData {
  programId: number;
  amount: number;
  // type: string;
  message: string;
  contact_phone: string | null;
  contact_email: string | null;
  userId: number | null;
}

const DonacionesRecurrentesPage: React.FC = () => {

  const { logged, infoUserGlobal } = useAuthContext()
  const infoUserParsed = JSON.parse(infoUserGlobal ?? '')

  const [formData, setFormData] = useState<FormData>({
    programId: 0,
    amount: 0,
    // type: "Recurrente",
    message: "",
    contact_email: logged ? infoUserParsed.email : '',
    contact_phone: logged ? infoUserParsed.phone : '',
    userId: logged ? infoUserParsed.id : null,
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let value =
      (e.target.name === "programId" || e.target.name === "amount") &&
        e.target.value !== ""
        ? +e.target.value
        : e.target.value;
  
    if (e.target.name === "amount") {
      const numericValue = Number(value);
      if (numericValue < 100) {
        alert("El monto no puede ser menor a 100");
        value = 100;
      } else if (numericValue > 10000) {
        alert("El monto no puede ser mayor a 10000");
        value = 10000;
      }
    }
  
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  // const handleChangeSelect = (
  //   e: ChangeEvent<HTMLSelectElement>
  // ): void => {
  //   const value =
  //     (e.target.name === "programId" || e.target.name === "amount") &&
  //       e.target.value !== ""
  //       ? +e.target.value
  //       : e.target.value;

  //   setFormData({
  //     ...formData,
  //     [e.target.name]: value,
  //   });
  // };

  const handleProjectChange = (projectId: number) => {
    setFormData({
      ...formData,
      programId: projectId,
    });
  };


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post<{ mensaje: string, init_point: string }>(
        "https://juntxs.vercel.app/payments",
        formData
      );
      const data = response.data
      console.log("Respuesta del servidor:", data);
      console.log(infoUserGlobal);

      window.open(data.init_point, '_blank');
      setSuccessMessage("¡Gracias por tu donacion! Por favor completa el pago en la ventana emergente.");

    } catch (error: any) {
      console.error("Error al enviar datos al servidor:", error.message);
    }
  };


  return (
    <div className="w-screen h-[80vh] flex justify-center items-center">
      <div className="w-11/12 h-5/6 border border-blue-400 rounded-2xl shadow-2xl flex justify-center">
        <div className="w-full h-full flex justify-center">
          <form
            action=""
            // className="w-full h-full  flex"
            className="w-full h-full flex flex-col items-center py-4 md:py-8 lg:py-12 md:flex-row gap-4 md:justify-center"
            onSubmit={handleSubmit}
          >
            {/* <div className=" w-4/6 h-full  flex flex-col justify-center"> */}
            <div className=" w-11/12 h-full  flex flex-col items-center md:flex-row md:items-center">
              <div className="w-full flex justify-center ">
                <div className=" w-2/3  flex flex-col justify-center">
                  <div className="w-full flex flex-col justify-center gap-7">
                    <div className="text-3xl">Donacion Única</div>

                    <div className="flex flex-col">
                      <div className="flex flex-col gap-2">
                        <label className="m-0">Proyecto:</label>
                        <ProjectsSelect onProjectChange={handleProjectChange} />
                        <button className="text-xs flex justify-end ">
                          {" "}
                          Ver proyecto{" "}
                        </button>
                      </div>
                    </div>

                    {/* <div className="w-full h-96 overflow-auto  bg-blue-50 rounded-lg p-4 scrollbar">
                      Descripción de la donación Aca tengo que agregar el texto
                      de la descripcion de la donacion.
          
                      Beneficios fiscales:
                      <ul>
                        <li>✓ Menos impuestos sobre el empleado</li>
                        <li>✓ Deducciones fiscales...</li>
                      </ul>
                    </div> */}

                    <div className=" ">
                      <label htmlFor="" className="">
                        Monto:
                      </label>
                      <input
                        type="number"
                        id="amount"
                        name="amount"
                        className="bg-blue-50 rounded-lg"
                        value={formData.amount}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      {successMessage && <div>{successMessage}</div>}
                    </div>

                    {/* <div className=" ">
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full h-16 rounded-lg bg-blue-50"
                        placeholder="Deja tu mensaje"
                      />
                    </div> */}

                    <div>
                      <button className="bg-[#7286FF] rounded-md p-3 text-white">
                        {" "}
                        Donar con Mercado Pago
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className=" w-2/6 h-full overflow-hidden flex justify-center items-center">
              <div className="flex justify-center items-center">
                <div className="flex justify-center items-center object-contain h-full w-full">
                  <Image
                    src={Donaciones}
                    alt=""
                    className="h-full"
                    objectFit="contain"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DonacionesRecurrentesPage;