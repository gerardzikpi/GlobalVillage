import axios from "axios"

const axiosApi = axios.create({
    baseURL:"http://127.0.1:5000",
    withCredentials:true,
    headers:{
        "Content-Type":"application/json"
    }
})


export async function fetchUser(params) {
    try{
        axiosApi.get("/api/user",{
            params:params
        })
    }catch(error){
        console.error("Error fetching user:",error)
    }
}