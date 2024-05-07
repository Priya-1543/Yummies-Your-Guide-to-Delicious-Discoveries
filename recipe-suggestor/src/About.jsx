import React from 'react'
// import './components/Navbar2.scss'
import './components/Navbar';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Hero_section from './Hero_section';
import Things_to_do from './Things_to_do';
import Quote_section from './Quote_section';

const About = () => {
  return (
    <>
    <Navbar/>
    <div className='container_main'>
      <Quote_section/>
      <Hero_section/>
      <Things_to_do/>
    </div>
    <Footer/>
    </>
  )
}

export default About
