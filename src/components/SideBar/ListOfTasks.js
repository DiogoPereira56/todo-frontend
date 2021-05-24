import { PropTypes } from 'prop-types';
import { Li, P } from './SideBar.styles';

const ListOfTasks = ({
    lists,
    setChangeLayout,
    setRename,
    setShowOptions,
    setShowAllTasks,
    orderByTitle,
    setSearchIsActive,
    order,
    setCurrentTaskPage,
    loadListInfo,
}) => {
    function changeActiveList(list) {
        loadListInfo({
            variables: {
                idList: list.idList,
                idClient: list.idClient,
                limit: 13,
                offset: 0,
                orderByTitle: orderByTitle,
                order: order,
            },
        });
    }

    const makeActiveList = (list) => {
        changeActiveList(list);
        setShowAllTasks(false);
        setChangeLayout(false);
        setRename(false);
        setShowOptions(false);
        setSearchIsActive(false);
        setCurrentTaskPage(1);
    };

    return (
        <div data-testid="lists">
            {lists.map((list) => (
                <Li key={list.idList} onClick={() => makeActiveList(list)}>
                    <P>{list.listName}</P>
                </Li>
            ))}
        </div>
    );
};

ListOfTasks.propTypes = {
    lists: PropTypes.array.isRequired,
    setChangeLayout: PropTypes.func,
    setRename: PropTypes.func,
    setShowOptions: PropTypes.func,
    setShowAllTasks: PropTypes.func,
    orderByTitle: PropTypes.bool,
    setSearchIsActive: PropTypes.func,
    order: PropTypes.string,
    setCurrentTaskPage: PropTypes.func,
    loadListInfo: PropTypes.func,
};

export default ListOfTasks;
