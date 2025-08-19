
import './App.css'
import Home from "./pages/home"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Landing from "./pages/Landing"

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Inicio</Link> | 
        <Link to="/home">Home</Link> 
      </nav>

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App