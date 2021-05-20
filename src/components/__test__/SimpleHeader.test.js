/* eslint-disable no-undef */
import SimpleHeader from '../SimpleHeader';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
//import 'jest-dom/extend-expect';
import renderer from 'react-test-renderer';

describe('<SimpleHeader />', () => {
    it('renders SimpleHeader without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<SimpleHeader />, div);
    });

    it('renders SimpleHeader correctly', () => {
        const header = render(<SimpleHeader />);
        expect(header);
    });

    it('matches SimpleHeader snapshot', () => {
        const tree = renderer.create(<SimpleHeader />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
