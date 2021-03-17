import React,{createContext,useReducer,useContext} from 'react'
import jwtDecode from 'jwt-decode'

const authStateContext = createContext()

const authDispatchContext = createContext()

let user

const token = localStorage.getItem('token')

if(token){
    const decoded = jwtDecode(token)
    const expires = new Date(decoded.exp *1000)
    if(new Date()>expires){
        localStorage.removeItem('token')
    }else{

        user= decoded
    }
    console.log('expira en ', expires)
}else{
    console.log('no token');
}

const authReducer = (state,action)=>{

    switch(action.type){

        case 'LOGIN':

            localStorage.setItem('token',action.payload.token)


            return {
                ...state,
                user:action.payload
            }

        case 'LOGOUT':

            localStorage.removeItem('token')

            return{
                ...state,
                user:null
            }
            default:
                throw new Error('Unknown error')
    }
}

export const AuthReducerProvider = ({children}) =>{

    const [state, dispatch] = useReducer(authReducer, {user})

    return (
        <authDispatchContext.Provider value={dispatch}>
            <authStateContext.Provider value={state}>
                {children}
            </authStateContext.Provider>
        </authDispatchContext.Provider>
    )
}

export const UserAuthState = ()=>useContext(authStateContext)
export const UserAuthDispatch = ()=>useContext(authDispatchContext)