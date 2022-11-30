const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
app.use(express.json())

app.use(
    cors({
        origin : "*"
    })
)
 
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    database : 'dairy_product_management_system'
})

app.get('/',(req,res)=>{
    db.query('show tables',(err,result)=>{
        if(err){ res.send(err) }
        res.send(result)
    })
})

//Cutomer signup
app.post('/customer',(req,res)=>{
    // console.log(req.body);
    let customer_name = req.body.customer_name;
    let cst_phone_number = req.body.cst_phone_number;
    let cst_address = req.body.cst_address;
    let password = req.body.password;

    let myQuery = `insert into customer(customer_name,cst_phone_number,cst_address,password) values ("${customer_name}","${cst_phone_number}","${cst_address}","${password}");`

    // console.log(myQuery);
    db.query(myQuery,(err,result)=>{
        if(err) throw err;
        else{
            res.send('success')
        }
    })
})


//user login
app.post('/login',(req,res)=>{
        // console.log(req.body);
        let phone_no = req.body.cst_phone_number;
        let password = req.body.password;
    
        let searchQuery = `select * from customer where cst_phone_number = "${phone_no}";`
        // console.log(searchQuery);
        db.query(searchQuery,(err,result)=>{
            if(err) {console.log(err)}
            else if(result.length===0){res.send('no user')}
            else{
                console.log(result[0].password);
                if(password===result[0].password){
                    res.json(
                        {
                            loginStatus : 'passwordMatch',
                            customer_id : result[0].customer_id
                        }
                    )
                }else{
                    res.send('passwordDoesntMatch')
                }
            }
        })
    })

    // to make order
app.post('/makeorder',(req,res)=>{
    // console.log(req.body);
    let sc = req.body;
    let customer_id = sc.customer_id;
    let quantity = sc.quantity;
    let order_date = sc.order_date;

    let myQuery = `insert orders(order_date, customer_id , quantity) values("${order_date}",${customer_id},${quantity})`
    // console.log(myQuery);
    db.query(myQuery,(err,result)=>{
        if(err) throw err;
        else{
            res.send('done')
        }
    })
})

app.post('/vieworders',(req,res)=>{
    // console.log(req.body);
    let customer_id = req.body.customer_id
    let myQuerry = `select * from orders where customer_id=${customer_id}`

    db.query(myQuerry,(err,result)=>{
        if(err) throw err;
        else{
            res.send(result)
        }
    })
})

app.post('/deleteaorder',(req,res)=>{
    // console.log(req.body);
    let ord_id = req.body.order_id;
    let cst_id = req.body.cst_id;

    let myQuerry = `delete from orders where order_id = ${ord_id} and customer_id = ${cst_id};`

    db.query(myQuerry,(err,result)=>{
        if(err) throw err;
        else{
            res.send('deleted')
        }
    })
})

app.post('/deleteaccount',(req,res)=>{
    let cst_id = req.body.customer_id;
    let ordersquery = `delete from orders where customer_id=${cst_id};`
    let cstquery = `delete from customer where customer_id = ${cst_id};`

    db.query(ordersquery,(err,result)=>{
        if(err) throw err;
    })

    db.query(cstquery,(err,result)=>{
        if(err) throw err;
        else{
            res.send('deleted')
        }
    })
})

app.post('/sellersignup',(req,res)=>{
    // console.log(req.body);
    let seller_name = req.body.seller_name;
    let address = req.body.address;
    let phone_number = req.body.phone_number;
    let seller_password = req.body.seller_password;

    let myQuery = `insert into seller(seller_name,address,phone_number,seller_password) values("${seller_name}","${address}","${phone_number}","${seller_password}")`
    // console.log(myQuery);

    db.query(myQuery,(err,result)=>{
        if(err) throw err;
        else{
            db.query(`select * from seller where phone_number = ${phone_number}`,(err,results)=>{
                if(err) throw err;
                else{
                    let seller_number = results[0].phone_number;
                    db.query(`select seller_id from seller where phone_number = "${seller_number}"`,(err,result2)=>{
                        if(err) throw err;
                        else{
                            console.log(result2);
                            db.query(`insert into availability(seller_id) values(${result2[0].seller_id})`,(err,result3)=>{
                                if(err) throw err;
                                else{
                                    console.log(result3);
                                }
                            })
                        }
                    })
                }
            })
            console.log(result);
            res.send('added')
        }
    })

})

app.post('/sellerlogin',(req,res)=>{
    let phone_no = req.body.phone_number;
    let seller_password = req.body.seller_password;
    
    let searchQuery = `select * from seller where phone_number = "${phone_no}";`
    // console.log(searchQuery);
    db.query(searchQuery,(err,result)=>{
            if(err) {console.log(err)}
            else if(result.length===0){res.send('no user')}
            else{
                console.log(result[0].password);
                if(seller_password===result[0].seller_password){
                    res.json(
                        {
                            loginStatus : 'passwordMatch',
                            seller_id : result[0].seller_id
                        }
                    )
                }else{
                    res.send('passwordDoesntMatch')
                }
            }
        })
})

app.get('/showorders',(req,res)=>{
    // console.log(req.body);
    let myQuerry = `select * from orders where status = "Pending"`
    db.query(myQuerry,(err,result)=>{
        if(err) throw err;
        else{
            res.send(result)
        }
    })
})

app.post('/import',(req,res)=>{
    // console.log(req.body);
    // { quantity: '34', import_date: '2022-11-30', seller_id: 9 }
    let quantity = req.body.quantity;
    let import_date = req.body.import_date;
    let seller_id = req.body.seller_id;

    db.query(`insert into imports(seller_id, quantity, import_date) values(${seller_id},${quantity},'${import_date}')`,(err,result)=>{
        if(err) throw err;
        else{
            // console.log(result);
            db.query(`select * from availability where seller_id = ${seller_id}`,(err,result2)=>{
                if(err) throw err;
                else{
                    // console.log(result2);
                    // [ RowDataPacket { avail: 0, seller_id: 2, avl_id: 1 } ]
                    let availp = result2[0].avail;
                    console.log();
                    console.log(parseInt(availp));
                    console.log(parseInt(quantity));
                    console.log(parseInt(availp)+parseInt(quantity));
                    let fqty = parseInt(availp)+parseInt(quantity)
                    // let avail = availp + quantity;
                    db.query(`update availability set avail = ${fqty} where seller_id = ${seller_id}`,(err,result3)=>{
                        if(err) throw err;
                        else{
                            res.send('updated')
                        }
                    })
                }
            })
            // db.query(`insert into availability`)
        }
    })
})

app.post('/acceptorder',(req,res)=>{
    // console.log(req.body);
    //{ customer_id: 5, order_id: 6, seller_id: 2 }
    let customer_id = req.body.customer_id;
    let order_id = req.body.order_id;
    let seller_id = req.body.seller_id;
    let quantity = req.body.quantity;

    console.log(seller_id,customer_id,quantity,order_id);

    db.query(`select avail from availability where seller_id = ${seller_id}`,(err,result)=>{
        if(err) throw err;
        else{
            let myavailability = result[0].avail;
            if(myavailability>=quantity){
                db.query(`update orders set seller_id = ${seller_id}, status = 'Confirm' where order_id = ${order_id}`,(err,result2)=>{
                    if(err) throw err;
                    else{
                        let myavailability = result[0].avail-quantity;
                        db.query(`update availability set avail = ${myavailability} where seller_id = ${seller_id}`,(err,result3)=>{
                            if(err) throw err;
                            else{
                                console.log(result3);
                                res.send('approved')
                            }
                        }) 
                    }
                })
            }else{
                res.send('no')//you dont have sufficent stock
            }
        }
    })

})

app.listen(4000,()=>{
    console.log('server running on port 4000');
})

 
// app.post('/customer',(req,res)=>{
//     let myQuery = `INSERT INTO customer(name, aadhar_no , phone_no , password , address) VALUES("${String(req.body.name)}","${String(req.body.aadhar)}","${String(req.body.phoneNumber)}","${String(req.body.password)}","${String(req.body.address)}")`
//     console.log(myQuery);
//     db.query(myQuery,(err,result)=>{
//         if(err) { console.log(err) }
//         res.send('added')
//     })
// })

// app.post('/login',(req,res)=>{
//     // console.log(req.body);
//     let phone_no = req.body.phone_no;
//     let password = req.body.password;

//     let searchQuery = `select * from customer where phone_no=${phone_no}`

//     db.query(searchQuery,(err,result)=>{
//         if(err) {console.log(err)}
//         else if(result.length===0){res.send('no user')}
//         else{
//             console.log(result[0].password);
//             if(password===result[0].password){
//                 res.json(
//                     {
//                         loginStatus : 'passwordMatch',
//                         customer_id : result[0].customer_id
//                     }
//                 )
//             }else{
//                 res.send('passwordDoesntMatch')
//             }
//         }
//     })
// })

// app.post('/orders',(req,res)=>{
//     let myQuery = `insert into orders(cst_id ,order_date ,delivery_address ,phone_no_optional) values("${req.body.cst_id}","${req.body.order_date}","${req.body.delivery_address}","${req.body.phone_no_optional}")`
//     console.log(myQuery);
//     db.query(myQuery,(err,result)=>{
//         if(err) console.log(err);
//         else{
//             res.send('succes')
//         }
//     })
// })

// app.post('/adminlogin',(req,res)=>{
//     let admin_email = req.body.admin_email;
//     let admin_password = req.body.admin_password;
//     console.log(admin_email);
//     console.log(admin_password);

//     let searchEmailQuery = `select * from administrator where admin_email="${admin_email}"`
//     // console.log(searchEmailQuery);
//     db.query(searchEmailQuery,(err,result)=>{
//         console.log(result);
//         if(err) throw err;
//         else if(result.length === 0){
//             res.send('no admin with this email');
//         }else{
//             if(admin_password===result[0].admin_password){
//                 res.json(
//                     {
//                         admin_id : result[0].admin_id,
//                         status : 'passwordMatch'
//                     }
//                 )
//             }else{
//                 res.send('passwordDoesntMatch')
//             }
//         }
//     })
// })

// app.post('/adminsignup',(req,res)=>{
//     let myQuery = `INSERT INTO administrator(admin_name,admin_password,admin_email) VALUES("${String(req.body.admin_name)}","${String(req.body.admin_password)}","${String(req.body.admin_email)}")`
//     // console.log(myQuery);
//     db.query(myQuery,(err,result)=>{
//         if(err) { console.log(err) }
//         res.send('added')
//     })
// })

// app.get('/adminpendingorders',(req,res)=>{
//     let myQuery = 'select * from orders where order_status="Pending"'
//     db.query(myQuery,(err,result)=>{
//         if(err) throw err;
//         res.send(result)
//     })
// })

// app.post('/updateorders',(req,res)=>{
//     console.log(req.body);
//     let loggedAdmin = req.body.admin_id;
//     let requestedOrder = req.body.order_id;

//     let myQuery = `update orders set order_status = "Confirm", admin_id = "${loggedAdmin}" where order_id = "${requestedOrder}"`
//     db.query(myQuery,(err,result)=>{
//         if(err) throw err;
//         else{
//             res.send('executed')
//         }
//     })
// })

// app.post('/fetchmybookings',(req,res)=>{
//     let cst_id = req.body.cst_id;
//     let myQuery = `select * from orders where cst_id = "${cst_id}"`

//     db.query(myQuery,(err,response)=>{
//         if(err) throw err;
//         else{
//             res.send(response);
//         }
//     })
// })

// app.post('/deleteaccount',(req,res)=>{
//     let cst_id = req.body.cst_id;
//     let myQueryCst = `DELETE FROM customer WHERE customer_id=${cst_id};`
//     let myQueryComp = `DELETE FROM complaints WHERE cst_id=${cst_id};`//check
//     let myQuerydeliverynote = `DELETE FROM delivary_note WHERE cst_id="${cst_id}";`//check
//     let myQueryorders = `DELETE FROM orders WHERE cst_id=${cst_id};`//

//     db.query(myQueryComp,(err,result)=>{
//         if(err) throw err;
//     })

//     db.query(myQuerydeliverynote,(err,result)=>{
//         if(err) throw err;
//     })

//     db.query(myQueryorders,(err,result)=>{
//         if(err) throw err;
//         else{
//             console.log(result);
//         }
//     })

//     db.query(myQueryCst,(err,result)=>{
//         if(err) throw err;
//     })
// })

// app.post('/complaint',(req,res)=>{
//     console.log(req.body);

//     let cst_id = req.body.cst_id;
//     let complain_description = req.body.complain_description;
//     let complaint_no = req.body.complaint_no;
//     let ord_id = req.body.orderid;
//     let myQuery = `insert into complaints (complain_description,complaint_no,ord_id,cst_id) values ("${complain_description}","${complaint_no}","${ord_id}","${cst_id}");`

//     // console.log(myQuery);
//     db.query(myQuery,(err,result)=>{
//         if(err) throw err;
//         else{
//             res.send(result)
//         }
//     })
// })

// app.post('/adddeliverynote',(req,res)=>{
//     ord_id = req.body.ord_id;
//     delivary_id = req.body.delivary_id;
//     cst_id = req.body.cst_id;

//     let myQuery = `insert into delivary_note(ord_id,delivary_id,cst_id) values('${ord_id}','${delivary_id}', '${cst_id}');`
    
//     db.query(myQuery,(err,result)=>{
//         if(err) throw err;
//         else{
//             res.send(result);
//         }
//     })
// })

// app.post('/showcomplaints',(req,res)=>{
//     let cst_id = req.body.cstid;
//     let myQuery = `select * from complaints where cst_id = ${cst_id}`

//     db.query(myQuery,(err,response)=>{
//         if(err) throw err;
//         else{
//             res.send(response)
//         }
//     })
// })

// app.post('/deleteaorder',(req,res)=>{
//     let order_id = req.body.order_id;
//     let cst_id = req.body.cst_id;

//     let myQuery = `delete from orders where order_id=${order_id}`;
//     db.query(myQuery,(err,result)=>{
//         if(err) throw err;
//         else{
//             res.send(result)
//         }
//     })
// })

// app.post('/runquery',(req,res)=>{
//     let query = req.body.query;

//     db.query(query,(err,result)=>{
//         if(err) res.send(err);
//         else{
//             res.send(result);
//         }
//     })
// })

// app.post('/update',(req,res)=>{
//     let cst_id = req.body.cst_id;
//     let newname = req.body.name;
//     let newpassword = req.body.password;
//     let newaddress = req.body.address;

//     let myQuery = `select * from customer where customer_id = "${cst_id}"`
//     let newQuery = `UPDATE customer SET name = "${newname}", password = "${newpassword}", address="${newaddress}" WHERE customer_id = "${cst_id}";`

//     db.query(myQuery,(err,result)=>{
//         if(err) throw err;
//         else{
//             db.query(newQuery,(error,result2)=>{
//                 if(error) throw error;
//                 else{
//                     console.log(result2);
//                     res.send('sucess')
//                 }
//             })
//         }
//     })


// })






// delimiter $$
// create function get_orders(cstid int)
// returns int
// deterministic
// begin 
// declare s int;
// set s = (select count(*) from orders where orders.customer_id= cstid);
// return s;
// end $$



// delimiter $$
// create function cnt_orders_crs (cstid int)
// returns int
// deterministic
// begin
// declare done int default false;
// declare cnt1 int default 0;
// declare a int;
// declare cur1 cursor for select order_id from orders where customer_id = cstid;
// declare continue handler for not found set done = true;
// open cur1;
// read_loop:loop
// fetch cur1 into a;
// if done then
// leave read_loop;
// end if;
// set cnt1 = cnt1 + 1;
// end loop;
// close cur1;
// return cnt1;
// end $$
// delimiter ;
