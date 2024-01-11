import './App.css';
import SignUp from './Controller/Signup';
import Home from './Controller/Home';
import AllChats from './Controller/AllChats';
import Projects from './Controller/Projects';
import Important from './Controller/Important';
import ChatDashboard from './Controller/ChatDashboard';
import { BrowserRouter,Routes,Route} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />}/>
        <Route path='/Home/' element={<Home />}> 
        <Route path='allchats' element={<AllChats/>} />
        <Route path='projects' element={<Projects/>} />
        <Route path='important' element={<Important/>} /> 
        <Route path='chatDashboad' element={<ChatDashboard/>} />       
        </Route>
        
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
