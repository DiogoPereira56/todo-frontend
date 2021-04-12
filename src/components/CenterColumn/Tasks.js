import { PropTypes } from 'prop-types'
import { useEffect } from 'react';
import { Task, CheckBox } from './CenterColumn.styles'

const Tasks = ( { list, setChangeLayout, setActiveTask } ) => {

  const show = (task) => {
    setActiveTask(task)
    setChangeLayout(true)
  }

  if(list){
    return (
        <div>
        { list.tasks.map(task => (
            <Task key={task.idTask} onClick={() => show(task)} >
                <CheckBox type="checkbox"/>{ task.title }
            </Task>
        ))}
        </div>
    );
    }

  return <div>error</div>
}
 
Tasks.propTypes = {
    list: PropTypes.object,
    setChangeLayout: PropTypes.func,
    setActiveTask: PropTypes.func
};

export default Tasks;