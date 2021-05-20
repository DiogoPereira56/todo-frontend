import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
import { PaginationWrapper, PaginnationNumber } from './SideBar/SideBar.styles';

const Pagination = ({ listsPerPage, totalLists, setCurrentPage }) => {
    const [pageNumbers, setPageNumbers] = useState([1]);
    const temp = [];

    useEffect(() => {
        for (let i = 1; i <= Math.ceil(totalLists / listsPerPage); i++) {
            temp.push(i);
            setPageNumbers(temp);
        }
    }, [totalLists]);

    return (
        <nav>
            <PaginationWrapper data-testid="page">
                {pageNumbers.map((number) => (
                    <PaginnationNumber key={number} onClick={() => setCurrentPage(number)}>
                        {number}
                    </PaginnationNumber>
                ))}
            </PaginationWrapper>
        </nav>
    );
};

Pagination.propTypes = {
    listsPerPage: PropTypes.number,
    totalLists: PropTypes.number,
    setCurrentPage: PropTypes.func,
};

export default Pagination;
