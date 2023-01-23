import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './Components/Header/Header';
import Homepage from './Pages/Homepage/Homepage';
import Auth from './Pages/Auth/Auth';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
