import '../../setupTests';

import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import mockAxios from 'axios';
import { createMount } from '@material-ui/core/test-utils';
import Sidebar from '../Sidebar';
import { AppContextProvider } from '../../AppContextProvider';

let mount;
jest.mock('../../hooks/useToken', () => ({
    __esModule: true,
    default: () => ({
        setToken: jest.fn(), 
        deleteToken: jest.fn(), 
        token: 'token'
    })
}));

beforeEach(() => {
    mount = createMount();   
});

afterEach(() => {
    cleanup();
    mount.cleanUp();
});

afterAll(() => {
    jest.unmock('../../hooks/useToken');
});

describe('checkComponentExists', () => {

    it('My plans title exists', async () => {
        render(<Sidebar />);
        await screen.findByText('My plans');
    });

    it('plus button exists', () => {
        const { queryByTestId  } = render(<Sidebar />);
        expect(queryByTestId('plus-button')).toBeTruthy();
    });

});

describe('addPlans', () => {

    it('add plan textfield appears', async () => {
        render(<Sidebar />);
        const addPlan = await screen.findByText('Create');
        expect(screen.queryByPlaceholderText('Type plan name here...')).not.toBeInTheDocument();
        
        fireEvent.click(addPlan);

        expect(screen.getByPlaceholderText('Type plan name here...')).toBeInTheDocument();
    })

    it('the user can add plan', async () => {

        mockAxios.post.mockResolvedValueOnce({});
        mockAxios.get.mockResolvedValueOnce({
            data: [
                {
                    "name": "test",
                    "_id": "6096600f8d8f534f9c618be2"
                }
            ]
        });

        const { getByTestId } = render(
            <AppContextProvider >
                <Sidebar />
            </AppContextProvider>
        );
        const addPlan = await screen.findByText('Create');
        
        fireEvent.click(addPlan);

        const addPlanInput = getByTestId('add-plan-input');
        fireEvent.change(addPlanInput, { target: { value: 'test' } });

        // mock a enter key down
        fireEvent.keyDown(addPlanInput, { key: 'Enter', code: 'Enter' });
        
        // expect the post axios call
        expect(mockAxios.post).toHaveBeenCalledWith('/api/plans', { name: 'test' }, { headers: {
            "Authorization": `Bearer token`
        }});

        await mockAxios.post.resolves;

        // expect the get axios call
        expect(mockAxios.get).toHaveBeenCalledWith('/api/plans', { headers: {
            "Authorization": `Bearer token`
        }});

        await mockAxios.get.resolves;

        await screen.findByText('test');
    })
});