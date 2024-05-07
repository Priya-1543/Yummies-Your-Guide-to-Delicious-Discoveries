import './App.css'
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import Home from './Home'
import Logout from './Logout'
import About from './About'
import Search_recipe from './Search_recipe'
import 'bootstrap/dist/css/bootstrap.css'
import Navbar from './components/Navbar'
import DetailRecipe from './DetailRecipe'
import Search_video from './Search_video'
import Settings from './components/Settings'
import PrivateRoute from './components/PrivateRoute'



function App() {

  useEffect(() => {
    // let settings = localStorage.getItem('Setting-config');
    // if (settings) {
    //   settings = JSON.parse(settings);
    //   const root = document.documentElement
    //   for (let key in settings) {
    //     root.style.setProperty(key, settings[key])
    //   }
    // }
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
    console.log(settings);
    let data = {
      "theme": Theme,
      "fontSize": fontSize,
      "primaryColor": primaryColor,
      "animationSpeed": animationSpeed
    }




  }, [])

  return (
    <BrowserRouter>

      <Routes>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/' element={<About />}></Route>

        <Route element={<PrivateRoute />}>

          <Route path='/logout' element={<Logout />}></Route>
          {/* <Route path='/home' element={<Home />}></Route> */}
          <Route path='/search_recipe' element={<Search_recipe />}></Route>
          <Route path='/search_video' element={<Search_video />}></Route>
          <Route path='/settings' element={<Settings />}></Route>
          <Route path='/recipe/:slug' element={<DetailRecipe />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App