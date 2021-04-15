import { PropTypes } from 'prop-types'
import { PaginationWrapper, Paginnation } from './SideBar.styles'

const Pagination = ({ listsPerPage, totalLists, setCurrentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalLists / listsPerPage); i++){
        pageNumbers.push(i);
    }

    return (
        <nav>
            <PaginationWrapper>
                {pageNumbers.map(number => (
                    <Paginnation key={number} onClick={() => setCurrentPage(number)} >
                        {number}
                    </Paginnation>
                ))}
            </PaginationWrapper>
        </nav>
    )

}

Pagination.propTypes = {
    listsPerPage: PropTypes.number,
    totalLists: PropTypes.number,
    setCurrentPage: PropTypes.func
  };

export default Pagination;