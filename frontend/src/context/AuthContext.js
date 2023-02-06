import isValidToken from "../utils/jwt";
import apiService from "../src/app/apiService";
import { createContext, useReducer, useEffect,} from "react";
import { useSelector } from "react-redux";


const initialState = {
    isInitialized: false,
    isAuthenticated: false,
    user: null
}

const INITIALIZE = 'AUTH.INITIALIZE'
const LOGIN_SUCCESS = 'AUTH.LOGIN_SUCCESS'
const REGISTER_SUCCESS = 'AUTH.REGISTER_SUCCESS'
const LOGOUT = 'AUTH.LOGOUT'
// const UPDATE_PROFILE = 'AUTH.UPDATE_PROFILE'


const reducer = (state, action) => {
    switch(action.type){
        case INITIALIZE:
            const {isAuthenticated, user} = action.payload
            return {
                ...state,
                isInitialized: true,
                isAuthenticated,
                user
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user
            }
        case REGISTER_SUCCESS:
            return{
                ...state,
                isAuthenticated: true,
                user: action.payload.user
            }
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            }
        default: state
    }
}



const setSession = (accessToken) => {
    if(accessToken){
        window.localStorage.setItem("accessToken", accessToken)
        apiService.defaults.headers.common.Authorization = accessToken
    }else{
        window.localStorage.removeItem("accessToken")
        delete apiService.defaults.headers.common.Authorization
    }
}

const AuthContext = createContext({...initialState})

function AuthProvider({children}){
    const [state, dispatch] = useReducer(reducer, initialState)
    

    const login = async({email, password}, callback) => {
        const response = await apiService.post('/auth/login', {email, password})
        const {user, accessToken} = response.data
        setSession(accessToken)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: {user}
        })

        callback()
    }

    const register = async ({ name, email, password }, callback) => {
        const response = await apiService.post("/users", {name, email, password });
        const { user, accessToken } = response.data;
    
        setSession(accessToken);
        dispatch({
          type: REGISTER_SUCCESS,
          payload: { user },
        });
    
        callback();
    };
    
    const logout = (callback) => {
        setSession(null)
        dispatch({type: LOGOUT})
        callback()
    }

    return(
        <AuthContext.Provider value={{...state, login, register, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider}