import logo from './logo.svg';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import api from './api/posts';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Home from './components/Home';
import NewPost from './components/NewPost';
import PostPage from './components/PostPage';
import About from './components/About';
import Missing from './components/Missing';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const navigate = useNavigate();

  // 1. READ Async fetch function using axios to get data from api at load time
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts');
        // if (response && response.data)
        setPosts(response.data);
      } catch (err) {
        if (err.response) {
        // If response is not in the 200 response range:
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
        // If no response or any other error:
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  }
  fetchPosts();

}, [])

  // Search function using useEffect. Filter posts to match search input
  useEffect(() => {
    const filteredResults = posts.filter(post => 
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase()));
      setSearchResults(filteredResults.reverse()); //Show most recent results
  }, [posts, search])

  // 2. CREATE Submitting new posts and assign it an id. If this is the only post, it's id will be 1.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody};

    try {
      const response = await api.post('/posts/', newPost);
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      // Reset to empty after creating new post and return to home:
      setPostTitle('');
      setPostBody('');
      navigate('/');
  
    } catch (err) { 
      console.log(`Error: ${err.message}`);
    }
  }

  // 3. DELETE - Deleting posts
  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      console.log(`Deleting post ${id}`);
      const postList = posts.filter(post => post.id !== id)
      console.log(postList);
      setPosts(postList);

    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
    // Return to home page after deleting post
    navigate('/');
  }

  return (
    <div className="App">
      <Header title='React JS Blog'/>
      <Navbar 
        search={search} 
        setSearch={setSearch}
      />
      
      <Routes>
      
        <Route path="/" element={
          <Home posts={searchResults}
        />}/>
        
        <Route path="/post" element={
          <NewPost 
            postBody={postBody} 
            postTitle={postTitle} 
            setPostBody={setPostBody} 
            setPostTitle={setPostTitle}
            handleSubmit={handleSubmit}
        />}/>
        
        <Route path="/post/:id" element={
          <PostPage 
            posts={posts} 
            handleDelete={handleDelete} 
        />} />

        <Route path="/about" element={<About/>} />
        
        <Route path="*" element={<Missing/>} />
      
      </Routes>
      
      <Footer/>
    </div>
  );
}

export default App;
