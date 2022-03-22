import React, { Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { register, login } from './landingSlice';
import { Transition } from '@headlessui/react';
import { Top } from '../components/top';
import { useNavigate } from 'react-router-dom';
import { enter } from './userSlice';
import swal from 'sweetalert';
import axios from 'axios';
export function Landing() {
    const [userName, setName] = useState('')
    let navigate = useNavigate();
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const home = useSelector((state) => state.landing.value)
    const dispatch = useDispatch()
    const showAlert = (msg, ok) => {
        return (swal(
            ' ', msg, ok
        )
        )
    }

    const PostData = async () => {

        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            showAlert('Invalid email', "error");
            return
        }
        axios.post("http://localhost:5000/api/userRoute/signup",
            {
                userName: userName,
                email: email,
                password: password
            }).then(function (response) {
                console.log(response);
                setEmail('')
                setName('')
                setPassword('')
                showAlert('User account created', "success")
                dispatch(register())
            }).catch(function (error) {
                console.log(error.response);
                setEmail('')
                setName('')
                setPassword('')
                showAlert(error.response.data.message, "error");

            })



    }
    const PostLogin = async () => {
        axios.post("http://localhost:5000/api/userRoute/login",
            {
                userName: userName,
                password: password
            }).then(function (response) {
                console.log(response);
                setEmail('')
                setName('')
                setPassword('')
                console.log(response.data.signedUpUser)
                dispatch(enter(response.data.signedUpUser))
                navigate("../home", { replace: true });
            }).catch(function (error) {
                console.log(error.response);
                setEmail('')
                setName('')
                setPassword('')
                showAlert(error.response.data.message, "error");

            })

    }
    return (
        <div> <Top />

            <div className='flex flex-col  space-y-1  w-screen h-[700px] bg-white text-blue-600 '>

                <div className='relative flex w-[300px] sm:w-[400px]  place-self-center  h-[500px]'>
                    <Transition
                        as={Fragment}
                        show={home === 1}
                        enter="ease-in-out"
                        enterFrom="translate-x-full opacity-0"
                        enterTo="translate-x-0 opacity-100"
                        leave="ease-out"
                        leaveFrom="translate-x-0 opacity-100"
                        leaveTo="translate-x-full opacity-0"
                    >
                        <button className='text-yellow-100 font-bold py-2 px-5 w-[100px] mb-3 h-[20]  absolute top-48  left-[-12%] transform -rotate-90 sm:h-[100px] sm:left-[-25%] sm:rotate-0  bg-blue-500 hover:scale-110 hover:bg-indigo-500 hover:rotate-0 transition-all duration-300' onClick={() => dispatch(login())}>
                            Log in</button>
                    </Transition>
                    {home === 0 && <div className=' flex flex-col shadow-slate-800 grow h-full place-self-center justify-center  shadow-2xl border-solid bg-yellow-50	border-slate-900 border-2 rounded	xl:w-2/6 '>
                        {/* <form> */}
                        <div className='text-blue-900 text-left ml-14 '>Username</div>
                        <input type='text' placeholder="username" value={userName}
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                            className=" border rounded  py-1 mx-14 px-2	mb-3 flex-initial 
                 text-gray-700" />
                        <div className='text-blue-900 text-left ml-14'>Password</div>
                        <input type='password' placeholder="password" value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className=" border rounded  px-2 py-1 mx-14 mb-3 flex-initial 
                 text-gray-700" />
                        <button onClick={() => PostLogin()}
                            className='text-yellow-100 font-bold py-2 px-5 mb-3 mx-auto bg-blue-500 -translate-y-1 hover:scale-110 hover:bg-indigo-500  transition-all duration-300'>
                            Login
                        </button>
                        <div className='text-blue-900 mx-auto mb-3'>Forgot username? | Forgot password?</div>
                    </div>}
                    {home === 1 && <div className='flex flex-col grow   shadow-slate-800	shadow-2xl justify-center   border-solid bg-yellow-50	border-slate-900 border-2 rounded	xl:w-2/6 '>
                        <div className='text-blue-900 text-left ml-14 '>Email</div>
                        <input type='email' placeholder="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                            className=" border rounded  py-1 mx-14	mb-3 flex-initial 
                     text-gray-700  invalid:border-pink-500 invalid:text-pink-600
                     focus:invalid:border-pink-500 focus:invalid:ring-pink-500" />
                        <div className='text-blue-900 text-left ml-14 '>Username</div>
                        <input type='text' placeholder="username"
                            value={userName}
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                            className=" border rounded  py-1 mx-14	mb-3 flex-initial 
                     text-gray-700" />
                        <div className='text-blue-900 text-left ml-14'>Password</div>
                        <input type='password' placeholder="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                            className=" border rounded  py-1 mx-14 mb-3 flex-initial 
                     text-gray-700" />
                        <button
                            className='text-yellow-100 font-bold py-2 px-5 mx-auto mb-3  bg-blue-500 -translate-y-1 hover:scale-110 hover:bg-indigo-500  transition-all duration-300'
                            onClick={() => PostData()}>Sign Up
                        </button>
                    </div>}
                    <Transition
                        as={Fragment}
                        show={home === 0}
                        enter="ease-in-out"
                        enterFrom="-translate-x-full opacity-0"
                        enterTo="-translate-x-0 opacity-100"
                        leave="ease-out"
                        leaveFrom="-translate-x-0 opacity-100"
                        leaveTo="-translate-x-full opacity-0"
                    >
                        <button className='text-yellow-100 font-bold py-2 px-5  mb-3 h-[20] w-[100px] absolute top-48  right-[-15%] transform rotate-90 sm:h-[100px] sm:right-[-25%] sm:rotate-0  bg-blue-500 hover:scale-110 hover:bg-indigo-500 hover:rotate-0 transition-all duration-300' onClick={() => dispatch(register())}>
                            Sign Up</button>
                    </Transition>
                </div>
            </div></div>
    )
}


