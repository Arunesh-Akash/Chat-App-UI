import './Signup.css';
import ProfileImg from '../Picture/ProfileImg.png'
import CallIcon from '@mui/icons-material/Call';
import SearchIcon from '@mui/icons-material/Search';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';


function ChatDashboard(){
    return(
        <div>
            <div className='chatNav'>
            <img src={ProfileImg} style={{height:'70px',marginLeft:'-700px'}} />
            <h4 style={{marginTop:'-70px',marginLeft:'-390px'}}>Name of the Person</h4>
            <div style={{marginTop:'-20px'}}> 
                <CallIcon style={{marginLeft:'710px'}}/>
                <SearchIcon style={{marginLeft:'60px'}}/>
                <MoreHorizIcon style={{margin:'30px'}} />
            </div>
            <hr/>
            </div>
        </div>
    )
}
export default ChatDashboard;