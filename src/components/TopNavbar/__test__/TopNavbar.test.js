/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import TopNavbar from '../TopNavbar';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

//afterEach(cleanup); //done automatically after version 9.0.0

/* let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
}); */

describe('<TopNavbar />', () => {
    it('renders TopNavbar without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<TopNavbar></TopNavbar>, div);
    });

    it('renders TopNavbar correctly', () => {
        const { getByText } = render(<TopNavbar name="Diogo"></TopNavbar>);
        expect(getByText('Diogo'));
    });

    it('matches topnavbar snapshot', () => {
        const tree = renderer.create(<TopNavbar name="Diogo"></TopNavbar>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('changes the input values correctly', () => {
        const { debug, getByPlaceholderText } = render(<TopNavbar name="Diogo"></TopNavbar>);
        let searchInput = getByPlaceholderText('search');
        fireEvent.change(searchInput, { target: { value: 'task' } });
        searchInput = getByPlaceholderText('search');
        //console.log(searchInput);
        expect(searchInput).toHaveValue('task');
    });

    /* it('submits the form correctly', async () => {
        const handleSubmit = jest.fn();
        const { debug, getByPlaceholderText, getByTestId } = render(
            <TopNavbar name="Diogo" onSubmit={handleSubmit}></TopNavbar>,
        );
        debug();
        const searchInput = getByPlaceholderText('search');
        fireEvent.change(searchInput, { target: { value: 'task' } });
        const searchForm = getByTestId('submit');
        //fireEvent.keyDown(searchInput, { key: 'Enter', keyCode: 13 });
        //console.log(searchForm);
        fireEvent.input(searchForm);
        expect(handleSubmit).toHaveBeenCalled();
    }); */

    /* it('changes the input values correctly', () => {
        act(() => {
            render(<TopNavbar name="Diogo"></TopNavbar>, container);
        });
        //console.log(container.querySelector("[data-testid='search']"));
        let searchInput = container.querySelector("[data-testid='search']");
        fireEvent.change(searchInput, { target: { value: 'task' } });
        searchInput = container.querySelector("[data-testid='search']");
        expect(searchInput).toHaveValue('task');
    }); */

    /* it('submits the form correctly', () => {
        //jest.spyOn();
        const wrapper = shallow(
            <TopNavbar name="Diogo" handleSearchedTasks={handleSearchedTasks}></TopNavbar>,
        );
        let searchFormik = wrapper.find('Formik').first();
        console.log(searchFormik.debug());
        const teste = wrapper.find('Formik').simulate('submit', { preventDefault: () => {} });
        expect(teste).toHaveBeenCalled();
    }); */
});
