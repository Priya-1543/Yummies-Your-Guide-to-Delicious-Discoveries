import React from 'react'
import './Navbar2.scss'
import { NavLink } from "react-router-dom";
import { useAuth } from '../store/auth';
import { useState } from 'react';
import Sidebar from './Sidebar';

const Navbar = () => {

    const [showSidebar, setshowSidebar] = useState(false);
    const { token } = useAuth();
    console.log(token, "SA")
    // let user=(localStorage.getItem("token"))

    function closeSidebar(){
        setshowSidebar(false);
    }

    return (
        <>
            <nav className="navBar navContainer">

                <div className="logo-container">
                    <img src='../public/logo.png' className='logo-img'></img>
                    <NavLink to="/home" className={'no-border'}><h2 className='logo'>Yu<span>mm</span>iees</h2></NavLink>
                </div>

                <div className="menu-link">

                    <NavLink to="/about" className={'a'}>Home</NavLink>
                    <NavLink to="/settings" className={'a'}>Settings</NavLink>
                   
                    {
                        token ? <>
                        <NavLink to="/search_recipe" className={'a'}>Search Recipe</NavLink>
                        <NavLink to="/search_video" className={'a'}>Search Video</NavLink>
                        <NavLink to="/logout" className={'a'}>Logout</NavLink>
                        </> 
                        : 
                        <><NavLink to="/login" className={'a'}>Login</NavLink>
                        <NavLink to="/signup" className={'a'}>Signup</NavLink></>
                    }

                </div>

                <div onClick={()=> setshowSidebar(!showSidebar)} className={showSidebar ? "sidebar-btn active" : "sidebar-btn"}>
                    <div className='bar'></div>
                    <div className='bar'></div>
                    <div className='bar'></div>
                </div>

            </nav>

            {showSidebar && <Sidebar close={closeSidebar}/>}
        </>
    )
}

export default Navbar
