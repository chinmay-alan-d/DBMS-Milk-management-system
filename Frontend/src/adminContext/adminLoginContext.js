import { createContext, useContext, useState } from 'react'

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({children}) =>{
    const [admin_id,setadminid] = useState(null);

    const LoginAdminId = (admin_id)=>{
        setadminid(admin_id)
    }

    return(
        <AdminAuthContext.Provider value={{admin_id,LoginAdminId}}>
            {children}
        </AdminAuthContext.Provider>
    )
}

export const AdminuseAuth = () =>{
    return useContext(AdminAuthContext);
}