import React from 'react';
import './Navbar2.scss';
import { useAuth } from '../store/auth';
import { NavLink } from "react-router-dom";

const Sidebar = ({close}) => {
    const { token } = useAuth();
    return (
        <div className='sidebar' onClick={close}>
            <div>

                <NavLink to="/about" className={'sidebar-link'}><div className='icon-name'><img src='../public/home.svg'/>Home</div></NavLink>

                <NavLink to="/settings" className={'sidebar-link'}><div className='icon-name'><img src='../public/settings.svg'/>Settings</div></NavLink>
                
                {
                    token ? <>
                    <NavLink to="/search_recipe" className={'sidebar-link'}><div className='icon-name'><img src='../public/food.svg'/>Search Recipe</div></NavLink>
                    <NavLink to="/search_video" className={'sidebar-link'}><div className='icon-name'><img src='../public/video.svg'/>Search Video</div></NavLink>
                    <NavLink to="/logout" className={'sidebar-link'}><div className='icon-name'><img src='../public/logout.svg'/>Logout</div></NavLink>
                    </> : 
                    <><NavLink to="/login" className={'sidebar-link'}><div className='icon-name'><img src='../public/login.svg'/>Login</div></NavLink>
                    <NavLink to="/signup" className={'sidebar-link'}><div className='icon-name'><img src='../public/sign_in.svg'/>Signup</div></NavLink></>
                }

            </div>
        </div>
    )
}

export default Sidebar
