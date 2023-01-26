import { useState, useEffect } from "react";
import "./App.css";
import { Pagination } from "./components/Pagination";
import { Spinner } from "./components/Spinner";
import { HNStoriesDisplay } from "./components/HNStoriesDisplay";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [topStoriesIds, setTopStoriesIds] = useState<number[]>([]);
  const [topStoriesLength, setTopStoriesLength] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | boolean>(false);
  const pageSize = 20;
  const lastPage = Math.ceil(topStoriesLength.length / pageSize);

  const pageIdPosts = (
    topStoriesIds: number[],
    pageNumber: number,
    pageSize: number
  ) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return topStoriesIds.slice(startIndex, startIndex + pageSize);
  };

  useEffect(() => {
    async function getTopStoriesIds() {
      const url = "https://hacker-news.firebaseio.com/v0/topstories.json";
      try {
        await setLoading(true);
        await setError(false);
        const res = await fetch(url);
        if (res.ok === false) {
          setError("Response Error:" + res.text);
        }
        const data = await res.json();
        setTopStoriesLength(data);
        const slicedData = await pageIdPosts(data, currentPage, pageSize);
        setTopStoriesIds(slicedData);
        setLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(JSON.stringify(err))
        }
      }
    }
    getTopStoriesIds();
  }, [currentPage]);

  return (
    <div className="container">
      <div className="stories-container">
        <header className="header">
          <a
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
        <div data-testid="body" className="body">
          {loading ? (
            <Spinner />
          ) : (
            <HNStoriesDisplay
              topStoriesIds={topStoriesIds}
              currentPage={currentPage}
            />
          )}
          {error && <p>An error has occurred. Please refresh and try again.</p>}
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
    </div>
  );
}

export default App;
