import
{ BrowserRouter ,
  Routes,
  Route
} from 'react-router-dom';
import { AdminAuthProvider } from './adminContext/adminLoginContext';
import { AuthProvider } from './Context/LoginContext';
import { Restrict } from './Context/Restrict';
import Admin from './pages/admin';
import AdminLogin from './pages/adminLogin';
import Adminsignup from './pages/adminSignup';
import Booking from './pages/booking';
import Login from './pages/login';
import Signup from './pages/signup';
import Update from './pages/update';

function App() {
  return (
    <div>
      <AdminAuthProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/adminlogin' element={<AdminLogin/>}></Route>
              <Route path='/adminsignup' element={<Adminsignup/>}></Route>
              <Route path='/' element={<Restrict><Booking/></Restrict>}></Route>
              <Route path='/admin' element={<Admin/>}></Route>
              <Route path='/signup' element={<Signup/>}></Route>
              <Route path='/login' element={<Login/>}></Route>
              <Route path='/update' element={<Restrict><Update /></Restrict>}></Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
        </AdminAuthProvider>
    </div>
  );
}

export default App;