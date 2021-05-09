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
        const { queryByTestId } = render(<Sidebar />);
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
        expect(mockAxios.post).toHaveBeenCalledWith('/api/plans', { name: 'test' }, {
            headers: {
                "Authorization": `Bearer token`
            }
        });

        await mockAxios.post.resolves;

        // expect the get axios call
        expect(mockAxios.get).toHaveBeenCalledWith('/api/plans', {
            headers: {
                "Authorization": `Bearer token`
            }
        });

        await mockAxios.get.resolves;

        await screen.findByText('test');
    })

    it('see all events after clicking a plan', async () => {

        mockAxios.post.mockResolvedValueOnce({});
        mockAxios.get
            .mockResolvedValueOnce({
                data: [
                    {
                        "name": "test",
                        "_id": "6096600f8d8f534f9c618be2"
                    }
                ]
            })
            .mockResolvedValueOnce({
                data: {
                    "name": "test",
                    "_id": "6096600f8d8f534f9c618be2",
                    "events": [
                        {
                            "name": "event",
                            "_id": "60971a378d8f534f9c618bec",
                            "startTime": "2021-05-08T23:09:38.711Z",
                            "endTime": "2021-05-08T23:09:38.711Z",
                            "address": "SDSU, Campanile Drive, San Diego, CA, USA",
                            "description": "",
                            "lat": "32.7759894",
                            "lng": "-117.0712533"
                        }
                    ],
                    "createdAt": "2021-05-08T09:55:27.084Z",
                    "updatedAt": "2021-05-08T23:09:43.866Z",
                    "__v": 0
                }
            });

        const { getByTestId } = render(
            <AppContextProvider >
                <Sidebar />
            </AppContextProvider>
        );

        expect(screen.queryByText('event')).toBeNull();

        // add one plan
        const addPlan = await screen.findByText('Create');
        fireEvent.click(addPlan);
        const addPlanInput = getByTestId('add-plan-input');
        fireEvent.change(addPlanInput, { target: { value: 'test' } });
        // mock an enter key down
        fireEvent.keyDown(addPlanInput, { key: 'Enter', code: 'Enter' });

        await mockAxios.post.resolves;
        await mockAxios.get.resolves;

        const planButton = await screen.findByText('test');
        fireEvent.click(planButton);

        await screen.findByText('event');
    })
});