import axios from 'axios';
import React, { useState } from 'react'
import { AdminuseAuth } from "../adminContext/adminLoginContext";
import { useAuth } from '../Context/LoginContext';

function Imports() {
    const [qty,setqty] = useState();
    const [date,setdate] = useState();
    const auth = useAuth();

    const handleclick = () => {
        axios.post('http://localhost:4000/import',{
            quantity : qty,
            import_date : date,
            seller_id : auth.adminid
        }).then(response=>{
            // console.log(response);
            if(response.data = "updated"){
                alert('imported')
            }
        })
    }

    return (
        <div>
            <h3 style={{textAlign : 'center'}}>Import here</h3>
            <div className='card-body mx-auto card' style={{maxWidth : '500px'}}>
                <input placeholder="Quantity" onChange={(e)=>{setqty(e.target.value)}}></input><br />
                <input placeholder='Date' type="date" onChange={(e)=>{setdate(e.target.value)}}></input><br />
                <button onClick={handleclick} style={{color : 'white',background:'black'}}>Import</button>
            </div>
        </div>
    )
}

export default Imports
