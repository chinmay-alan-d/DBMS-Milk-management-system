import React, { useState } from "react";
import axios from 'axios'
// import { AdminuseAuth } from "../adminContext/adminLoginContext";
import { useAuth } from '../Context/LoginContext';
import { useNavigate } from "react-router";
import Paper from '@mui/material/Paper';

function Seller() {

    let [pending_orders, setPendingorder] = useState([]);
    const auth = useAuth();
    console.log(auth.adminid);

    const some2 = {
        position: 'absolute',
        left : 0,
        top : 10,
        alignItems: 'center',
        color : 'white',
        background : 'black',
        justifyContent: 'center',
    }

    const some = {
        position: 'absolute',
        left : 1050,
        top : 10,
        alignItems: 'center',
        color : 'white',
        background : 'black',
        justifyContent: 'center',
    }

    const navaigate = useNavigate();

    const handleImport = () => {
        navaigate('/import')
    }

    const handleShow = () => {
        axios.get('http://localhost:4000/showorders').then(response=>{
            console.log(response.data);
            setPendingorder(response.data)
        })
    }

    return (
        <div>
            <button onClick={handleShow} style={some}>Show customer orders</button>
            <button onClick={handleImport} style={some2}>Import item</button> 
            <div style={{display:"flex",justifyContent:"center",margin :"2vh 2wv",flexWrap:"wrap"}}>
                {
                    pending_orders.map((pending_order,i)=>{
                        return (
                            <Paper elevation = {20} sx = {{margin : "2vh 2vw",padding:"2vh 2vw"}} key={i}>
                            <table>
                                <thead>
                                <tr style={{border: "1px solid black"}}>
                                    <th style={{border: "1px solid black",padding:"2vh 2vw"}}>order id</th>
                                    <th style={{border: "1px solid black",padding:"2vh 2vw"}}>customer_id</th>
                                    <th style={{border: "1px solid black",padding:"2vh 2vw"}}>quantity</th>
                                    <th style={{border: "1px solid black",padding:"2vh 2vw"}}>status</th>
                                    <th style={{border: "1px solid black",padding:"2vh 2vw"}}>Accept order</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr style={{border: "1px solid black"}}>
                                    <td style={{border: "1px solid black",padding:"2vh 2vw"}}>{pending_order.order_id}</td>
                                    <td style={{border: "1px solid black",padding:"2vh 2vw"}}>{pending_order.customer_id}</td>
                                    <td style={{border: "1px solid black",padding:"2vh 2vw"}}>{pending_order.quantity}</td>
                                    <td style={{border: "1px solid black",padding:"2vh 2vw"}}>{pending_order.status}</td>
                                    <p onClick={()=>{
                                        axios.post('http://localhost:4000/acceptorder',{
                                            customer_id : pending_order.customer_id,
                                            order_id : pending_order.order_id,
                                            seller_id : auth.adminid,
                                            quantity : pending_order.quantity
                                        }).then(response=>{
                                            if(response.data === "approved"){
                                                alert('order approved')
                                            }else{
                                                alert('you dont have suffcient quantity')
                                            }
                                        })
                                    }}>accept</p>   
                                </tr>
                                </tbody>
                            </table>
                            </Paper>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Seller;