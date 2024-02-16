"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import Gradient from "../../public/assets/Gradient.svg";
import email from "../../public/assets/icon-mail.svg";
import location from "../../public/assets/item-location.svg";
import phone from "../../public/assets/item-phone.svg";
import axios from "axios";
import { useState } from "react";

const Contacto: React.FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const onSubmit = async (data: any) => {
    try {
      console.log(data);
      const response = await axios.post(
        "https://juntxs.vercel.app/nodemailer",
        data
      );

      if (response.data.message === "Email sent successfully!") {
        setSuccessMessage('¡Recibimos tu mensaje! Pronto te daremos respuesta.')
        reset()
      }

      console.log("Respuesta del servidor:", response.data);
    } catch (error: any) {
      console.error("Error al enviar datos al servidor:", error.message);
    }
  };

  return (
    <div className="min-h-screen overflow">
      <div className="text-2xl mt-10 text-left ml-28 text-[#7286ff]">
        <div className=" text-2xl font-semibold mb-6 lg:mb-8 text-center lg:text-left text-gray-600 border-t-4 w-1/6  border-[#7286ff]">
          CONTACTANOS
        </div>
      </div>
      <div className="flex md:flex-row justify-center w-screen">
        <div className="flex justify-center md:justify-normal relative w-5/6 ">
          <div className="w-full lg:w-3/5 lg:border-[6px] lg:rounded-2xl lg:border-[#7286ff] md:h-full md:relative ">
            {/* div 1 */}
            <div className="w-full lg:w-9/12 p-4 lg:p-8 mt-2 border-[#7286ff] border-[6px] rounded-2xl md:border-[0px]">
              <form
                action=""
                id="form"
                onSubmit={handleSubmit(onSubmit)}
                autoComplete=""
              >
                <div className="flex flex-col-reverse my-3">
                  <input
                    type="text"
                    id="name"
                    placeholder="Ingresa tu nombre completo"
                    {...register("nombre", {
                      required: true,
                      pattern: /^[a-zA-Z]+(?: [a-zA-Z]+)*$/,
                    })}
                    className="border rounded p-1 text-sm placeholder-zinc-300"
                  />

                  <label htmlFor="name" className=" flex text-sm">
                    <div className="mr-1 text-slate-600">Nombre </div>{" "}
                    <div className="text-slate-600"> Completo</div>
                    <span className="w-full flex justify-end items-center">
                      {errors.nombre?.type === "required" && (
                        <span className="text-red-600 text-[12px] ">
                          Nombre es requerido
                        </span>
                      )}
                      {errors.nombre?.type === "pattern" && (
                        <p className="text-red-600 text-[12px]">
                          Ingrese tu Nombre y Apellido
                        </p>
                      )}
                    </span>
                  </label>
                </div>

                <div className="flex flex-col-reverse my-3">
                  <input
                    type="email"
                    id="email"
                    placeholder="Direccion de Correo Electronico"
                    {...register("correo", {
                      required: true,
                      pattern: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                    })}
                    className="border rounded p-1 text-sm placeholder-zinc-300"
                  />

                  <label
                    htmlFor="email"
                    className="flex text-sm text-slate-600"
                  >
                    Correo{" "}
                    <span className="w-full flex justify-end items-center">
                      {errors.correo?.type === "pattern" && (
                        <span className="text-red-600 text-[12px]">
                          El Email es incorrecto
                        </span>
                      )}
                      {errors.correo?.type === "required" && (
                        <span className="text-red-600 text-[12px]">
                          Email es requerido{" "}
                        </span>
                      )}
                    </span>
                  </label>
                </div>

                <div className="flex flex-col-reverse my-3">
                  <input
                    type="text"
                    id="telephone"
                    placeholder="Numero Telefónico"
                    {...register("celular", {
                      required: true,
                      pattern: /^(\+\d{1,2}|(\(\d{1,4}\)))?\d{5,15}$/,
                    })}
                    className="border rounded p-1 text-sm placeholder-zinc-300"
                  />

                  <label
                    htmlFor="telephone"
                    className="flex text-sm text-slate-600"
                  >
                    Celular{" "}
                    <span className="w-full flex justify-end">
                      {errors.celular?.type === "required" && (
                        <span className="text-red-600 text-[12px]">
                          Celular es requerido{" "}
                        </span>
                      )}
                    </span>
                  </label>
                </div>

                <div className="flex flex-col-reverse my-3">
                  <input
                    type="text"
                    id="asunto"
                    placeholder="Asunto del mensaje"
                    {...register("asunto", {
                      required: true,
                    })}
                    className="border rounded p-1 text-sm placeholder-zinc-300 "
                  />

                  <label
                    htmlFor="asunto"
                    className="flex  text-sm text-slate-600"
                  >
                    Asunto
                    <span className="w-full flex justify-end">
                      {errors.asunto?.type === "required" && (
                        <span className="text-red-600 text-[12px]">
                          Asunto es requerido{" "}
                        </span>
                      )}
                    </span>
                  </label>
                </div>

                <div className="flex flex-col-reverse my-3">
                  <textarea
                    id="mensaje"
                    cols={1}
                    rows={4}
                    placeholder="Escribenos todos los detalles de tu mensaje"
                    {...register("mensaje", {
                      required: true,
                    })}
                    className="border rounded p-1 text-sm placeholder-zinc-300"
                  ></textarea>

                  <label
                    htmlFor="mensaje"
                    className="flex text-sm text-slate-600"
                  >
                    Mensaje{" "}
                    <span className="w-full flex justify-end items-center">
                      {errors.asunto?.type === "required" && (
                        <span className="text-red-600 text-[12px]">
                          El Mensaje es requerido{" "}
                        </span>
                      )}
                    </span>
                  </label>
                </div>

                <div>
                  <input
                    type="submit"
                    value="Enviar"
                    className="cursor-pointer border rounded-md w-full lg:w-auto text-slate-600"
                  />
                </div>
              </form>
              {successMessage && <p>{successMessage}</p>}
            </div>

            {/* div 2 */}
            <div className="">
              <div className="absolute flex justify-start z-[1] -bottom-20 -right-96 ">
                <div className="relative animate-pulse-custom hidden lg:block">
                  <Image
                    src={Gradient}
                    alt="Gradient"
                    className="min-h-[500px] w-[450px] object-cover lg:h-auto rounded-2xl z-[2] rotate-90 "
                  />
                  <div className="z-[3] text-white absolute -top-14  transform translate-x-1/2 -translate-y-1/2 lg:flex-col lg:items-start ">
                    {/* <div className="z-[3] text-white absolute -top-14 transform translate-x-1/2 -translate-y-1/2 flex lg:static lg:flex-col lg:items-start"> */}
                    <div className="absolute">
                      <div className=" h-full flex justify-center items-start mt-28 ">
                        <div className="absolute left-1  w-[36vw] mt-10 ">
                          <div className="text-white text-2xl font-semibold  flex border-b-4 w-1/6 ml-2 border-[#7286ff] mb-16">
                            ENCUENTRANOS
                          </div>

                          <div className="ml-2  text-white text-sm font-light flex flex-col gap-8 ">
                            <div className=" flex ">
                              <a href="" className="flex justify-start ">
                                <div className="  rounded-full w-6 h-6 mr-4 flex justify-center items-center text-xl bg-white  ">
                                  <Image
                                    src={location}
                                    alt=""
                                    className="w-4 h-4"
                                  />
                                </div>
                                <div className="flex flex-col justify-start ">
                                  <div className="font-medium text-xl mb-2 flex">
                                    Descubriendo Juntxs
                                  </div>
                                  <div className="font-medium text-slate-200 flex  ">
                                    Dirección: Av. Ferrocarril 1068, el Tambo,
                                    Huancayo{" "}
                                  </div>
                                </div>
                              </a>
                            </div>
                            <div className="">
                              <a
                                href=""
                                className="flex justify-start items-center text-slate-200"
                              >
                                <div className=" rounded-full w-6 h-6 mr-4 flex justify-center items-center text-xl bg-white">
                                  <Image
                                    src={phone}
                                    alt=""
                                    className="w-4 h-4"
                                  />
                                </div>{" "}
                                <div className="font-medium text-slate-200">
                                  Telefono: + 51 991185371
                                </div>
                              </a>
                            </div>
                            <div className="">
                              <a
                                href=""
                                className="flex justify-start items-center text-slate-200"
                              >
                                <div className="  rounded-full w-6 h-6 mr-4 flex justify-center items-center text-xl bg-white ">
                                  <Image
                                    src={email}
                                    alt=""
                                    className="w-4 h-4"
                                  />
                                </div>
                                <div className="font-medium text-slate-200 ">
                                  Correo: descubriendojuntxs@gmail.com
                                </div>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* //mobile */}
              <div className=" animate-pulse-custom block lg:hidden">
                <div className="mt-20  ">
                  <Image
                    src={Gradient}
                    alt="Gradient"
                    className="h-[19rem]  object-cover  rounded-2xl  rotate-90 "
                  />
                </div>
                <div className=" text-white absolute -top-32  transform translate-x-1/2 -translate-y-1/2 lg:flex-col lg:items-start ">
                  {/* <div className="z-[3] text-white absolute -top-14 transform translate-x-1/2 -translate-y-1/2 flex lg:static lg:flex-col lg:items-start"> */}
                  <div className="absolute">
                    <div className=" h-full flex justify-center mt-28 ">
                      <div className="absolute left-1  w-[36vw] mt-8 ml-2 ">
                        <div className="text-white text-2xl font-semibold  flex border-b-4 w-4/6 ml-6 border-[#7286ff] mb-10">
                          ENCUENTRANOS
                        </div>

                        <div className="ml-6  text-white text-sm font-light flex flex-col gap-10 ">
                          <div className=" w-screen ">
                            <a href="" className="flex justify-start ">
                              <div className="  rounded-full w-4 h-4 mr-4 flex justify-center items-center text-xl bg-white  ">
                                <Image
                                  src={location}
                                  alt=""
                                  className="w-3 h-3"
                                />
                              </div>
                              <div className="flex flex-col ">
                                <div className="font-medium mb-2 flex">
                                  Descubriendo Juntxs
                                </div>
                                <div className=" text-slate-200 flex w-4/6 ">
                                  Dirección: Av. Ferrocarril 1068, el Tambo,
                                  Huancayo{" "}
                                </div>
                              </div>
                            </a>
                          </div>
                          <div className="w-screen">
                            <a
                              href=""
                              className="flex justify-start text-slate-200"
                            >
                              <div className=" rounded-full w-4 h-4 mr-4 flex justify-center items-center text-xl bg-white">
                                <Image src={phone} alt="" className="w-3 h-3" />
                              </div>{" "}
                              <div className="font-medium mb-2 flex pr-1">
                                Telefono:
                              </div>
                              <div className=" text-slate-200 flex w-full ">
                                +51 991185371
                              </div>
                            </a>
                          </div>
                          <div className="w-screen">
                            <a
                              href=""
                              className="flex justify-start text-slate-200"
                            >
                              <div className=" rounded-full w-4 h-4 mr-4 flex justify-center items-center text-xl bg-white ">
                                <Image src={email} alt="" className="w-3 h-3" />
                              </div>
                              <div className="font-medium mb-2 flex pr-1">
                                Correo:
                              </div>
                              <div className=" text-slate-200 flex w-full text-xs pt-[2px]">
                                descubriendojuntxs@gmail.com
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
