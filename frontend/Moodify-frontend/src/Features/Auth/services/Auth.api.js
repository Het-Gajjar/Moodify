
import axios from 'axios'

const api = axios.create({
    baseURL: "localhost:3000/api/auth",
    withCredentials: true
})

export async function login(username, password) {
    try {
        const response = await api.post('/login', {
            username,
            password
        })
        return response.data
    } catch (err) {
        console.log(err.response.data)
    }
}
export async function register(username, email, password) {

    const responce = await api.post('/register', {
        username,
        email,
        password,
    })
    return responce.data
}

export async function getme() {

    const responce = await api.get('/getme');
    return responce.data;
}

