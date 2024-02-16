import axios from "axios";

const changeUser = async (userId: number, data: any) => {
    const URL_BASE = "https://juntxs.vercel.app/users/";
    const info = await axios.put(`${URL_BASE}${userId}`, data);
    console.log("User updated:", info.data);
    return info.data;
}

export default changeUser;