import logo from './logo.svg';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Trade from "./routes/Trade";
import Home from "./routes/Home";
import Earn from "./routes/Earn";
import Lottery from "./routes/Lottery";
import Bet from "./routes/Bet";
import {useEffect} from "react";


function App() {

    useEffect(()=>{
        document.title = "Kinance"
    },[])
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/trade" element={<Trade/>}/>
              <Route path="/earn" element={<Earn/>}/>
              <Route path="/lottery" element={<Lottery/>}/>
              <Route path="/bet" element={<Bet/>}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
