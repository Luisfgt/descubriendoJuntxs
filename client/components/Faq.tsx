"use client";

import * as Accordion from "@radix-ui/react-accordion";
import Plus from "../public/assets/Plus.svg";
import Image from "next/image";

const items = [
  {
    question: "Cómo puedo realizar una donación?",
    answer:
      `Puedes realizar una donación siguiendo estos pasos:
       - Haz clic en el botón de Donar en la página principal
       - Selecciona el proyecto al que deseas destinar la donación
       - Ingresa el monto y elige el método de pago (tarjeta de crédito, PayPal, etc.)
       - Completa la información requerida y confirma la donación
       - Recibirás un recibo por correo electrónico una vez que la transacción se haya    completado con éxito.
      `
  },
  {
    question: "¿Puedo cancelar una donación?",
    answer:
      `Sí, puedes cancelar una donación siguiendo estos pasos:
       - Inicia sesión en tu cuenta
       - Ve a la sección de donaciones
       - Selecciona la donación que deseas cancelar
       - Haz clic en el botón de Cancelar
       - Confirma la cancelación modificar la donación recurrente
       - Recibirás un correo electrónico confirmando la cancelación de la donación
       `,
  },
  {
    question: "Cómo puedo contactar al equipo de soporte?",
    answer:
      `Puedes contactar al equipo de soporte siguiendo estos pasos:
       - Ve a la sección de Contacto en la página principal 
       - Envía un correo electrónico a descubriendojuntxs@gmail.com o
       - llama al número de teléfono +51 991185371
       - Recibirás una respuesta por correo electrónico en un plazo de 24 horas
       `,
  },
  {
    question: "Si hablamos de donación nos referimos siempre a una colaboración monetaria a la ONG?",
    answer:
      "No siempre es así. En Descubriendo Juntxs se permite realizar una donación en especie, es decir, que posibilitan la entrega de alimentos, materiales de primera necesidad para actuar ante una emergencia, juguetes o material escolar para niños y niñas sin recursos…",
  },
  {
    question: "¿Es factible colaborar Descubriendo Juntxs a través de mis impuestos?",
    answer:
      "Sí, claro que puedes hacerlo! Marca la casilla “Actividades de Interés Social” de tu declaración de la renta y estarás indicando que quieres que el 0,7 % de tus impuestos sean destinados a proyectos de la ONG",
  },
];

const Faq = () => {
  return (
    <div className="flex flex-col w-full py-[48px] lg:py-[60px] lg:flex-row lg:gap-x-6">
      <div className="lg:w-1/3 lg:py-[32px] lg:pr-[56px]">
        <h3 className="text-[#7286ff] text-[14px] font-medium lg:text-base">
          Preguntas Frecuentes
        </h3>
        <h1 className="py-4 text-2xl font-medium text-[#172026] lg:text-[42px] lg:leading-[58px]">
          Respondemos todas tus dudas
        </h1>
        <p className="text-[#36485C] pb-[24px]">
        ¿Tienes preguntas? No te quedes con ninguna duda, Encuentra las respuestas a las preguntas más frecuentes que nos hacen nuestros colaboradores en nuestra página, ponte en contacto con el equipo o pide una cita a través de los medios de contacto.
        </p>
      </div>

      <div className="lg:w-2/3">
        <Accordion.Root
          type="single"
          defaultValue="item-1"
          collapsible
          className="flex flex-col gap-y-4"
        >
          {items.map((item, index) => (
            <div key={index}>
              <Accordion.Item
                value={`item-${index + 1}`}
                className="bg-[#E3F1FF] p-[16px] rounded-[8px]"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="flex w-full items-center justify-between">
                    <p className="text-left font-medium text-[#172026] lg:text-[18px]">
                      {item.question}
                    </p>
                    <span>
                      <Image
                        src={Plus}
                        alt="See more"
                        className="h-10 w-10 lg:w-6 lg:h-6"
                      />
                    </span>
                  </Accordion.Trigger>
                </Accordion.Header>

                <Accordion.Content>
                  <p className="pt-2 text-[#36485C]">{item.answer}</p>
                </Accordion.Content>
              </Accordion.Item>
            </div>
          ))}
        </Accordion.Root>
      </div>
    </div>
  );
};

export default Faq;
