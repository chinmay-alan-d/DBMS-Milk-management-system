import { useAuth } from "../Context/LoginContext";
import axios from "axios";
import { useState } from "react";

function Update() {
    const auth = useAuth();
    const [name, setname] = useState('');
    const [password, setpassword] = useState('');
    const [address, setaddress] = useState('');

    const handleClick = () => {
        // console.log(cst_id);
        axios.post("http://localhost:4000/update", {
            cst_id: auth.customer_id,
            name: name,
            password: password,
            address: address
        }).then(response=>{
            console.log(response);
            if(response.data === 'sucess'){
                alert('updated details')
            }
        })
    }

    return (
        <div className="mx-auto card" style={{ width: '20rem' }}>
            <h1 className='mx-auto' style={{ width: '20rem' }}>ID of Loggedin user id is  {auth.customer_id}</h1>
            <input onChange={(event) => setname(event.target.value)} placeholder="name"></input><br />
            <input onChange={(event) => setaddress(event.target.value)} placeholder="address"></input><br />
            <input onChange={(event) => setpassword(event.target.value)} placeholder="password" ></input><br />
            <button onClick={handleClick} style={{color : 'white',background : 'black'}}>Submit</button>
        </div>
    )
}

export default Update;

// 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