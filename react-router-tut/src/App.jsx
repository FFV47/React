import React from "react";
import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import Home from "./Home";
import NewPost from "./NewPost";
import EditPost from "./EditPost";
import PostPage from "./PostPage";
import About from "./About";
import Missing from "./Missing";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import api from "./api/posts";
import axiosAPI from "./api/axiosAPI";
import useWindowSize from "./hooks/useWindowSize";
import useAxiosFetch from "./hooks/useAxiosFetch";

function App() {
  const apiTest = new axiosAPI("http://localhost:3500");
  // * Hooks
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const { data, fetchError, isLoading } = useAxiosFetch("/posts");

  useEffect(() => {
    setPosts(data);
  }, [data]);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await api.get("/posts");
  //       if (response) setPosts(response.data);
  //     } catch (error) {
  //       apiError(error);
  //     }
  //   };

  //   fetchPosts();
  // }, []);

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.body.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = {
      id,
      "title": postTitle,
      datetime,
      "body": postBody,
    };

    const { data, error } = await apiTest.post("/posts", newPost);

    if (data) {
      setPosts([...posts, data]);
      setPostTitle("");
      setPostBody("");
      navigate("/");
    } else {
      console.log(error);
    }

    // try {
    //   const response = await api.post("/posts", newPost);
    //   if (response) {
    //     setPosts([...posts, response.data]);
    //     setPostTitle("");
    //     setPostBody("");
    //     navigate("/");
    //   }
    // } catch (error) {
    //   apiError(error);
    // }
  };

  const handleEdit = async (id) => {
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const updatedPost = { id, "title": editTitle, datetime, "body": editBody };

    const { data, error } = await apiTest.put(`/posts/${id}`, updatedPost);

    if (data) {
      setPosts(posts.map((post) => (post.id === id ? data : post)));
      setEditTitle("");
      setEditBody("");
      navigate("/");
    } else {
      console.log(error);
    }

    // try {
    //   const response = await api.put(`/posts/${id}`, updatedPost);
    //   if (response) {
    //     setPosts(posts.map((post) => (post.id === id ? response.data : post)));
    //     setEditTitle("");
    //     setEditBody("");
    //     navigate("/");
    //   }
    // } catch (error) {
    //   apiError(error);
    // }
  };

  const handleDelete = async (id) => {
    const { data, error } = await apiTest.delete(`/posts/${id}`);

    if (data) {
      setPosts(posts.filter((post) => post.id !== id));
      navigate("/");
    } else {
      console.log(error);
    }
    // try {
    //   const response = await api.delete(`/posts/${id}`);
    //   if (response) {
    //     setPosts(posts.filter((post) => post.id !== id));
    //     navigate("/");
    //   }
    // } catch (error) {
    //   apiError(error);
    // }
  };

  return (
    <div className="App">
      <Header title="React JS Blog" width={width} />
      <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route
          path=""
          element={
            <Home posts={searchResults} fetchError={fetchError} isLoading={isLoading} />
          }
        />
        <Route
          path="post"
          element={
            <NewPost
              handleSubmit={handleSubmit}
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody}
            />
          }
        />
        <Route
          path="edit/:id"
          element={
            <EditPost
              posts={posts}
              handleEdit={handleEdit}
              editTitle={editTitle}
              setEditTitle={setEditTitle}
              editBody={editBody}
              setEditBody={setEditBody}
            />
          }
        />
        <Route
          path="post/:id"
          element={<PostPage posts={posts} handleDelete={handleDelete} />}
        />
        <Route path="about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
