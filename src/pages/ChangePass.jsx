import React, { useState } from 'react'
import AdminNav from '../components/AdminNav';
import Alerts from '../components/Alerts';
import useAuth from '../hooks/useAuth';

const ChangePass = () => {
    const [ alert, setAlert ] = useState({});
    const [ password, setPassword ] = useState({password: "", newPassword: ""});

    const { savePass } = useAuth();

    const handleSubmit = async e => {
        e.preventDefault();

        if (Object.values(password).some( v => v === "")) return setAlert({msg: "Todos los campos son obligatorios", error: true});

        if (password.newPassword.length < 6) return setAlert({msg: "La contraseña debe contener al menos 6 caracteres", error: true});
        
        const result = await savePass(password);
        setAlert(result);
    };


    const { msg } = alert;

    return (
        <>
            <AdminNav />

            <h2 className='font-black text-3xl text-center mt-10'>Cambiar Password</h2>
            <p className='text-xl mt-5 mb-10 text-center'>Modifica tu {""}<span className='text-indigo-600 font-bold'>Password</span></p>

            <div className='flex justify-center'>
                <div className='w-full md:w-1/2 bg-white shadow rounded-lg p-5'>
                    <form onSubmit={handleSubmit} className='mb-5'>
                        <div className='my-3'>
                            <label className='uppdercase font-bold text-gray-600'>Password actual</label>
                            <input 
                                type='password'
                                className='border bg-gray-50 w-full p-2 mt-5 rounded-lg'
                                name="password"
                                placeholder='Escribe tu password'
                                onChange={e => setPassword({...password, [e.target.name]: e.target.value})}
                            />
                        </div>

                        <div className='my-3'>
                            <label className='uppdercase font-bold text-gray-600'>Nuevo Password</label>
                            <input 
                                type='password'
                                className='border bg-gray-50 w-full p-2 mt-5 rounded-lg'
                                name="newPassword"
                                placeholder='Escribe tu nuevo password'
                                onChange={e => setPassword({...password, [e.target.name]: e.target.value})}
                            />
                        </div>

                        <input 
                            type='submit'
                            value={"Actualizar password"}
                            className='bg-indigo-600 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 hover:bg-indigo-700 cursor-pointer'
                        />
                    </form>
                    {msg && <Alerts alert={alert} />}
                </div>
            </div>
        </>
    )
}

export default ChangePass