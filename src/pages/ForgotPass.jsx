import { Link } from "react-router-dom";
import axiosClient from "../config/axios";
import { useState } from "react";
import Alerts from "../components/Alerts";

const ForgotPass = () => {
    const [ email, setEmail ] = useState("");
    const [alert, setAlert ] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();

        if (email === "") return setAlert({msg: "Debes introducir un email válido", error: true});

        try {
            const { data } = await axiosClient.post('/vets/forgetPass', { email });
            setAlert({
                msg: data.msg,
                error: false
            });
        } catch (error) {
            console.log(error);
            setAlert({
                msg: error.response.data.msg,
                error: true
            });
        };

    };

    const { msg } = alert;

    return (
        <>
            <div>
                <h1 className='text-indigo-600 font-black text-6xl'>Recupera tu Acceso y no Pierdas tus {""}<span className='text-black'>Pacientes</span></h1>
            </div>

            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                {msg && <Alerts alert={alert} />}
                <form onSubmit={handleSubmit}>
                    <div className='my-5 '>
                        <label className='uppercase text-gray-600 block text-xl font-bold'>
                            Email
                        </label>
                        <input 
                            type='email'
                            value={email}
                            onChange={(e) =>  setEmail(e.target.value)}
                            placeholder='Email de registro'
                            className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                        />
                    </div>

                    <input 
                        type='submit'
                        value="Reiniciar Password"
                        className='bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase mt-5 font-bold hover:cursor-pointer hover:bg-indigo-800 md:w-auto '
                    />
                </form>

                <nav className="mt-5 lg:flex lg:justify-between">
                    <Link to='/' className="block text-center my-5 text-gray-500">¿Ya tienes una cuenta? <span className="font-bold">Inicia Sesión</span></Link>
                    <Link to='/register' className="block text-center my-5 text-gray-500">¿No tienes una cuenta? <span className="font-bold">Registrate</span></Link>
                </nav>
            </div>
        </>
    )
}

export default ForgotPass