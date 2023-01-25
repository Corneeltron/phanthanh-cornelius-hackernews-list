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

  useEffect(() => {
    async function getStoriesById(id: number) {
      //error handling in this fetch
      fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        .then((res) => res.json())
        .then((data) => setStoryByIdData(data));
    }
    getStoriesById(id);
  }, [currentPage]); // eslint-disable-line

  return (
    <div key={storyByIdData.id}>
      <a className="links" href={storyByIdData.url}>
        {storyByIdData.title}
      </a>
      <div className="link-info-container">
        <span className="link-info">{storyByIdData.score} points by </span>
        <a
          target="_blank"
          href={`https://news.ycombinator.com/user?id=${storyByIdData.by}`}
          rel="noreferrer"
          className="link-info"
        >
          {`${storyByIdData.by} `}
        </a>
        |
        <a
          target="_blank"
          href={`https://news.ycombinator.com/item?id=${storyByIdData.id}`}
          rel="noreferrer"
          className="link-info"
        >
          {" "}
          {`${storyByIdData.descendants} comments`}
        </a>
      </div>
    </div>
  );
};
