import { HNStoryPage } from './HNStory';

interface Props {
  topStoriesIds: number[];
  currentPage: number;
}

export const HNStoriesDisplay = (props: Props) => {
  const { topStoriesIds, currentPage } = props;
  return (
    <ol>
      {topStoriesIds.map((storyId, idx = 1) => (
        <li key={idx + 1}>
          <HNStoryPage key={storyId} currentPage={currentPage} id={storyId} />
        </li>
      ))}
    </ol>
  );
};
