import renderer from 'react-test-renderer';
import { HNStoriesDisplay } from '../components/HNStoriesDisplay'

test('renders HNStoriesDisplay', () => {
  const mockIdArray = [ 34524749, 34521149, 34524006, 34523745, 34522311, 34524150 ];
  const mockCurrentPage = 2;
  const HNStoriesDisplayTree = renderer
  .create(<HNStoriesDisplay topStoriesIds={mockIdArray} currentPage={mockCurrentPage} />)
  .toJSON();
  expect(HNStoriesDisplayTree).toMatchSnapshot();
})