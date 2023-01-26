import renderer from 'react-test-renderer';
import { Pagination } from '../components/Pagination'

test('renders Pagination', () => {
  const paginationTree = renderer
  .create(<Pagination />)
  .toJSON();
  expect(paginationTree).toMatchSnapshot();
})