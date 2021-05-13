/* eslint-disable no-unused-vars */
import { useRef, useCallback, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Task, CheckBox, Content } from './CenterColumn.styles';

const Tasks = ({
    tasks,
    setChangeLayout,
    setActiveTask,
    loggedIdClient,
    setPage,
    loading,
    hasMore,
    updateCompletion,
}) => {
    const show = (task) => {
        setActiveTask(task);
        setChangeLayout((prevLayout) => {
            return !prevLayout;
        });
    };

    const handleCompletedTask = (e, task) => {
        e.stopPropagation();
        const values = { idTask: task.idTask, complete: !task.complete, idClient: loggedIdClient };
        updateCompletion({ variables: values });
    };

    const observer = useRef();
    const lastTaskRef = useCallback(
        (node) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore > 0) {
                    //console.log('visible');
                    setPage((prevPage) => {
                        return prevPage + 1;
                    });
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading, hasMore],
    );

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
                                        onClick={(e) => handleCompletedTask(e, task)}
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
                                        onClick={(e) => handleCompletedTask(e, task)}
                                    />
                                    {task.title}
                                </Task>
                            );
                        }
                    })}
                    {/* loading && <Task ref={lastTaskRef}>Loading...</Task> */}
                </Content>
            </div>
        );
    }

    return <div>error</div>;
};

Tasks.propTypes = {
    tasks: PropTypes.array,
    setChangeLayout: PropTypes.func,
    setActiveTask: PropTypes.func,
    loggedIdClient: PropTypes.number,
    setPage: PropTypes.func,
    loading: PropTypes.bool,
    hasMore: PropTypes.number,
    updateCompletion: PropTypes.func,
};

export default Tasks;
