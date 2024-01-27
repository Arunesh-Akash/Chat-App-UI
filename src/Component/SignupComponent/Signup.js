import { useState } from 'react';
import signPic from '../../Picture/signPic.png';
import '../SignupComponent/Signup.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
  const [isSignUp, setisSignup] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const Navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (isSignUp) {
      const response = await axios.post("https://chat-app-backend-k30p.onrender.com/user/login", { email, password });

      if (response.status === 200 && response.data.status === 'AUTHORISED') {
        localStorage.setItem("userEmail", response.data.email);
        localStorage.setItem("token", response.data.token);
        Navigate("/Home");
      }
    } else {
      await axios.post("https://chat-app-backend-k30p.onrender.com/user/signup", { userName, email, password }).then((response) => {
        console.log(response.data);
        localStorage.setItem("userEmail", response.data.status.email);

      });
      Navigate('/profileImage')
    }
  }

  function toggleSign() {
    setisSignup(!isSignUp);
  }

  return (
    <div className="main-container">
      <div className='signPic'>
        <img src={signPic} style={{ height: '250px' }} alt='' />
        <h1>Chat-App</h1>
        <p>Please enter the valid email and password to enter the chatting world</p>
        <Form onSubmit={handleSubmit}>
          {
            isSignUp ? [] : <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Control type="text" placeholder="Enter name" value={userName} name="userName" onChange={(e) => setUserName(e.target.value)} />
            </Form.Group>
          }
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="email" placeholder="Enter email" value={email} name="email" onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Password" value={password} name="password" onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          {
            isSignUp ?
              <Button variant="success" type='submit'>Login</Button>
              :
              <Button variant="success" type='submit'>SignUp</Button>
          }
          <p style={{ marginTop: '20px' }}>Don't have an account? <span style={{ color: 'skyblue', cursor: 'pointer', textDecorationLine: 'underline' }} onClick={toggleSign}>{isSignUp ? 'SignUp' : 'Login'}</span></p>
        </Form>
      </div>
    </div>
  );
}

export default SignUp;
