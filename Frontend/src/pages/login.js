import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/LoginContext";

function Login(){

    let [phone_no,setPhone_no] = useState('');
    let [password,setpassword] = useState('');
    const auth = useAuth();
    const navaigate = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:4000/login',{
            cst_phone_number : phone_no,
            password : password
        }).then(response=>{
            if(response.data.loginStatus==="passwordMatch"){
                auth.Logincustomer_id(response.data.customer_id);
                // console.log(response.data);
                navaigate('/',{replace : true})
            }
        })
    }

    const hadnleClick = () => {
        navaigate('/signup')
    }

    return <div style={{padding : '70px'}}>
        <h4 style={{textAlign : 'center'}}>User Login</h4><br />
        <form className="card-body mx-auto card" style={{width: "30rem"}} onSubmit={handleSubmit}>
            <input type='text' placeholder="Enter phone" onChange={(event)=> setPhone_no(event.target.value)} required></input><br /><br />
            <input type='password' placeholder="Enter Password" onChange={(event)=> setpassword(event.target.value)} required></input><br /><br />
            <button className="btn btn-primary">Login</button> <br />
            <button className="btn btn-black" onClick={hadnleClick}>Register</button>
        </form>
    </div>
}

export default Login;