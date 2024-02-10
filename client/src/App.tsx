import { Route, Routes } from 'react-router-dom';
import Error404 from './utils/error';
import Main from './pages/main';
import Auth from './pages/auth';
import Users from './pages/users';
import Navbar from './components/navBar';

function App() {
  return (
    <div className='min-h-screen bg-slate-900 pb-20 font-roboto text-white'>
      <Navbar/>
      <div className='container'>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/users" element={<Users />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
