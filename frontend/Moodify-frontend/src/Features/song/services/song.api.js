import axios from "axios";

const api = axios.create({
    baseURL: "https://moodify2-x46z.onrender.com/api",
    withCredentials: true
})

export async function getsong({ mood }) {
    try {
        const response = await api.get(`/song/?mood=${mood}`)
        console.log(response.data)
        return response.data
    } catch (err) {
        console.log(err?.response?.data || err)
        throw err
    }
}