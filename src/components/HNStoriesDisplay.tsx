import "./HNStoriesDisplay.css";
import { HNStory } from "../api/HNStory";

interface Props {
  stories: HNStory[];
}

export const HNStoriesDisplay = (props: Props ) => {
  
  const { stories } = props;

  if (stories.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ul>
        {stories.map((post) => (
          <li key={post.id}>
            <a href={post.url}>{post.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};
