import { useEffect, useState } from 'react'
import AdminNav from '../components/AdminNav'
import useAuth from '../hooks/useAuth';
import Alerts from '../components/Alerts';

const Profile = () => {
    const [ data, setData ] = useState({nombre: "", web: "", telefono: "", email: "", _id: null});
    const [ alert, setAlert ] = useState({})

    const { auth, updateProfile } = useAuth();

    const handleSubmit = async e => {
        e.preventDefault();

        if ([data.nombre, data.email].includes("")) return setAlert({msg: "Los campos de Nombre y Email son obligatorios", error: true});

        const result = await updateProfile(data);
        setAlert(result);
    }

    useEffect(() => {

        if (auth?._id) {
            setData(auth);
        };

    }, [auth]);

    const { msg } = alert;

    return (
        <>
            <AdminNav />
            <h2 className='font-black text-3xl text-center mt-10'>Editar Perfil</h2>
            <p className='text-xl mt-5 mb-10 text-center'>Modifica tu {""}<span className='text-indigo-600 font-bold'>Información</span></p>

            <div className='flex justify-center'>
                <div className='w-full md:w-1/2 bg-white shadow rounded-lg p-5'>
                    <form onSubmit={handleSubmit}>
                        <div className='my-3'>
                            <label className='uppdercase font-bold text-gray-600'>Nombre</label>
                            <input 
                                type='text'
                                className='border bg-gray-50 w-full p-2 mt-5 rounded-lg'
                                name="nombre"
                                value={data.nombre}
                                onChange={e=> setData({...data, [e.target.name]: e.target.value})}
                            />
                        </div>

                        <div className='my-3'>
                            <label className='uppdercase font-bold text-gray-600'>Web</label>
                            <input 
                                type='text'
                                className='border bg-gray-50 w-full p-2 mt-5 rounded-lg'
                                name="web"
                                value={data.web}
                                onChange={e=> setData({...data, [e.target.name]: e.target.value})}
                            />
                        </div>

                        <div className='my-3'>
                            <label className='uppdercase font-bold text-gray-600'>Teléfono</label>
                            <input 
                                type='text'
                                className='border bg-gray-50 w-full p-2 mt-5 rounded-lg'
                                name="telefono"
                                value={data.telefono}
                                onChange={e=> setData({...data, [e.target.name]: e.target.value})}
                            />
                        </div>

                        <div className='my-3'>
                            <label className='uppdercase font-bold text-gray-600'>Email</label>
                            <input 
                                type='text'
                                className='border bg-gray-50 w-full p-2 mt-5 rounded-lg'
                                name="email"
                                value={data.email}
                                onChange={e=> setData({...data, [e.target.name]: e.target.value})}
                            />
                        </div>

                        <input 
                            type='submit'
                            value={"Guardar cambios"}
                            className='bg-indigo-600 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 hover:bg-indigo-700 cursor-pointer'
                        />
                    </form>
                    {msg && <Alerts alert={alert} />}
                </div>
            </div>
        </>
    )
}

export default Profile