import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import style from './reset.module.css'

const ResetPassword = ({ closeHeOlvidado }: { closeHeOlvidado: any }) => {

    const [email, setEmail] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const auth = getAuth();

    const handleSubmit = async () => {
        try {
            await sendPasswordResetEmail(auth, email);
            alert('Password reset email sent!');
        } catch (error) {
            alert('Error sending email');
        }
    }

    return (
        <div className={style.containerAll}>
            <input type="text" name='email' placeholder='Escribe tu Email' value={email} onChange={handleChange} className={style.input} />
            <div className={style.buttonsContainer}>
                <button className={style.buttonText} onClick={() => closeHeOlvidado()}>Cancelar</button>
                <button className={style.buttonFull} onClick={handleSubmit}>Send Email</button>
            </div>
        </div>
    )
}

export default ResetPassword