'use client';

import { createContext, useContext, useState, ReactNode } from 'react';



interface Themes {
    bgClass: string;
    cardClass: string;
    inputClass: string;
}

interface ThemeType {
    theme: Themes;
    isDarkMode: () => boolean
    changeTheme: (isDarkMode: boolean) => void;
}


export const ThemeContext = createContext<ThemeType | null>(null);


function defaultTheme() {
    
    return {
        bgClass: 'bg-gray-900 text-gray-100',
        cardClass: 'bg-gray-800 border-gray-700',
        inputClass: 'bg-gray-700 border-gray-600 text-gray-100'
    }
}




export default function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Themes>(defaultTheme());
    const [mode, setMode] = useState<boolean>(true);

    const changeTheme = (isDarkMode: boolean) => {
        
        if (isDarkMode) {
            setTheme({
                bgClass: 'bg-gray-900 text-gray-100',
                cardClass: 'bg-gray-800 border-gray-700',
                inputClass: 'bg-gray-700 border-gray-600 text-gray-100'
            })
            setMode(true)
            return
        }
        
        setTheme({
            bgClass: 'bg-gray-50 text-gray-900',
            cardClass: 'bg-white border-gray-200',
            inputClass: 'bg-white border-gray-300 text-gray-900'
        })
        setMode(false)
    }


    const isDarkMode = () => {
        return mode;
    }

    

    return (
        <ThemeContext.Provider value={{ theme, changeTheme, isDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
}

