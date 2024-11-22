import { createContext, useState, useEffect } from 'react';
import axiosClient from '../config/axios';
import useAuth from '../hooks/useAuth';

const PatientsContext = createContext();

export const PatientsProvider = ({children}) => {

    const [ patients, setPatients ] = useState([]);
    const [ patient, setPatient ] = useState({});

    const { auth } = useAuth();

    const savePatient = async patient => {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization:  `Bearer ${token}`
            }
        }

        if (patient._id) {
            try {
                const { data } = await axiosClient.put(`/patients/${patient._id}`, patient, config);

                const updatedPatients = patients.map( patState => patState._id === data._id ? data : patState);

                setPatients(updatedPatients);

            } catch (error) {
                console.log(error.response.data.msg);
            }
        } else {
            try {
                const { data } = await axiosClient.post('/patients', patient, config);
                const  { createAt, updatedAt, __v, ...patientsSaved } = data;
                setPatients([patientsSaved, ...patients]);
            } catch (error) {
                console.log(error.response.data.msg);
            };
        }
    };

    const setEdit = patient => {
        setPatient(patient);
    };

    const deletePatient = async id => {
        const confirmed = confirm("¿Estás seguro de que lo quieres eliminar?");
        if (confirmed) {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization:  `Bearer ${token}`
                    }
                };

                const { data } = await axiosClient.delete(`/patients/${id}`, config);

                const updatedPatients = patients.filter( patState => patState._id !== id);

                setPatients(updatedPatients);

            } catch (error) {
                console.log(error.response.data.msg);
            };
        };
    };

    useEffect(() => {
        
        const timeout = setTimeout(async () => {
            if (auth?._id) {
                try {
                    const token = localStorage.getItem('token');
                    if (!token) return;
                    const config = {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization:  `Bearer ${token}`
                        }
                    };
    
                    const { data } = await axiosClient("/patients", config);
    
                    setPatients(data);
    
                } catch (error) {
                    console.log(error);
                };
            };
        }, 250);

        return () => clearTimeout(timeout);
    }, [auth])

    return (
        <PatientsContext.Provider
            value={{
                patients,
                savePatient,
                setEdit,
                patient,
                deletePatient
            }}
        >
            {children}
        </PatientsContext.Provider>
    )
}

export default PatientsContext