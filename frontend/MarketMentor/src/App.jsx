import { useState , useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProtectedRoutes from "../Components/ProtectedRoutes";

import LandingPage from '../Components/LandingPage'
import Dashboard from '../Components/Dashboard'
import { Route, Routes } from "react-router-dom";
import SearchResults from '../Components/SearchResults';
import About from '../Components/About';
import Modules from '../Components/Modules';
import { setTheme } from '../Components/surprise';
function App() {


  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "default_theme";
  })


  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === "gold_theme" ? "default_theme" : "gold_theme");
  }
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/Dashboard" element={<Dashboard toggle={toggleTheme}/>} />
        <Route path="/Modules" element={<Modules />} />
        <Route path="/News" element={<SearchResults />} />
        <Route path="/About" element={<About />} />
      </Route>
    </Routes>
  );
  
  
}

export default App
