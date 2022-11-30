import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null);

export const AuthProvider = ({children}) =>{
    const [customer_id,setCoustmer_id] = useState(null);
    const [adminid,setadminid] = useState(null)

    const Logincustomer_id = (customer_id)=>{
        setCoustmer_id(customer_id)
    }

    const AdminLoginId = (adminid) => {
        setadminid(adminid)
    }

    return(
        <AuthContext.Provider value={{customer_id,Logincustomer_id,adminid,AdminLoginId}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () =>{
    return useContext(AuthContext);
}