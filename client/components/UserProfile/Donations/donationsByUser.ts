import axios from "axios"




const donationsByUser = async (userId: number) => {


    const URL_BASE = 'https://juntxs.vercel.app/users/donations/'
    const info = await axios.get(`${URL_BASE}${userId}`)
    console.log('Donations by user:', info.data);

    return info.data
}

export default donationsByUser;