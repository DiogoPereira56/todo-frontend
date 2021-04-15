import { PropTypes } from 'prop-types'
import { useEffect } from 'react';
import { Li, P } from './SideBar.styles'

const ListOfTasks = ( {lists, setActiveList, setChangeLayout, setRename, setShowOptions }) => {

  const makeActiveList = (list) => {
    setActiveList(list);
    setChangeLayout(false);
    setRename(false);
    setShowOptions(false);
  }

  return (
    <div>
      { lists.map(list => (
        <Li key={list.idList} onClick={() => makeActiveList(list)}>
            <P>{ list.listName }</P>
        </Li>
      ))}
    </div>
  );
}
 
ListOfTasks.propTypes = {
  lists: PropTypes.array.isRequired,
  setActiveList: PropTypes.func,
  setChangeLayout: PropTypes.func,
  setRename: PropTypes.func,
  setShowOptions: PropTypes.func
};

export default ListOfTasks;