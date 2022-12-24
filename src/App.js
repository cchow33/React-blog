import logo from './logo.svg';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
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
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My 1st Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 2,
      title: "My 2nd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 3,
      title: "My 3rd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 4,
      title: "My 4th Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    }
  ]);

  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const navigate = useNavigate();

  // Search function using useEffect. Filter posts to match search input
  useEffect(() => {
    const filteredResults = posts.filter(post => 
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase()));
      setSearchResults(filteredResults.reverse()); //Show most recent results
  }, [posts, search])

  // Submitting new posts and assign it an id. If this is the only post, it's id will be 1.
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody};
    const allPosts = [...posts, newPost];
    setPosts(allPosts);
    // Reset to empty after creating new post and return to home:
    setPostTitle('');
    setPostBody('');
    navigate('/');
  }

  // Deleting posts
  const handleDelete = (id) => {
    console.log(`Deleting post ${id}`);
    const postList = posts.filter(post => post.id !== id)
    console.log(postList);
    setPosts(postList);
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
