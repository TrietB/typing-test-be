import { useAuth } from "../hooks/useAuth";
import {Navigate, useLocation} from 'react-router-dom'

export function AuthRequire({children}) {
    const {isInitialized, isAuthenticated} = useAuth()
    const location = useLocation()

    if(!isInitialized){
        return <div>Is loading</div>
    }

    if(!isAuthenticated){
        return <Navigate to='/login' state={{from: location}} replace/>
    }

    return children
}