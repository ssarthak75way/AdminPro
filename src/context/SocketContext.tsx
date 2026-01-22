
import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextType {
    socket: Socket | null;
    isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
    socket: null,
    isConnected: false,
});

export const useSocket = () => useContext(SocketContext);

// Since we don't have a real backend, we'll connect to a dummy URL or just 
// use this to hold the socket instance structure.
// For the purpose of this task, we will simulate the socket behavior mostly in the slice or components,
// but we initialize the client here to satisfy the requirement.
const SOCKET_URL = 'http://localhost:4000'; // Placeholder

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        // In a real app, we would connect here. 
        // For this demo, we can just instantiate it but it won't connect to anything real.
        const newSocket = io(SOCKET_URL, {
            autoConnect: false, // Don't actually try to connect to avoid console errors in this demo env
        });

        setSocket(newSocket);

        // Simulate connection for UI purposes
        setIsConnected(true);

        return () => {
            newSocket.close();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContext.Provider>
    );
};
