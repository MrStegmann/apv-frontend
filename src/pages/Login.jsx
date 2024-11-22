import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Alerts from "../components/Alerts";
import axiosClient from "../config/axios";
import useAuth from "../hooks/useAuth";

const Login = () => {
    const [ Data, setData ] = useState({email: "", password: ""})
    
    const [ alert, setAlert ] = useState({});

    const { setAuth } = useAuth();

    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();

        if ([Data.email, Data.password].includes("")) return setAlert({
            msg: "Debes rellenar todos los campos",
            error: true
        });

        try {
            const { data } = await axiosClient.post("vets/login", Data);
            localStorage.setItem("token", data.token);
            setAuth(data);
            
            navigate('/admin');

        } catch (error) {
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
                <h1 className='text-indigo-600 font-black text-6xl'>Inicia Sesión y Administra tus {""}<span className='text-black'>Pacientes</span></h1>
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
                            name="email"
                            value={Data.email}
                            onChange={e => setData({...Data, [e.target.name]: e.target.value})}
                            placeholder='Email de registro'
                            className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                        />
                    </div>

                    <div className='my-5'>
                        <label className='uppercase text-gray-600 block text-xl font-bold'>
                            Password
                        </label>
                        <input 
                            type='password'
                            name="password"
                            value={Data.password}
                            onChange={e => setData({...Data, [e.target.name]: e.target.value})}
                            placeholder='Tu password'
                            className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                        />
                    </div>

                    <input 
                        type='submit'
                        value="Iniciar Sesión"
                        className='bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase mt-5 font-bold hover:cursor-pointer hover:bg-indigo-800 md:w-auto '
                    />
                </form>

                <nav className="mt-5 lg:flex lg:justify-between">
                    <Link to='/register' className="block text-center my-5 text-gray-500">¿No tienes una cuenta? <span className="font-bold">Registrate</span></Link>
                    <Link to='/forgotPass' className="block text-center my-5 text-gray-500">Olvidé mi password</Link>
                </nav>
            </div>
        </>
    )
}

export default Login