import { useState, useEffect } from "react";

export interface HNStory {
  by: string;
  descendants: number;
  id: number;
  kid: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
}

export const useFetch = (pageNumber: number, pageSize: number) => {
  // const [storyLength, setStoriesLength] = useState<number[]>([]);
  const [story, setStories] = useState<HNStory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(false); // how to type this error?

  // const pageIdPosts = (
  //   data: number[],
  //   pageNumber: number,
  //   pageSize: number
  // ) => {
  //   const startIndex = (pageNumber - 1) * pageSize;
  //   return data.slice(startIndex, startIndex + pageSize);
  // };

  useEffect(() => {
    async function getTopStories() {
      const url = "https://hacker-news.firebaseio.com/v0/topstories.json";
      try {
        await setLoading(true);
        await setError(false);
        const res = await fetch(url);
        if (res.ok === false) {
          setError("Response Error:" + res.text);
        }
        const data: number[] = await res.json();
        const promises = data.map((id) =>
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
          (response) => response.json()
          )
          );
          console.log('page#size', pageNumber, pageSize)
          console.log('promises', promises)
        const result: HNStory[] = await Promise.all(promises);
        const filteredResult = result.filter((obj) =>
        obj.hasOwnProperty("url")
        );
        console.log('filteredresult', filteredResult)
        setStories(filteredResult);
        console.log('story', story)
        setLoading(false);
      } catch (err) {
        setError(err);
      }
    }
    getTopStories();
  }, [pageNumber]); // eslint-disable-line

  return { loading, error, story };
};
