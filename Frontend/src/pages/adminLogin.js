import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminuseAuth } from "../adminContext/adminLoginContext";

function AdminLogin(){

    let [admin_email,setadminemail] = useState('');
    let [admin_password,setadminpassword] = useState('');
    const navaigate = useNavigate();
    const adminAuth = AdminuseAuth();

    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:4000/adminlogin',{
            admin_email : admin_email,
            admin_password : admin_password
        }).then(response=>{
            console.log(response);
            if(response.data.status==="passwordMatch"){
                adminAuth.LoginAdminId(response.data.admin_id)
                navaigate('/admin',{replace : true})
            }
        })
    }

    return <div style={{padding : '70px'}}>
        <form onSubmit={handleSubmit} className="card" style={{maxWidth : '1000px', paddingLeft : '500px'}}>
            <h3>Admin Login</h3>
            <input type='text' placeholder="admin email" onChange={(event)=> setadminemail(event.target.value)} required></input><br />
            <input type='password' placeholder="Enter Admin Password" onChange={(event)=> setadminpassword(event.target.value)} required></input><br />
            <button style={{color : 'white', background: 'black'}}>Login</button>
        </form>
    </div>
}

export default AdminLogin;