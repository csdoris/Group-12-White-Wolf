import renderer from 'react-test-renderer';
import GoogleLoginButton from '../GoogleLoginButton';

it('snapshot with no content matches', () => {
    const tree = renderer.create(<GoogleLoginButton />).toJSON();
    expect(tree).toMatchSnapshot();
});