import { render, fireEvent, screen, act, waitFor, cleanup, getByText } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import mockAxios from 'axios';
import LoginPage from '../LoginPage';
import TextField from '@material-ui/core/TextField';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { createMount } from '@material-ui/core/test-utils';
import '../../setupTests';
import { Button } from '@material-ui/core';
import App from '../../App';

let mount;

beforeEach(() => {
    mount = createMount();
});

afterEach(() => {
    cleanup();
    mount.cleanUp();
});

describe('checkComponentExists', () => {

    it('email address input exists', () => {
        const wrapper = mount(<LoginPage setData={() => {}} />);
        const emailTextField = wrapper.find(TextField).at(0);
        expect(emailTextField.props().name).toBe("email");
        expect(emailTextField.props().value).toBe("");
    });

    it('password input exists', () => {
        const wrapper = mount(<LoginPage setData={() => {}} />);
        const emailTextField = wrapper.find(TextField).at(1);
        expect(emailTextField.props().name).toBe("password");
        expect(emailTextField.props().value).toBe("");
    });

    it('login button exists', () => {
        const wrapper = mount(<LoginPage setData={() => {}} />);
        const button = wrapper.find(Button).at(0);
        expect(button.prop('children')).toBe("Sign In");
    });
});

describe('errorMessage', () => {

    it('error messages shown when submit form with empty fields', async () => {
        const { getByTestId } = render(<LoginPage setData={() => {}}/>);
        const submit = getByTestId('submit-login');
        fireEvent.click(submit);

        await screen.findByText('Please enter valid email address');
        await screen.findByText('Please enter your password');
    });

    it('error message shown when submit with invalid email address', async () => {
        const { getByTestId } = render(<LoginPage setData={() => {}}/>);
        const emailInput = getByTestId('email-login');
        const submit = getByTestId('submit-login');
       
        expect(emailInput).toBeEmptyDOMElement();
        fireEvent.change(emailInput, { target: { value: "test@" } });
        fireEvent.click(submit);
        
        expect(emailInput.value).toBe("test@");
        await screen.findByText('Please enter valid email address');
    });

    it('error message shown when password and email do not match', async () => {
        mockAxios.post.mockRejectedValueOnce("email and password doesn't match");

        const { getByTestId } = render(
            <LoginPage setData={() => {}}/>
        );

        const emailInput = getByTestId('email-login');
        const passwordInput = getByTestId('password-login');
        const submit = getByTestId('submit-login');
    
        expect(emailInput).toBeEmptyDOMElement();
        expect(passwordInput).toBeEmptyDOMElement();

        // fill the form
        fireEvent.change(emailInput, { target: { value: 'test@gmail.com' } });
        fireEvent.change(passwordInput, { target: { value: 'wrongPassword' } });

        // submit the form 
        fireEvent.click(submit);

        const body = {
            email: 'test@gmail.com',
            password: 'wrongPassword',
        };
        
        expect(mockAxios.post).toHaveBeenCalledWith('/api/login', body);

        await screen.findByText('Incorrect email or password');
    });
});

describe('checkSuccessfulLogin', () => {
    it('correct request called to login', async () => {
        mockAxios.post.mockResolvedValueOnce({
            data: {
                token: 'test-token'
            }
        });

        const { getByTestId } = render(
            <LoginPage setData={() => {}}/>
        );

        const emailInput = getByTestId('email-login');
        const passwordInput = getByTestId('password-login');
        const submit = getByTestId('submit-login');
    
        expect(emailInput).toBeEmptyDOMElement();
        expect(passwordInput).toBeEmptyDOMElement();

        // fill the form
        fireEvent.change(emailInput, { target: { value: 'test@gmail.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });

        // submit the form 
        fireEvent.click(submit);

        const body = {
            email: 'test@gmail.com',
            password: 'password',
        };
        
        expect(mockAxios.post).toHaveBeenCalledWith('/api/login', body);
    });
});

