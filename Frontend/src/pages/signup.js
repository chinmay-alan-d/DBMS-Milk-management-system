import React , { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Signup(){

    let [name,setName] = useState('')
    let [aadhar,setAadhar] = useState('')
    let [phoneNumber,setphoneNumber] = useState('')
    let [password,setpassword] = useState('')
    let [address,setAddress] = useState('')
    const navaigate = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault()
        axios.post('http://localhost:4000/customer',{
           name : name,
           aadhar : aadhar,
           phoneNumber : phoneNumber,
           address : address,
           password : password 
        }).then(response=>{
            if(response.data === 'added'){
                navaigate('/login',{replace : true})
            }
        })
    }

    return <>
        <h2 style={{paddingLeft : '500px'}}>Sign Up</h2>
        <div>
            <form onSubmit={handleSubmit} className="card" style={{maxWidth : '1000px', paddingLeft : '500px'}}>
                <input type='text' placeholder="name" onChange={(event)=> setName(event.target.value)} required></input><br />
                <input type='text' placeholder="aadhar number" onChange={(event)=> setAadhar(event.target.value)} required></input><br />
                <input type='text' placeholder="phone number" onChange={(event)=> setphoneNumber(event.target.value)} required></input><br />
                <input type='text' placeholder="address" onChange={(event)=> setAddress(event.target.value)} required></input><br />
                <input type='text' placeholder="password" onChange={(event)=> setpassword(event.target.value)} required></input><br />
                <button style={{color : 'white', background : "black"}}>Signup</button>
            </form>
        </div>
    </>
}

export default Signup;