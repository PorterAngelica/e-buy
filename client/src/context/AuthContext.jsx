import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const AuthContext = createContext();
// export default AuthContext;

    export const AuthContextProvider = ({ children }) => {
        const [currentUser, setCurrentUser] = useState(
            JSON.parse(localStorage.getItem("user")) || null
        );
    
        const login = async (inputs) => {
            const res = await axios.post("http://localhost:8800/api/auth/login", inputs, {
                withCredentials: true,
            });
    
            setCurrentUser(res.data)
        };

            const logout = async () => {
                try {
                    // Clear user data
                    setCurrentUser(null);
                    localStorage.removeItem("user");
        
                    // Perform logout on the server if necessary
                    await axios.post("http://localhost:8800/api/auth/logout", null, {
                        withCredentials: true,
                    });
                } catch (error) {
                    console.error("Logout error:", error);
                }
            };
        
            useEffect(() => {
                localStorage.setItem("user", JSON.stringify(currentUser));
            }, [currentUser]);
        
            useEffect(() => {
                return () => {
                    localStorage.removeItem("user");
                };
            }, []);
        return (
            <AuthContext.Provider value={{ currentUser, login, logout }}>
                {children}
            </AuthContext.Provider>
        );
    };;
