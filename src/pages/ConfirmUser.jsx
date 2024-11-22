import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Alerts from "../components/Alerts";
import axiosClient from "../config/axios";

const ConfirmUser = () => {
    const [ alert, setAlert ] = useState({});
    const [ isConfirmed, setIsConfirmed ] = useState(false);
    const [ loading, setLoading ] = useState(true);
    const params = useParams();
    const { id } = params;

    useEffect(() => {
        const timeout = setTimeout(async () => {
            try {

                const url = `/vets/confirm/${id}`;
                const { data } = await axiosClient(url);
                
                setIsConfirmed(true);
                setAlert({msg: data.msg, error: false});
            } catch (error) {
                setAlert({msg: error.response.data.msg, error: true})
            };
            setLoading(false);
        }, 250);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <>
            <div>
                <h1 className='text-indigo-600 font-black text-6xl'>Confirma tu Cuenta y Administra tus {""} <span className='text-black'>Pacientes</span></h1>
            </div>

            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                {!loading && <Alerts alert={alert} />}

                {isConfirmed && 
                    <Link to='/' className="block text-center my-5 text-gray-500">Inicia Sesión</Link>
                }
            </div>
        </>
    )
}

export default ConfirmUser