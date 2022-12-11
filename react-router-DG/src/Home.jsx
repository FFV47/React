import React from "react";
import Feed from "./Feed";

// import { useContext } from "react";
// import DataContext from "./context/DataContext";
import { useStoreState } from "easy-peasy";

const Home = ({ fetchError, isLoading }) => {
  // const { searchResults } = useContext(DataContext);

  const searchResults = useStoreState((state) => state.searchResults);

  return (
    <main className="Home">
      {isLoading && <p className="statusMsg">Loading posts...</p>}
      {!isLoading && fetchError && (
        <p className="statusMsg" style={{ color: "red" }}>
          {fetchError}
        </p>
      )}
      {!isLoading &&
        !fetchError &&
        (searchResults.length > 0 ? (
          <Feed posts={searchResults} />
        ) : (
          <p className="statusMsg">No posts to display.</p>
        ))}
    </main>
  );
};

export default Home;
