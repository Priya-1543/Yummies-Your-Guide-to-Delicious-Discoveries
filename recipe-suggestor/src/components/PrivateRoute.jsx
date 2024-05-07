import { Navigate, Outlet } from 'react-router-dom'
import axios from "axios";
import { useEffect, useReducer, useState } from 'react';
import { useAuth } from '../store/auth';



const PrivateRoute = () => {

  const user=localStorage.getItem('token')
    

  return(

    user?<Outlet/> : <Navigate to='/login' />
  )

}

export default PrivateRoute