/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import Pagination from '../Pagination';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';

const listsPerPage = 2;
const totalLists = 6;
const setCurrentPage = () => {};

describe('<Pagination />', () => {
    it('renders Pagination without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Pagination></Pagination>, div);
    });

    it('renders Pagination correctly', () => {
        const { getByTestId } = render(
            <Pagination
                listsPerPage={listsPerPage}
                totalLists={totalLists}
                setCurrentPage={setCurrentPage}
            ></Pagination>,
        );
        expect(getByTestId('page')).toHaveTextContent('123');
    });

    it('matches Pagination snapshot', () => {
        const tree = renderer.create(<Pagination></Pagination>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
