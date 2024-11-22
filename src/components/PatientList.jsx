import usePatients from "../hooks/usePatients";
import Patient from "./Patients";

const PatientList = () => {

    const { patients } = usePatients();

    return (
        <>
            { patients.length ? 
            (
                <>
                    <h2 className="font-black text-3xl text-center">Listado de Pacientes</h2>
                    <p className="text-xl mt-5 mb-10 text-center">Administra tus {""}<span className="text-indigo-600 font-bold">Pacientes y Citas</span></p>

                    {patients.map( pat => (
                        <Patient 
                            key={pat._id}
                            patient={pat}
                        />
                    ))}
                </>
            ) : (
                <>
                    <h2 className="font-black text-3xl text-center">No hay Pacientes</h2>
                    <p className="text-xl mt-5 mb-10 text-center">Comienza agregando pacientes {""}<span className="text-indigo-600 font-bold">y Aparecerán en este Lugar</span></p>
                </>
            )}
        </>
    )
}

export default PatientList