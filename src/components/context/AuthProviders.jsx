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
    email: "melina@gmail.com",
    passWord: "test1234",
    name: "melina"
  }


export default function AuthProviders({children}){
  const [{user, isAuthenticated},dispatch] = useReducer(authReducer,initialState);

    function login(email, passWord){
      if(email === fakeUser.email && passWord === fakeUser.passWord){
          console.log(fakeUser.email);
          console.log(fakeUser.passWord);
          console.log(email,passWord);
          dispatch({type: "login", payload : fakeUser})
        }
      }
    
      function logout(){
        dispatch({type:"logout"})
      }

    return (
    <AuthContext.Provider value={{user, isAuthenticated, login, logout}}>
        {children}
    </AuthContext.Provider>
  )
};

export function useAuth(){
    return useContext(AuthContext);
}