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
                        <h1 className='text-5xl font-bold'>Register</h1>

                        <div className='flex flex-col text-2xl
                    text-left gap-1'>
                            <span>Full Name</span>
                            <input type='text' className='rounded-md p-1 border-2
                        outline-none focus:border-[rgb(0,122,255)]
                        focus:bg-slate-50' />

                            <span>Email</span>
                            <input type='text' className='rounded-md p-1 border-2
                        outline-none focus:border-[rgb(0,122,255)]
                        focus:bg-slate-50' />

                            <span>Password</span>
                            <input type='password' className='rounded-md p-1 border-2
                        outline-none focus:border-[rgb(0,122,255)]
                        focus:bg-slate-50' />

                            <span>Confirm Password</span>
                            <input type='password' className='rounded-md p-1 border-2
                        outline-none focus:border-[rgb(0,122,255)]
                        focus:bg-slate-50' />

                        </div>
                        <button className='px-10 py-2 text-2xl rounded-md
                    bg-[rgb(0,122,255)] hover:bg-[rgb(10,75,145)]
                    text-white transition duration-300
                        '>Register</button>

                        <p>I have account. <Link to='/login' className="
                        text-blue-400 hover:underline
                        ">Login</Link></p>
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