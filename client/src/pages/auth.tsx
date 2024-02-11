import {FC, useState} from 'react'
import { AuthService } from '../services/auth.service'
import { toast } from 'react-toastify'
import { setTokenToLocalStorage } from '../utils/localstorage'
import { useAppDispatch } from '../store/hooks'
import { login } from '../store/user/userSlice'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup';

const Auth: FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [isLogin, setIsLogin] = useState<boolean>(false)
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const validationSchema = yup.object().shape({
        email: yup.string().email('Invalid email').required('Email is required'),
        password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    });

    const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            await validationSchema.validate({ email, password }, { abortEarly: false });

            const data = await AuthService.login({email, password})

            if(data){
                setTokenToLocalStorage('token', data.token)
                dispatch(login(data))
                toast.success('You have successfully logged in')
                navigate('/')
            }
        } catch (err: any) {
            if (err.name === 'ValidationError') {
                err.errors.forEach((error: string) => toast.error(error));
            } else {
                const error = err.response?.data?.message;
                toast.error(error?.toString() || 'Error during login');
            }
        }
    }

    const registrationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            await validationSchema.validate({ email, password }, { abortEarly: false });

            const data = await AuthService.registration({email, password})
            if(data){
                toast.success('Account has been created successfully')
                setIsLogin(!isLogin)
            }
        } catch (err: any) {
           if (err.name === 'ValidationError') {
                err.errors.forEach((error: string) => toast.error(error));
            } else {
                const error = err.response?.data.message;
                toast.error(error?.toString() || 'Error during registration');
            }
        }
    }

    return (
        <div className='mt-5 container d-flex justify-content-center align-items-center'>
            <div className=' mt-5 p-4 shadow-lg'>
                <h1 className='text-center text-3xl font-weight-bold'>
                    {isLogin ? 'Sign Up' : 'Sign In'}
                </h1>
                <form className='mt-4' onSubmit={isLogin ? registrationHandler : loginHandler}>
                    <div className='mb-3'>
                        <label htmlFor='email' className='form-label font-weight-semibold' >
                            Email
                        </label>
                        <input
                            type='email'
                            id='email'
                            className='form-control'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password' className='form-label font-weight-semibold'>
                            Password
                        </label>
                        <input
                            type='password'
                            id='password'
                            className='form-control'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='d-flex justify-content-center'>
                        <button type='submit' className='btn btn-dark'>
                            Submit
                        </button>
                    </div>
                </form>
                <div className='mt-3 d-flex justify-content-center'>
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className='btn btn-link text-dark font-weight-bold'
                    >
                        {isLogin
                            ? 'Already have an account?'
                            : 'Create an account'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Auth;