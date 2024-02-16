import Image from "next/image";
import Link from "next/link";
import Donaciones from "../../public/assets/donaciones-icon.svg";
import { useEffect, useState } from "react";

const RedirectPage: React.FC = () => {
  const [selectedDonationType, setSelectedDonationType] = useState<
    string | null
  >(null);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(true);

  const handleDonationTypeToggle = (donationType: string) => {
    if (selectedDonationType === donationType) {
      setSelectedDonationType(null);
    } else {
      setSelectedDonationType(donationType);
    }
  };

  useEffect(() => {
    setNextButtonDisabled(
      selectedDonationType !== "recurrente" &&
      selectedDonationType !== "en_especie" &&
      selectedDonationType !== "corporativa"
    );
  }, [selectedDonationType]);

  const linkPage = () => {
    if (selectedDonationType === "corporativa")
      return "/donaciones/corporativa";
    if (selectedDonationType === "en_especie") return "/donaciones/especie";
    if (selectedDonationType === "recurrente") return "/donaciones/unica";
    return "/donaciones/unica";
  };

  const finalUrl = linkPage();

  const buttonStyle = {
    backgroundColor: nextButtonDisabled ? "#888" : "#7286FF",
    color: "#fff",
    cursor: nextButtonDisabled ? "not-allowed" : "pointer",
    padding: "12px 24px",
    borderRadius: "8px",
    marginTop: "30px",
  };

  const buttonClasses = `${nextButtonDisabled ? 'buttonDisabled' : 'buttonEnabled'} buttonStyle`;


  return (
    // <div className="w-11/12 h-5/6 border-2 border-blue-400 rounded-2xl shadow-2xl flex flex-col items-center text-center py-4 md:py-8 lg:py-12 md:flex-row">
    <div className="w-11/12 h-5/6 border-2 border-blue-400 rounded-2xl shadow-2xl flex flex-col items-center text-center py-4 md:py-8 lg:py-12 md:flex-row">
      <div className=" w-1/3 h-full overflow-hidden flex justify-center items-center ">
        <div className="flex justify-center items-center md:justify-items-start">
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


      <div className="w-2/3 h-full flex justify-center">
        <div className=" w-3/4 h-full  flex flex-col justify-center gap-10">
          <h1 className="text-3xl">Tipo de Donaciones</h1>
          <form className=" flex flex-col gap-2">
            <div className="flex flex-col items-start">
              <label>
                <strong className="text-lg">Única</strong>
                <input
                  type="checkbox"
                  value="recurrente"
                  checked={selectedDonationType === "recurrente"}
                  onChange={() => handleDonationTypeToggle("recurrente")}
                />
              </label>
              <p
                style={{ color: "#555", textAlign: "left" }}
                className="text-lg"
              >
                Podrás realizar una donación mediante un único pago.
              </p>
            </div>
            <div className="flex flex-col items-start">
              <label>
                <strong className="text-lg">En Especie</strong>
                <input
                  type="checkbox"
                  value="especie"
                  checked={selectedDonationType === "en_especie"}
                  onChange={() => handleDonationTypeToggle("en_especie")}
                />
              </label>
              <p
                style={{ color: "#555", textAlign: "left" }}
                className="text-lg"
              >
                Puedes donar con bienes físicos o servicios en lugar de dinero.
              </p>
            </div>
            <div className="flex flex-col items-start">
              <label>
                <strong className="text-lg">Corporativa</strong>
                <input
                  type="checkbox"
                  value="corporativa"
                  checked={selectedDonationType === "corporativa"}
                  onChange={() => handleDonationTypeToggle("corporativa")}
                />
              </label>
              <p
                style={{ color: "#555", textAlign: "left" }}
                className="text-lg"
              >
                Podrás contribuir como empresa, como por ejemplo el patrocinio
                de eventos.
              </p>
            </div>
            <Link href={finalUrl} >
              <button
                type="button"
                disabled={nextButtonDisabled}
                style={buttonStyle}
                className={buttonClasses}
              >

                {nextButtonDisabled
                  ? "Seleccione al menos una opción"
                  : "Siguiente"}
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RedirectPage;
