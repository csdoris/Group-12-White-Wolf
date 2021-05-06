import renderer from 'react-test-renderer';
import Copyright from '../Copyright';

it('snapshot with no content matches', () => {
    const tree = renderer.create(<Copyright />).toJSON();
    expect(tree).toMatchSnapshot();
});