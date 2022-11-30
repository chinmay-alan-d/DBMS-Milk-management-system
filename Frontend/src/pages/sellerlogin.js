import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/LoginContext";

function Sellerlogin(){

    let [phonenumber,setphonenumber] = useState();
    let [sellerpassword,setsellerpassword] = useState('');
    const navaigate = useNavigate();
    const auth = useAuth();

    const handleSellersignup = () => {
        navaigate('/sellersignup')
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:4000/sellerlogin',{
            phone_number : phonenumber,
            seller_password : sellerpassword
        }).then(response=>{
            if(response.data.loginStatus==="passwordMatch"){
                auth.AdminLoginId(response.data.seller_id);
                navaigate('/seller')
            }
        })
    }

    return (
    <div style={{padding : '70px'}}>
        <h2 style={{textAlign : 'center'}}>Seller login</h2>
        <div  className="card-body mx-auto card" style={{maxWidth : 500}}>
            <input placeholder="phone number" onChange={(e)=>{setphonenumber(e.target.value)}}></input><br />
            <input placeholder="password" onChange={(e)=>{setsellerpassword(e.target.value)}}></input><br />
            <button onClick={handleSubmit} style={{color : 'white', background:'black'}}>Login</button><br />
            <button onClick={handleSellersignup} className="btn btn-dark">Register as Seller </button>
        </div>
    </div>
    )
}

export default Sellerlogin;