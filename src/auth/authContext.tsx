"use client"

import { createContext, useState, ReactNode } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { api } from "@/lib/api"

const url = "http://localhost:8080"

interface AuthContextType {
    user: any;
    login: (username: string, password: string) => Promise<any>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null)


export default function AuthProvider({ children }: { children: ReactNode }){
    const [user, setUser] = useState<any>(null)
    const router = useRouter()

    const login = async (username: string, password: string) => {
        try {
            const params = new URLSearchParams()
            params.append("username", username)
            params.append("password", password)

            const data = await api.userLogin(params)
            console.log(data);
            

            localStorage.setItem("token", data.access_token)

            setUser(data)
            
            router.push("/")

            return data.user
        } catch (error) {
            console.log("Login Failed: ", error)
            return null
        }
    }

    const logout = () => {
        setUser(null)
        delete axios.defaults.headers.common["Authorization"]
        router.push("/login")
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
