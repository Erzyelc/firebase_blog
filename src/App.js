import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './Components/Header/Header';
import Homepage from './Pages/Homepage/Homepage';
import Auth from './Pages/Auth/Auth';
import Footer from './Components/Footer/Footer';
import AddArticle from './Pages/AddArticle/AddArticle';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/addarticle" element={<AddArticle />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
