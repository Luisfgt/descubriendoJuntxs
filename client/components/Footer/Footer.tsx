import Image from "next/image";
// import Logo from "../../public/assets/LOGO - NORMAL.svg";
import Logo from "../../public/assets/Logo-Nombre.svg";
import Facebook from "../../public/assets/Facebook.svg";
import Linkedin from "../../public/assets/Linkedin.svg";
import Link from "next/link";
import Tiktok from "../../public/assets/Tiktok.svg";
import Instagram from "../../public/assets/Instagram.svg";
import Youtube from "../../public/assets/Youtube.svg";

const Footer = () => {
  return (
    <div className="pt-[40px] pb-[40px]">
      <div className="flex items-center justify-center gap-x-[12px]">
        <Image src={Logo} alt="Logo" />
        <p className="font-bold text-[#36485C] text-[17px]"></p>
      </div>

      <p className="pt-[56px] text-center text-[14px] font-medium text-[#7286ff] sm:pt-5">
        © Copyright 2024. Descubriendo Juntxs. Todos los derechos reservados.
      </p>

      <div className="flex items-center justify-center gap-x-[56px] pt-[40px]">
        <a href="https://www.facebook.com/people/Descubriendo-Juntxs/100083237715538/?mibextid=LQQJ4d" target="_blank">
          <Image src={Facebook} alt="Facebook" />
        </a>
        <a href="https://www.linkedin.com/company/descubriendo-juntxs/" target="_blank">
          <Image src={Linkedin} alt="Linkedin" />
        </a>
        <a href="https://www.tiktok.com/@descubriendojuntxs" target="_blank">
          <Image src={Tiktok} alt="Tiktok" />
        </a>
        <a href="https://www.instagram.com/descubriendojuntxs/" target="_blank">
          <Image src={Instagram} alt="Instagram" />
        </a>
        <a href="https://www.youtube.com/channel/UCryZ0iZXr3HSkKcJR14_LAg" target="_blank">
          <Image src={Youtube} alt="Youtube" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
