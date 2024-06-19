import React, { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
    user: null,
    isAuthenticated: false
  }

  function authReducer(state, action){
    switch(action.type){
        case "login":
            return{
                isAuthenticated: true,
                user: action.payload
            }

        case "logout":
            return{
                isAuthenticated:false,
                user: null
            }   
            
        default:{
            throw new Error("unknown Action.")
        }    
    }
  }


  const fakeUser={
    email: "mel@gmail.com",
    passWord: "test123",
    name: "melina"
  }


export default function AuthProvider({children}){

    function login(email, passWord){
        if(email === fakeUser.email && passWord === fakeUser.passWord)
            dispatch({type: "login", payload : fakeUser})
      }
    
      function logout(){
        dispatch({type:"logout"})
      }

   const [{user, isAuthenticated},dispatch] = useReducer(authReducer,initialState);
    return (
    <AuthContext.Provider value={{user, isAuthenticated, login, logout}}>
        {children}
    </AuthContext.Provider>
  )
};



export function useAuth(){
    return useContext(AuthContext);
}