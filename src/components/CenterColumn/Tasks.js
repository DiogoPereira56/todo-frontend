/* eslint-disable no-unused-vars */
import { useRef, useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { PropTypes } from 'prop-types';
import { UPDATE_TASK_COMPLETION_MUTATION } from '../../graphQL/Mutations';
import { Task, CheckBox, Content } from './CenterColumn.styles';

const Tasks = ({
    tasks,
    setTasks,
    setChangeLayout,
    changeLayout,
    setActiveTask,
    loggedIdClient,
    setPage,
}) => {
    const [updateCompletion] = useMutation(UPDATE_TASK_COMPLETION_MUTATION);

    const show = (task) => {
        setActiveTask(task);
        setChangeLayout(!changeLayout);
    };

    const newTasks = [
        {
            idTask: 200,
            title: 'nova task',
            complete: false,
            description: 'falta',
            __typename: 'task',
        },
        {
            idTask: 201,
            title: 'nova nova task',
            complete: false,
            description: 'falta2',
            __typename: 'task',
        },
    ];

    const handleCompletedTask = (task) => {
        const values = { idTask: task.idTask, complete: !task.complete, idClient: loggedIdClient };
        updateCompletion({ variables: values });
    };

    /* let lastKnownScrollPosition = 0;
    //let ticking = false;
    let limit = 300;
    function getMoreTasks(scrollPos) {
        if (scrollPos > limit) {
            limit += 3000;
            setTasks((prevTasks) => {
                return [...prevTasks, ...newTasks];
            });
            console.log('Ask for more tasks: ' + limit);
        }
        return;
    }

    document.addEventListener('scroll', function () {
        setTimeout(() => {
            lastKnownScrollPosition = window.scrollY;

            window.requestAnimationFrame(function () {
                getMoreTasks(lastKnownScrollPosition);
            });
        }, 1000);
    }); */

    const observer = useRef();
    const lastTaskRef = useCallback((node) => {
        setTimeout(() => {
            //if (loading) return
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting /* && hasMore */) {
                    //console.log('visible');
                    setPage((prevPage) => {
                        return prevPage + 1;
                    });
                    /* setTasks((prevTasks) => {
                    return [...prevTasks, ...newTasks];
                }); */
                }
            });
            if (node) observer.current.observe(node);
            //console.log(node);
        }, 2500);
    });

    if (tasks) {
        return (
            <div>
                <Content>
                    {tasks.map((task, index) => {
                        if (tasks.length == index + 1) {
                            return (
                                <Task ref={lastTaskRef} key={task.idTask} onClick={() => show(task)}>
                                    <CheckBox
                                        type="checkbox"
                                        defaultChecked={task.complete}
                                        onClick={() => handleCompletedTask(task)}
                                    />
                                    {task.title}
                                </Task>
                            );
                        } else {
                            return (
                                <Task key={task.idTask} onClick={() => show(task)}>
                                    <CheckBox
                                        type="checkbox"
                                        defaultChecked={task.complete}
                                        onClick={() => handleCompletedTask(task)}
                                    />
                                    {task.title}
                                </Task>
                            );
                        }
                    })}
                    {/* <Task ref={lastTaskRef}>Loading...</Task> */}
                </Content>
            </div>
        );
    }

    return <div>error</div>;
};

Tasks.propTypes = {
    tasks: PropTypes.array,
    setTasks: PropTypes.func,
    setChangeLayout: PropTypes.func,
    changeLayout: PropTypes.bool,
    setActiveTask: PropTypes.func,
    loggedIdClient: PropTypes.number,
    setPage: PropTypes.func,
};

export default Tasks;
