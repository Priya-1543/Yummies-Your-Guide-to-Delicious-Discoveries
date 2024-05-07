import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './store/auth';
import Navbar from './components/Navbar';
import Footer from './components/Footer';


const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const { StoreTokenInLS } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:3001/signup', { name, email, password })
            if (response) {
                console.log(response)
                navigate('/login')
            }
        }
        catch (err) {
            console.log("signup error : ", err)
        }
    }

    return (
        <>
            <Navbar />
            <div className="Logincontainer">
                <h1>Signup</h1>
                <div className="LoginSection">
                    <form onSubmit={handleSubmit}>
                        <div className="LoginInput">
                            <label htmlFor="exampleInputName" className="LoginLable">Name</label>
                            <input type="text" className="LoginInputField" id="exampleInputName"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="LoginInput">
                            <label htmlFor="exampleInputEmail1" className="LoginLable">Email address</label>
                            <input type="email" className="LoginInputField" id="exampleInputEmail1"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="LoginInput">
                            <label htmlFor="exampleInputPassword1" className="LoginLable">Password</label>
                            <input type="password" className="LoginInputField" id="exampleInputPassword1"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn">Sign Up</button>
                    </form>
                </div>
            </div>
            <Footer />
        </>

    )
}

export default Signup
