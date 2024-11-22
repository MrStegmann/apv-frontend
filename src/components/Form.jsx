import { useEffect, useState } from "react"
import Alerts from "./Alerts";
import usePatients from "../hooks/usePatients";


const Form = () => {
    const [ data, setData ] = useState({nombre: "", propietario: "", email: "", alta: "", sintomas: "", _id: null});

    const [ alert, setAlert ] = useState({});

    const { savePatient, patient } = usePatients();

    const handleSubmit = e => {
        e.preventDefault();

        if ([data.nombre, data.propietario, data.email, data.sintomas, data.alta].includes("")) return setAlert({msg: "Todos los campos son obligatorios", error: true});

        savePatient(data);

        setAlert({msg: "Guardado correctamente", error: false});
        setData({nombre: "", propietario: "", email: "", alta: "", sintomas: "", _id: null});
    };

    const formatDate = date => {
        if (!date) return ""
        const newDate = new Date(date);
    
        const year = newDate.getFullYear();
        const month = String(newDate.getMonth() + 1).padStart(2, '0'); // Mes en formato 2 dígitos
        const day = String(newDate.getDate()).padStart(2, '0'); // Día en formato 2 dígitos
    
        return `${year}-${month}-${day}`; // Formato yyyy-MM-dd
    };

    useEffect(() => {
        if (patient?._id) setData(patient);
    }, [patient])

    const { msg } = alert;
    
    return (
        <>
            <h2 className="font-black text-3xl text-center">Administrador de Pacientes</h2>
            <p className='text-xl mt-5 mb-10 text-center'>Añade tus Pacientes y {""} <span className='text-indigo-600 font-bold'>Administralos</span></p>
            <form onSubmit={handleSubmit} className="bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md">
                <div className='mb-5'>
                    <label htmlFor="nombre" className="text-gray-700 uppercase font-bold">
                        Nombre de la mascota
                    </label>
                    <input 
                        id="nombre"
                        type="text"
                        placeholder='Nombre de la mascota'
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                        name="nombre"
                        value={data.nombre}
                        onChange={e => setData({...data, [e.target.name]: e.target.value})}
                    />
                </div>

                <div className='mb-5'>
                    <label htmlFor="propietario" className="text-gray-700 uppercase font-bold">
                        Propietario
                    </label>
                    <input 
                        id="propietario"
                        type="text"
                        placeholder='Nombre del propietario'
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                        name="propietario"
                        value={data.propietario}
                        onChange={e => setData({...data, [e.target.name]: e.target.value})}
                    />
                </div>

                <div className='mb-5'>
                    <label htmlFor="email" className="text-gray-700 uppercase font-bold">
                        Email propietario
                    </label>
                    <input 
                        id="email"
                        type="email"
                        placeholder='Email del propietario'
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                        name="email"
                        value={data.email}
                        onChange={e => setData({...data, [e.target.name]: e.target.value})}
                    />
                </div>

                <div className='mb-5'>
                    <label htmlFor="alta" className="text-gray-700 uppercase font-bold">
                        Fecha de alta
                    </label>
                    <input 
                        id="alta"
                        type="date"
                        placeholder='Alta de la mascota'
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                        name="alta"
                        value={formatDate(data.alta)}
                        onChange={e => setData({...data, [e.target.name]: e.target.value})}
                    />
                </div>

                <div className='mb-5'>
                    <label htmlFor="sintomas" className="text-gray-700 uppercase font-bold">
                        Sintomas
                    </label>
                    <textarea 
                        id="sintomas"
                        placeholder='Describe los sintomas'
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                        name="sintomas"
                        value={data.sintomas}
                        onChange={e => setData({...data, [e.target.name]: e.target.value})}
                    />
                </div>

                <input 
                    type="submit"
                    value={data._id ? "Editar paciente" :"Agregar paciente"}
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                />
            </form>
            {msg && <Alerts alert={alert} />}
        </>
    )
}

export default Form