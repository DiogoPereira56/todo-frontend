/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import '../__test__/__mocks__/intersectionObserverMock';
import Tasks from '../Tasks';
import ReactDOM from 'react-dom';
import { fireEvent, prettyDOM, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';

const mockGetTasks = () => {
    return [
        { complete: false, description: '', idTask: 300, title: 't', __typename: 'task' },
        { complete: true, description: '', idTask: 301, title: 'j', __typename: 'task' },
    ];
};
/* const id = 3;
const loading = false;
const hasmore = -12; */

describe('<Tasks />', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Tasks></Tasks>, div);
    });

    it('matches Tasks snapshot', () => {
        const tree = renderer.create(<Tasks></Tasks>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders the last Task correctly', () => {
        const mockTasks = mockGetTasks();
        const { debug, getByTestId } = render(<Tasks tasks={mockTasks}></Tasks>);
        //debug();
        expect(getByTestId('lastTask')).toHaveTextContent('j');
    });

    it('clicks the Task correctly changing the layout', () => {
        const mockChangeLayout = jest.fn();
        const mockSetActiveTask = jest.fn();
        const mockTasks = mockGetTasks();
        const { debug, getByTestId } = render(
            <Tasks
                tasks={mockTasks}
                setChangeLayout={mockChangeLayout}
                setActiveTask={mockSetActiveTask}
            ></Tasks>,
        );
        //debug();
        fireEvent.click(getByTestId('lastTask'));
        expect(mockChangeLayout).toHaveBeenCalledTimes(1);
    });

    it('checks if the checkbox is updated correctly', () => {
        const mockUpdateCompletion = jest.fn();
        const mockTasks = mockGetTasks();
        const { debug, getByTestId } = render(
            <Tasks tasks={mockTasks} updateCompletion={mockUpdateCompletion}></Tasks>,
        );
        //debug();
        const checkbox = getByTestId('lastCheckBox');
        //console.log(prettyDOM(checkbox));
        expect(mockUpdateCompletion).toHaveBeenCalledTimes(0);
        fireEvent.click(checkbox);
        expect(mockUpdateCompletion).toHaveBeenCalledTimes(1);
    });
});
