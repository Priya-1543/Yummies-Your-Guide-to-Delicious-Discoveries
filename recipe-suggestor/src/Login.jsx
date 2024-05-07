import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from './store/auth';
import Navbar from './components/Navbar';
import Footer from './components/Footer';


async function  changSettings(){
    const getData = () => {
        let data;
        if (localStorage.getItem('Settings-data')) {
            data = JSON.parse(localStorage.getItem('Settings-data'));
        }
        return data;
    }

    const Setting = getData();
    const Theme = Setting ? Setting.theme : 0;
    const primaryColor = Setting ? Setting.primaryColor : 0;
    const fontSize = Setting ? Setting.fontSize : 1;
    const animationSpeed = Setting ? Setting.animationSpeed : 1;


    const themes = [
        {
            "--background-color": "#fff",
            "--background-light": "#fff",
            "--shadow-color": "rgba(0, 0, 0, 0.2)",
            "--text-color": "#0A0A0A",
            "--text-light": "#575757",

        }
        ,
        {

            "--background-color": "rgb(29,29,29)",
            "--background-light": "rgb(77,77,77)",
            "--shadow-color": "rgba(0, 0, 0, 0.2)",
            "--text-color": "#ffffff",
            "--text-light": "#eceaea",

        }
    ];

    const colorOptions = [
        'rgb(255,0,86)',
        'rgb(33,150,243)',
        'rgb(255,193,7)',
        'rgb(0,200,83)',
        'rgb(156,39,176)'

    ];

    const fontSizes = [
        {
            title: "small",
            value: "12px"

        },
        {
            title: "medium",
            value: "16px"
        }
        ,
        {
            title: "large",
            value: "20px"
        }
    ];

    const animationSpeeds = [
        {
            title: "Slow",
            value: 2

        },
        {
            title: "medium",
            value: 1
        }
        ,
        {
            title: "fast",
            value: 0.5
        }
    ];

    const genrateSettings = () => {
        let setting = {};
        for (let key in themes[Theme]) {
            setting[key] = themes[Theme][key];
        }

        setting['--primary-color'] = colorOptions[primaryColor];
        setting['--font-size'] = fontSizes[fontSize].value;
        setting['--animation-speed'] = animationSpeeds[animationSpeed].value;

        return setting;
    }
    const settings = genrateSettings();


    const root = document.documentElement
    for (let key in settings) {
        root.style.setProperty(key, settings[key])
    }
    // console.log(settings);
    // let data = {
    //     "theme": Theme,
    //     "fontSize": fontSize,
    //     "primaryColor": primaryColor,
    //     "animationSpeed": animationSpeed
    // }
}


const Login = () => {
    const navigate = useNavigate();
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const { StoreTokenInLS, user } = useAuth()
    // console.log(user)



    const handleSumbit = async (e) => {

        try {
            e.preventDefault()
            const response = await axios.post('http://localhost:3001/login', { name, password })

            if (response) {
                const res = response
                // console.log(res)

                StoreTokenInLS(res.data.token);

                const Settings = res.data.Settings.userSettings;
                // console.log(Settings);
                if (Settings) {
                    localStorage.setItem('Settings-data', JSON.stringify(Settings));
                }

                changSettings();
                navigate('/about')
            }
        }
        catch (error) {
            console.log('login error : ', error)
        }
    }

    return (
        <>
            <Navbar />
            <div className="Logincontainer">
                <h1>Login</h1>
                <div className="LoginSection">
                    <form onSubmit={handleSumbit}>
                        <div className="LoginInput">
                            <label htmlFor="exampleInputName" className="LoginLable">Name</label>
                            <input type="text" className="LoginInputField" id="exampleInputName"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="LoginInput">
                            <label htmlFor="exampleInputPassword1" className="LoginLable">Password</label>
                            <input type="password" className="LoginInputField" id="exampleInputPassword1"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn">Login</button>
                    </form>
                </div>
            </div>
            <Footer />
        </>

    )
}

export default Login