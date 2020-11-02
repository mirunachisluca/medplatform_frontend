import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://medplatformapi.herokuapp.com",
});

export { axiosInstance };
