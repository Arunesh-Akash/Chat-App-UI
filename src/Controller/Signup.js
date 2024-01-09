import { useState } from 'react';
import signPic from '../Picture/signPic.png';
import './Signup.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

function SignUp() {
  const [isSignUp, setisSignup] = useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    {
      isSignUp? alert('User Successfully Login') : alert('User Successfully Registered')
    }
  }
  
  function toggleSign() {
    setisSignup(!isSignUp);
  }

  return (
    <div style={{ backgroundColor: 'rgb(35, 33, 33)', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className='signPic'>
        <img src={signPic} />
        <h1>Chat-App</h1>
        <p>Please enter the valid email and password for enter the chatting world</p>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="email" placeholder="Enter email" style={{ width: '30rem', marginLeft: '-5px' }} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Password" style={{ width: '30rem', marginLeft: '-5px' }} />
          </Form.Group>
          {
            isSignUp ?
              <Link to='/Home'><Button variant="success" type='submit' style={{ width: '6rem', marginLeft: '-409px' }}>Login</Button></Link>
              :
              <Button variant="success" type='submit' style={{ width: '6rem', marginLeft: '-409px' }}>SignUp</Button>
          }
          <p style={{ marginTop: '43px' }}>Didn't have an account ?<p style={{ color: 'skyblue', cursor: 'pointer', textDecorationLine: 'underline' }} onClick={toggleSign}>{isSignUp ? 'SignUp' : 'Login'}</p></p>
        </Form>
      </div>
    </div>

  );
}


export default SignUp;