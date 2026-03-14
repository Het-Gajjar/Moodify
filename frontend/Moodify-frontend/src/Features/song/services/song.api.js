import axios from "axios";

const api = axios.create({
    baseURL: "https://moodify-backend.onrender.com/api",
    withCredentials: true
})


export async function getsong({ mood }) {


    try {
        const response = await api.get(`/song/?mood=${mood}`)

        console.log(response.data);
        return response

    }
    catch (err) {
        console.log(err.response.data)
    }
}