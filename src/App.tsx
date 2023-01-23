import { useState, useRef, useEffect, useCallback } from "react";
import "./App.css";
import { HNStoriesDisplay } from "./components/HNStoriesDisplay";
import { useFetch } from "./api/HNStory";
import { Pagination } from "./components/Pagination";

function App() {
  const { loading, error, story } = useFetch();
  const [currentPage, setCurrentPage] = useState(1);
  const lastPage = 20;
  // const loader = useRef(null);

  // const handleObserver = useCallback((pages: any[]) => {
  //   const target = pages[0];
  //   if (target.isIntersecting) {
  //     setPage((prev) => prev + 1);
  //   }
  // }, []);

  // useEffect(() => {
  //   const option = {
  //     root: null,
  //     rootMargin: "20px",
  //     threshold: 0
  //   };
  //   const observer = new IntersectionObserver(handleObserver, option);
  //   if (loader.current) observer.observe(loader.current);
  // }, [handleObserver]);

  return (
    <div className="container">
      <h1>HackerNews Top 100 Posts</h1>
      <HNStoriesDisplay stories={story} />
      {loading && <p>Loading...</p>}
      {error && <p>Error!</p>}
      <Pagination
        lastPage={lastPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        maxLength={7}
      />
    </div>
  );
}

export default App;
