import axios from "axios";

const axios_instance = axios.create({
    baseURL : "https://smartalert-backend.b2blink.ma",
    headers : {
        Accept: "*/*",
    }
})

export default axios_instance;