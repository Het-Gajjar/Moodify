import axios from "axios";

const api=axios.create({
       baseURL:"http://localhost:3000/api/",
    withCredentials:true
})


export async function getsong({mood}){

    
    try{
        const response=await api.get(`/song/?mood=${mood}`)

        console.log(response.data);
        return response
        
    }
    catch(err){
        console.log(err.response.data)
    }
}