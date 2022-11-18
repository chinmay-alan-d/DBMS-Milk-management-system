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
    password : 'ch@i#782',
    database : 'gas_booking_management_system'
})

app.get('/',(req,res)=>{
    db.query('show tables',(err,result)=>{
        if(err){ res.send(err) }
        res.send(result)
    })
})

app.post('/customer',(req,res)=>{
    let myQuery = `INSERT INTO customer(name, aadhar_no , phone_no , password , address) VALUES("${String(req.body.name)}","${String(req.body.aadhar)}","${String(req.body.phoneNumber)}","${String(req.body.password)}","${String(req.body.address)}")`
    console.log(myQuery);
    db.query(myQuery,(err,result)=>{
        if(err) { console.log(err) }
        res.send('added')
    })
})

app.post('/login',(req,res)=>{
    // console.log(req.body);
    let phone_no = req.body.phone_no;
    let password = req.body.password;

    let searchQuery = `select * from customer where phone_no=${phone_no}`

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

app.post('/orders',(req,res)=>{
    let myQuery = `insert into orders(cst_id ,order_date ,delivery_address ,phone_no_optional) values("${req.body.cst_id}","${req.body.order_date}","${req.body.delivery_address}","${req.body.phone_no_optional}")`
    console.log(myQuery);
    db.query(myQuery,(err,result)=>{
        if(err) console.log(err);
        else{
            res.send('succes')
        }
    })
})

app.post('/adminlogin',(req,res)=>{
    let admin_email = req.body.admin_email;
    let admin_password = req.body.admin_password;
    console.log(admin_email);
    console.log(admin_password);

    let searchEmailQuery = `select * from administrator where admin_email="${admin_email}"`
    // console.log(searchEmailQuery);
    db.query(searchEmailQuery,(err,result)=>{
        console.log(result);
        if(err) throw err;
        else if(result.length === 0){
            res.send('no admin with this email');
        }else{
            if(admin_password===result[0].admin_password){
                res.json(
                    {
                        admin_id : result[0].admin_id,
                        status : 'passwordMatch'
                    }
                )
            }else{
                res.send('passwordDoesntMatch')
            }
        }
    })
})

app.post('/adminsignup',(req,res)=>{
    let myQuery = `INSERT INTO administrator(admin_name,admin_password,admin_email) VALUES("${String(req.body.admin_name)}","${String(req.body.admin_password)}","${String(req.body.admin_email)}")`
    // console.log(myQuery);
    db.query(myQuery,(err,result)=>{
        if(err) { console.log(err) }
        res.send('added')
    })
})

app.get('/adminpendingorders',(req,res)=>{
    let myQuery = 'select * from orders where order_status="Pending"'
    db.query(myQuery,(err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})

app.post('/updateorders',(req,res)=>{
    console.log(req.body);
    let loggedAdmin = req.body.admin_id;
    let requestedOrder = req.body.order_id;

    let myQuery = `update orders set order_status = "Confirm", admin_id = "${loggedAdmin}" where order_id = "${requestedOrder}"`
    db.query(myQuery,(err,result)=>{
        if(err) throw err;
        else{
            res.send('executed')
        }
    })
})

app.post('/fetchmybookings',(req,res)=>{
    let cst_id = req.body.cst_id;
    let myQuery = `select * from orders where cst_id = "${cst_id}"`

    db.query(myQuery,(err,response)=>{
        if(err) throw err;
        else{
            res.send(response);
        }
    })
})

app.post('/deleteaccount',(req,res)=>{
    let cst_id = req.body.cst_id;
    let myQueryCst = `DELETE FROM customer WHERE customer_id=${cst_id};`
    let myQueryComp = `DELETE FROM complaints WHERE cst_id=${cst_id};`//check
    let myQuerydeliverynote = `DELETE FROM delivary_note WHERE cst_id="${cst_id}";`//check
    let myQueryorders = `DELETE FROM orders WHERE cst_id=${cst_id};`//

    db.query(myQueryComp,(err,result)=>{
        if(err) throw err;
    })

    db.query(myQuerydeliverynote,(err,result)=>{
        if(err) throw err;
    })

    db.query(myQueryorders,(err,result)=>{
        if(err) throw err;
        else{
            console.log(result);
        }
    })

    db.query(myQueryCst,(err,result)=>{
        if(err) throw err;
    })
})

app.post('/complaint',(req,res)=>{
    console.log(req.body);

    let cst_id = req.body.cst_id;
    let complain_description = req.body.complain_description;
    let complaint_no = req.body.complaint_no;
    let ord_id = req.body.orderid;
    let myQuery = `insert into complaints (complain_description,complaint_no,ord_id,cst_id) values ("${complain_description}","${complaint_no}","${ord_id}","${cst_id}");`

    // console.log(myQuery);
    db.query(myQuery,(err,result)=>{
        if(err) throw err;
        else{
            res.send(result)
        }
    })
})

app.post('/adddeliverynote',(req,res)=>{
    ord_id = req.body.ord_id;
    delivary_id = req.body.delivary_id;
    cst_id = req.body.cst_id;

    let myQuery = `insert into delivary_note(ord_id,delivary_id,cst_id) values('${ord_id}','${delivary_id}', '${cst_id}');`
    
    db.query(myQuery,(err,result)=>{
        if(err) throw err;
        else{
            res.send(result);
        }
    })
})

app.post('/showcomplaints',(req,res)=>{
    let cst_id = req.body.cstid;
    let myQuery = `select * from complaints where cst_id = ${cst_id}`

    db.query(myQuery,(err,response)=>{
        if(err) throw err;
        else{
            res.send(response)
        }
    })
})

app.post('/deleteaorder',(req,res)=>{
    let order_id = req.body.order_id;
    let cst_id = req.body.cst_id;

    let myQuery = `delete from orders where order_id=${order_id}`;
    db.query(myQuery,(err,result)=>{
        if(err) throw err;
        else{
            res.send(result)
        }
    })
})

app.post('/runquery',(req,res)=>{
    let query = req.body.query;

    db.query(query,(err,result)=>{
        if(err) res.send(err);
        else{
            res.send(result);
        }
    })
})

app.post('/update',(req,res)=>{
    let cst_id = req.body.cst_id;
    let newname = req.body.name;
    let newpassword = req.body.password;
    let newaddress = req.body.address;

    let myQuery = `select * from customer where customer_id = "${cst_id}"`
    let newQuery = `UPDATE customer SET name = "${newname}", password = "${newpassword}", address="${newaddress}" WHERE customer_id = "${cst_id}";`

    db.query(myQuery,(err,result)=>{
        if(err) throw err;
        else{
            db.query(newQuery,(error,result2)=>{
                if(error) throw error;
                else{
                    console.log(result2);
                    res.send('sucess')
                }
            })
        }
    })


})

app.listen(4000,()=>{
    console.log('server running on port 4000');
})

 