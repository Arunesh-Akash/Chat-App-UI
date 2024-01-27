import './App.css';
import SignUp from './Component/SignupComponent/Signup';
import Home from './Component/HomeComponent/Home';
import ChatDashboard from './Component/ChatDashComponent/ChatDashboard';
import ProfileImage from './Component/ProfileImageComponent/ProfileImage';
import { BrowserRouter,Routes,Route} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />}/>
        <Route path='/profileImage' element={<ProfileImage />}/>
        <Route path='/Home/*' element={<Home />}> 
        <Route path='chatMessage' element={<ChatDashboard/>} />
        </Route>
        
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
