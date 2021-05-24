/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { NEW_LIST_MUTATION } from '../../../graphQL/Mutations';
import SideBar from '../SideBar';
import ReactDOM from 'react-dom';
import { fireEvent, prettyDOM, render, screen, waitFor, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import { MockedProvider } from '@apollo/client/testing';

const mockGetClientData = () => {
    return {
        idClient: 3,
        list: [
            { idList: 1, listName: 'lista', idClient: 3 },
            { idList: 2, listName: 'compras', idClient: 3 },
        ],
    };
};

const mocks = [
    {
        request: {
            query: NEW_LIST_MUTATION,
            variables: { listName: 'newList' },
        },
        result: {
            data: {
                addList: { idList: 331, idClient: 3, listName: 'newList' },
            },
        },
    },
];

describe('<SideBar />', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <MockedProvider>
                <SideBar></SideBar>
            </MockedProvider>,
            div,
        );
    });

    it('matches SideBar snapshot', () => {
        const mockedClientData = mockGetClientData();
        const tree = renderer
            .create(
                <MockedProvider>
                    <SideBar dataClient={mockedClientData}></SideBar>
                </MockedProvider>,
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders SideBar and its components correctly', async () => {
        const mockedClientData = mockGetClientData();
        const { getByTestId } = render(
            <MockedProvider mocks={[]} addTypename={false}>
                <SideBar dataClient={mockedClientData}></SideBar>
            </MockedProvider>,
        );
        //screen.debug();
        expect(getByTestId('lists')).toHaveTextContent('lista');
    });

    it('adds a new list correctly', async () => {
        const mockedClientData = mockGetClientData();
        const mockMutation = mocks;
        const { getByTestId } = render(
            <MockedProvider mocks={mockMutation} addTypename={false}>
                <SideBar dataClient={mockedClientData}></SideBar>
            </MockedProvider>,
        );
        let newListInput = getByTestId('NLInput');

        fireEvent.change(newListInput, { target: { value: 'newList' } });
        fireEvent.submit(newListInput);

        const loading = await waitFor(() => getByTestId('NLloading'));
        expect(loading).toHaveTextContent('Loading...');
    });
});
