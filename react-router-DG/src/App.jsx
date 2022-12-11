import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// import { DataProvider } from "./context/DataContext";
import useAxiosFetch from "./hooks/useAxiosFetch";
import { useStoreActions } from "easy-peasy";

import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import Home from "./Home";
import NewPost from "./NewPost";
import EditPost from "./EditPost";
import PostPage from "./PostPage";
import About from "./About";
import Missing from "./Missing";

function App() {
  const { data, fetchError, isLoading } = useAxiosFetch("/posts");
  const setPosts = useStoreActions((actions) => actions.setPosts);

  useEffect(() => {
    setPosts(data);
  }, [data, setPosts]);

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

  return (
    <div className="App">
      <Header title="React JS Blog" />
      {/* <DataProvider> */}
      <Nav />
      <Routes>
        <Route path="" element={<Home fetchError={fetchError} isLoading={isLoading} />} />
        <Route path="post" element={<NewPost />} />
        <Route path="edit/:id" element={<EditPost />} />
        <Route path="post/:id" element={<PostPage />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      {/* </DataProvider> */}
      <Footer />
    </div>
  );
}

export default App;
