import renderer from 'react-test-renderer';
import { PageLink } from '../components/PageLink'

test('renders PageLink', () => {
  const pageLinkTree = renderer
  .create(<PageLink />)
  .toJSON();
  expect(pageLinkTree).toMatchSnapshot();
})