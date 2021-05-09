import { render, fireEvent, screen, act, waitFor, cleanup, getByText } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
// import mockAxios from 'jest-mock-axios';
import mockAxios from 'axios';
import TextField from '@material-ui/core/TextField';
import { createMount } from '@material-ui/core/test-utils';
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { Button } from '@material-ui/core';
import SignupPage from '../SignupPage';
import App from '../../App';
import '../../setupTests';

let mount;

beforeEach(() => {
    mount = createMount();
});

afterEach(() => {
    cleanup();
    mount.cleanUp();
});

describe('checkComponentExists', () => {

    it('check there are four inputs field', () => {
        const wrapper = mount(<SignupPage />);
        expect(wrapper.find(TextField).length).toBe(4);
    });

    it('name textfield exists', () => {
        const wrapper = mount(<SignupPage />);
        const emailTextField = wrapper.find(TextField).at(0);
        expect(emailTextField.props().name).toBe("name");
        expect(emailTextField.props().value).toBe("");
    });

    it('email address textfield exists', () => {
        const wrapper = mount(<SignupPage />);
        const emailTextField = wrapper.find(TextField).at(1);
        expect(emailTextField.props().name).toBe("email");
        expect(emailTextField.props().value).toBe("");
    });

    it('password textfield exists', () => {
        const wrapper = mount(<SignupPage />);
        const emailTextField = wrapper.find(TextField).at(2);
        expect(emailTextField.props().name).toBe("password");
        expect(emailTextField.props().value).toBe("");
    });

    it('confirm password textfield exists', () => {
        const wrapper = mount(<SignupPage />);
        const emailTextField = wrapper.find(TextField).at(3);
        expect(emailTextField.props().name).toBe("password-confirm");
        expect(emailTextField.props().value).toBe("");
    });

    it('signup button exists', () => {
        const wrapper = mount(<SignupPage />);
        const button = wrapper.find(Button).at(0);
        expect(button.prop('children')).toBe("Sign Up"); 
    });
});

describe('checkSignup', () => {
    it('error messages shown when submit form with empty fields', async () => {
        const { getByTestId } = render(<SignupPage />);
        const submit = getByTestId('submit');
        fireEvent.click(submit);

        await screen.findByText('Please enter your name');
        await screen.findByText('Please enter valid email address');
        await screen.findByText('Please enter your password');
    });

    it('error message shown when submit with invalid email address', async () => {
        const { getByTestId } = render(<SignupPage />);
        const emailInput = getByTestId('email-input');
        const submit = getByTestId('submit');
       
        expect(emailInput).toBeEmptyDOMElement();
        fireEvent.change(emailInput, { target: { value: "test@" } });
        fireEvent.click(submit);
        
        expect(emailInput.value).toBe("test@");
        await screen.findByText('Please enter valid email address');
    });

    it('error message shown when passwords do not match', async () => {
        const { getByTestId } = render(<SignupPage />);
        const passwordInput = getByTestId('password-input');
        const confirmPasswordInput = getByTestId('confirm-password-input');
        const submit = getByTestId('submit');
       
        expect(passwordInput).toBeEmptyDOMElement();
        expect(confirmPasswordInput).toBeEmptyDOMElement();

        fireEvent.change(passwordInput, { target: { value: "password" } });
        fireEvent.change(confirmPasswordInput, { target: { value: "wrongPassword" } });

        fireEvent.click(submit);
        
        expect(passwordInput.value).toBe("password");
        expect(confirmPasswordInput.value).toBe("wrongPassword");
        await screen.findByText('Password doesn\'t match');
    });
});

describe('checkRouting', () => {
    it('route to signin page after a successful signup', async () => {
        mockAxios.post.mockResolvedValueOnce({data: 'success'});

        const history = createMemoryHistory();
        history.push('/signup');
        const { getByTestId } = render(
            <Router history={history}>
                <App />
            </Router>
        );

        expect(screen.queryByText('Sign In')).toBeNull();

        const nameInput = getByTestId('name-input');
        const emailInput = getByTestId('email-input');
        const passwordInput = getByTestId('password-input');
        const confirmPasswordInput = getByTestId('confirm-password-input');
        const submit = getByTestId('submit');
    
        expect(nameInput).toBeEmptyDOMElement();
        expect(emailInput).toBeEmptyDOMElement();
        expect(passwordInput).toBeEmptyDOMElement();
        expect(confirmPasswordInput).toBeEmptyDOMElement();

        // fill the form
        fireEvent.change(nameInput, { target: { value: 'user' } });
        fireEvent.change(emailInput, { target: { value: 'test@gmail.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'password' } });

        // submit the form 
        fireEvent.click(submit);

        const body = {
            name: 'user',
            email: 'test@gmail.com',
            password: 'password',
        };
        
        expect(mockAxios.post).toHaveBeenCalledWith('/api/signup', body);

        // check /login page is displayed 
        await screen.findByText('Sign In');
    });
});




