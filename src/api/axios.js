import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://medplatformapi2.herokuapp.com/",
});

export { axiosInstance };
