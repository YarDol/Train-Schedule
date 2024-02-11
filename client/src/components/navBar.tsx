import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { SiRailway } from 'react-icons/si';
import { useAuth } from '../hooks/useAuth';
import { IoLogOut } from "react-icons/io5";
import { useAppDispatch } from '../store/hooks';
import { logout } from '../store/user/userSlice';
import { removeTokenFromLocalStorage } from '../utils/localstorage';
import { toast } from 'react-toastify';

const Navbar: React.FC = () => {
    const isAuth = useAuth();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        dispatch(logout())
        removeTokenFromLocalStorage('token')
        toast.success('You have successfully logged out');
        navigate('/');
    }

    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
            <Link className='navbar-brand ms-1' to='/'>
                <SiRailway className='text-white' size={35} />
                <span className='ml-2 ms-1 text-white text-lg font-semibold'>Train Schedule App</span>
            </Link>
            <div className='collapse navbar-collapse justify-content-end pe-4'>
                <ul className='navbar-nav'>
                    {!isAuth && (
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='/auth'>Sign In</NavLink>
                        </li>
                    )}
                    {isAuth && (
                        <li className='nav-item d-flex align-items-center'>
                            <NavLink className='nav-link' to='/users'>User</NavLink>
                            <button
                                className='btn nav-link'
                                onClick={logoutHandler}
                            >
                                <IoLogOut size={15} className='me-1' />
                                Logout
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
