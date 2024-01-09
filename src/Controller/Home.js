import './Signup.css';
import TelegramIcon from '@mui/icons-material/Telegram';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Link } from 'react-router-dom';

function Home() {

    return (
        <div className="Home">
            <div className="container1">
                <TelegramIcon style={{ marginLeft: '-327px', marginTop: '8px' }} />
                <h6 style={{ marginTop: '-21px', marginLeft: '-177px' }}>Chat-App</h6>
                <div className="container2">
                <DensityMediumIcon style={{marginTop:'17px',marginLeft:'17px'}}/>
                <input
                    type="text"
                    placeholder="Search"
                style={{width:'15rem',height:'2rem',marginTop:'12px',marginLeft:'22px'}}
                />
                <ModeEditIcon style={{marginTop:'14px',marginLeft:'18px'}} />
                </div>
                <div className='container3'>
                <Link to='/Home' style={{textDecoration:'none'}}><h6 style={{color:'black',marginTop:'16px',marginLeft:'17px'}}>All Chats</h6></Link>
                </div>
                <hr />
            </div>
            <h1>Home</h1>
        </div>
    )
}

export default Home;