"use client";

import Donaciones from "../../public/assets/donaciones-icon.svg";
import React, { useState, useEffect } from "react";
import RedirectPage from "@/components/elegirDonacion/elegirDonacion";
import Image from "next/image";
import Link from "next/link";

const DonacionesPage: React.FC = () => {
  const [donationStarted, setDonationStarted] = useState(false);

  const handleStartDonation = () => {
    setDonationStarted(true);
  };

  useEffect(() => {
    if (window) {
      console.log("Running on the client side");
    }
  }, []);

  return (
    <div>
      <div>
        <div className="w-screen h-auto border-2 flex justify-center items-center">
          {!donationStarted ? (
            // <div className="w-11/12 border-2 border-blue-400 rounded-2xl shadow-2xl flex py-4 md:py-8 lg:py-12 bg-blue-600">
            <div className="w-11/12 border-2 border-blue-400 rounded-2xl shadow-2xl flex flex-col items-center text-center py-4 md:py-8 lg:py-12 md:flex-row">
              <div className="w-2/3 h-full flex justify-center">
                <div className=" w-3/4 h-full flex flex-col justify-center gap-10">
                  <div className="text-4xl ">Donaciones</div>
                  <div className="text-lg sm:text-2xl">
                    Gracias por tu granito de arena, podrás hacerlo
                    de forma anónima, o si prefieres puedes{" "}
                    <Link href="/pages/signup" className="text-[#7286FF]">
                      registrarte
                    </Link>{" "}
                    o{" "}
                    <Link href="/pages/signin" className="text-[#7286FF]">
                      ingresar
                    </Link>{" "}
                    primero. Tendrás 3 opciones para donar: única, en
                    especie y corporativo, elige con el que desees colaborar
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={handleStartDonation}
                      className="bg-[#7286FF] w-full text-white px-12 rounded-lg cursor-pointer animate-pulse-custom"
                      style={{ padding: "12px 24px" }}
                    >
                      Comenzar
                    </button>
                  </div>
                </div>
              </div>

              <div className=" w-1/3 h-full overflow-hidden flex justify-center items-center">
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
            </div>
          ) : (
            <RedirectPage />
          )}
        </div>
      </div>
    </div>
  );
};

export default DonacionesPage;
