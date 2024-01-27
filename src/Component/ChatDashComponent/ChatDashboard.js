import '../ChatDashComponent/ChatDash.css'
import ChatInput from '../ChatInputComponent/ChatInput';
import axiosInstance from '../../Service/axiosInstance';
import { useEffect, useState, useRef } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Welcome from '../WelcomeComponent/Welcome';

function ChatDashboard({ currentChat, currentUser, socket, profileUrl }) {
  const scrollRef = useRef();
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [toggle,setToggle]=useState(false);
  const navigate=useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const data = localStorage.getItem('userEmail');
        const response = await axiosInstance.post('/message/getMsg', {
          to: currentChat.toLowerCase() + '@gmail.com',
          from: data
        });

        if (Array.isArray(response.data)) {
          setMessages(response.data);
        } else {
          console.error('Invalid response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchData();
  }, [currentChat]);




  async function handleSendMsg(msg) {
    try {
      await axiosInstance.post('/message/addMsg', {
        from: currentUser,
        to: currentChat + '@gmail.com',
        message: msg
      });

      socket.current.emit("send-msg", {
        to: currentChat + '@gmail.com',
        from: currentUser,
        message: msg,
      });
      setMessages((prevMessages) => [...prevMessages, { fromSelf: true, message: msg }]);


    } catch (error) {
      console.log("Error sending message:", error);
    }
  }

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, [socket]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

 

  function handleClick(){
    setToggle(!toggle);
    navigate('/home');
  }
  return (
    toggle?<Welcome />:
    <div className='chat-container'>
      <div className='chat-header'>
        <Button onClick={handleClick}><ArrowBackIcon /></Button>
        <img src={profileUrl} alt='' />
        <h4>{currentChat.toUpperCase()}</h4>
      </div>
      <div className='chat-message'>
        <hr />
        {messages.map((msg, index) => (
          <div key={index} ref={scrollRef} className={`message ${msg.fromSelf ? 'sended' : 'received'}`}>
            <div className="content">
              <p>{msg.message}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <ChatInput handleSendMsg={handleSendMsg} />
      </div>
    </div>

  );
}

export default ChatDashboard;
