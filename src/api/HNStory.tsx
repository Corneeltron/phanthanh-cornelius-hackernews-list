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

export const useFetch = () => {
    const [story, setStories] = useState<HNStory[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(false); // how to type this error?

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
            const promises = data
              .slice(0, 100)
              .map((id) =>
                fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
                  response => response.json()
                )
              );
            const result: HNStory[] = await Promise.all(promises);
            setStories(result);
            setLoading(false);
          } catch (err) {
            setError(err);
          }
        }
        console.log('stories', story)
        getTopStories();
      }, [story]);

      return { loading, error, story }
}
