import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './Components/Header/Header';
import Homepage from './Pages/Homepage/Homepage';
import Auth from './Pages/Auth/Auth';
import Footer from './Components/Footer/Footer';
import AddArticle from './Pages/AddArticle/AddArticle';
import CategoryArticle from './Pages/CategoryArticle/CategoryArticle';
import ArticleDetails from './Pages/ArticleDetails/ArticleDetails';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/addarticle" element={<AddArticle />} />
          <Route path="/category/:categoryName" element={<CategoryArticle />} />
          <Route path="/article/:articleId" element={<ArticleDetails />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
