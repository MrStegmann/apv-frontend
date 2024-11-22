import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthProvider';
import { PatientsProvider } from './context/PatientsProvider';

import AuthLayout from './layout/AuthLayout';
import SecureRoute from './layout/SecureRoute';

import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPass from './pages/ForgotPass';
import ConfirmUser from './pages/ConfirmUser';
import NewPassword from './pages/NewPassword';
import AdminPatients from './pages/AdminPatients';
import Profile from './pages/Profile';
import ChangePass from './pages/ChangePass';


const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PatientsProvider>
          <Routes>
            
            <Route path='/' element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path='register' element={<Register />} />
              <Route path='forgotPass/' element={<ForgotPass />} />
              <Route path='forgotPass/:token' element={<NewPassword />} />
              <Route path='confirmUser/:id' element={<ConfirmUser />} />
            </Route>

            <Route path='/admin' element={<SecureRoute />}>
              <Route index element={<AdminPatients />} />
              <Route path='profile' element={<Profile />} />
              <Route path='changePass' element={<ChangePass />} />
            </Route>

          </Routes>
        </PatientsProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
