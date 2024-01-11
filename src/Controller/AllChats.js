import { useEffect, useState } from 'react';
import './Signup.css';
import axios from 'axios'
import { Button } from '@mui/material';
import ProfileImg from '../Picture/ProfileImg.png'
import { useNavigate } from 'react-router';

function AllChats(){
const [userEmail,setUserEmail]=useState([]);
const navigate=useNavigate();
useEffect(()=>{
    axios.get("http://localhost:4000/user/login",{}).then((response)=>{
        const Data=response.data;
        const email=Object.keys(Data[0]).includes('email') ? Data.map(item => item.email.split('@')[0]) : [];
        setUserEmail(email);

    })
},[]);
function handleSubmit(data){
navigate('/Home/allchats',);
}

return (
    <div>
       {
        userEmail.map((data,index)=>{
            return(
                <div key={index}>
                    <img src={ProfileImg} style={{height:'50px'}} />
                <Button variant='text' style={{
              height: '50px',  
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',  
              opacity: '0.9', 
              textTransform: 'none', 
              width:'385px',marginBottom:'18px',
              marginLeft:'4px',
              borderRadius:'15px'
            }} onClick={handleSubmit}>{data}</Button>
                </div>
            )
        })
       }
      
    </div>
)
}

export default AllChats;