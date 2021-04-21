import { useMutation } from '@apollo/client';
import { PropTypes } from 'prop-types'
import { UPDATE_TASK_COMPLETION_MUTATION } from '../../graphQL/Mutations';
import { Task, CheckBox } from './CenterColumn.styles'

const Tasks = ( { list, setChangeLayout, setActiveTask } ) => {

  const [updateCompletion] = useMutation(UPDATE_TASK_COMPLETION_MUTATION);

  const show = (task) => {
    setActiveTask(task)
    setChangeLayout(true)
  }

  const handleCompletedTask = (task) => {
    const values = {idTask: task.idTask, complete: !task.complete, idClient: list.idClient};
    updateCompletion({variables: values});
  }

  if(list){
    return (
        <div>
        { list.taskss.map(task => (
            <Task key={task.idTask} onClick={() => show(task)}>
                <CheckBox type="checkbox" defaultChecked={task.complete}  onClick={() => handleCompletedTask(task)}/>{ task.title }
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