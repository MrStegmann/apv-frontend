import { useEffect, useState } from "react";
import Alerts from "../components/Alerts";
import axiosClient from "../config/axios";
import { Link, useParams } from "react-router-dom";



const NewPassword = () => {
    const [ password, setPassword ] = useState('');
    const [ alert, setAlert ] = useState({});
    const [ validToken, setValidToken ] = useState(false);
    const [ passChanged, setPassChanged ] = useState(false);
    const params = useParams();
    const { token } = params;

    const handleSubmit = async e => {
        e.preventDefault();

        if (password.length < 6) return setAlert({msg: "El password debe contener un mínimo de 6 caractéres.", error: true});

        try {
            const url = `/vets/forgetPass/${token}`;
            const { data } = await axiosClient.post(url, { password });

            setPassChanged(true);
            
        } catch (error) {
            setAlert({
                msg: error.response.data.msg,
                error: true
            });
        };
    };

    useEffect(() => {
        const timeout = setTimeout(async () => {
            try {
                
                await axiosClient(`/vets/forgetPass/${token}`);

                setValidToken(true);
                setAlert({
                    msg: "Ingresa tu nuevo password",
                    error: false
                });

            } catch (error) {
                setAlert({
                    msg: "Hubo un error con el enlace",
                    error: true
                });
            }
        }, 250);

        return () => clearTimeout(timeout);
    }, []);

    const { msg } = alert;

    return (
        <>
        <div>
            <h1 className='text-indigo-600 font-black text-6xl'>Ingresa tu nuevo Password y Administra tus {""}<span className='text-black'>Pacientes</span></h1>
        </div>

        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
            {msg && <Alerts alert={alert} />}
            {validToken && !passChanged && (
                <form onSubmit={handleSubmit}>
                    <div className='my-5 '>
                        <label className='uppercase text-gray-600 block text-xl font-bold'>
                            Nuevo Password
                        </label>
                        <input 
                            type='password'
                            value={password}
                            onChange={(e) =>  setPassword(e.target.value)}
                            placeholder='Tu nuevo password'
                            className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                        />
                    </div>

                    <input 
                        type='submit'
                        value="Reestablecer Password"
                        className='bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase mt-5 font-bold hover:cursor-pointer hover:bg-indigo-800 md:w-auto '
                    />
                </form>
            )}

            {passChanged && <nav className="mt-5 lg:flex lg:justify-between">
                <Link to='/' className="block text-center my-5 text-gray-500">Inicia Sesión</Link>
            </nav>}
        </div>
    </>
    )
}

export default NewPassword