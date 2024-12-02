import { createContext, useContext, useState } from "react";

type DBStatusContextType = {
    dbConnected: boolean;
    setDbConnected: (status: boolean) => void;
}

const DBStatusContext = createContext<DBStatusContextType | null>(null);

export const useDBStatusContext = () => {
    const context = useContext(DBStatusContext);

    if (!context) {
        throw new Error("useDBStatusContext must be within a DBStatusProvider");
    }

    return context;
};

export const DBStatusProvider = ({children}: {children: React.ReactNode}) => {
    const [dbConnected, setDbConnected] = useState<boolean>(false)

    return <DBStatusContext.Provider value={{dbConnected, setDbConnected}}>{children}</DBStatusContext.Provider>
}
