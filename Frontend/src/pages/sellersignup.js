import React , { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Sellersignup(){
    const navaigate = useNavigate();
    const [name,setname] = useState('');
    const [phone_number,setphone_number] = useState('');
    const [address,setaddress] = useState('');
    const [password,setpassword] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault()
        axios.post('http://localhost:4000/sellersignup',{
            seller_name : name,
           phone_number : phone_number,
           seller_password : password,
           address : address 
        }).then(response=>{
            if(response.data === 'added'){
                navaigate('/sellerlogin',{replace : true})
            }
        })
    }

    return <div >
        <h2 style={{paddingLeft : '500px'}}>Seller Sign Up</h2>
        <div className="card-body mx-auto card" style={{maxWidth : 500}}>
            <input placeholder="admin name" onChange={(event)=> setname(event.target.value)} required></input><br />
            <input placeholder="pohone number" onChange={(event)=> setphone_number(event.target.value)} required></input><br />
            <input placeholder="address" onChange={(event)=> setaddress(event.target.value)} required></input><br />
            <input placeholder="password" type="password" onChange={(event)=> setpassword(event.target.value)} required></input><br />
            <button style={{color : 'white', background : 'black'}} onClick={handleSubmit}>Signup</button>
        </div>
    </div>
}

export default Sellersignup;