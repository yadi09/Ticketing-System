import React from 'react'
import image from '../../assets/image.png'
import Header from '../../components/Header'
import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <>
            <Header />
            <NavBar />
            <section className="min-h-screen flex
        items-center justify-center font-mono
        ">
                <div className='flex shadow-md rounded-2xl'>
                    <div className='flex flex-col items-center
                    justify-center text-center p-20 gap-8
                    bg-white rounded-2xl
                    xl:rounded-tr-none xl:rounded-br-none
                    '>
                        <h1 className='text-5xl font-bold'>Welcome</h1>

                        <div className='flex flex-col text-2xl
                    text-left gap-1'>
                            <span>Email</span>
                            <input type='text' className='rounded-md p-1 border-2
                        outline-none focus:border-cyan-400
                        focus:bg-slate-50' />

                            <span>Password</span>
                            <input type='password' className='rounded-md p-1 border-2
                        outline-none focus:border-cyan-400
                        focus:bg-slate-50' />

                            <div className='flex gap-1 items-center'>
                                <input type='checkbox' />
                                <span className='text-base'>Remember Password</span>
                            </div>

                        </div>
                        <button className='px-10 py-2 text-2xl rounded-md
                    bg-[rgb(0,122,255)] hover:bg-[rgb(10,75,145)]
                    text-white transition duration-300
                        '>Login</button>

                        <p>Don't have an account? <Link to='/register' className="
                        text-blue-400 hover:underline
                        ">Register</Link></p>
                    </div>

                    <img src={image} alt="Login Avatar" className='
                w-[450px] object-cover xl:rounded-tr-2xl
                xl:rounded-br-2xl
                xl:block hidden
                ' />
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Login