"use client";
import Image from "next/image";
import LogoLetras from "../../public/assets/LOGO - NORMAL.svg";
import Logo from "../../public/assets/Logo-Nombre.svg";
import User from "../../public/assets/User.svg";
import Menu from "../../public/assets/Menu.svg";
import Link from "next/link";
import BlurArrow from "../../public/assets/blue-button.svg";
import { useEffect, useReducer, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import style from './navbar.module.css'
import { logout } from "@/app/firebase/auth/signOut";
import { useAuthContext } from "@/app/contexto/AuthContext";
import { useRouter } from "next/navigation";
import PerfilTogle from '../PerfilToggle/PerfilTogle';

const navLinks = [
  { name: "Inicio", href: "/" },
  { name: "Proyectos", href: "/proyectos" },
  { name: "Donaciones", href: "/donaciones" },
  { name: "Servicios", href: "/servicios" },
  { name: "Contacto", href: "/contacto" },
];

const navLinksNoLogged = [
  { name: "Inicio", href: "/" },
  { name: "Proyectos", href: "/proyectos" },
  { name: "Donaciones", href: "/donaciones" },
  { name: "Servicios", href: "/servicios" },
  { name: "Contacto", href: "/contacto" },
  { name: "Ingreso", href: "/pages/signin" },
  { name: "Registro", href: "/pages/signup" },
];

const Navbar = () => {
  const { logged, logoutReal, infoUserGlobal }: any = useAuthContext()
  const [toggle, setToggle] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const path = usePathname()
  console.log(path);
  const componentRef: any = useRef(null)

  const handleClickOutside = (event: any) => {
    if (componentRef.current && !componentRef.current.contains(event.target)) {
      setToggle(false)
    }
  }

  const infoUserParse = JSON.parse(infoUserGlobal)
  const typeUser: string = infoUserParse?.role

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }

  }, [])


  const handlerMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  console.log(logged);

  return (


    <nav className={path.includes('/pages/user') || path.includes('/pages/admin') ? 'flex w-full bg-white items-center justify-between px-[20px] py-[16px]  lg:mx-auto lg:px-15 shadow-custom fixed z-[1000]' : "flex w-full bg-white items-center justify-between px-[20px] py-[16px] lg:mx-auto lg:px-15"} >
      <div className="flex items-center">
        <Image src={Logo} alt="Logo" />

        <div className="hidden lg:flex pl-[74px] gap-x-[36px]">
          {navLinks.map((item, index) => (
            <Link key={index} href={item.href}>
              <p className="text-[#36485C] font-medium">
                {item.name}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-x-5 justify-center">
        {logged === 'false' && <div className="flex items-center gap-x-5">
          <p className="hidden lg:block font-medium text-[#36485C] pr-[10px]">
                <Link href="/pages/signin">Ingreso</Link>
          </p>

          <div className="flex items-center gap-x-2 justify-center">
            <span className="hidden font-medium text-[#fff] lg:block rounded-lg py-3 px-10 text-center" style={{ backgroundColor: "#7286ff" }} >
              <Link href='/pages/signup'>
                Registro
              </Link>
            </span>
          </div>
        </div>}
        {logged === 'true' &&
          <div className="flex items-center gap-x-2 justify-center">
            {/* <div>{user.displayname}</div> */}
            <div
              ref={componentRef}

              className="flex max-h-4 w-10 h-10 max-w-10 justify-center items-center">
              
              <div
                onClick={() => !toggle ? setToggle(true) : setToggle(false)}
                className="flex w-8 h-8 bg-slate-600 rounded-[100%] cursor-pointer">
    
              </div>
              <div
                className="w-fit h-fit z-20">
                <PerfilTogle
                  toggle={toggle}
                  logOut={() => {
                    logout()
                    logoutReal()
                  }}
                  closeToggle={() => setToggle(false)}
                  userType={typeUser}
                />
              </div>
            </div>
            {/* <div className="text-[#FF72D7]" style={{ cursor: 'pointer' }} onClick={async () => {

              await logout()
              return router.push('/userIn')
            }}>
              log out
            </div> */}
          </div>
        }


        <div className="lg:hidden cursor-pointer" onClick={handlerMenu}>
          <Image
            src={Menu}
            alt="Menu Button"
            className="lg:hidden cursor-pointer"
          />
        </div>
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 bg-white z-50">
            <div className="flex flex-col items-center justify-center h-full">
              <div className=" pointer">
                <Link
                  href=""
                  onClick={handlerMenu}
                  className="absolute top-16 left-16 text-3xl  rounded-full  text-center"
                >
                  <Image src={Logo} alt="Logo" className="" />
                </Link>
              </div>

              <div className=" pointer">
                <Link
                  href=""
                  onClick={handlerMenu}
                  className="absolute top-16 right-16 text-3xl border rounded-full h-[40px] w-[40px] text-center"
                >
                  <Image src={BlurArrow} alt="Learn more" className="w-full" />
                </Link>
              </div>
              {logged 
                ? navLinks.map((item, index) => (
                  <Link href={item.href} key={index} onClick={handlerMenu}>
                    <p className="text-[#7286ff] font-medium py-8">{item.name}</p>
                  </Link>
                ))
                
                : navLinksNoLogged.map((item, index) => (
                <Link href={item.href} key={index} onClick={handlerMenu}>
                  <p className="text-[#7286ff] font-medium py-8">{item.name}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;