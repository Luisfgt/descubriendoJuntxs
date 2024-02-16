// import { error } from "console";
import { Request, Response } from "express";

import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "brindamealli12@gmail.com",
        pass: "gwty fzgx uhol fzmc",
    },
});


const mail = async (req: Request, res: Response) => {
    try {
        const { nombre, correo, celular, asunto, mensaje } = req.body;
        console.log(nombre, correo, celular, asunto, mensaje);

        let mailOptions = {
            from: {
                name: "Forma de Contacto",
                address: "brindamealli12@gmail.com",
            },
            to: "brindamealli12@gmail.com", //where you want to send it
            subject: asunto,
            text: `Nombre: ${nombre}\nCorreo: ${correo}\nCelular: ${celular}\nAsunto: ${asunto}\nMensaje: ${mensaje}`,
        };

        transporter.sendMail(mailOptions, (error: any, _info: any) => {
            if (error) {
                console.log(error);
                res.status(400).json({ error: error.message });
            } else {
                console.log("Email sent successfully!");
                res.status(200).json({ message: "Email sent successfully!" });
            }
        });
    } catch (error: any) {
        res.status(404).json({ error: error.message });
    }
};

export { mail };
