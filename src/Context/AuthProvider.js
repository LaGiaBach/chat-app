import React, { createContext, useEffect, useState } from 'react';
import {useNavigate } from "react-router-dom";
import {auth} from "../firebase/config"
import {Spin} from "antd"

export const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [users , setUsers] = useState({})
    const navigate = useNavigate() 
    const[isLoading,setIsLoading] = useState(true)

    useEffect(() => {
       const unsubscribed = auth.onAuthStateChanged((user) =>{
            // console.log(user)
            if(user){
                navigate('/');
                setIsLoading(false)
                const {displayName,email ,uid,photoURL } = user?.multiFactor?.user
                setUsers({displayName,email ,uid,photoURL })
                return;
                
            }
            setIsLoading(false)
            navigate('/login')
           
            
          });
          // clean up function
          return () => {
            unsubscribed()
          }
    },[navigate])
  return (
    <AuthContext.Provider value={{users}}>
        {isLoading? <Spin style={{ display:"flex" , justifyContent:"center", alignItems:"center" , minHeight:"100vh"}}/> :children}
    </AuthContext.Provider>
  )
}

export default AuthProvider