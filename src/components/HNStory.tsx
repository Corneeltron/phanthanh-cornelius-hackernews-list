import { useState, useEffect } from 'react';
import './HNStory.css';

export interface HNStory {
  by: string;
  id: number;
  descendants: number;
  kid: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
}

type HNStoryPageProps = {
  id: number;
  currentPage: number;
};

export const HNStoryPage = ({ id, currentPage }: HNStoryPageProps) => {
  const [storyByIdData, setStoryByIdData] = useState<HNStory>({
    by: "default",
    id: 0,
    descendants: 0,
    kid: [],
    score: 0,
    time: 0,
    title: "title",
    type: "story",
    url: "www.ycombinator.com",
  });
  const [error, setError] = useState<string | boolean>(false)

  useEffect(() => {
    async function getStoriesById(id: number) {
      try {
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
          .then((res) => res.json())
          .then((data) => setStoryByIdData(data));

      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(JSON.stringify(err))
        }
      }
    }
    getStoriesById(id);
  }, [currentPage, id]); 

  return (
    <div key={storyByIdData.id}>
      <a target="_blank" rel="noopener noreferrer" className="links" href={storyByIdData.url}>
        {storyByIdData.title}
      </a>
      <div className="link-info-container">
        <span className="link-info">{storyByIdData.score} points by </span>
        <a
          target="_blank"
          href={`https://news.ycombinator.com/user?id=${storyByIdData.by}`}
          rel="noopener noreferrer"
          className="link-info"
        >
          {`${storyByIdData.by} `}
        </a>
        <span className="link-info">{new Date(storyByIdData.time * 1000).getHours()} hours ago </span>
        |
        <a
          target="_blank"
          href={`https://news.ycombinator.com/item?id=${storyByIdData.id}`}
          rel="noopener noreferrer"
          className="link-info"
        >
          {" "}
          {`${storyByIdData.descendants} comments`}
        </a>
      </div>
      {error && <p>An error has occurred loading this story!</p>}
    </div>
  );
};
