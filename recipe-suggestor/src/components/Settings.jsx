import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { useAuth } from '../store/auth'
import axios from 'axios'

const Settings = () => {

  const getData=()=>{
    let data;
    if(localStorage.getItem('Settings-data')){
      data=JSON.parse(localStorage.getItem('Settings-data'));
    }
    return data;
  }
  const [Setting, setSetting] = useState(()=>getData());
 
  const { user } = useAuth();
  const [Theme, setTheme] = useState(Setting ? Setting.theme : 0);
  const [primaryColor, setPrimaryColor] = useState(Setting ? Setting.primaryColor : 0);
  const [fontSize, setFontSize] = useState(Setting ? Setting.fontSize : 1);
  const [animationSpeed, setAnimationSpeed] = useState(Setting ? Setting.animationSpeed : 1);


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
  const [settings, setSettings] = useState(() => genrateSettings());

  useEffect(() => {
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
    localStorage.setItem('Settings-data', JSON.stringify(data));
    // localStorage.setItem('Setting-config',JSON.stringify(settings));
  }, [settings])

  function changeTheme(index) {
    const _theme = { ...themes[index] };

    setTheme(index);

    let _settings = { ...settings };
    for (let key in _theme) {


      _settings[key] = _theme[key];

    }
    setSettings(_settings);
  }



  function changeColor(index) {
    const _color = colorOptions[index];
    setPrimaryColor(index);
    let _settings = { ...settings };
    _settings['--primary-color'] = _color
    setSettings(_settings);


  }

  function changeFontSize(index) {
    const _size = fontSizes[index];
    setFontSize(index);
    let _settings = { ...settings };
    _settings['--font-size'] = _size.value
    setSettings(_settings);
  }


  function changeAnimationSpeed(index) {

    const _size = animationSpeeds[index];
    setAnimationSpeed(index);
    let _settings = { ...settings };
    _settings['--animation-speed'] = _size.value
    setSettings(_settings);

  }

  async function saveSettings() {

    let data = {
      "theme": Theme,
      "fontSize": fontSize,
      "primaryColor": primaryColor,
      "animationSpeed": animationSpeed
    }
    let name = user.name;
    try {
      const response = await axios.post('http://localhost:3001/settings', { name: name, data: data });
      if(response.status===200){
        alert("Settings Saved Successfully");
      }
      else{
        alert("There is some error. Please try later")
      }
    }
    catch (err) {
      alert("There is some error");
    }


  }

  return (
    <>
      <Navbar />
      <div className="section mg dp-block navContainer">
        <h2>Preferred Theme</h2>
        <div className="options-container">
          <div className="option light-md" onClick={() => changeTheme(0)}>
            {Theme === 0 && (

              <div className="check">
                <img src="../public/check.svg" alt="" />
              </div>
            )}
          </div>
          <div className="option dark-md" onClick={() => changeTheme(1)}>
            {Theme === 1 && (
              <div className="check">
                <img src="../public/check.svg" alt="" />
              </div>

            )}
          </div>
        </div>
      </div>

      <div className="section mg dp-block navContainer">
        <h2>Primary color</h2>
        <div className="options-container">


          {
            colorOptions.map((color, index) => (
              <div key={index} className="option light" style={{ backgroundColor: color }} onClick={() => changeColor(index)}>
                {primaryColor === index && (
                  <div className="check">
                    <img src="../public/check.svg" alt="" />
                  </div>


                )}

              </div>
            ))
          }

        </div>
      </div>

      <div className="section mg dp-block navContainer">
        <h2>Font Size</h2>
        <div className="options-container">


          {
            fontSizes.map((size, index) => (

              <button key={index} className='btn-settings' onClick={() => changeFontSize(index)}>

                {size.title}

                {fontSize === index && (

                  <span><img src="../public/check.svg" alt="" /></span>

                )}


              </button>
            ))
          }
        </div>
      </div>
      <div className="section mg dp-block navContainer">
        <h2>Animation Speed</h2>
        <div className="options-container">


          {
            animationSpeeds.map((size, index) => (

              <button key={index} className='btn-settings' onClick={() => changeAnimationSpeed(index)}>

                {size.title}

                {animationSpeed === index && (

                  <span><img src="../public/check.svg" alt="" /></span>

                )}


              </button>
            ))
          }
        </div>
      </div>

      <div className="section mg navContainer save-box">
        <button className='btn-settings' onClick={() => saveSettings()}>Save permanently</button>
      </div>


      <Footer />

    </>
  )
}

export default Settings
