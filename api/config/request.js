
import { reqClient } from "./base";

export const request = async (method, url, client, options) => {
    const onSuccess = (response) => {
        console.log("Success", response.data)
        return response;
    };
    const onError = async (error) => {
        console.log("Error", error.response.host);
        if (error?.response?.status === 401) {
            return "Unauthorized";
        }
        if (error?.response?.status === 403) {
            return "Forbidden";
        }

        return Promise.reject(error?.response || error);
    };

    return reqClient(method, url, client, options).then(onSuccess).catch(onError);
};

export const authRequest = async ({ url, method, options }) =>
    request(method,url,"user", options);
export const jobRequest = async ({ url, method, options }) =>
    request(method,url,"job", options);
export const paymentRequest = async ({ url, method, options }) =>
    request(method,url,"payment", options);
