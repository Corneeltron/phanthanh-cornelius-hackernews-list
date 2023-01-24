import { useState } from "react";
import "./App.css";
import { HNStoriesDisplay } from "./components/HNStoriesDisplay";
import { useFetch } from "./api/HNStory";
import { Pagination } from "./components/Pagination";
import { Spinner } from "./components/Spinner";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 25;
  const { loading, error, story } = useFetch(currentPage, pageSize);
  const lastPage = Math.ceil(story.length / pageSize);

  return (
    <>
      <div className="container">
        <header className="header">
          <a
            className="favicon"
            target="_blank"
            href="http://www.ycombinator.com/"
            rel="noreferrer"
            >
            <img
              src="https://news.ycombinator.com/y18.gif"
              alt="Y-combinator icon"
              />
          </a>
              <h1>Hacker News</h1>
        </header>
        <div className="body">
          <HNStoriesDisplay
            pageSize={pageSize}
            currentPage={currentPage}
            stories={story}
          />
          {loading && <Spinner />}
          {error && <p>Error!</p>}
        </div>
      </div>
      <div className="pagination">
        <Pagination
          lastPage={lastPage}
          onPageChange={setCurrentPage}
          currentPage={currentPage}
          maxLength={7}
        />
      </div>
    </>
  );
}

export default App;
