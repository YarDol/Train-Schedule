import { Route, Routes } from 'react-router-dom';
import Error404 from './utils/error';
import Main from './pages/main';
import Auth from './pages/auth';
import Users from './pages/users';
import Navbar from './components/navBar';
import { useAppDispatch } from './store/hooks';
import { getTokenFromLocalStorage } from './utils/localstorage';
import { AuthService } from './services/auth.service';
import { login, logout } from './store/user/userSlice';
import { useEffect } from 'react';
import { ProtectedRoute } from './components/protectedRoute';

function App() {
  const dispatch = useAppDispatch();

  const checkAuth = async () => {
    const token = getTokenFromLocalStorage();
    try{
      if(token){
        const data = await AuthService.profile();
        if(data){
          dispatch(login(data))
        }else{
          dispatch(logout())
        }
      }
    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    checkAuth();
  },[])

  return (
    <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
          <Route path="*" element={<Error404 />} />
        </Routes>
    </div>
  );
}

export default App;
