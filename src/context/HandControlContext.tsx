"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface HandControlContextType {
    isEnabled: boolean;
    toggleEnabled: () => void;
    setIsEnabled: (enabled: boolean) => void;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    status: string;
    setStatus: (status: string) => void;
}

const HandControlContext = createContext<HandControlContextType | undefined>(undefined);

export function HandControlProvider({ children }: { children: ReactNode }) {
    const [isEnabled, setIsEnabledState] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState("初始化中...");

    const toggleEnabled = () => {
        setIsEnabledState(prev => !prev);
    };

    const setIsEnabled = (enabled: boolean) => {
        setIsEnabledState(enabled);
    };

    return (
        <HandControlContext.Provider value={{ 
            isEnabled, toggleEnabled, setIsEnabled,
            isLoading, setIsLoading,
            status, setStatus
        }}>
            {children}
        </HandControlContext.Provider>
    );
}

export function useHandControl() {
    const context = useContext(HandControlContext);
    if (context === undefined) {
        throw new Error('useHandControl must be used within a HandControlProvider');
    }
    return context;
}
