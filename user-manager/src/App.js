import './App.css';
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Form from '../src/Components/Form'
import LandingPage from './Components/Landingpage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/add" element={<Form/>} />
        <Route path="/update" element={<Form/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
