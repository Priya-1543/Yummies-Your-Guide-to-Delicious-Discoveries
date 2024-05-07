import React from 'react'
// import { useContext } from 'react'
import { useAuth } from './store/auth'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const Home = () => {
  const { user } = useAuth();
  
  return (
    <>
    <Navbar/>
    <div >
      
      {user ? <div>{user.name}{
        user.email
      }</div>:<div>nooo</div>}

    </div>
    <Footer/>
    </>
  )
}

export default Home
