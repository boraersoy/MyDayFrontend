import axios from "axios";

export const BASE_URL = "https://bermedical-dev-be.onrender.com/";

export const reqClient = (method, url, client, options) => {
    switch(method.toLowerCase()) {
        case "get":
            return axios.get(`${BASE_URL}${client}/${url}`, {
                ...options,
                headers: {
                    Accept: "*/*",
                    "Content-Type": "*/*",
                    "Access-Control-Allow-Origin": "*"
                },
            })
        case "post":
            return axios.post(`${BASE_URL}${client}/${url}`, options, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
            });
        case "put":
            return axios.put(`${BASE_URL}${client}/${url}`, options, {
                headers: {
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                },
            });
        case "delete":
            return axios.put(`${BASE_URL}${client}/${url}`, options, {
                headers: {
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                },
            });
        default:
            return new Error("Unsupported method");
    }
}