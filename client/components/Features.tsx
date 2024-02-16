"use client"
import Image from "next/image";
import Feature1 from "../public/assets/feature-1.svg";
import Feature2 from "../public/assets/feature-2.svg";
import Feature3 from "../public/assets/feature-3.svg";
import Check from "../public/assets/check.svg";
import bluebutton from "../public/assets/blue-button.svg";
import greenButton from "../public/assets/green-button.svg";
import pinkButton from "../public/assets/pink-button.svg";
import Link from "next/link";
import { CldImage } from "next-cloudinary";

const Features = () => {
  return (
   <div className="flex flex-col gap-y-[56px] py-[56px] lg:py-[120px] lg:gap-y-[80px] " style={{ marginTop: "50px "}}  >
       <div className="flex flex-col gap-x-6 sm:flex-row-reverse" >
        <CldImage
          width="350"
          height="250"
          src="ztsviiega8esbylzuefu_b72pue_-_Profile_Picture_yhnpv3" 
          
          alt="imagen cloudinary"
          className="hidden w-1/2 sm:block rounded-md" style={{borderRadius: "20px" }}
         
        />
        <div className="sm:w-1/2 lg:py-[56px] lg:pr-[56px]">
          <h3 className='font-medium text-[#7286ff] lg:text-[18px] '>
          Proyectos de Ayuda
          </h3>
          <h1 className="pt-[12px] text-2xl font-medium text-[#0085FF] lg:text-[42px] lg:leading-[58px]">
            Simplifica tu vida Apoya
          </h1>
          <CldImage
          width="350"
          height="250"
          src="ztsviiega8esbylzuefu_b72pue_-_Profile_Picture_yhnpv3" 
          
            alt="feature 1 image"
            className="pt-[24px] sm:hidden"
          />
          <p className="py-[24px] text-[#36485C] lg:text-[18px]">
            Optimiza tus proyectos de ayuda con nuestras funcionalidades
            innovadoras. Mantente informado y lleva un control detallado de los
            proyectos que brindamos para hacer un impacto significativo en
            nuestras iniciativas de ayuda.
          </p>

          <ul className="flex flex-col gap-y-3 lg:text-[18px]">
            <li className="flex items-center gap-x-2 text-[#36485C]">
              <span>
                <Image src={Check} alt="Checkmark" />
              </span>
              Personalized Coaching/Mentorship
            </li>
            <li className="flex items-center gap-x-2 text-[#36485C]">
              <span>
                <Image src={Check} alt="Checkmark" />
              </span>
              Workshops
            </li>
            <li className="flex items-center gap-x-2 text-[#36485C]">
              <span>
                <Image src={Check} alt="Checkmark" />
              </span>
              Retreats
            </li>
          </ul>

          <p className="flex items-center gap-x-2 pt-[24px] font-medium text-[#7286ff] lg:text-[18px]">
            <Link href="/proyectos"> Learn More </Link>
            <span>
              <Image src={bluebutton} alt="Learn more" />
            </span>
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-x-6 sm:flex-row">
        <CldImage
          src="https://res.cloudinary.com/dwhgyy4wl/image/upload/v1707082578/lmlhubbsuurporzhywne_edebky.jpg"
          width="350"
          height="350"
          alt="Feature 1 image"
          className="hidden w-1/2 sm:block rounded-md" style={{borderRadius: "20px"}}
        />
        <div className="sm:w-1/2 lg:py-[56px] lg:pl-[56px]">
          <h3 className="font-medium text-[#00A424] lg:text-[18px] ">
            Donaciones Inmediatas
          </h3>
          <h1 className="pt-[12px] text-2xl font-medium text-[#7286ff] lg:text-[42px] lg:leading-[58px]">
            Al ayudar a otros te ayudas a ti mismo
          </h1>
          <CldImage
            src="https://res.cloudinary.com/dwhgyy4wl/image/upload/v1707082578/lmlhubbsuurporzhywne_edebky.jpg"
            width="350"
            height="350"
            alt="Feature 1 image"
            className="pt-[24px] sm:hidden"
          />
          <p className="py-[24px] text-[#36485C] lg:text-[18px]">
            Ayuda a crear un cambio positivo. Tu generosidad cuenta. Dona hoy y
            contribuye a hacer del mundo un lugar mejor. Toda ayuda es aceptada
          </p>

          <ul className="flex flex-col gap-y-3 lg:text-[18px]">
            <li className="flex items-center gap-x-2 text-[#36485C]">
              <span>
                <Image src={Check} alt="Checkmark" />
              </span>
              Recurrente
            </li>
            <li className="flex items-center gap-x-2 text-[#36485C]">
              <span>
                <Image src={Check} alt="Checkmark" />
              </span>
              En especie
            </li>
            <li className="flex items-center gap-x-2 text-[#36485C]">
              <span>
                <Image src={Check} alt="Checkmark" />
              </span>
              Corporativa
            </li>
          </ul>

          <p className="flex items-center gap-x-2 pt-[24px] font-medium text-[#00A424] lg:text-[18px]">
            <Link href="/donaciones">Learn More </Link>
            <span>
              <Image src={greenButton} alt="Learn more" />
            </span>
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-x-6 sm:flex-row-reverse">
        <CldImage
          src="zzkt0mrazqfijnxfy0sm"
          width="350"
          height="350"
          alt="Feature 1 image"
          className="hidden w-1/2 sm:block rounded-md" style={{borderRadius: "20px"}}
        />
        <div className="sm:w-1/2 lg:py-[56px] lg:pr-[56px]">
          <h3 className="font-medium text-[#7286ff] lg:text-[18px] ">
            Servicios de Desarrollo Personal
          </h3>
          <h1 className="pt-[12px] text-2xl font-medium text-[#EB2891] lg:text-[42px] lg:leading-[58px]">
            Crece con Nosotros
          </h1>
          <CldImage
            src="zzkt0mrazqfijnxfy0sm"
            width="350"
            height="350"
            alt="feature 1 image"
            className="pt-[24px] sm:hidden"
          />
          <p className="py-[24px] text-[#36485C] lg:text-[18px]">
            Explora tu mejor versión con nuestro servicio de desarrollo
            personal. Coaching, retiros espirituales y talleres diseñados para
            potenciar tu crecimiento y bienestar. Únete a nosotros en esta
            travesía hacia una vida más plena.
          </p>

          <div className="flex w-full gap-x-[24px] ">
            <div className="w-1/2 flex flex-col gap-y-3">
              <h3 className="text-[20px] font-medium text-[#172026]">100+</h3>
              <p className="text-[#36485C] ">empresas ayudando</p>
            </div>
            <div className="w-1/2 flex flex-col gap-y-3">
              <h3 className="text-[20px] font-medium text-[#172026]">800+</h3>
              <p className="text-[#36485C]">Conse adipiscing elit</p>
            </div>
          </div>

          <p className="flex items-center gap-x-2 pt-[24px] font-medium text-[#7286ff] lg:text-[18px]">
            <Link href="/servicios"> Learn More </Link>
            <span>
              <Image src={pinkButton} alt="Learn more" />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;

