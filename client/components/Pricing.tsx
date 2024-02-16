import Image from "next/image";
import Check from "../public/assets/check.svg";

const Pricing = () => {
  return (
    <div className="py-[48px] lg:py-[60px]">
      <h1 className="text-[#172026] text-center font-medium  text-2xl lg:text-[42px]">
        Planes de Apoyo Social Flexibles
      </h1>
      <p className="pt-[16px] pb-[40px] text-center text-[#36485C] lg:text-[18px]">
        El mejor acompañamiento para tu crecimiento personal y profesional!
      </p>

      <div className="flex flex-col gap-y-6 gap-x-[24px] lg:flex-row">
        <div className="w-full rounded-[8px] bg-[#F5F4FF] p-6 flex flex-col lg:justify-between">
          <div>
            <h3 className="font-medium text-[#4328EB] text-[18px] lg:text-xl">
              Donaciones
            </h3>
            <p className="pt-[12px] text-[#36485C] lg:text-[18px]">
              Dona y colabora con el proyecto
            </p>

            <h2 className="pt-4 text-2xl font-medium lg:text-[32px]">
              0$<span className="text-[#5F7896]">/mo</span>
            </h2>

            <ul className="flex flex-col gap-y-2 pt-4 text-[#5F7896]">
              <li className="flex items-center gap-x-2">
                <span>
                  <Image src={Check} alt="included" />
                </span>
                Donación periódica
              </li>
              <li className="flex items-center gap-x-2">
                <span>
                  <Image src={Check} alt="included" />
                </span>
                Donación puntual.
              </li>
              <li className="flex items-center gap-x-2">
                <span>
                  <Image src={Check} alt="included" />
                </span>
                Donación en Especies
              </li>
            </ul>
          </div>
          <button className="mt-[16px] rounded-[4px] bg-white py-[14px] text-[#4328EB] font-medium">
            Dona!
          </button>
        </div>

        <div className="w-full rounded-[8px] bg-[#4328EB] p-6 flex flex-col">
          <div>
            <h3 className="font-medium text-white text-[18px] lg:text-xl">
              Servicios
            </h3>
            <p className="pt-[12px] text-[#F4F8FA] lg:text-[18px]">
              Busca tu experiencia ideal
            </p>

            <h2 className="pt-4 text-2xl font-medium text-white lg:text-[32px]">
              500$<span className="text-[#F4F8FA]">/mo</span>
            </h2>

            <ul className="flex flex-col gap-y-2 pt-4 text-[#F4F8FA]">
              <li className="flex items-center gap-x-2">
                <span>
                  <Image src={Check} alt="included" />
                </span>
                Encuentra tu coaching personalizado
              </li>
              <li className="flex items-center gap-x-2">
                <span>
                  <Image src={Check} alt="included" />
                </span>
                Puedes integrar un coaching grupal
              </li>
              <li className="flex items-center gap-x-2">
                <span>
                  <Image src={Check} alt="included" />
                </span>
                Tu taller de crecimiento personal y profesional
              </li>
              <li className="flex items-center gap-x-2">
                <span>
                  <Image src={Check} alt="included" />
                </span>
                Tu retiro espiritual y de bienestar
              </li>
              {/* <li className="flex items-center gap-x-2">
                <span>
                  <Image src={Check} alt="included" />
                </span>
                Lorem ipsum dolor sit amet
              </li> */}
            </ul>
          </div>
          <button className="mt-[16px] rounded-[4px] bg-white py-[14px] text-[#4328EB] font-medium">
            Consulta aqui!
          </button>
        </div>

        <div className="w-full rounded-[8px] bg-[#F5F4FF] p-6 flex flex-col lg:justify-between">
          <div>
            <h3 className="font-medium text-[#4328EB] text-[18px] lg:text-xl">
              Empresa
            </h3>
            <p className="pt-[12px] text-[#36485C] lg:text-[18px]">
              Tu servicio empresarial ideal
            </p>

            <h2 className="pt-4 text-2xl font-medium lg:text-[32px]">Custom</h2>

            <p className="pt-4 text-[16px] text-[#36485C]">
              Consulta por asesoramiento gratuito
            </p>
            <p className="pt-2 text-[16px] text-[#36485C]">
              Armamos tu plan de asesoramiento y coaching para tratar temas puntuales en tu empresa
            </p>
          </div>
          <button className="mt-[16px] rounded-[4px] bg-white py-[14px] text-[#4328EB] font-medium">
            Contactanos
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing