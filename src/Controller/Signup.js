import { useState } from 'react';
import signPic from '../Picture/signPic.png';
import './Signup.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function SignUp() {
  const [isSignUp, setisSignup] = useState(true);
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const Navigate=useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    
    if(isSignUp){
      axios.post("http://localhost:4000/user/login",{email,password}).then((response)=>{
        console.log("Successfully Login");
        Navigate("/Home");
    });
  }
    else{
      axios.post("http://localhost:4000/user/signup",{email,password}).then((response)=>{
        console.log(response);
    });
    }
  
  }
  
  function toggleSign() {
    setisSignup(!isSignUp);
  }

  return (
    <div style={{ backgroundColor: 'rgb(35, 33, 33)', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className='signPic'>
        <img src={signPic}  style={{height:'250px'}}/>
        <h1>Chat-App</h1>
        <p>Please enter the valid email and password for enter the chatting world</p>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="email" placeholder="Enter email" value={email} name="email" style={{ width: '30rem', marginLeft: '-5px' }} onChange={(e)=>setEmail(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Password" value={password} name="password" style={{ width: '30rem', marginLeft: '-5px' }} onChange={(e)=>setPassword(e.target.value)}/>
          </Form.Group>
          {
            isSignUp ?
              <Button variant="success" type='submit' style={{ width: '6rem', marginLeft: '-30px' }}>Login</Button>
              :
              <Button variant="success" type='submit' style={{ width: '6rem', marginLeft: '-30px' }}>SignUp</Button>
          }
          <p style={{ marginTop: '43px' }}>Didn't have an account ?<p style={{ color: 'skyblue', cursor: 'pointer', textDecorationLine: 'underline' }} onClick={toggleSign}>{isSignUp ? 'SignUp' : 'Login'}</p></p>
        </Form>
      </div>
    </div>

  );
}


export default SignUp;