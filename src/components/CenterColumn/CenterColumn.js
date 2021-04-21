import {CenterBar, TasksToolbar, TasksToolbarTitleContainer, TasksToolbarTitleItem, H2, 
    Img, TaskToolbarRight, Button, BaseAdd, Add, Input, Task, CheckBox, ChangeTask,
    DescriptionContainer, Description, Wrapper, Hide, Options, Actions, ListInput} from './CenterColumn.styles'
import {Warnning} from '../Login/LoginForm.style'
import '../../fonts.css'
import more from '../../imgs/more.png'
import sort from '../../imgs/sort.png'
import hide from '../../imgs/hide.png'
import deleteTask from '../../imgs/deleteTask.png'
import { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types'
import { useMutation, useQuery } from '@apollo/client'
import { DELETE_LIST_MUTATION, NEW_TASK_MUTATION, RENAME_LIST_MUTATION, 
    UPDATE_TASK_DESCRIPTION_MUTATION, DELETE_TASK_MUTATION, LIST_TOTAL_TASK_MUTATION, 
    LIST_INFO_MUTATION, CLIENT_LISTS_MUTATION, ALL_CLIENT_TASKS_MUTATION } from '../../graphQL/Mutations'
import Tasks from './Tasks'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup';
import Pagination from '../Pagination'
import { GET_CLIENT_TOTAL_TASKS } from '../../graphQL/Queries'

const CenterColumn = ({ 
    lists, activeList, setChangeLayout, changeLayout, refetch, setActiveList, rename, setRename, 
    showOptions, setShowOptions, setPaginatedLists, showAllTasks, loggedIdClient
}) => {

    const [listIsActive, setListIsActive] = useState(false);
    const [activeTask, setActiveTask] = useState();
    const [getTotalTasks] = useMutation(LIST_TOTAL_TASK_MUTATION);
    const [deleteList, { error: errorDelete }] = useMutation(DELETE_LIST_MUTATION);
    const [doDeleteTask] = useMutation(DELETE_TASK_MUTATION);
    const [newTask, { error: errorTask }] = useMutation(NEW_TASK_MUTATION);
    const [updateDescription] = useMutation(UPDATE_TASK_DESCRIPTION_MUTATION);
    const [newName, {error: errorRename}] = useMutation(RENAME_LIST_MUTATION);
    /** failed atempt at using cache */
    /* const [newName2] = useMutation(RENAME_LIST_MUTATION, {
        update(cache, { data: { newName } }) {
          cache.modify({
            id: cache.identify(activeList),
            fields: {
              comments(existingCommentRefs = [], { readField }) {
                const newCommentRef = cache.writeFragment({
                  data: newName,
                  fragment: gql`
                    fragment NewComment on Comment {
                        idList
                        listName
                        tasks{
                            idTask
                            title
                            complete
                            description
                        }
                  `
                });
                return [...existingCommentRefs, newCommentRef];
              }
            }
          });
        }
    }); */

    //Pagination States
    const { data: totalClientAllTasks} = useQuery(GET_CLIENT_TOTAL_TASKS);
    const [getClientAllTasks] = useMutation(ALL_CLIENT_TASKS_MUTATION);
    const [getClientLists] = useMutation(CLIENT_LISTS_MUTATION);
    const [getListTasks] = useMutation(LIST_INFO_MUTATION);
    const [currentTaskPage, setTaskCurrentPage] = useState(1);
    const [currentTotalTaskPage, setCurrentTotalTaskPage] = useState(1);
    const [tasksPerPage] = useState(11);
    const [totalTasks, setTotalTasks] = useState(1);
    const [listsPerPage] = useState(5);
    const [allTasksList, setAllTasksList] = useState();

    function changeClientAllTasks() {
        const offset = tasksPerPage * (currentTotalTaskPage - 1);
            getClientAllTasks({variables: {limit: tasksPerPage, offset: offset}})
            .then(data => {
                if(data.data.getAllTasks){
                    //console.log(data.data.getAllTasks)
                    setAllTasksList(data.data.getAllTasks)
                    //setActiveList(data.data)
                }
            })
    }

    useEffect(() => {
        if(showAllTasks){
            changeClientAllTasks();
        }
        
    }, [showAllTasks, currentTotalTaskPage])

    function paginatedTasks() {
        const {idList, idClient} = activeList;
        const offset = tasksPerPage * (currentTaskPage - 1);
        getListTasks({variables: { idList: idList, idClient: idClient, limit: tasksPerPage, offset: offset }})
          .then( data => {
              if(data.data){
                  //memory leak
                  //setActiveList(data.data.getList);
                  //console.log(data.data.getList);
              }
          })
    }

    function changePaginatedLists() {
        //const offset = listsPerPage * (currentPage - 1);
        getClientLists({variables: {limit: listsPerPage, offset: 0}})
        .then( data => {
            if (!data.data) {
                console.log('something went wrong');
            } else{
                setPaginatedLists(data.data.getClientInformations.list);
                getListTasks({variables: {
                    idList: data.data.getClientInformations.list[0].idList,
                    idClient: data.data.getClientInformations.list[0].idClient,
                    limit: tasksPerPage,
                    offset: 0
                    }})
                    .then( data => {
                        if(data.data){
                            setActiveList(data.data.getList);
                            //console.log(data.data.getList);
                        }
                    })
            }
        })
        //setCurrentPage(1);
    }

    useEffect(() => {
        //there was a error Leak Here
        /* if(activeList){
            paginatedTasks();
        } */

    }, [currentTaskPage])
    //console.log(currentPage);

    function changeTotalTasks() {
        const {idList, idClient} = activeList
        const values = { idList: idList, idClient: idClient }
        getTotalTasks({variables: values })
        .then(data => {
            //console.log(data.data);
            setTotalTasks(data.data);
        })
    }

    useEffect(() => {
        if(activeList){
            setListIsActive(true);
            changeTotalTasks();
            paginatedTasks();
        }

    }, [activeList])

    if(errorDelete){
        return <div>{errorDelete}</div>
    }

    const removeList = () => {
        const { idList, idClient } = activeList 
        const list = { idList, idClient }
        
        deleteList({variables: list })
        .then(data => {
            if (!data.data) {
                console.log('something went wrong');
            }
            else{
                changePaginatedLists();
                setShowOptions(false);
            }
        });
        console.log(lists);
    }

    const handleRename = (values) => {
        const newValue = {idList: activeList.idList, title: values.listName, idClient: activeList.idClient, limit: tasksPerPage, offset:0}
        newName({variables: newValue })
        .then(data => {
            if (data.data.updateList) {
                //setActiveList(data.data.updateList);
                changePaginatedLists();
            }
            else{
                console.log('something went wrong');
            }
        })
        .then(setRename(false));
    }

    const handleNewTask = (values) => {
        const {idList, idClient} = activeList 
        const task = { title: values.title, idList, idClient }
        /* console.log(task); */
        newTask({variables: task })
        .then(data => {
            if (!data.data) {
                console.log('something went wrong');
            }
            else{
                console.log(data.data);
                paginatedTasks();
            }
        });
        
        values.title = '';
    }

    const handleNewDescription = (values) => {
        const {idTask} = activeTask 
        const {idClient} = activeList
        const task = { idTask: idTask, description: values.description, idClient: idClient }
        updateDescription({variables: task})
        paginatedTasks();
    }

    const handleDeleteTask = () => {
        const {idTask} = activeTask;
        const {idClient} = activeList;
        const task = {idTask, idClient}
        doDeleteTask({variables: task})
        .then(data => {
            if (!data.data) {
                console.log('something went wrong');
            }
            else{
                console.log(data.data);
                //refetch();
                setChangeLayout(false);
            }
        });
        
    }

    const doRename = () => {
        setShowOptions(false)
        setRename(!rename)
    }
    
    const validateNewTask = Yup.object({
        title: Yup.string()
          .required('A Name is Required'),
    })

    const validateRename = Yup.object({
        listName: Yup.string()
          .required('A Name is Required'),
    })

    const validateNewDescription = Yup.object({
        description: Yup.string()
          .required('A Name is Required'),
    })
    
    return (
        <Wrapper>
            <CenterBar>
                <TasksToolbar>

                    <TasksToolbarTitleContainer>
                        {showAllTasks && (<TasksToolbarTitleItem><H2>Tasks</H2></TasksToolbarTitleItem>)}
                        
                        {activeList && !rename && !showAllTasks && (<TasksToolbarTitleItem><H2>{activeList.listName}</H2></TasksToolbarTitleItem>)}
                        {activeList && rename && !showAllTasks && (
                            <Formik
                            initialValues={{ listName: activeList.listName }}
                            validationSchema={validateRename}
                            onSubmit={(handleRename)}
                            >
                            {({values, errors}) => (
                                <Form>
                                    <Field placeholder="" autoComplete="off" name="listName" as={ListInput} /><br/>
                                </Form>
                            )}
                        </Formik>
                        )}
                        {!showAllTasks && (
                            <TasksToolbarTitleItem>
                                <H2><Img src={more} alt="" onClick={() => setShowOptions(!showOptions)} /></H2>
                                {showOptions && (
                                    <Options>
                                        <Actions onClick={(doRename)}>Rename List</Actions>
                                        <Actions onClick={(removeList)}><Warnning>Delete List</Warnning></Actions>
                                    </Options>
                                )}
                            </TasksToolbarTitleItem>
                        )}
                        
                        {activeList && !showAllTasks && (<Pagination listsPerPage={tasksPerPage} totalLists={totalTasks.getListsTotalTasks} setCurrentPage={setTaskCurrentPage} />)}
                        {activeList && showAllTasks && (<Pagination listsPerPage={tasksPerPage} totalLists={totalClientAllTasks.getTotalAllTasks} setCurrentPage={setCurrentTotalTaskPage} />)}
                    
                    </TasksToolbarTitleContainer>
                    
                    {changeLayout &&(
                        <TaskToolbarRight changeLayout>
                            <Img src={sort} alt="" />
                            <Button>Sort</Button>
                        </TaskToolbarRight>
                    )}

                    {!changeLayout &&(
                        <TaskToolbarRight>
                            <Img src={sort} alt="" />
                            <Button>Sort</Button>
                        </TaskToolbarRight>
                    )}
                    
                </TasksToolbar>

                {!showAllTasks && (
                <BaseAdd>
                    <Add>+</Add>
                    <Formik
                        initialValues={{ title: '' }}
                        validationSchema={validateNewTask}
                        onSubmit={(handleNewTask)}
                        >
                        {({values, errors}) => (
                            <Form>
                                <Field placeholder="Add a Task" autoComplete="off" name="title" as={Input} /><br/>
                            </Form>
                        )}
                    </Formik>
                </BaseAdd>
                )}
                
                {/* console.log(activeList) */}
                {listIsActive && !showAllTasks && (
                    <Tasks 
                        list={activeList.taskss}
                        setChangeLayout={setChangeLayout}
                        setActiveTask={setActiveTask}
                        loggedIdClient={loggedIdClient}
                    />
                )}
                {listIsActive && showAllTasks && (
                    <Tasks 
                        list={allTasksList}
                        setChangeLayout={setChangeLayout}
                        setActiveTask={setActiveTask}
                        loggedIdClient={loggedIdClient}
                    />
                )}

            </CenterBar>

            {changeLayout && (
                <DescriptionContainer>
                    <H2>{activeTask.title}</H2>
                    <Formik
                        initialValues={{ description: activeTask.description }}
                        validationSchema={validateNewDescription}
                        onSubmit={(handleNewDescription)}
                        >
                        {({values, errors}) => (
                            <Form>
                                <Field placeholder="Add a Description" autoComplete="off" name="description" as={Description} /><br/>
                            </Form>
                        )}
                    </Formik>
                    <Hide onClick={() => setChangeLayout(false)} src={hide} alt="" />
                    <Hide onClick={(handleDeleteTask)} src={deleteTask} alt=""/>
                </DescriptionContainer>
            )}
        </Wrapper>
        );
    }

    CenterColumn.propTypes = {
        lists: PropTypes.array,
        activeList: PropTypes.object,
        setChangeLayout: PropTypes.func,
        changeLayout: PropTypes.bool,
        refetch: PropTypes.func,
        setActiveList: PropTypes.func,
        setRename: PropTypes.func,
        rename: PropTypes.bool,
        showOptions: PropTypes.bool,
        setShowOptions: PropTypes.func,
        setPaginatedLists: PropTypes.func,
        showAllTasks: PropTypes.bool,
        loggedIdClient: PropTypes.number
    }
    
    export default CenterColumn;