import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AllPost from "./components/All_Post";
import All_Users from "./components/All_Users";
import Post_Details from "./components/Post_Details";
import Profile from "./components/Profile";
import Add_Post from "./components/Add_Post";


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  return (
    <>
      <Router>
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <Routes>
          <Route path="/" element={<AllPost />} />
          <Route path="/post" element={<Add_Post />} />
          <Route path="/post/:id" element={<Post_Details />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/allusers" element={<All_Users />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
