import { useMutation } from '@apollo/client';
import { PropTypes } from 'prop-types';
import { LIST_INFO_MUTATION } from '../../graphQL/Mutations';
import { Li, P } from './SideBar.styles';

const ListOfTasks = ({
    lists,
    setActiveList,
    setChangeLayout,
    setRename,
    setShowOptions,
    setShowAllTasks,
    orderByTitle,
    setSearchIsActive,
    order,
}) => {
    const [getListTasks] = useMutation(LIST_INFO_MUTATION);

    function changeActiveList(list) {
        setShowAllTasks(false);
        getListTasks({
            variables: {
                idList: list.idList,
                idClient: list.idClient,
                limit: 11,
                offset: 0,
                orderByTitle: orderByTitle,
                order: order,
            },
        }).then((data) => {
            if (data.data) {
                setActiveList(data.data.getList);
                //console.log(data.data.getList);
            }
        });
    }

    const makeActiveList = (list) => {
        //setActiveList(list);
        changeActiveList(list);
        setChangeLayout(false);
        setRename(false);
        setShowOptions(false);
        setSearchIsActive(false);
    };

    return (
        <div>
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
    setActiveList: PropTypes.func,
    setChangeLayout: PropTypes.func,
    setRename: PropTypes.func,
    setShowOptions: PropTypes.func,
    setShowAllTasks: PropTypes.func,
    orderByTitle: PropTypes.bool,
    setSearchIsActive: PropTypes.func,
    order: PropTypes.string,
};

export default ListOfTasks;
