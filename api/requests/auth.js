import {authRequest} from "../config/request"
import {BASE_URL} from "@/api/config/base";

export class AuthService {
    static async login(data) {

        let resultRaw = await fetch(BASE_URL + "users/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(data),
        })
        return await resultRaw.json()
    }
    static async register(data) {
        let resultRaw = await fetch(BASE_URL + "users/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(data),
        })
        return await resultRaw.json()
    }
}