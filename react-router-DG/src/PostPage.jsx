import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import { useStoreActions, useStoreState } from "easy-peasy";

// import { useContext } from "react";
// import DataContext from "./context/DataContext";

const PostPage = () => {
  // const { posts, setPosts } = useContext(DataContext);
  const getPostByID = useStoreState((state) => state.getPostByID);
  const deletePost = useStoreActions((actions) => actions.deletePost);
  const navigate = useNavigate();

  const { id } = useParams();
  const post = getPostByID(id);

  const handleDelete = (id) => {
    deletePost(id);
    navigate("/");
  };

  return (
    <main className="PostPage">
      <article className="post">
        {post && (
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.datetime}</p>
            <p className="postBody">{post.body}</p>
            <Link to={`/edit/${post.id}`}>
              <button className="editButton">Edit Post</button>
            </Link>
            <button className="deleteButton" onClick={() => handleDelete(post.id)}>
              Delete Post
            </button>
          </>
        )}

        {!post && (
          <>
            <h2>Post Not Found</h2>
            <p>Well, that's disappointing.</p>
            <p>
              <Link to="/">Visit Our Homepage</Link>
            </p>
          </>
        )}
      </article>
    </main>
  );
};

export default PostPage;
