import { HNStoryPage } from "./HNStory";

interface Props {
  topStoriesIds: number[];
  currentPage: number;
}

export const HNStoriesDisplay = (props: Props) => {
  const { topStoriesIds, currentPage } = props;
  return (
    <div>
      <ol>
        {topStoriesIds.map((storyId) => (
          <li key={storyId}>
            <HNStoryPage key={storyId} currentPage={currentPage} id={storyId} />
          </li>
        ))}
      </ol>
    </div>
  );
};
