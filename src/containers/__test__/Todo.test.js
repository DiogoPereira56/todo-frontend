/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import Todo from '../Todo';
import { GET_CLIENT, CLIENT_TOTAL_LISTS, GET_LIST_TASKS } from '../../graphQL/Queries';
import ReactDOM from 'react-dom';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import { MockedProvider } from '@apollo/client/testing';

const mockGetClientData = () => {
    return [
        {
            request: {
                query: GET_CLIENT,
                variables: {
                    limit: 10,
                    offset: 0,
                },
            },
            result: {
                data: {
                    getClientInformation: {
                        idClient: 3,
                        name: 'Diogo Pereira',
                        __typename: 'Client',
                        list: [
                            { idList: 1, listName: 'lista', idClient: 3, __typename: 'ListOfTasks' },
                            { idList: 2, listName: 'compras', idClient: 3, __typename: 'ListOfTasks' },
                        ],
                    },
                },
            },
        },
        {
            request: {
                query: CLIENT_TOTAL_LISTS,
            },
            result: {
                data: { getTotalLists: 2 },
            },
        },
        {
            request: {
                query: GET_LIST_TASKS,
                variables: {
                    idList: 2,
                    idClient: 3,
                    limit: 2,
                    offset: 0,
                    orderByTitle: false,
                    order: 'ASC',
                },
            },
            result: {
                data: {
                    listQuery: {
                        idList: 2,
                        idClient: 3,
                        listName: 'compras',
                        __typename: 'ListOfTasks',
                        taskss: {
                            tasks: [
                                {
                                    idTask: 4,
                                    title: 'pao',
                                    complete: true,
                                    description: 'falta',
                                    __typename: 'task',
                                },
                                {
                                    idTask: 20,
                                    title: 'arroz',
                                    complete: true,
                                    description: '',
                                    __typename: 'task',
                                },
                            ],
                            hasMore: 33,
                            __typename: 'TasksResolveField',
                        },
                    },
                },
            },
        },
    ];
};

describe('<Todo />', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <MockedProvider>
                <Todo></Todo>
            </MockedProvider>,
            div,
        );
    });

    it('matches Todo loading snapshot', () => {
        const tree = renderer
            .create(
                <MockedProvider>
                    <Todo></Todo>
                </MockedProvider>,
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('matches Todo success snapshot', async () => {
        const mockedClientData = mockGetClientData();
        const tree = renderer
            .create(
                <MockedProvider mocks={mockedClientData} addTypename={false}>
                    <Todo></Todo>
                </MockedProvider>,
            )
            .toJSON();
        await new Promise((resolve) => setTimeout(resolve, 0));
        expect(tree).toMatchSnapshot();
    });

    it('renders todo correctly', async () => {
        const mockedClientData = mockGetClientData();
        const { getByTestId } = render(
            <MockedProvider mocks={mockedClientData}>
                <Todo></Todo>
            </MockedProvider>,
        );
        await new Promise((resolve) => setTimeout(resolve, 0));
        screen.debug();

        /* const wrapper = await waitFor(() => getByTestId('wrapper'));
        console.log(prettyDOM(wrapper)); */

        //expect(1).toEqual(2);
    });
});
