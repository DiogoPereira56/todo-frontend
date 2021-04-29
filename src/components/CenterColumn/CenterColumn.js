/* eslint-disable no-unused-vars */
import {
    CenterBar,
    TasksToolbar,
    TasksToolbarTitleContainer,
    TasksToolbarTitleItem,
    H2,
    Img,
    TaskToolbarRight,
    Button,
    BaseAdd,
    Add,
    Input,
    DescriptionContainer,
    Description,
    Wrapper,
    Hide,
    Options,
    Actions,
    ListInput,
} from './CenterColumn.styles';
import { Warnning } from '../Login/LoginForm.style';
import '../../fonts.css';
import more from '../../imgs/more.png';
import sort from '../../imgs/sort.png';
import hide from '../../imgs/hide.png';
import asc from '../../imgs/asc.png';
import desc from '../../imgs/desc.png';
import remove from '../../imgs/remove.png';
import deleteTask from '../../imgs/deleteTask.png';
import { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { useMutation, useQuery } from '@apollo/client';
import {
    DELETE_LIST_MUTATION,
    NEW_TASK_MUTATION,
    RENAME_LIST_MUTATION,
    UPDATE_TASK_DESCRIPTION_MUTATION,
    DELETE_TASK_MUTATION,
    LIST_TOTAL_TASK_MUTATION,
    LIST_INFO_MUTATION,
    CLIENT_LISTS_MUTATION,
    ALL_CLIENT_TASKS_MUTATION,
    UPDATE_TASK_TITLE_MUTATION,
    SEARCHED_TASKS_MUTATION,
    GET_CLIENT_TOTAL_LISTS,
} from '../../graphQL/Mutations';
import Tasks from './Tasks';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Pagination from '../Pagination';
import { GET_CLIENT_TOTAL_TASKS } from '../../graphQL/Queries';

const CenterColumn = ({
    lists,
    activeList,
    setChangeLayout,
    changeLayout,
    setActiveList,
    rename,
    setRename,
    showOptions,
    setShowOptions,
    setPaginatedLists,
    showAllTasks,
    loggedIdClient,
    setOrderByTitle,
    orderByTitle,
    searchedTasks,
    currentSearchedTasksPage,
    searchIsActive,
    search,
    setSearchedTasks,
    setCurrentSearchedTasksPage,
    totalSearchedTasks,
    order,
    setOrder,
    setTotalLists,
}) => {
    const [listIsActive, setListIsActive] = useState(false);
    const [activeTask, setActiveTask] = useState();
    const [renameTask, setRenameTask] = useState(false);
    const [isAsc, setIsAsc] = useState(true);
    const [getTotalTasks] = useMutation(LIST_TOTAL_TASK_MUTATION);
    const [deleteList, { error: errorDelete }] = useMutation(DELETE_LIST_MUTATION);
    const [doDeleteTask] = useMutation(DELETE_TASK_MUTATION);
    const [newTask] = useMutation(NEW_TASK_MUTATION);
    const [updateDescription] = useMutation(UPDATE_TASK_DESCRIPTION_MUTATION);
    const [updateTaskTitle] = useMutation(UPDATE_TASK_TITLE_MUTATION);
    const [newName] = useMutation(RENAME_LIST_MUTATION);
    const [getSearchedTasks] = useMutation(SEARCHED_TASKS_MUTATION);
    const [getTotalLists] = useMutation(GET_CLIENT_TOTAL_LISTS);

    //Pagination States
    const { data: totalClientAllTasks } = useQuery(GET_CLIENT_TOTAL_TASKS);
    const [getClientAllTasks] = useMutation(ALL_CLIENT_TASKS_MUTATION);
    const [getClientLists] = useMutation(CLIENT_LISTS_MUTATION);
    const [getListTasks] = useMutation(LIST_INFO_MUTATION);
    const [currentTaskPage, setTaskCurrentPage] = useState(1);
    const [currentTotalTaskPage, setCurrentTotalTaskPage] = useState(1);
    const [tasksPerPage] = useState(11);
    const [totalTasks, setTotalTasks] = useState(1);
    const [listsPerPage] = useState(10);
    const [allTasksList, setAllTasksList] = useState();

    function changeClientAllTasks() {
        const offset = tasksPerPage * (currentTotalTaskPage - 1);
        getClientAllTasks({
            variables: {
                limit: tasksPerPage,
                offset: offset,
                idClient: loggedIdClient,
                orderByTitle: orderByTitle,
                order: order,
            },
        }).then((data) => {
            if (data.data.getAllTasks) {
                //console.log(data.data.getAllTasks)
                setAllTasksList(data.data.getAllTasks);
                //setActiveList(data.data)
            }
        });
    }

    useEffect(() => {
        if (showAllTasks) {
            changeClientAllTasks();
        }
    }, [showAllTasks, currentTotalTaskPage]);

    useEffect(() => {
        if (showAllTasks) {
            setCurrentTotalTaskPage(1);
        }
    }, [showAllTasks]);

    function paginatedTasks() {
        const { idList, idClient } = activeList;
        const offset = tasksPerPage * (currentTaskPage - 1);
        getListTasks({
            variables: {
                idList: idList,
                idClient: idClient,
                limit: tasksPerPage,
                offset: offset,
                orderByTitle: orderByTitle,
                order: order,
            },
        }).then((data) => {
            setActiveList(data.data.getList);
            //console.log(data.data.getList);
        });
    }

    function changePaginatedLists() {
        //const offset = listsPerPage * (currentPage - 1);
        getClientLists({ variables: { limit: listsPerPage, offset: 0 } }).then((data) => {
            if (!data) {
                console.log('something went wrong');
            } else {
                //console.log(data.data);
                setPaginatedLists(data.data.getClientInformations.list);
                getListTasks({
                    variables: {
                        idList: data.data.getClientInformations.list[0].idList,
                        idClient: data.data.getClientInformations.list[0].idClient,
                        limit: tasksPerPage,
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
        });
        //setCurrentPage(1);
    }

    useEffect(() => {
        //there was a error Leak Here
        if (activeList) {
            paginatedTasks();
        }
    }, [currentTaskPage]);
    //console.log(currentPage);

    function changeTotalTasks() {
        const { idList, idClient } = activeList;
        const values = { idList: idList, idClient: idClient };
        getTotalTasks({ variables: values }).then((data) => {
            //console.log(data.data);
            setTotalTasks(data.data);
        });
    }

    useEffect(() => {
        if (activeList) {
            setListIsActive(true);
            changeTotalTasks();
            //paginatedTasks();
        }
    }, [activeList]);

    if (errorDelete) {
        return <div>{errorDelete}</div>;
    }

    const doTotalLists = () => {
        getTotalLists().then((data) => {
            //console.log(data.data.getClientTotalLists);
            setTotalLists(data.data.getClientTotalLists);
        });
    };

    const removeList = () => {
        const { idList, idClient } = activeList;
        const list = { idList, idClient };

        deleteList({ variables: list }).then((data) => {
            if (!data.data) {
                console.log('something went wrong');
            } else {
                doTotalLists();
                changePaginatedLists();
                setShowOptions(false);
            }
        });
        console.log(lists);
    };

    const handleRename = (values) => {
        const newValue = {
            idList: activeList.idList,
            title: values.listName,
            idClient: activeList.idClient,
            limit: tasksPerPage,
            offset: 0,
            orderByTitle: orderByTitle,
            order: order,
        };
        newName({ variables: newValue })
            .then((data) => {
                if (data.data.updateList) {
                    //setActiveList(data.data.updateList);
                    changePaginatedLists();
                } else {
                    console.log('something went wrong');
                }
            })
            .then(setRename(false));
    };

    const handleNewTask = (values) => {
        const { idList, idClient } = activeList;
        const task = { title: values.title, idList, idClient };
        /* console.log(task); */
        newTask({ variables: task }).then((data) => {
            if (!data.data) {
                console.log('something went wrong');
            } else {
                //console.log(data.data);
                paginatedTasks();
            }
        });

        values.title = '';
    };

    const handleNewDescription = (values) => {
        const { idTask } = activeTask;
        //const {idClient} = activeList
        const task = { idTask: idTask, description: values.description, idClient: loggedIdClient };
        //console.log(task)
        updateDescription({ variables: task }).then((data) => {
            if (data.data.updateTaskDescription) {
                setActiveTask(data.data.updateTaskDescription);
                changeListTasks();
                //console.log(data.data.updateTaskDescription);
                //console.log(activeTask);
            }
        });
    };

    const changeListTasks = () => {
        const offset = tasksPerPage * (currentTaskPage - 1);
        getListTasks({
            variables: {
                idList: activeList.idList,
                idClient: loggedIdClient,
                limit: tasksPerPage,
                offset: offset,
                orderByTitle: orderByTitle,
                order: order,
            },
        }).then((data) => {
            if (data.data) {
                setActiveList(data.data.getList);
                //console.log(data.data.getList);
            }
        });
    };

    function getTasks() {
        if (showAllTasks) {
            changeClientAllTasks();
        } else if (searchIsActive) {
            searchTasks();
        } else {
            changeListTasks();
        }
    }

    const handleUpdateTaskTitle = (values) => {
        const newTask = { idTask: activeTask.idTask, title: values.title, idClient: loggedIdClient };
        updateTaskTitle({ variables: newTask }).then((data) => {
            if (data.data) {
                //console.log(data.data.updateTaskTitle);
                setActiveTask(data.data.updateTaskTitle);
                getTasks();
            }
        });
        setRenameTask(false);
    };

    useEffect(() => {
        setRenameTask(false);
    }, [changeLayout]);

    const handleDeleteTask = () => {
        const { idTask } = activeTask;
        const { idClient } = activeList;
        const task = { idTask, idClient };
        doDeleteTask({ variables: task }).then((data) => {
            if (!data.data) {
                console.log('something went wrong');
            } else {
                //console.log(data.data);
                //setTaskCurrentPage(1);
                paginatedTasks();
                setChangeLayout(false);
            }
        });
    };

    const searchTasks = () => {
        const offset = tasksPerPage * (currentSearchedTasksPage - 1);
        getSearchedTasks({
            variables: {
                limit: tasksPerPage,
                offset: offset,
                idClient: loggedIdClient,
                orderByTitle: orderByTitle,
                search: search,
                order: order,
            },
        }).then((data) => {
            //console.log(data.data.getSearchedTasks);
            setSearchedTasks(data.data.getSearchedTasks);
        });
    };

    useEffect(() => {
        if (searchIsActive) {
            searchTasks();
        }
    }, [currentSearchedTasksPage]);

    const doRename = () => {
        setShowOptions(false);
        setRename(!rename);
    };

    useEffect(() => {
        if (activeList) {
            getTasks();
        }
    }, [isAsc, orderByTitle]);

    const doSort = () => {
        setOrderByTitle(true);
        //getTasks();
    };

    const sortDesc = () => {
        setIsAsc(false);
        setOrder('DESC');
        //getTasks();
    };

    const sortAsc = () => {
        setIsAsc(true);
        setOrder('ASC');
        //getTasks();
    };

    const sortRemove = () => {
        setOrderByTitle(false);
        //getTasks();
    };

    const validateNewTask = Yup.object({
        title: Yup.string().required('A Name is Required'),
    });

    const validateRename = Yup.object({
        listName: Yup.string().required('A Name is Required'),
    });

    const validateNewTitle = Yup.object({
        title: Yup.string().required('A Name is Required'),
    });

    const validateNewDescription = Yup.object({
        description: Yup.string().required('A Name is Required'),
    });

    return (
        <Wrapper>
            <CenterBar>
                <TasksToolbar>
                    <TasksToolbarTitleContainer>
                        {showAllTasks && (
                            <TasksToolbarTitleItem>
                                <H2>Tasks</H2>
                            </TasksToolbarTitleItem>
                        )}
                        {searchIsActive && (
                            <TasksToolbarTitleItem>
                                <H2>Search for: {search}</H2>
                            </TasksToolbarTitleItem>
                        )}

                        {activeList && !rename && !showAllTasks && !searchIsActive && (
                            <TasksToolbarTitleItem>
                                <H2 onClick={() => setShowOptions(!showOptions)}>{activeList.listName}</H2>
                            </TasksToolbarTitleItem>
                        )}
                        {activeList && rename && !showAllTasks && (
                            <Formik
                                initialValues={{ listName: activeList.listName }}
                                validationSchema={validateRename}
                                onSubmit={handleRename}
                            >
                                {() => (
                                    <Form>
                                        <Field
                                            placeholder=""
                                            autoComplete="off"
                                            name="listName"
                                            as={ListInput}
                                        />
                                        <br />
                                    </Form>
                                )}
                            </Formik>
                        )}
                        {!showAllTasks && !searchIsActive && (
                            <TasksToolbarTitleItem>
                                <H2>
                                    <Img src={more} alt="" onClick={() => setShowOptions(!showOptions)} />
                                </H2>
                                {showOptions && (
                                    <Options>
                                        <Actions onClick={doRename}>Rename List</Actions>
                                        <Actions onClick={removeList}>
                                            <Warnning>Delete List</Warnning>
                                        </Actions>
                                    </Options>
                                )}
                            </TasksToolbarTitleItem>
                        )}

                        {activeList && !showAllTasks && !searchIsActive && (
                            <Pagination
                                listsPerPage={tasksPerPage}
                                totalLists={totalTasks.getListsTotalTasks}
                                setCurrentPage={setTaskCurrentPage}
                            />
                        )}
                        {activeList && showAllTasks && !searchIsActive && (
                            <Pagination
                                listsPerPage={tasksPerPage}
                                totalLists={totalClientAllTasks.getTotalAllTasks}
                                setCurrentPage={setCurrentTotalTaskPage}
                            />
                        )}
                        {activeList && !showAllTasks && searchIsActive && (
                            <Pagination
                                listsPerPage={tasksPerPage}
                                totalLists={totalSearchedTasks}
                                setCurrentPage={setCurrentSearchedTasksPage}
                            />
                        )}
                    </TasksToolbarTitleContainer>

                    {changeLayout && (
                        <TaskToolbarRight changeLayout>
                            <Img src={sort} alt="" onClick={doSort} />
                            <Button onClick={doSort}>Sort</Button>
                            <br />
                            <br />
                            {orderByTitle && (
                                <div>
                                    {isAsc && <Img src={asc} alt="" onClick={() => sortDesc()} />}
                                    {!isAsc && <Img src={desc} alt="" onClick={() => sortAsc()} />}
                                    Sorted
                                    <Img src={remove} alt="" onClick={() => sortRemove()} />
                                </div>
                            )}
                        </TaskToolbarRight>
                    )}

                    {!changeLayout && (
                        <>
                            <TaskToolbarRight>
                                <Img src={sort} alt="" onClick={doSort} />
                                <Button onClick={doSort}>Sort</Button>
                                <br />
                                <br />
                                {orderByTitle && (
                                    <div>
                                        {isAsc && <Img src={asc} alt="" onClick={() => sortDesc()} />}
                                        {!isAsc && <Img src={desc} alt="" onClick={() => sortAsc()} />}
                                        Sorted
                                        <Img src={remove} alt="" onClick={() => sortRemove()} />
                                    </div>
                                )}
                            </TaskToolbarRight>
                        </>
                    )}
                </TasksToolbar>

                {!showAllTasks && !searchIsActive && (
                    <BaseAdd>
                        <Add>+</Add>
                        <Formik
                            initialValues={{ title: '' }}
                            validationSchema={validateNewTask}
                            onSubmit={handleNewTask}
                        >
                            {() => (
                                <Form>
                                    <Field
                                        placeholder="Add a Task"
                                        autoComplete="off"
                                        name="title"
                                        as={Input}
                                    />
                                    <br />
                                </Form>
                            )}
                        </Formik>
                    </BaseAdd>
                )}

                {/* console.log(activeList) */}
                {listIsActive && !showAllTasks && !searchIsActive && (
                    <Tasks
                        list={activeList.taskss}
                        setChangeLayout={setChangeLayout}
                        changeLayout={changeLayout}
                        setActiveTask={setActiveTask}
                        loggedIdClient={loggedIdClient}
                    />
                )}

                {listIsActive && showAllTasks && !searchIsActive && (
                    <Tasks
                        list={allTasksList}
                        setChangeLayout={setChangeLayout}
                        changeLayout={changeLayout}
                        setActiveTask={setActiveTask}
                        loggedIdClient={loggedIdClient}
                    />
                )}

                {listIsActive && !showAllTasks && searchIsActive && (
                    <Tasks
                        list={searchedTasks}
                        setChangeLayout={setChangeLayout}
                        changeLayout={changeLayout}
                        setActiveTask={setActiveTask}
                        loggedIdClient={loggedIdClient}
                    />
                )}
            </CenterBar>

            {changeLayout && (
                <DescriptionContainer>
                    {!renameTask && <H2 onClick={() => setRenameTask(true)}>{activeTask.title}</H2>}
                    {renameTask && (
                        <Formik
                            initialValues={{ title: activeTask.title }}
                            validationSchema={validateNewTitle}
                            onSubmit={handleUpdateTaskTitle}
                        >
                            {() => (
                                <Form>
                                    <Field placeholder="" autoComplete="off" name="title" as={ListInput} />
                                    <br />
                                </Form>
                            )}
                        </Formik>
                    )}
                    <Formik
                        initialValues={{ description: activeTask.description }}
                        validationSchema={validateNewDescription}
                    >
                        {({ values }) => (
                            <Form>
                                <Field
                                    placeholder="Add a Description"
                                    autoComplete="off"
                                    name="description"
                                    onBlur={() => handleNewDescription(values)}
                                    as={Description}
                                >
                                    {activeTask.description}
                                </Field>
                                <br />
                            </Form>
                        )}
                    </Formik>
                    <Hide onClick={() => setChangeLayout(false)} src={hide} alt="" />
                    <Hide onClick={handleDeleteTask} src={deleteTask} alt="" />
                </DescriptionContainer>
            )}
        </Wrapper>
    );
};

CenterColumn.propTypes = {
    lists: PropTypes.array,
    activeList: PropTypes.object,
    setChangeLayout: PropTypes.func,
    changeLayout: PropTypes.bool,
    setActiveList: PropTypes.func,
    setRename: PropTypes.func,
    rename: PropTypes.bool,
    showOptions: PropTypes.bool,
    setShowOptions: PropTypes.func,
    setPaginatedLists: PropTypes.func,
    showAllTasks: PropTypes.bool,
    loggedIdClient: PropTypes.number,
    setOrderByTitle: PropTypes.func,
    orderByTitle: PropTypes.bool,
    searchedTasks: PropTypes.array,
    currentSearchedTasksPage: PropTypes.number,
    searchIsActive: PropTypes.bool,
    search: PropTypes.string,
    setSearchedTasks: PropTypes.func,
    setCurrentSearchedTasksPage: PropTypes.func,
    totalSearchedTasks: PropTypes.number,
    order: PropTypes.string,
    setOrder: PropTypes.func,
    setTotalLists: PropTypes.func,
};

export default CenterColumn;
