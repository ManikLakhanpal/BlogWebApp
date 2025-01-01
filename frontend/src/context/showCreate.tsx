"use client"

import React, { createContext, useState, useContext, ReactNode } from "react";

interface ShowCreateContextType {
    showCreate: boolean;
    setShowCreate: React.Dispatch<React.SetStateAction<boolean>>;
}

// Explicitly type the context to include undefined as a possible value
const ShowCreateContext = createContext<ShowCreateContextType | undefined>(undefined);

function ShowCreateProvider({ children }: { children: ReactNode }) {
    const [showCreate, setShowCreate] = useState<boolean>(false);

    return (
        <ShowCreateContext.Provider value={{ showCreate, setShowCreate }}>
            {children}
        </ShowCreateContext.Provider>
    );
}

function useShowCreate() {
    const context = useContext(ShowCreateContext);
    if (!context) {
        throw new Error("useShowCreate must be used within a ShowCreateProvider");
    }

    return context;
}

export { ShowCreateProvider, useShowCreate };
