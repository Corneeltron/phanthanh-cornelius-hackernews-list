import React from "react";

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

export const StoriesFeed = () => {
    const [story, setStories] = React.useState<HNStory[]>([]);

    React.useEffect(() => {
        async function getTopStories() {
          const url = "https://hacker-news.firebaseio.com/v0/topstories.json";
          try {
            const res = await fetch(url);
            if (res.ok === false) {
              throw new Error("Response Error:" + res.text);
            }
            const data: number[] = await res.json();
            const promises = data
              .slice(0, 10)
              .map((id) =>
                fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
                  response => response.json()
                )
              );
            const result: HNStory[] = await Promise.all(promises);
            setStories(result);
          } catch (err) {
            console.error(err);
          }
        }
        console.log('stories', story)
        getTopStories();
      }, [story]);

      return story
}
