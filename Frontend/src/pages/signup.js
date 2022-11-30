import React , { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Signup(){

    let [name,setName] = useState('')
    let [phoneNumber,setphoneNumber] = useState('')
    let [password,setpassword] = useState('')
    let [address,setAddress] = useState('')
    const navaigate = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault()
        axios.post('http://localhost:4000/customer',{
            customer_name : name,
            cst_phone_number : phoneNumber,
            cst_address : address,
            password : password
        }).then(response=>{
            if(response.data === 'success'){
                navaigate('/login')
            }
        })
    }

    return (
    <div>
        <div style={{padding : '70px'}}>
            <div>
                <h3 style={{textAlign : 'center'}}>Sign up</h3>
                <form onSubmit={handleSubmit} className="card-body mx-auto card" style={{width: "30rem"}}>
                    <input type='text' placeholder="name" onChange={(event)=> setName(event.target.value)} required></input> <br />
                    <input type='text' placeholder="phone number" onChange={(event)=> setphoneNumber(event.target.value)} required></input><br />
                    <input type='text' placeholder="address" onChange={(event)=> setAddress(event.target.value)} required></input><br />
                    <input type='text' placeholder="password" onChange={(event)=> setpassword(event.target.value)} required></input><br />
                    <button style={{color : 'white', background : "black"}}>Signup</button><br /><br />
                </form>
                <button className="btn btn-secondary"  onClick={()=>{navaigate('/login')}}>Login</button>
            </div>
        </div>
    </div>
    )
}

export default Signup;