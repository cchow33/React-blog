import logo from './logo.svg';
import './App.css';
import { Route, Routes, Link } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Home from './components/Home';
import NewPost from './components/NewPost';
import PostPage from './components/PostPage';
import About from './components/About';
import Missing from './components/Missing';
import Footer from './components/Footer';
import { useState, useEffect } from 'react';

function App() {
  const [search, setSearch] = useState('');

  return (
    <div className="App">
      <Header title='React JS Blog'/>
      <Navbar search={search} setSearch={setSearch}/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/post" element={<NewPost />}/>
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/about" element={<About/>} />
        <Route path="*" element={<Missing/>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
