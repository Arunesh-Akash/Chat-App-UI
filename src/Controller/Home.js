import './Signup.css';
import TelegramIcon from '@mui/icons-material/Telegram';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Link, Outlet } from 'react-router-dom';
import ChatDashboard from './ChatDashboard';

function Home() {
  return (
    <div className="Home">
      <div className="container1">
        <TelegramIcon style={{ marginLeft: '-327px', marginTop: '8px' }} />
        <h6 style={{ marginTop: '-21px', marginLeft: '-177px' }}>Chat-App</h6>
        <div className="container2">
          <DensityMediumIcon style={{ marginTop: '17px', marginLeft: '17px' }} />
          <input
            type="text"
            placeholder="Search"
            style={{ width: '15rem', height: '2rem', marginTop: '12px', marginLeft: '22px' }}
          />
          <ModeEditIcon style={{ marginTop: '14px', marginLeft: '18px' }} />
        </div>
        <div className='container3'>
          <Link to='allchats' style={{textDecoration:'none'}}><h6 style={{color:'black',marginTop:'16px',marginLeft:'17px'}}>All Chats</h6></Link>
          <Link to='projects' style={{textDecoration:'none'}}><h6 style={{color:'black',marginTop:'16px',marginLeft:'38px'}}>Projects</h6></Link>
          <Link to='important' style={{textDecoration:'none'}}><h6 style={{color:'black',marginTop:'16px',marginLeft:'38px'}}>Important</h6></Link>
        </div>
        <hr />
        <Outlet />
      </div>
      <div className='container4'>
        <ChatDashboard />
      </div>
    </div>
  );
}

export default Home;
