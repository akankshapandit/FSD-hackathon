import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home.jsx';
import Login from './Pages/Login_and_Signup/Login.jsx';
import Signup from './Pages/Login_and_Signup/Signup.jsx';
import Pricing from './Pages/Pricing/Pricing.jsx';
import Contact from './Pages/Contact/Contact.jsx';
import About from './Pages/About/About.jsx';
import InvoiceGenerator from './Pages/Invoice/InvoiceGenerator.jsx'
import './App.css';
import Homepage from './Pages/Homepage/Homepage.jsx';
import Demo from './Pages/Demo/Demo.jsx';
import History from './Pages/History/History.jsx';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "../components/scrollToTop.jsx"

function App() {
  return (
    <Router>
      <ScrollToTop /> {/* 👈 this will reset scroll on every route change */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/home" element={<Homepage/>} />
        <Route path="/invoice" element={<InvoiceGenerator/>} />
        <Route path='/demo' element={<Demo/>}/>
        <Route path='/history' element={<History/>}/>
      </Routes>
    </Router>
  );
}

export default App;