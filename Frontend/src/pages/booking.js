import React, { useEffect, useState } from 'react'
import { useAuth } from '../Context/LoginContext';
import axios from "axios";
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

const some = {
    position: 'relative',
    left : 550,
    top : 5,
    alignItems: 'center',
    color : 'white',
    background : 'black',
    justifyContent: 'center',
}

const some2 = {
    position: 'absolute',
    left : 0,
    top : 10,
    alignItems: 'center',
    color : 'white',
    background : 'black',
    justifyContent: 'center',
}

function Booking() {
    const auth = useAuth();

    const [qty, setqty] = useState();
    const navaigate = useNavigate();
    const [date, setdate] = useState();
    const [myorders, setmyorders] = useState([]);

    const handleOrder = () => {
        axios.post('http://localhost:4000/makeorder', {
            customer_id: auth.customer_id,
            quantity: qty,
            order_date: date
        }).then(response => {
            if (response.data === 'done') {
                alert('made a order')
            }
        })
    }

    const handleShow = () => {
        axios.post('http://localhost:4000/vieworders', {
            customer_id: auth.customer_id
        }).then(response => {
            setmyorders(response.data)
            // console.log(response.data);
        })
    }

    const deleteAccount = () => {
        axios.post('http://localhost:4000/deleteaccount',{
            customer_id : auth.customer_id
        }).then(response=>{
            if(response.data === 'deleted'){
                navaigate('/login')
            }
        })
    }

    return (
        <div>
            <h3 style={{textAlign : 'center'}}>Make Order here</h3><br />
            <div className='card-body mx-auto card' style={{maxWidth : '400px'}}><br />
                <input placeholder='quantity of milk in ltrs' onChange={(e) => { setqty(e.target.value) }}></input><br />
                <input placeholder='date' type="date" onChange={(e) => { setdate(e.target.value) }}></input><br />
                <button onClick={handleOrder} style = {{color : 'white', background : 'black'}}>Make Order</button>
            </div>
            <button onClick={deleteAccount} style={some2}>Delete account</button>
            <br />
            <div>
                <button placeholder='view orders' onClick={handleShow} style = {some}>View my orders</button>
            </div >
            <br />
            <div style={{display:"flex",justifyContent:"center",margin :"2vh 2wv",flexWrap:"wrap"}}>
            {
                myorders.map(((myorder,i) => {
                    console.log(myorder);
                    return (
                        <Paper elevation = {20} sx = {{margin : "2vh 2vw",padding:"2vh 2vw"}} key={i}>
                            <table>
                            <thead>
                            <tr style={{border: "1px solid black"}}>
                                <th style={{border: "1px solid black",padding:"2vh 2vw"}}>order id</th>
                                <th style={{border: "1px solid black",padding:"2vh 2vw"}}>customer id </th>
                                <th style={{border: "1px solid black",padding:"2vh 2vw"}}>seller id</th>
                                <th style={{border: "1px solid black",padding:"2vh 2vw"}}>quantity</th>
                                <th style={{border: "1px solid black",padding:"2vh 2vw"}}>Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr style={{border: "1px solid black"}}>
                                <td style={{border: "1px solid black",padding:"2vh 2vw"}}>{myorder.order_id}</td>
                                <td style={{border: "1px solid black",padding:"2vh 2vw"}}>{myorder.customer_id}</td>
                                <td style={{border: "1px solid black",padding:"2vh 2vw"}}>{myorder.seller_id}</td>
                                <td style={{border: "1px solid black",padding:"2vh 2vw"}}>{myorder.quantity}</td>
                                <td style={{border: "1px solid black",padding:"2vh 2vw"}}><DeleteIcon color="error" onClick={() => {
                                    axios.post("http://localhost:4000/deleteaorder", {
                                        order_id: myorder.order_id,
                                        cst_id: auth.customer_id
                                    }).then(responce => {
                                        console.log(responce);
                                        handleShow()
                                        alert("deleted");
                                    })
                                }} /></td>
                            </tr>
                            </tbody>
                        </table>
                        </Paper>
                    )
                }))
            }
            </div>
        </div>
    )
}

export default Booking;