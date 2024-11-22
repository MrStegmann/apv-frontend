import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"


const Header = () => {
    const { logOut } = useAuth();
    return (
        <header className="py-10 bg-indigo-600 flex flex-col lg:flex-row justify-between">
            <div className="container mx-auto items-center">

                <h1 className="font-bold text-2xl text-indigo-200 text-center">Administrador de Pacientes de {""} <span className="text-white font-black">Veterinaria</span></h1>

            </div>

            <nav className="container  mx-auto flex gap-4 flex-col lg:flex-row mt-5 lg:mt-0 items-center justify-end px-5">

                <Link to="/admin" className="text-white text-sm uppercase font-bold">Pacientes</Link>

                <Link to="/admin/profile" className="text-white text-sm uppercase font-bold">Perfil</Link>

                <button type="button" className="text-white text-sm uppercase font-bold" onClick={logOut}>
                    Cerrar Sesión
                </button>
            </nav>

        </header>
    )
}

export default Header