/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import ListOfTasks from '../ListOfTasks';
import ReactDOM from 'react-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';

const mockGetLists = () => {
    return [
        { idClient: 3, idList: 1, listName: 'lista', __typename: 'ListOfTasks' },
        { idClient: 3, idList: 2, listName: 'compras', __typename: 'ListOfTasks' },
    ];
};

describe('<ListOfTasks />', () => {
    it('renders without crashing', () => {
        const mockLists = mockGetLists();
        const div = document.createElement('div');
        ReactDOM.render(<ListOfTasks lists={mockLists}></ListOfTasks>, div);
    });

    it('matches ListOfTasks snapshot', () => {
        const mockLists = mockGetLists();
        const tree = renderer.create(<ListOfTasks lists={mockLists}></ListOfTasks>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
