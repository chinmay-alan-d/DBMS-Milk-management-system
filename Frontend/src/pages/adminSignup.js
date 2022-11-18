import React , { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Adminsignup(){

    let [admin_name,setadminname] = useState('')
    let [admin_email,setadminemail] = useState('')
    let [admin_password,setadminpassword] = useState('')
    const navaigate = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault()
        axios.post('http://localhost:4000/adminsignup',{
           admin_name : admin_name,
           admin_email : admin_email,
           admin_password : admin_password 
        }).then(response=>{
            if(response.data === 'added'){
                navaigate('/adminlogin',{replace : true})
            }
        })
    }

    return <div >
        <h2 style={{paddingLeft : '500px'}}>Admin Sign Up</h2>
        <form onSubmit={handleSubmit} className="card" style={{maxWidth : '1000px', paddingLeft : '500px'}}>
            <input placeholder="admin name" onChange={(event)=> setadminname(event.target.value)} required></input><br />
            <input placeholder="admin email" onChange={(event)=> setadminemail(event.target.value)} required></input><br />
            <input placeholder="admin password" type="password" onChange={(event)=> setadminpassword(event.target.value)} required></input><br />
            <button style={{color : 'white', background : 'black'}}>Signup</button>
        </form>
    </div>
}

export default Adminsignup;