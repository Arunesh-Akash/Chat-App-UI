import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useNavigate } from 'react-router';
import '../LogoutComponent/Logout.css';

function LogOut(){
    const navigate=useNavigate();
    function handleClick(){
        localStorage.clear();
        navigate('/');
    }
    return (
        <div>
            <button onClick={handleClick} className='logout-cont'> 
                <PowerSettingsNewIcon />
            </button>
        </div>
    )
}

export default LogOut;