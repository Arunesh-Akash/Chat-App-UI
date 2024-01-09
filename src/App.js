import './App.css';
import SignUp from './Controller/Signup';
import Home from './Controller/Home';
import { BrowserRouter,Routes,Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />}/>
        <Route path='/Home' element={<Home />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
