import axios from "axios"

const axiosApi = axios.create({
    baseURL:"http://127.0.0.1:5000",
    timeout: 10000,
    withCredentials:true,
    headers:{
        "Content-Type":"application/json",
        "Accept": "application/json"
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

function fetchProducts (){
    axiosApi.get()
}