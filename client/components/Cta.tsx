import Image from "next/image";
import Arrow from "../public/assets/arrow.png";
import Link from "next/link";

const Cta = () => {
  return (
    <div className="w-full rounded-[16px] bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 py-[56px] px-[32px] text-center lg:my-[60px] lg:px-[324px] lg:py-[89px]">
      <h1 className="text-white text-[32px] font-medium lg:text-[56px] leading-[64px] ">
        Descubramos Juntxs
      </h1>
      <p className="text-white pt-6 lg:pt-[48px] lg:text-[18px] ">
        Ayudando a mas de 1000+ familias peruanas que lo necesitaban desde el 2023
      </p>

      <div className="mt-[40px] flex flex-col w-full items-center lg:mt-[56px] lg:flex-row lg:justify-center gap-x-[40px]">
        <button className="py-[16px] px-[32px] bg-white rounded-[4px] text-[#7286ff] w-fit font-medium">
          <Link href='donaciones'> Dona</Link>
        </button>

        <button className="flex w-full items-center justify-center  gap-x-3 mt-[32px] text-white font-medium lg:w-fit lg:mt-0">
          <Link href='contacto'>Contactanos{" "}</Link>
          <span>
            <Image src={Arrow} alt="Learn More" />
          </span>
        </button>
      </div>
    </div>
  );
}

export default Cta;