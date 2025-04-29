// import apiClient from "../services/api-client";
import create from "./http-service";

export interface User {
    id: number;
    name: string;
}

// Create a HTTP service instance with the "users" endpoint and return it
export default create("users");