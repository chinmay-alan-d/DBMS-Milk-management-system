import React, { useState } from 'react'
import { useAuth } from '../Context/LoginContext';
import axios from "axios";
import Paper from '@mui/material/Paper';
import {  useNavigate } from 'react-router-dom';

function Booking() {
    const auth = useAuth();
    const [order_date, setorder_date] = useState(null);
    const [delivery_address, setdelivery_address] = useState('');
    const [phone_no_optional, setphone_no_optional] = useState('');
    const [mybookings, setmybookings] = useState([]);
    const [compalint, setcomplaint] = useState("");
    const [compalintid, setcomplaintId] = useState();
    const [orderid, setorderid] = useState();
    const [orderid2, setOrderID2] = useState();
    const [deliveryId, setdeliveryID] = useState();
    const [cstid, setcsid] = useState();
    const [customQuery, setcutomquery] = useState('');
    let [allcomplaints, setallcomplaints] = useState([]);
    const [query, setquery] = useState('');
    const navaigate = useNavigate();

    const handleBook = (e) => {
        e.preventDefault();
        axios.post('http://localhost:4000/orders', {
            cst_id: auth.customer_id,
            order_date: order_date.split("/").reverse().join("/"),
            delivery_address: delivery_address,
            phone_no_optional: phone_no_optional
        }).then(response => {
            console.log(response);
            alert('booked!!')
        })
    }

    const handleLogout = () => {
        auth.Logincustomer_id(null)
    }

    const handleBooking = () => {
        axios.post('http://localhost:4000/fetchmybookings', {
            cst_id: auth.customer_id
        }).then(response => {
            // console.log(response);
            setmybookings(response.data)
        })
    }

    const handleDelete = () => {
        axios.post('http://localhost:4000/deleteaccount', {
            cst_id: auth.customer_id
        }).then(resoponse => {
            console.log(resoponse);
        })
    }

    const handleComplaint = () => {
        axios.post('http://localhost:4000/complaint', {
            cst_id: auth.customer_id,
            complain_description: compalint,
            complaint_no: compalintid,
            orderid: orderid
        }).then(response => {
            console.log(response);
        })
    }

    const handleDeliveryNote = () => {
        axios.post('http://localhost:4000/adddeliverynote', {
            ord_id: orderid2,
            delivary_id: deliveryId,
            cst_id: cstid
        }).then(response => {
            // console.log(response);
            alert("delivery note added successfully")
        })
    }

    const showComplaints = () => {
        axios.post('http://localhost:4000/showcomplaints', {
            cstid: auth.customer_id
        }).then(response => {
            console.log(response.data);
            setallcomplaints(response.data)
        })
    }

    const handleCustom = () => {
        axios.post('http://localhost:4000/runquery', {
            query: customQuery
        }).then(response => {
            setquery(response.data)
        })
    }

    const handlenavigate = () => {
        navaigate('/update',{replace : true})
    }

    return (
        <div>
            <h1 className='mx-auto' style={{ width: '20rem' }}>Booking page Customer ID is {auth.customer_id}</h1>
            <form onSubmit={handleBook} className="mx-auto card" style={{ width: '20rem' }}>
                <input placeholder='date deliver' type="date" onChange={(event) => setorder_date(event.target.value)}></input><br />
                <input placeholder='address delivered? ' onChange={(event) => setdelivery_address(event.target.value)}></input><br />
                <input placeholder='number? ' onChange={(event) => setphone_no_optional(event.target.value)}></input><br />
                <button className="btn btn-primary">Book</button>
            </form>
            <br />
            <button onClick={handleBooking} className="mx-auto card" style={{ background: 'yellow' }}>view my bookings</button><br />
            <button onClick={handleDelete} className="mx-auto card" style={{ background: '#5783db' }}>Delete my account</button><br />
            <div className='mx-auto card' style={{ width: '20rem' }}>
                <h3 style={{ widthleft: '30rem' }}>Make Complaint</h3>
                <input placeholder='state your complaint' onChange={(event) => setcomplaint(event.target.value)}></input><br />
                <input placeholder='complaint id' onChange={(event) => setcomplaintId(event.target.value)}></input><br />
                <input placeholder='order id' onChange={(event) => setorderid(event.target.value)}></input><br />
                <button onClick={handleComplaint} style={{ color: 'white', background: 'black' }}>Make a Complaint</button><br />
            </div><br />
            <div className='mx-auto card' style={{ width: '20rem' }}>
                <h3 style={{ color: 'black' }}>Add delivery note</h3>
                <input onChange={(event) => setOrderID2(event.target.value)} placeholder="ordder ID"></input><br />
                <input onChange={(event) => setdeliveryID(event.target.value)} placeholder="delivary_id"></input><br />
                <input onChange={(event) => setcsid(event.target.value)} placeholder="cst_id"></input><br />
                <button onClick={handleDeliveryNote} style={{ background: '#55c2da' }}>add delivery note</button><br />
                <button className="btn btn-warning" onClick={handlenavigate}>Update Any Values</button>
            </div>
            <br />
            <button onClick={handleLogout} style={{ width: '4rem', color: 'white', background: 'black' }} className="mx-auto card">Logout</button><br />
            <button onClick={showComplaints} style={{ width: '8.5rem', color: 'white', background: 'black' }} className="mx-auto card">show complaints</button><br />
            <div style={{ display: "flex", justifyContent: "center", margin: "20vh 20wv", flexWrap: "wrap" }}>
                <input placeholder='Run Custom Query' onChange={(event) => setcutomquery(event.target.value)} ></input>
                <button onClick={handleCustom} btn className="btn btn-warning">Run Query</button>
                {
                    console.log(query)
                }
                {/* <div>
                    {
                        query.map((eachquery)=>{
                            return(
                                <div>
                                    {eachquery}
                                </div>
                            )
                        })
                    }
                </div> */}
            </div>
            <br />
            <h2 style={{ width: '25rem', color: 'white', background: 'black' }} className="mx-auto card">Bookings for customer id {auth.customer_id}</h2>
            <div style={{ display: "flex", justifyContent: "center", margin: "2vh 2wv", flexWrap: "wrap" }}>
                {
                    mybookings.map((mybooking) => {

                        return (
                            <Paper elevation={3} sx={{ margin: "2vh 2vw", padding: "2vh 2vw" }}>
                                <table >
                                    <tr style={{ border: "1px solid black" }}>
                                        <th style={{ border: "1px solid black", padding: "2vh 2vw" }}>Order ID</th>
                                        <th style={{ border: "1px solid black", padding: "2vh 2vw" }}>Customer ID</th>
                                        <th style={{ border: "1px solid black", padding: "2vh 2vw" }}>Order Status</th>
                                        <th style={{ border: "1px solid black", padding: "2vh 2vw" }}>Delivery Address</th>
                                        <th style={{ border: "1px solid black", padding: "2vh 2vw" }}>Admin ID</th>
                                    </tr>
                                    <tr style={{ border: "1px solid black" }}>
                                        <td style={{ border: "1px solid black", padding: "2vh 2vw" }}>{mybooking.order_id}</td>
                                        <td style={{ border: "1px solid black", padding: "2vh 2vw" }}>{mybooking.cst_id}</td>
                                        <td style={{ border: "1px solid black", padding: "2vh 2vw" }}>{mybooking.order_status}</td>
                                        <td style={{ border: "1px solid black", padding: "2vh 2vw" }}>{mybooking.delivery_address}</td>
                                        <td style={{ border: "1px solid black", padding: "2vh 2vw" }}>{mybooking.admin_id}</td>
                                        <td style={{ border: "1px solid black", padding: "2vh 2vw" }}>
                                            <button className='btn btn-outline-primary' onClick={() => {
                                                axios.post('http://localhost:4000/deleteaorder', {
                                                    cst_id: auth.customer_id,
                                                    order_id: mybooking.order_id
                                                }).then(response => {
                                                    alert('deleted')
                                                })
                                            }}>delete this order</button>
                                        </td>
                                    </tr>
                                </table>
                            </Paper>
                        )
                    })
                }
            </div>
            <div style={{ display: "flex", justifyContent: "center", margin: "2vh 2wv", flexWrap: "wrap" }}>
                {
                    allcomplaints.map((allcomplaint) => {

                        return (
                            <Paper elevation={3} sx={{ margin: "2vh 2vw", padding: "2vh 2vw" }}>
                                <div className="mx-auto card">
                                    <table>
                                        <tr style={{ border: "1px solid black" }}>
                                            <th style={{ border: "1px solid black", padding: "2vh 2vw" }}>complain_description</th>
                                            <th style={{ border: "1px solid black", padding: "2vh 2vw" }}>complaint_no</th>
                                            <th style={{ border: "1px solid black", padding: "2vh 2vw" }}>Oord_id</th>
                                            <th style={{ border: "1px solid black", padding: "2vh 2vw" }}>cst_id</th>
                                        </tr>
                                        <tr style={{ border: "1px solid black" }}>
                                            <td style={{ border: "1px solid black", padding: "2vh 2vw" }}>{allcomplaint.complain_description}</td>
                                            <td style={{ border: "1px solid black", padding: "2vh 2vw" }}>{allcomplaint.complaint_no}</td>
                                            <td style={{ border: "1px solid black", padding: "2vh 2vw" }}>{allcomplaint.ord_id}</td>
                                            <td style={{ border: "1px solid black", padding: "2vh 2vw" }}>{allcomplaint.cst_id}</td>
                                        </tr>
                                    </table>
                                </div>
                            </Paper>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Booking;