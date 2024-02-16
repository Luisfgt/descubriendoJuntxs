'use client'
import { createContext, useContext, useEffect, useState } from 'react';
import io, { Socket } from "socket.io-client";

interface SocketProps {
    socket: Socket<any>
}

const SocketContext = createContext<SocketProps | undefined>(undefined);

export const useSocketContext = () => {
    const context = useContext(SocketContext)
    if (!context) {
        throw new Error('useSocketContext debe utilizarse dentro de un useContextProvider');
    }
    return context
}

export const SocketContextProvider = ({ children }: { children: any }) => {

    const socket = io('https://juntxsdepfull-e9e6a5fd047a.herokuapp.com/', { transports: ['websocket'] });
    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    )
}
