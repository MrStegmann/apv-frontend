import { useState, useEffect, createContext } from "react";
import axiosClient from "../config/axios";

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [ auth, setAuth ] = useState({});
    const [ loading, setLoading ] = useState(true);

    const logOut = () => {
        localStorage.removeItem("token");
        setAuth({});
    };

    const updateProfile = async profileData => {
        const token = localStorage.getItem("token");

        if (!token) return;

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        };

        try {

            const { data } = await axiosClient.put(`/vets/profile/${profileData._id}`, profileData, config);
            setAuth(data);
            
            return {
                msg: "Perfil actualizado correctamente",
                error: false
            }
            
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        };
    };

    const savePass = async passData => {
        const token = localStorage.getItem("token");

        if (!token) return;

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        };

        try {

            const { data } = await axiosClient.put(`/vets/updatePass`, passData, config);
            return {
                msg: data.msg,
                error: false
            }
            
        } catch (error) {
            console.log(error)
            return {
                msg: error.response.data.msg,
                error: true
            }
        };
    }

    //Get profile if token exist in localStorage
    useEffect(() => {
        const timeout = setTimeout(async () => {
            const token = localStorage.getItem("token");

            if (!token) return setLoading(false);

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };
            
            try {

                const { data } = await axiosClient('/vets/profile', config);
                setAuth(data);
                
            } catch (error) {
                console.log(error.response.data.msg);
                setAuth({});
            };
            setLoading(false);
        }, 250); 
        return () => clearTimeout(timeout);
    }, []);

    return (
        <AuthContext.Provider value={{ 
            auth, setAuth, 
            loading,
            logOut,
            updateProfile,
            savePass
        }}>
            {children}
        </AuthContext.Provider>
    )
};

export { AuthProvider }

export default AuthContext