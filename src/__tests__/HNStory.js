import renderer from 'react-test-renderer';
import { HNStoryPage } from '../components/HNStory'

test('renders HNStory', () => {
  const HNStoryPageTree = renderer
  .create(<HNStoryPage />)
  .toJSON();
  expect(HNStoryPageTree).toMatchSnapshot();
})