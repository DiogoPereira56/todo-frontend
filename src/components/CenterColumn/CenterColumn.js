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
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import {
    DELETE_LIST_MUTATION,
    NEW_TASK_MUTATION,
    RENAME_LIST_MUTATION,
    UPDATE_TASK_DESCRIPTION_MUTATION,
    DELETE_TASK_MUTATION,
    UPDATE_TASK_TITLE_MUTATION,
    UPDATE_TASK_COMPLETION_MUTATION,
} from '../../graphQL/Mutations';
import Tasks from './Tasks';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Pagination from '../Pagination';
import {
    ALL_CLIENT_TASKS,
    CLIENT_TOTAL_LISTS,
    GET_CLIENT,
    GET_CLIENT_TOTAL_TASKS,
    GET_LIST_TASKS,
} from '../../graphQL/Queries';

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
    loadSearchedTasks,
    setCurrentSearchedTasksPage,
    totalSearchedTasks,
    order,
    setOrder,
    currentTaskPage,
    setCurrentTaskPage,
    dataClient,
    refetchLists,
    currentPage,
    loadListInfo,
    listInfo,
    loadingListInfo,
    fetchMoreListInfo,
    setCurrentPage,
}) => {
    const [renameTask, setRenameTask] = useState(false);
    const [isAsc, setIsAsc] = useState(true);
    const [deleteList, { error: errorDelete }] = useMutation(DELETE_LIST_MUTATION, {
        update(cache, { data }) {
            const existingLists = cache.readQuery({
                query: GET_CLIENT,
                variables: { limit: listsPerPage, offset: listsPerPage * (currentPage - 1) },
            });
            cache.writeQuery({
                query: GET_CLIENT,
                data: {
                    getClientInformation: [...existingLists?.getClientInformation.list],
                },
                variables: { limit: listsPerPage, offset: listsPerPage * (currentPage - 1) },
            });
            let numLists = cache.readQuery({
                query: CLIENT_TOTAL_LISTS,
            });
            cache.writeQuery({
                query: CLIENT_TOTAL_LISTS,
                data: {
                    getTotalLists: numLists.getTotalLists - 1,
                },
            });
        },
    });
    const [doDeleteTask] = useMutation(DELETE_TASK_MUTATION, {
        update(cache, { data }) {
            const values = {
                idList: listInfo.listQuery.idList,
                idClient: listInfo.listQuery.idClient,
                limit: tasksPerPage,
                offset: tasksPerPage * (currentTaskPage - 1),
                orderByTitle: orderByTitle,
                order: order,
            };
            const existingTasks = listInfo;
            /* const existingTasks = cache.readQuery({
                query: GET_LIST_TASKS,
                variables: values,
            }); */
            cache.writeQuery({
                query: GET_LIST_TASKS,
                data: {
                    listQuery: {
                        taskss: {
                            tasks: [...existingTasks?.listQuery.taskss.tasks],
                        },
                    },
                },
                variables: values,
            });
            //allTasksList
            cache.writeQuery({
                query: ALL_CLIENT_TASKS,
                data: {
                    getAllTasks: {
                        tasks: [...existingTasks?.listQuery.taskss.tasks],
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
            const values = {
                idList: newTask.idList,
                idClient: listInfo.listQuery.idClient,
                limit: tasksPerPage,
                offset: tasksPerPage * (currentTaskPage - 1),
                orderByTitle: orderByTitle,
                order: order,
            };
            const existingTasks = listInfo;
            /* const existingTasks = cache.readQuery({
                query: GET_LIST_TASKS,
                variables: values,
            }); */
            cache.writeQuery({
                query: GET_LIST_TASKS,
                data: {
                    listQuery: {
                        taskss: {
                            tasks: [...existingTasks?.listQuery.taskss.tasks, newTask],
                        },
                    },
                },
                variables: values,
            });
            cache.writeQuery({
                query: ALL_CLIENT_TASKS,
                data: {
                    getAllTasks: {
                        tasks: [...existingTasks?.listQuery.taskss.tasks, newTask],
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
            const values = {
                idList: newTask.idList,
                idClient: listInfo.listQuery.idClient,
                limit: tasksPerPage,
                offset: tasksPerPage * (currentTaskPage - 1),
                orderByTitle: orderByTitle,
                order: order,
            };
            const oldList = listInfo;
            /* const oldList = cache.readQuery({
                query: GET_LIST_TASKS,
                variables: values,
            }); */
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
                variables: values,
            });
            cache.writeQuery({
                query: ALL_CLIENT_TASKS,
                data: {
                    getAllTasks: {
                        tasks: [...newList],
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
    const [updateTaskTitle] = useMutation(UPDATE_TASK_TITLE_MUTATION, {
        update: (cache, { data }) => {
            const newTask = data?.updateTaskTitle;
            const values = {
                idList: newTask.idList,
                idClient: listInfo.listQuery.idClient,
                limit: tasksPerPage,
                offset: tasksPerPage * (currentTaskPage - 1),
                orderByTitle: orderByTitle,
                order: order,
            };
            const oldList = listInfo;
            /* const oldList = cache.readQuery({
                query: GET_LIST_TASKS,
                variables: values,
            }); */
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
                variables: values,
            });
            cache.writeQuery({
                query: ALL_CLIENT_TASKS,
                data: {
                    getAllTasks: {
                        tasks: [...newList],
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
    const [updateCompletion] = useMutation(UPDATE_TASK_COMPLETION_MUTATION, {
        update: (cache, { data }) => {
            const newTask = data?.updateTaskCompletion;
            const values = {
                idList: newTask.idList,
                idClient: listInfo.listQuery.idClient,
                limit: tasksPerPage,
                offset: tasksPerPage * (currentTaskPage - 1),
                orderByTitle: orderByTitle,
                order: order,
            };

            const oldList = listInfo;
            /* const oldList = cache.readQuery({
                    query: GET_LIST_TASKS,
                    variables: values,
                }); */
            console.log(oldList);

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
                variables: values,
            });
            cache.writeQuery({
                query: ALL_CLIENT_TASKS,
                data: {
                    getAllTasks: {
                        tasks: [...newList],
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
    const [newName] = useMutation(RENAME_LIST_MUTATION, {
        update: (cache, { data }) => {
            const newListFromResponse = data?.updateList;
            /* console.log(listInfo.listQuery.idList);
            console.log(listInfo.listQuery.idClient);
            console.log(newListFromResponse); */
            cache.writeQuery({
                query: GET_LIST_TASKS,
                data: {
                    listQuery: {
                        listName: [newListFromResponse.listName],
                    },
                },
                variables: {
                    idList: listInfo.listQuery.idList,
                    idClient: listInfo.listQuery.idClient,
                    limit: tasksPerPage,
                    offset: tasksPerPage * (currentTaskPage - 1),
                    orderByTitle: orderByTitle,
                    order: order,
                },
            });
            const oldLists = dataClient.list;
            const listToBeAdded = {
                __typename: 'ListOfTasks',
                idList: newListFromResponse.idList,
                listName: newListFromResponse.listName,
                idClient: newListFromResponse.idClient,
            };
            let newLists = [];
            oldLists.forEach((l) => {
                if (l.idList != listToBeAdded.idList) newLists.push(l);
                else newLists.push(listToBeAdded);
            });
            //console.log(newLists);
            cache.writeQuery({
                query: GET_CLIENT,
                data: {
                    getClientInformation: { list: [...newLists] },
                },
                variables: { limit: listsPerPage, offset: 0 },
            });
        },
    });
    //Queries
    //Pagination States
    //const { data: totalClientAllTasks } = useQuery(GET_CLIENT_TOTAL_TASKS);
    const [
        loadAllTasks,
        { loading: loadingAllTasks, data: allTasksList, fetchMore: fetchMoreAllTasks },
    ] = useLazyQuery(ALL_CLIENT_TASKS);

    const [currentTotalTaskPage, setCurrentTotalTaskPage] = useState(1);
    const [tasksPerPage] = useState(14);
    const [listsPerPage] = useState(10);
    const [activeTask, setActiveTask] = useState();

    function changeClientAllTasks() {
        const offset = tasksPerPage * (currentTotalTaskPage - 1);
        loadAllTasks({
            variables: {
                limit: tasksPerPage,
                offset: offset,
                idClient: dataClient.idClient,
                orderByTitle: orderByTitle,
                order: order,
            },
        });
    }

    function paginatedClientAllTasks() {
        const offset = tasksPerPage * (currentTotalTaskPage - 1);
        try {
            fetchMoreAllTasks({
                variables: {
                    limit: tasksPerPage,
                    offset: offset,
                    idClient: dataClient.idClient,
                    orderByTitle: orderByTitle,
                    order: order,
                },
                updateQuery: (pt, { fetchMoreResult }) => {
                    //console.log(fetchMoreResult);
                    if (!fetchMoreResult) return pt;
                    return {
                        getAllTasks: {
                            tasks: [...pt.getAllTasks.tasks, ...fetchMoreResult.getAllTasks.tasks],
                            hasMore: fetchMoreResult.getAllTasks.hasMore,
                        },
                    };
                },
            });
        } catch (err) {
            //Continue
        }
    }

    useEffect(() => {
        if (showAllTasks) {
            paginatedClientAllTasks();
        }
    }, [currentTotalTaskPage]);

    useEffect(() => {
        if (showAllTasks) {
            changeClientAllTasks();
        }
    }, [showAllTasks]);

    useEffect(() => {
        if (showAllTasks) {
            setCurrentTotalTaskPage(1);
        }
    }, [showAllTasks]);

    const paginatedTasks = () => {
        const { idList, idClient } = listInfo.listQuery;
        const offset = tasksPerPage * (currentTaskPage - 1);
        //console.log(idList, idClient, tasksPerPage, offset, orderByTitle, order);
        try {
            fetchMoreListInfo({
                variables: {
                    idList: idList,
                    idClient: idClient,
                    limit: tasksPerPage,
                    offset: offset,
                    orderByTitle: orderByTitle,
                    order: order,
                },
                updateQuery: (pt, { fetchMoreResult }) => {
                    //console.log(fetchMoreResult);
                    if (!fetchMoreResult) return pt;
                    return {
                        listQuery: {
                            idList: pt.listQuery.idList,
                            idClient: pt.listQuery.idClient,
                            listName: pt.listQuery.listName,
                            taskss: {
                                tasks: [
                                    ...pt.listQuery.taskss.tasks,
                                    ...fetchMoreResult.listQuery.taskss.tasks,
                                ],
                                hasMore: fetchMoreResult.listQuery.taskss.hasMore,
                            },
                        },
                    };
                },
            });
        } catch (err) {
            //Continue
        }
    };

    useEffect(() => {
        if (!loadingListInfo && listInfo) paginatedTasks();
    }, [currentTaskPage]);

    const doListInfo = () => {
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

    function changePaginatedLists() {
        setTimeout(() => {
            refetchLists({ variables: { limit: listsPerPage, offset: 0 } });
            doListInfo();
        }, 70);
    }

    const getListInfo = () => {
        setTimeout(() => {
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
        }, 50);
    };

    useEffect(() => {
        getListInfo();
    }, [currentPage]);

    if (errorDelete) {
        return <div>{errorDelete}</div>;
    }

    const removeList = () => {
        //const { idList, idClient } = listInfo.listQuery;
        const list = { idList: listInfo.listQuery.idList, idClient: listInfo.listQuery.idClient };
        deleteList({
            variables: list,
        }).then(() => {
            //setCurrentPage(1);
            changePaginatedLists();
            setShowOptions(false);
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
        newName({ variables: newValue }).then(() => {
            /* loadListInfo({
                variables: {
                    idList: listInfo.listQuery.idList,
                    idClient: listInfo.listQuery.idClient,
                    limit: tasksPerPage,
                    offset: tasksPerPage * (currentTaskPage - 1),
                    orderByTitle: orderByTitle,
                    order: order,
                },
            }); */
            setRename(false);
        });
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
        loadSearchedTasks({
            variables: {
                limit: tasksPerPage,
                offset: offset,
                idClient: dataClient.idClient,
                orderByTitle: orderByTitle,
                search: search,
                order: order,
            },
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
        title: Yup.string().max(70, 'At most 70 characters').required('A Name is Required'),
    });

    const validateRename = Yup.object({
        listName: Yup.string().max(90, 'At most 37 characters').required('A Name is Required'),
    });

    const validateNewTitle = Yup.object({
        title: Yup.string().max(70, 'At most 70 characters').required('A Name is Required'),
    });

    const validateNewDescription = Yup.object({
        description: Yup.string().max(1350, 'At most 1350 characters').required('A Name is Required'),
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

                        {/* listInfo && showAllTasks && !searchIsActive && (
                            <Pagination
                                listsPerPage={tasksPerPage}
                                totalLists={totalClientAllTasks.getTotalAllTasks}
                                setCurrentPage={setCurrentTotalTaskPage}
                            />
                        ) */}
                        {listInfo && !showAllTasks && searchIsActive && totalSearchedTasks && (
                            <Pagination
                                listsPerPage={tasksPerPage}
                                totalLists={totalSearchedTasks.getTotalSearchedTasks}
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

                {listInfo.listQuery.taskss && !showAllTasks && !searchIsActive && (
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

                {allTasksList && showAllTasks && !searchIsActive && (
                    <Tasks
                        tasks={allTasksList.getAllTasks.tasks}
                        setChangeLayout={setChangeLayout}
                        changeLayout={changeLayout}
                        setActiveTask={setActiveTask}
                        loggedIdClient={dataClient.idClient}
                        setPage={setCurrentTotalTaskPage}
                        loading={loadingAllTasks}
                        hasMore={allTasksList.getAllTasks.hasMore}
                        updateCompletion={updateCompletion}
                    />
                )}

                {searchedTasks && !showAllTasks && searchIsActive && (
                    <Tasks
                        tasks={searchedTasks.getSearchedTasks}
                        setChangeLayout={setChangeLayout}
                        changeLayout={changeLayout}
                        setActiveTask={setActiveTask}
                        loggedIdClient={dataClient.idClient}
                        //setPage={}
                        //loading={}
                        //hasMore={}
                        updateCompletion={updateCompletion}
                    />
                )}
            </CenterBar>

            {changeLayout && (
                <DescriptionContainer>
                    {!renameTask && (
                        <H2 onClick={() => setRenameTask(true)}>
                            {activeTask.title.length < 28
                                ? `${activeTask.title}`
                                : `${activeTask.title.substring(0, 25)}...`}
                        </H2>
                    )}
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
    searchedTasks: PropTypes.object,
    currentSearchedTasksPage: PropTypes.number,
    searchIsActive: PropTypes.bool,
    search: PropTypes.string,
    loadSearchedTasks: PropTypes.func,
    setCurrentSearchedTasksPage: PropTypes.func,
    totalSearchedTasks: PropTypes.object,
    order: PropTypes.string,
    setOrder: PropTypes.func,
    currentTaskPage: PropTypes.number,
    setCurrentTaskPage: PropTypes.func,
    dataClient: PropTypes.object,
    refetchLists: PropTypes.func,
    currentPage: PropTypes.number,
    loadListInfo: PropTypes.func,
    listInfo: PropTypes.object,
    loadingListInfo: PropTypes.bool,
    fetchMoreListInfo: PropTypes.func,
    setCurrentPage: PropTypes.func,
};

export default CenterColumn;
