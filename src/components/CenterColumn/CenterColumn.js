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
    NoList,
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
    ALL_CLIENT_TASKS_MUTATION,
    UPDATE_TASK_TITLE_MUTATION,
    SEARCHED_TASKS_MUTATION,
    GET_CLIENT_TOTAL_LISTS,
    UPDATE_TASK_COMPLETION_MUTATION,
} from '../../graphQL/Mutations';
import Tasks from './Tasks';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Pagination from '../Pagination';
import { GET_CLIENT, GET_CLIENT_TOTAL_TASKS, GET_LIST_TASKS } from '../../graphQL/Queries';

const CenterColumn = ({
    setChangeLayout,
    changeLayout,
    rename,
    setRename,
    showOptions,
    setShowOptions,
    showAllTasks,
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
    currentTaskPage,
    setCurrentTaskPage,
    dataClient,
    refetchLists,
    currentPage,
    loadListInfo,
    listInfo,
    refetchTotalLists,
    loadingListInfo,
}) => {
    const [renameTask, setRenameTask] = useState(false);
    const [isAsc, setIsAsc] = useState(true);
    const [getTotalTasks] = useMutation(LIST_TOTAL_TASK_MUTATION);
    const [deleteList, { error: errorDelete }] = useMutation(DELETE_LIST_MUTATION, {
        update(cache, { data }) {
            const existingLists = cache.readQuery({
                query: GET_CLIENT,
                variables: { limit: listsPerPage, offset: 0 },
            });
            cache.writeQuery({
                query: GET_CLIENT,
                data: {
                    getClientInformation: [...existingLists?.getClientInformation.list],
                },
                variables: { limit: listsPerPage, offset: 0 },
            });
        },
    });
    const [doDeleteTask] = useMutation(DELETE_TASK_MUTATION, {
        update(cache, { data }) {
            const existingTasks = cache.readQuery({
                query: GET_LIST_TASKS,
                variables: {
                    idList: listInfo.listQuery.idList,
                    idClient: listInfo.listQuery.idClient,
                    limit: tasksPerPage,
                    offset: tasksPerPage * (currentTotalTaskPage - 1),
                    orderByTitle: orderByTitle,
                    order: order,
                },
            });
            cache.writeQuery({
                query: GET_LIST_TASKS,
                data: {
                    listQuery: {
                        taskss: {
                            tasks: [...existingTasks?.listQuery.taskss.tasks],
                        },
                    },
                },
                variables: {
                    idList: listInfo.listQuery.idList,
                    idClient: listInfo.listQuery.idClient,
                    limit: tasksPerPage,
                    offset: tasksPerPage * (currentTotalTaskPage - 1),
                    orderByTitle: orderByTitle,
                    order: order,
                },
            });
        },
    });
    const [newTask] = useMutation(NEW_TASK_MUTATION, {
        update: (cache, { data }) => {
            const newTask = data?.addTask;

            const existingTasks = cache.readQuery({
                query: GET_LIST_TASKS,
                variables: {
                    idList: newTask.idList,
                    idClient: listInfo.listQuery.idClient,
                    limit: tasksPerPage,
                    offset: tasksPerPage * (currentTotalTaskPage - 1),
                    orderByTitle: orderByTitle,
                    order: order,
                },
            });
            /* console.log(newTask);
            console.log(existingTasks);
            console.log(listInfo); */
            cache.writeQuery({
                query: GET_LIST_TASKS,
                data: {
                    listQuery: {
                        taskss: {
                            tasks: [...existingTasks?.listQuery.taskss.tasks, newTask],
                        },
                    },
                },
                variables: {
                    idList: newTask.idList,
                    idClient: listInfo.listQuery.idClient,
                    limit: tasksPerPage,
                    offset: tasksPerPage * (currentTotalTaskPage - 1),
                    orderByTitle: orderByTitle,
                    order: order,
                },
            });
        },
    });
    const [updateDescription] = useMutation(UPDATE_TASK_DESCRIPTION_MUTATION, {
        update: (cache, { data }) => {
            const newTask = data?.updateTaskDescription;
            const oldList = cache.readQuery({
                query: GET_LIST_TASKS,
                variables: {
                    idList: newTask.idList,
                    idClient: listInfo.listQuery.idClient,
                    limit: tasksPerPage,
                    offset: tasksPerPage * (currentTotalTaskPage - 1),
                    orderByTitle: orderByTitle,
                    order: order,
                },
            });

            let newList = [];
            oldList.listQuery.taskss.tasks.forEach((t) => {
                if (t.idTask != newTask.idTask) newList.push(t);
                else newList.push(newTask);
            });
            //console.log(newList);
            cache.writeQuery({
                query: GET_LIST_TASKS,
                data: {
                    listQuery: { taskss: { tasks: [...newList] } },
                },
                variables: {
                    idList: listInfo.listQuery.idList,
                    idClient: listInfo.listQuery.idClient,
                    limit: tasksPerPage,
                    offset: tasksPerPage * (currentTotalTaskPage - 1),
                    orderByTitle: orderByTitle,
                    order: order,
                },
            });
        },
    });
    const [updateTaskTitle] = useMutation(UPDATE_TASK_TITLE_MUTATION, {
        update: (cache, { data }) => {
            const newTask = data?.updateTaskTitle;
            const oldList = cache.readQuery({
                query: GET_LIST_TASKS,
                variables: {
                    idList: newTask.idList,
                    idClient: listInfo.listQuery.idClient,
                    limit: tasksPerPage,
                    offset: tasksPerPage * (currentTotalTaskPage - 1),
                    orderByTitle: orderByTitle,
                    order: order,
                },
            });

            let newList = [];
            oldList.listQuery.taskss.tasks.forEach((t) => {
                if (t.idTask != newTask.idTask) newList.push(t);
                else newList.push(newTask);
            });
            //console.log(newList);
            cache.writeQuery({
                query: GET_LIST_TASKS,
                data: {
                    listQuery: { taskss: { tasks: [...newList] } },
                },
                variables: {
                    idList: listInfo.listQuery.idList,
                    idClient: listInfo.listQuery.idClient,
                    limit: tasksPerPage,
                    offset: tasksPerPage * (currentTotalTaskPage - 1),
                    orderByTitle: orderByTitle,
                    order: order,
                },
            });
        },
    });
    const [updateCompletion] = useMutation(UPDATE_TASK_COMPLETION_MUTATION, {
        update: (cache, { data }) => {
            const newTask = data?.updateTaskCompletion;
            const oldList = cache.readQuery({
                query: GET_LIST_TASKS,
                variables: {
                    idList: newTask.idList,
                    idClient: listInfo.listQuery.idClient,
                    limit: tasksPerPage,
                    offset: tasksPerPage * (currentTotalTaskPage - 1),
                    orderByTitle: orderByTitle,
                    order: order,
                },
            });

            let newList = [];
            oldList.listQuery.taskss.tasks.forEach((t) => {
                if (t.idTask != newTask.idTask) newList.push(t);
                else newList.push(newTask);
            });
            //console.log(newList);
            cache.writeQuery({
                query: GET_LIST_TASKS,
                data: {
                    listQuery: { taskss: { tasks: [...newList] } },
                },
                variables: {
                    idList: listInfo.listQuery.idList,
                    idClient: listInfo.listQuery.idClient,
                    limit: tasksPerPage,
                    offset: tasksPerPage * (currentTotalTaskPage - 1),
                    orderByTitle: orderByTitle,
                    order: order,
                },
            });
        },
    });
    const [newName] = useMutation(RENAME_LIST_MUTATION, {
        update: (cache, { data }) => {
            const newListFromResponse = data?.updateList;
            console.log(listInfo.listQuery.idList);
            console.log(listInfo.listQuery.idClient);
            cache.writeQuery({
                query: GET_LIST_TASKS,
                data: {
                    listQuery: [newListFromResponse],
                },
                variables: {
                    idList: listInfo.listQuery.idList,
                    idClient: listInfo.listQuery.idClient,
                    limit: tasksPerPage,
                    offset: tasksPerPage * (currentTotalTaskPage - 1),
                    orderByTitle: orderByTitle,
                    order: order,
                },
            });
        },
    });
    //console.log(listInfo);
    const [getSearchedTasks] = useMutation(SEARCHED_TASKS_MUTATION);
    const [getTotalLists] = useMutation(GET_CLIENT_TOTAL_LISTS);
    //Queries
    //Pagination States
    const { data: totalClientAllTasks } = useQuery(GET_CLIENT_TOTAL_TASKS);
    const [getClientAllTasks] = useMutation(ALL_CLIENT_TASKS_MUTATION);
    //const [currentTaskPage, setCurrentTaskPage] = useState(1);
    const [currentTotalTaskPage, setCurrentTotalTaskPage] = useState(1);
    const [tasksPerPage] = useState(13);
    const [totalTasks, setTotalTasks] = useState(1);
    const [listsPerPage] = useState(10);
    const [allTasksList, setAllTasksList] = useState();
    const [activeTask, setActiveTask] = useState();

    function changeClientAllTasks() {
        const offset = tasksPerPage * (currentTotalTaskPage - 1);
        getClientAllTasks({
            variables: {
                limit: tasksPerPage,
                offset: offset,
                idClient: dataClient.idClient,
                orderByTitle: orderByTitle,
                order: order,
            },
        }).then((data) => {
            if (data.data.getAllTasks) {
                //console.log(data.data.getAllTasks)
                setAllTasksList(data.data.getAllTasks);
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

    const paginatedTasks = () => {
        //const { idList, idClient } = listInfo.listQuery;
        //console.log('page: ', currentTaskPage);
        const offset = tasksPerPage * (currentTaskPage - 1);
        //console.log(idList, idClient, tasksPerPage, offset, orderByTitle, order);
        //console.log(offset);
        /* getListTasks({
            variables: {
                idList: listInfo.listQuery.idList,
                idClient: listInfo.listQuery.idClient,
                limit: tasksPerPage,
                offset: offset,
                orderByTitle: orderByTitle,
                order: order,
            },
            update(cache, { data: { getListTasks } }) {
                //console.log(cache);
            },
        }).then((data) => {
            //console.log(data);
            //if (data.data.getList.taskss.tasks.length != 0) {
            setActiveList((prevActiveList) => {
                return {
                    idList: prevActiveList.idList,
                    idClient: prevActiveList.idClient,
                    listName: prevActiveList.listName,
                    taskss: {
                        tasks: [...prevActiveList.taskss.tasks, ...data.data.getList.taskss.tasks],
                        hasMore: data.data.getList.taskss.hasMore,
                    },
                };
            });
            //console.log(data.data);
            //console.log('hasMore: ', data.data.getList.taskss.hasMore);
            //}
        }); */
    };

    //todo: uncomment this later
    /* useEffect(() => {
        if (!loading) paginatedTasks();
        //console.log(currentTaskPage);
    }, [currentTaskPage]); */

    function changePaginatedLists() {
        refetchLists({ variables: { offset: listsPerPage * (currentPage - 1) } });
        getListInfo();
        refetchTotalLists();
    }

    /* useEffect(() => {
        if (activeList) {
            changeListTasks();
        }
    }, [currentTaskPage]);*/

    const getListInfo = () => {
        if (dataClient.list[0])
            loadListInfo({
                variables: {
                    idList: dataClient.list[0].idList,
                    idClient: dataClient.list[0].idClient,
                    limit: tasksPerPage,
                    offset: 0,
                    orderByTitle: orderByTitle,
                    order: order,
                },
            });
    };

    useEffect(() => {
        getListInfo();
    }, [currentPage]);

    /* function changeTotalTasks() {
        //const { idList, idClient } = listInfo.listQuery;
        const values = { idList: listInfo.listQuery.idList, idClient: listInfo.listQuery.idClient };
        getTotalTasks({ variables: values }).then((data) => {
            //console.log(data.data);
            setTotalTasks(data.data);
        });
    } */

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
        //const { idList, idClient } = listInfo.listQuery;
        const list = { idList: listInfo.listQuery.idList, idClient: listInfo.listQuery.idClient };
        deleteList({
            variables: list,
        }).then((data) => {
            if (data.data) {
                doTotalLists();
                changePaginatedLists(); //keep this
                setShowOptions(false);
            }
        });
    };

    const handleRename = (values) => {
        const newValue = {
            idList: listInfo.listQuery.idList,
            listName: values.listName,
            idClient: listInfo.listQuery.idClient,
            limit: tasksPerPage,
            offset: tasksPerPage * (currentTaskPage - 1),
            orderByTitle: orderByTitle,
            order: order,
        };
        newName({ variables: newValue }).then(setRename(false));
    };

    const handleNewTask = (values) => {
        //const { idList, idClient } = listInfo.listQuery;
        const task = {
            title: values.title,
            idList: listInfo.listQuery.idList,
            idClient: listInfo.listQuery.idClient,
        };
        newTask({ variables: task });
        values.title = '';
    };

    const handleNewDescription = (values) => {
        const { idTask } = activeTask;
        //const {idClient} = activeList
        const task = { idTask: idTask, description: values.description, idClient: dataClient.idClient };
        //console.log(task)
        updateDescription({ variables: task });
    };

    const changeListTasks = () => {
        loadListInfo({
            variables: {
                idList: listInfo.listQuery.idList,
                idClient: listInfo.listQuery.idClient,
                limit: tasksPerPage,
                offset: tasksPerPage * (currentTaskPage - 1),
                orderByTitle: orderByTitle,
                order: order,
            },
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
        const newTask = { idTask: activeTask.idTask, title: values.title, idClient: dataClient.idClient };
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
        //const { idClient } = listInfo.listQuery.idClient;
        const task = { idTask: idTask, idClient: listInfo.listQuery.idClient };
        doDeleteTask({ variables: task }).then(setChangeLayout(false));
    };

    const searchTasks = () => {
        const offset = tasksPerPage * (currentSearchedTasksPage - 1);
        getSearchedTasks({
            variables: {
                limit: tasksPerPage,
                offset: offset,
                idClient: dataClient.idClient,
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
        if (listInfo) getTasks();
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

    if (!listInfo) {
        return (
            <NoList>
                <H2>You Still Haven&apos;t created any List, try doing so in the side bar</H2>
            </NoList>
        );
    }

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

                        {listInfo && !rename && !showAllTasks && !searchIsActive && (
                            <TasksToolbarTitleItem>
                                <H2 onClick={() => setShowOptions(!showOptions)}>
                                    {listInfo.listQuery.listName}
                                </H2>
                            </TasksToolbarTitleItem>
                        )}
                        {listInfo && rename && !showAllTasks && (
                            <Formik
                                initialValues={{ listName: listInfo.listQuery.listName }}
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

                        {listInfo && !showAllTasks && !searchIsActive && (
                            <Pagination
                                listsPerPage={tasksPerPage}
                                totalLists={totalTasks.getListsTotalTasks}
                                setCurrentPage={setCurrentTaskPage}
                            />
                        )}
                        {listInfo && showAllTasks && !searchIsActive && (
                            <Pagination
                                listsPerPage={tasksPerPage}
                                totalLists={totalClientAllTasks.getTotalAllTasks}
                                setCurrentPage={setCurrentTotalTaskPage}
                            />
                        )}
                        {listInfo && !showAllTasks && searchIsActive && (
                            <Pagination
                                listsPerPage={tasksPerPage}
                                totalLists={totalSearchedTasks}
                                setCurrentPage={setCurrentSearchedTasksPage}
                            />
                        )}
                    </TasksToolbarTitleContainer>

                    {changeLayout && (
                        <TaskToolbarRight changeLayout>
                            {!orderByTitle && (
                                <>
                                    <Img src={sort} alt="" onClick={doSort} />
                                    <Button onClick={doSort}>Sort</Button>
                                </>
                            )}
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
                                {!orderByTitle && (
                                    <>
                                        <Img src={sort} alt="" onClick={doSort} />
                                        <Button onClick={doSort}>Sort</Button>
                                    </>
                                )}
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

                {listInfo && !showAllTasks && !searchIsActive && (
                    <Tasks
                        tasks={listInfo.listQuery.taskss.tasks}
                        setChangeLayout={setChangeLayout}
                        changeLayout={changeLayout}
                        setActiveTask={setActiveTask}
                        loggedIdClient={dataClient.idClient}
                        setPage={setCurrentTaskPage}
                        loading={loadingListInfo}
                        hasMore={listInfo.listQuery.taskss.hasMore}
                        updateCompletion={updateCompletion}
                    />
                )}

                {/* listInfo && showAllTasks && !searchIsActive && (
                    <Tasks
                        tasks={allTasksList}
                        setChangeLayout={setChangeLayout}
                        changeLayout={changeLayout}
                        setActiveTask={setActiveTask}
                        loggedIdClient={dataClient.idClient}
                        updateCompletion={updateCompletion}
                    />
                )}

                {listInfo && !showAllTasks && searchIsActive && (
                    <Tasks
                        tasks={searchedTasks}
                        setChangeLayout={setChangeLayout}
                        changeLayout={changeLayout}
                        setActiveTask={setActiveTask}
                        loggedIdClient={dataClient.idClient}
                        updateCompletion={updateCompletion}
                    />
                ) */}
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
    activeList: PropTypes.object,
    setChangeLayout: PropTypes.func,
    changeLayout: PropTypes.bool,
    setActiveList: PropTypes.func,
    setRename: PropTypes.func,
    rename: PropTypes.bool,
    showOptions: PropTypes.bool,
    setShowOptions: PropTypes.func,
    showAllTasks: PropTypes.bool,
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
    currentTaskPage: PropTypes.number,
    setCurrentTaskPage: PropTypes.func,
    dataClient: PropTypes.object,
    refetchLists: PropTypes.func,
    currentPage: PropTypes.number,
    loadListInfo: PropTypes.func,
    listInfo: PropTypes.object,
    refetchTotalLists: PropTypes.func,
    loadingListInfo: PropTypes.bool,
};

export default CenterColumn;
