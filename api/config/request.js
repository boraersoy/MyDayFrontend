
import { reqClient } from "./base";

export const request = async (method, url, client, options) => {
    const onSuccess = (response) => {
        return response;
    };
    const onError = async (error) => {
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
export const moodRequest = async ({ url, method, options }) =>
    request(method,url,"mood", options);
export const taskRequest = async ({ url, method, options }) =>
    request(method,url,"tasks", options);
