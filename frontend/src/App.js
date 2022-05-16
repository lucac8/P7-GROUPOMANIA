import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Comment from './pages/Comment';
import Login from './pages/Login';
import Post from './pages/Post';
import Profil from './pages/Profil';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/post' element={<Post />} />
        <Route path='/post/:id' element={<Comment />} />
        <Route path='/profil/:id' element={<Profil />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
