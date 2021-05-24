/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { NEW_TASK_MUTATION } from '../../../graphQL/Mutations';
import '../__test__/__mocks__/intersectionObserverMock';
import CenterColumn from '../CenterColumn';
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

const mockGetListData = () => {
    return {
        listQuery: {
            idList: 2,
            idClient: 3,
            listName: 'compras',
            taskss: {
                tasks: [
                    {
                        idTask: 4,
                        title: 'pao',
                        complete: true,
                        description: 'falta',
                    },
                    {
                        idTask: 20,
                        title: 'arroz',
                        complete: true,
                        description: '',
                    },
                ],
                hasMore: -12,
            },
        },
    };
};

const mocks = [
    {
        request: {
            query: NEW_TASK_MUTATION,
            variables: { title: 'k', idList: 2, idClient: 3 },
        },
        result: {
            data: {
                addTask: { idTask: 308, idList: 2, title: 'k', complete: false, description: '' },
            },
        },
    },
];

describe('<CenterColumn />', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <MockedProvider>
                <CenterColumn></CenterColumn>
            </MockedProvider>,
            div,
        );
    });

    it('renders CenterColumn and its components correctly', async () => {
        const mockedClientData = mockGetClientData();
        const mockedListData = mockGetListData();
        const mockLoadListInfo = jest.fn();
        const wrapper = render(
            <MockedProvider mocks={[]} addTypename={false}>
                <CenterColumn
                    dataClient={mockedClientData}
                    listInfo={mockedListData}
                    loadListInfo={mockLoadListInfo}
                ></CenterColumn>
            </MockedProvider>,
        );
        await new Promise((resolve) => setTimeout(resolve, 0));
        //screen.debug(); data-testid="lastTask"
    });

    it('adds a new task correctly', async () => {
        const mockedClientData = mockGetClientData();
        const mockedListData = mockGetListData();
        const mockLoadListInfo = jest.fn();
        const mockMutation = mocks;
        const { getByPlaceholderText, getByTestId } = render(
            <MockedProvider mocks={mockMutation} addTypename={false}>
                <CenterColumn
                    dataClient={mockedClientData}
                    listInfo={mockedListData}
                    loadListInfo={mockLoadListInfo}
                ></CenterColumn>
            </MockedProvider>,
        );
        //screen.debug();
        let newTaskInput = getByPlaceholderText('Add a Task');
        //console.log(prettyDOM(newTaskInput));
        fireEvent.change(newTaskInput, { target: { value: 'k' } });
        //console.log(prettyDOM(newTaskInput));

        const addButton = getByTestId('addButton');
        fireEvent.click(addButton);
        //expect(addButton).toHaveBeenCalled();
        //console.log(prettyDOM(newTaskInput));
        /* const loading = getByTestId('NTLoading');
        console.log(prettyDOM(loading)); */

        const loading = await waitFor(() => getByTestId('NTLoading'));
        expect(loading).toHaveTextContent('Loading...');
        expect(newTaskInput).toHaveTextContent('');

        /* const allTasks = getByTestId('allTasks');
        console.log(prettyDOM(allTasks)); */
        //expect(mockMutation).toHaveBeenCalled(1);
        //expect(lastTask).toHaveTextContent('k');
    });
});
