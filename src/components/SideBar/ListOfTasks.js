import { PropTypes } from 'prop-types'
import { Li, P } from './SideBar.styles'

const ListOfTasks = ( {lists} ) => {

  return (
    <div>
      { lists.map(list => (
        <Li key={list.idList} >
            <P>{ list.listName }</P>
        </Li>
      ))}
    </div>
  );
}
 
ListOfTasks.propTypes = {
  lists: PropTypes.array.isRequired,
};

export default ListOfTasks;