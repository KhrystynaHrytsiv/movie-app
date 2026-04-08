import axios from "axios";
import {baseURL} from "./urls";

const apiService = axios.create({baseURL})
const accessKey = import.meta.env.VITE_KEY
apiService.interceptors.request.use(request=>{
    request.headers.Authorization = accessKey
    return request
})

export {apiService}