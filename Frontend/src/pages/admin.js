import React, { useState } from "react";
import axios from 'axios'
import { AdminuseAuth } from "../adminContext/adminLoginContext";

function Admin() {

    let [pending_orders, setPendingorder] = useState([]);
    const adminAuth = AdminuseAuth();

    const handleClickPending = () => {
        axios.get('http://localhost:4000/adminpendingorders').then(response => {
            setPendingorder(response.data)
        })
    }

    return <>
        <div className="my-3 mx-3" style={{ textAlign: "centre" }}>
            <h2>Logged Admin ID {adminAuth.admin_id}</h2>
            <button onClick={handleClickPending} style={{ color: 'white', background: "black" }} className="text-centre">show Pending orders</button>
        </div>
        <div>
            {
                pending_orders.map((pending_order) => {
                    return (
                        <div>
                            <table>
                                <tr>
                                    <th>order_id</th>
                                    <th>cst_id</th>
                                    <th>order_status</th>
                                </tr>
                                <tr>
                                    <td>{pending_order.order_id}</td>
                                    <td>
                                        {pending_order.cst_id}
                                    </td>
                                    <td>
                                        <button id={pending_order.order_id} onClick={() => {
                                            axios.post("http://localhost:4000/updateorders", {
                                                admin_id: adminAuth.admin_id,
                                                order_id: pending_order.order_id
                                            }).then(response => {
                                                if (response.data === "executed") {
                                                    console.log('succcess');
                                                }
                                            })
                                        }}>{pending_order.order_status}</button>
                                    </td>
                                </tr>

                            </table>
                        </div>
                    )
                })
            }
        </div>
    </>
}

export default Admin;