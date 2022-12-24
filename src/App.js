import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
// import { useState, useEffect } from 'react';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Home from './components/Home';
import NewPost from './components/NewPost';
import PostPage from './components/PostPage';
import About from './components/About';
import Missing from './components/Missing';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Routes>
        <Header/>
        <Navbar/>
        <Route path="/" element={<Home />}/>
        <Route path="/post" element={<NewPost />}/>
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/about" element={<About/>} />
        <Route path="*" element={<Missing/>} />
        <Footer/>
      </Routes>
    </div>
  );
}

export default App;
