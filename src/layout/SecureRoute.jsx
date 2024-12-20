import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Header from '../components/Header';
import Footer from '../components/Footer';

const SecureRoute = () => {

    const { auth, loading } = useAuth();

    if (loading) return "Cargando datos...";

    return (
        <>
            <Header />
            { auth?._id ? (
                <main className='container mx-auto mt-10'>
                    <Outlet />
                </main>
            ) : <Navigate to="/" />}
            <Footer />
        </>
    )
}

export default SecureRoute