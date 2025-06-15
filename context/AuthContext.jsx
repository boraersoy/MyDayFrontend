import { createContext, useState, useEffect } from 'react';
import { setData, getData } from '@/utils/mobileStorage'
import {AuthService} from "@/api/requests/auth";


export const AuthContext = createContext({
    user: null,
    token: null,
    login: () => {},
    logout: () => {},
    register: () => {},
    isAuthenticated: false,
    error: null,
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [error, setError] = useState(null);

   useEffect(() => {
        const initializeUser = async () => {
            try {
                const storedUser = await getData("user");
                const storedToken = await getData("token");
                if (storedUser) {
                    setUser(storedUser);
                    setToken(storedToken);
                }
            } catch (error) {
                console.error("Error retrieving user data:", error);
                setError(error);
            }
        };

        initializeUser().then(() => {});
   }, [])


    const login = async (userData) => {
       if (!userData.email || !userData.password) {
           return;
       }
        let resp = await AuthService.login(userData);
        if (resp === "Unauthorized" || resp === "Forbidden") {
            setError(resp);
            logout();
            return;
        }
        setUser(resp.user);
        setToken(resp.token);
        await setData("user", resp.user)
        await setData("token", resp.token)
        return resp;
    };
   const register = async (userData) => {
       if (!userData.email || !userData.password) {
           return;
       }
        let resp = await AuthService.register(userData);
        if (resp === "Unauthorized" || resp === "Forbidden") {
            setError(resp);
            logout();
            return;
        }
        setUser(resp.user);
        setToken(resp.token);
        await setData("user", resp.user)
        await setData("token", resp.token)
    };


    const logout = () => {
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register, isAuthenticated: !!user, token, error }}>
            {children}
        </AuthContext.Provider>
    );
}