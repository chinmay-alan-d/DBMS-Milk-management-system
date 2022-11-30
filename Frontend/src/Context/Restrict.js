import { Navigate } from "react-router-dom";
import { useAuth } from "./LoginContext";

export const Restrict = ({children}) =>{
    const auth = useAuth();
    if(!auth.customer_id){
        return <Navigate to="/login"/>
    }
    return children
}

export const AdminRestrict = ({children}) =>{
    const auth = useAuth();
    if(!auth.adminid){
        return <Navigate to="/sellerlogin"/>
    }
    return children
}
