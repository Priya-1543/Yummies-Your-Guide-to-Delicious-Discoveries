import axios from "axios";
import { createContext, useContext } from "react";
import { useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user,setUser]=useState(null);
    const [dum,setdum]=useState(0);
    let check='';
    
   
    const StoreTokenInLS = (servertoken) => {
        let rt= localStorage.setItem("token", servertoken);
        setToken(localStorage.getItem("token"));
        UserAuthentiaction();
               
        return rt;
    }

    const LogoutUser = () => {
        setToken("");
        UserAuthentiaction()
        localStorage.removeItem("Settings-data");
        localStorage.removeItem("Setting-config");
        return localStorage.removeItem("token")
        
    }

    function UserAuthentiaction() {
        try {
            
            const response = axios.get('http://localhost:3001/auth/user', {headers:{
                "Content-Type":"application/json",
                "Authorization": localStorage.getItem('token')
            }});
            let data;
            response.then((dt)=>{
                data=dt.data;
                console.log(data.userData);
                setUser(data.userData);
                // console.log(setUser);
                console.log(user);
            });
            // const data=await response.data
            
        //    setInterval(()=>{
        //       console.log(user);
        //    },1000);
        //    console.log(user,data.userData);
           
        } catch (error) {
            console.log(`{there is some error ${error}}`);
            
        }
    }
    
    // Authenticator
    useEffect(() => {
        // console.log('helllo i am here....')
        UserAuthentiaction();
      
        
    },[]);


    return <AuthContext.Provider value={{ StoreTokenInLS, LogoutUser, user, token,setUser}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext);
}