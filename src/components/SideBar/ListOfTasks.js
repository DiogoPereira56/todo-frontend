import { PropTypes } from 'prop-types'
import { Li, P } from './SideBar.styles'

const ListOfTasks = ( {lists, setActiveList} ) => {

  return (
    <div>
      { lists.map(list => (
        <Li key={list.idList} onClick={() => setActiveList(list.listName)}>
            <P>{ list.listName }</P>
        </Li>
      ))}
    </div>
  );
}
 
ListOfTasks.propTypes = {
  lists: PropTypes.array.isRequired,
  setActiveList: PropTypes.func
};

export default ListOfTasks;