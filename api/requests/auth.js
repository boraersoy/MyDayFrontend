import {authRequest} from "../config/request"

export class AuthService {
    static async login(data) {
        console.log("Login", data)
        return await authRequest({
            method: 'POST',
            url: 'login',
            options: data,
        })
    }
    static async register(data) {
        console.log("Register", data)
        return await authRequest({
            method: 'POST',
            url: 'register',
            options: data,
        })
    }
    static async logout() {
        return await authRequest({
            method: 'POST',
            url: 'logout',
        })
    }
    static async getUserByEmail(data) {
        return await authRequest({
            method: 'GET',
            url: 'user',
            options: data,
        })
    }
    static async getUserByQuery(data) {
        return await authRequest({
            method: 'GET',
            url: '',
            options: data,
        })
    }
    static async changePassword(data) {
        return await authRequest({
            method: 'PUT',
            url: 'changePwd',
            options: data,
        })
    }
    static async changeEmail(data) {
        return await authRequest({
            method: 'PUT',
            url: 'changeEmail',
            options: data,
        })
    }
    static async deleteUser(data) {
        return await authRequest({
            method: 'DELETE',
            url: '',
            options: data,
        })
    }
}