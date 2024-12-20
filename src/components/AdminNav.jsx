import React from 'react'
import { Link } from 'react-router-dom'

const AdminNav = () => {
    return (
        <nav className='flex gap-3'>
            <Link to="/admin/profile" className='font-bold uppercase text-gray-500'>Perfil</Link>
            <Link to="/admin/changePass" className='font-bold uppercase text-gray-500'>Cambiar Password</Link>
        </nav>
    )
}

export default AdminNav