// import { Login } from '@mui/icons-material';
import
{ BrowserRouter ,
  Routes,
  Route
} from 'react-router-dom';
import { AdminAuthProvider } from './adminContext/adminLoginContext';
import { AuthProvider } from './Context/LoginContext';
import { AdminRestrict, Restrict } from './Context/Restrict';
import Booking from './pages/booking';
import Imports from './pages/imports';
import Login from './pages/login'
import Seller from './pages/seller';
import Sellerlogin from './pages/sellerlogin';
import Sellersignup from './pages/sellersignup';
import Signup from './pages/signup'

function App() {
  return (
    <div>
      <AdminAuthProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Restrict><Booking /></Restrict>}></Route>
              <Route path='/login' element={<Login/>}></Route>
              <Route path='/signup' element={<Signup/>}></Route>
              <Route path='/sellerlogin' element={<Sellerlogin/>}></Route>
              <Route path='/sellersignup' element={<Sellersignup/>}></Route>
              <Route path='/seller' element={<AdminRestrict><Seller/></AdminRestrict>}></Route>
              <Route path='/import' element={<AdminRestrict><Imports/></AdminRestrict>}></Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
        </AdminAuthProvider>
    </div>
  );
}

export default App;