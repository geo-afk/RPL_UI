"use client"

import { createContext, useState, ReactNode } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

const url = "http://localhost:8080"

interface AuthContextType {
    user: any;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null)


export default function AuthProvider({ children }: { children: ReactNode }){
    const [user, setUser] = useState(null)
    const router = useRouter()

    const login = async (username: string, password: string) => {
        try {
            const params = new URLSearchParams()
            params.append("username", username)
            params.append("password", password)

            const response = await axios.post(url + "/auth/token", params, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            })

            axios.defaults.headers.common["Authorization"] =
                `Bearer ${response.data.access_token}`

            localStorage.setItem("token", response.data.access_token)

            setUser(response.data)
            router.push("/")
        } catch (error) {
            console.log("Login Failed: ", error)
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
