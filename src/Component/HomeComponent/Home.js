import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import '../HomeComponent/Home.css';
import axiosInstance from '../../Service/axiosInstance';
import TelegramIcon from '@mui/icons-material/Telegram';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useNavigate } from 'react-router';
import Projects from '../ProjectComponent/Projects';
import Important from '../ImportantComponent/Important';
import Welcome from '../WelcomeComponent/Welcome';
import ChatDashboard from '../ChatDashComponent/ChatDashboard';
import { io } from 'socket.io-client';
import LogOut from '../LogoutComponent/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';

function Home() {
  const [value, setValue] = React.useState('1');
  const [currentChat, setCurrentChat] = useState(undefined);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(undefined);
  const socket = useRef();
  const [image, setImage] = useState([]);
  const [profileUrl, setProfileUrl] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterImage, setFilterImage] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storageData = localStorage.getItem('userEmail');
        if (!storageData) {
          navigate('/');
        } else {
          setCurrentUser(storageData);
          const response = await axiosInstance.get("/user/login", {});
          const Data = response.data;
          const email = Data.filter(item => item.email !== currentUser).map(item => item.email.split('@')[0]);

          const imagePromises = email.map(async (userEmail) => {
            const res = await axiosInstance.get(`/user/signup/get-image?email=${userEmail}@gmail.com`, {
              responseType: 'arraybuffer',
            });
            const imageData = btoa(
              new Uint8Array(res.data)
                .reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
            return { userEmail, imageUrl: `data:image/jpeg;base64,${imageData}` };
          });

          const imagesData = await Promise.all(imagePromises);
          setImage(imagesData);

        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();

    if (currentUser) {
      socket.current = io('https://chat-app-backend-k30p.onrender.com/');
      socket.current.emit("add-user", currentUser);
    }
  }, [currentUser, navigate, socket]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilterImage(image);
    }
    else {
      const filteredImage = image.filter(data => data.userEmail.toLowerCase().includes(searchQuery.toLowerCase()));
      setFilterImage(filteredImage);
    }
  }, [searchQuery, image]);

  return (
    <div className="Home">
      <div className="container1">
        <TelegramIcon style={{ marginLeft: '-300px', marginTop: '8px' }} />
        <h6 style={{ marginTop: '-21px', marginLeft: '-177px' }}>Chat App</h6>

        <div className="container2">

          <div className="density-icon-container">
            <DensityMediumIcon
              style={{
                marginTop: '17px',
                marginLeft: '17px',
                cursor: 'pointer'
              }}
            />
            <div className="profile-settings-tooltip">
              <p><AccountCircleIcon/>My Profile</p>
              <p><SettingsIcon/>Setting</p>
            </div>
          </div>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '15rem', height: '2rem', marginTop: '12px', marginLeft: '22px' }}
          />
          < LogOut />
        </div>
        <div className='container3'>
          <Box>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  <Tab label="All Chats" value="1" />
                  <Tab label="Projects" value="2" />
                  <Tab label="Important" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1"><div>
                {
                  Array.isArray(image) && image.length > 0 ? (
                    filterImage.map((data, index) => (
                      <div key={index} className='contact'>
                        <img src={data.imageUrl} alt='' />
                        <div onClick={() => { setCurrentChat(data.userEmail); setProfileUrl(data.imageUrl);navigate('/home/chatMessage') }}>
                          {data.userEmail}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No images available.</p>
                  )
                }
              </div></TabPanel>
              <TabPanel value="2"><Projects /></TabPanel>
              <TabPanel value="3"><Important /></TabPanel>
            </TabContext>
          </Box>
        </div>
      </div>
      <div className='container4'>
        {
        currentChat===undefined ? <Welcome /> : <ChatDashboard currentChat={currentChat} currentUser={currentUser} socket={socket} profileUrl={profileUrl} />
        }
      </div>
    </div>
  );
}

export default Home;
