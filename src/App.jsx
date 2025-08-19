
import './App.css'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Landing from "./pages/Landing"
import Demo1 from "./pages/demo1"

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Inicio</Link> | 
        <Link to="/demo1">Demo1</Link> 
      </nav>

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/demo1" element={<Demo1 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App