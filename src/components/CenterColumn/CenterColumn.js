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
    UPDATE_TASK_DESCRIPTION_MUTATION, DELETE_TASK_MUTATION } from '../../graphQL/Mutations'
import Tasks from './Tasks'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup';

const CenterColumn = ({ lists, activeList, setChangeLayout, changeLayout, refetch, setActiveList, rename, setRename}) => {

    const [showOptions, setShowOptions] = useState(false);
    const [listIsActive, setListIsActive] = useState(false);
    const [activeTask, setActiveTask] = useState();
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
                console.log(data.data);
                refetch();
                setActiveList(lists[0]);
                setShowOptions(false);
            }
        });
    }

    const handleRename = (values) => {
        const newValue = {idList: activeList.idList, title: values.listName, idClient: activeList.idClient}
        newName({variables: newValue })
        .then(data => {
            if (data.data.updateList) {
                refetch();
                setActiveList(data.data.updateList);
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
            else
                console.log(data.data);
            refetch();
        });
        
        values.title = '';
    }

    const handleNewDescription = (values) => {
        const {idTask} = activeTask 
        const {idClient} = activeList
        const task = { idTask: idTask, description: values.description, idClient: idClient }
        updateDescription({variables: task})
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
                refetch();
                setChangeLayout(false);
            }
        });
        
    }

    const doRename = () => {
        setShowOptions(false)
        setRename(!rename)
    }

    useEffect(() => {
        if(activeList){
            setListIsActive(true);
        }

    }, [activeList])
    
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
                        {activeList && !rename && (<TasksToolbarTitleItem><H2>{activeList.listName}</H2></TasksToolbarTitleItem>)}
                        {activeList && rename && (
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
                        <TasksToolbarTitleItem>
                            <H2><Img src={more} alt="" onClick={() => setShowOptions(!showOptions)} /></H2>
                            {showOptions && (
                                <Options>
                                    <Actions onClick={(doRename)}>Rename List</Actions>
                                    <Actions onClick={(removeList)}><Warnning>Delete List</Warnning></Actions>
                                </Options>
                            )}
                        </TasksToolbarTitleItem>
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
                
                {listIsActive && (<Tasks list={activeList} setChangeLayout={setChangeLayout} setActiveTask={setActiveTask} /> )}

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
        rename: PropTypes.bool
    }
    
    export default CenterColumn;