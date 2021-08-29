import { createContext, ReactElement, useEffect, useState } from "react";
import { AuthInterFace } from "../Types/interfaces";

export const AuthContext = createContext<AuthInterFace>({
    loginId: null,
    isAdmin: false,
    login: () => {},
    logout: () => {},
})

import React from 'react'
import { useRouter } from "next/router";

function AuthContextProvider(props: {children: ReactElement}) {

    const [loginId, setLoginId] = useState<string | null>(null)
    const [isAdmin, setIsAdmin] = useState<boolean>(false)
    const router = useRouter();
    useEffect(() => {
        setLoginId(localStorage.getItem('loginId'))
        setIsAdmin(localStorage.getItem('isAdmin') === "true")
    }, [])
    
    const login = (authId: string, isAdmin: boolean) => {
        localStorage.setItem('loginId', authId)
        localStorage.setItem('isAdmin', isAdmin ? "true" : "false")
        setLoginId(authId)
        setIsAdmin(isAdmin)
        if (isAdmin){
            router.replace('/admin/home')
        }else {
            router.replace('/profile')
        }
    }

    const logout = () => {
        localStorage.removeItem('loginId')
        localStorage.removeItem('isAdmin')
        setLoginId(null)
        setIsAdmin(false)
        router.push('/')
    }

    const values: AuthInterFace = {
        loginId,
        isAdmin,
        login,
        logout
    }
    return (
        <AuthContext.Provider value={values}>{props.children}</AuthContext.Provider>
    )
}

export default AuthContextProvider
