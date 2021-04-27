import { useMutation } from '@apollo/client';
import { PropTypes } from 'prop-types';
import { UPDATE_TASK_COMPLETION_MUTATION } from '../../graphQL/Mutations';
import { Task, CheckBox } from './CenterColumn.styles';

const Tasks = ({ list, setChangeLayout, changeLayout, setActiveTask, loggedIdClient }) => {
    const [updateCompletion] = useMutation(UPDATE_TASK_COMPLETION_MUTATION);

    const show = (task) => {
        setActiveTask(task);
        setChangeLayout(!changeLayout);
    };

    const handleCompletedTask = (task) => {
        const values = { idTask: task.idTask, complete: !task.complete, idClient: loggedIdClient };
        updateCompletion({ variables: values });
    };

    if (list) {
        return (
            <div>
                {list.map((task) => (
                    <Task key={task.idTask} onClick={() => show(task)}>
                        <CheckBox
                            type="checkbox"
                            defaultChecked={task.complete}
                            onClick={() => handleCompletedTask(task)}
                        />
                        {task.title}
                    </Task>
                ))}
            </div>
        );
    }

    return <div>error</div>;
};

Tasks.propTypes = {
    list: PropTypes.array,
    setChangeLayout: PropTypes.func,
    changeLayout: PropTypes.bool,
    setActiveTask: PropTypes.func,
    loggedIdClient: PropTypes.number,
};

export default Tasks;
