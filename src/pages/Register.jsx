import { Link } from "react-router-dom";
import { useState,  } from "react";
import Alerts from "../components/Alerts";
import axiosClient from "../config/axios";

const Register = () => {
    const [ data, setData ] = useState({nombre: "", email: "", password: "", repeatPassword: ""});
    const [ alert, setAlert ] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        if ([data.nombre, data.email, data.password, data.repeatPassword].includes("")) return setAlert({msg: "Hay campos vacios", error: true});

        if (data.password !== data.repeatPassword) return setAlert({msg: "Los password no son iguales", error: true});

        if (data.password.length < 6) return setAlert({msg: "La password es muy corta. Minimo 6 caracteres", error: true});

        setAlert({});

        try {
            await axiosClient.post(`/vets`, data);
            setAlert({msg: "Cuenta creada correctamente. Revisa tu email", error: false});
        } catch (error) {
            setAlert({msg: error.response.data.msg, error: true});
        };
    };

    const { msg } = alert;

    return (
        <>
            <div>
                <h1 className='text-indigo-600 font-black text-6xl'>Crea tu Cuenta y Administra tus {""} <span className='text-black'>Pacientes</span></h1>
            </div>

            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                {msg && <Alerts alert={alert} />}
                <form onSubmit={handleSubmit}>

                    <div className='my-5 '>
                        <label className='uppercase text-gray-600 block text-xl font-bold'>
                            Nombre
                        </label>
                        <input 
                            type='text'
                            name="nombre"
                            value={data.name}
                            onChange={(e) => setData({...data, [e.target.name]: e.target.value})}
                            placeholder='Escribe tu nombr'
                            className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                        />
                    </div>

                    <div className='my-5 '>
                        <label className='uppercase text-gray-600 block text-xl font-bold'>
                            Email
                        </label>
                        <input 
                            type='email'
                            name="email"
                            value={data.email}
                            onChange={(e) => setData({...data, [e.target.name]: e.target.value})}
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
                            value={data.password}
                            onChange={(e) => setData({...data, [e.target.name]: e.target.value})}
                            placeholder='Tu password'
                            className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                        />
                    </div>

                    <div className='my-5'>
                        <label className='uppercase text-gray-600 block text-xl font-bold'>
                            Repite Password
                        </label>
                        <input 
                            type='password'
                            name="repeatPassword"
                            value={data.repeatPassword}
                            onChange={(e) => setData({...data, [e.target.name]: e.target.value})}
                            placeholder='Repite password'
                            className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                        />
                    </div>

                    <input 
                        type='submit'
                        value="Registrate"
                        className='bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase mt-5 font-bold hover:cursor-pointer hover:bg-indigo-800 md:w-auto '
                    />

                </form>

                <nav className="mt-5 lg:flex lg:justify-between">
                    <Link to='/' className="block text-center my-5 text-gray-500">¿Ya tienes una cuenta? <span className="font-bold">Inicia Sesión</span></Link>
                </nav>
            </div>
        </>
    )
}

export default Register