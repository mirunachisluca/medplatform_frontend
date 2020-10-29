import axios from "axios";

const axiosInstance = axios.create({ baseURL: "https://localhost:44349" });

export { axiosInstance };
