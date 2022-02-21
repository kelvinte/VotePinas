import logo from './logo.svg';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Home from "./routes/Home";
import {useEffect} from "react";
import Vote from "./routes/Vote";
import Know from "./routes/Know";
import Mission from "./routes/Mission";
import Purchase from "./routes/Purchase";


function App() {

    useEffect(()=>{
        document.title = "Angat Pinas"
    },[])
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/vote" element={<Vote/>}/>
              <Route path="/know/:id" exact  element={<Know/>}/>
              <Route path="/mission" element={<Mission/>}/>
              <Route path="/purchase" element={<Purchase/>}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
