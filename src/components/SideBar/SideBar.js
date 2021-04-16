import {Wrapper, SideBar2, H2, Img, Li, P, Input, Ul} from './SideBar.styles'
import '../../fonts.css'
import menu from '../../imgs/menu.png'
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_LISTS } from '../../graphQL/Queries';
import ListOfTasks from './ListOfTasks';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { NEW_LIST_MUTATION } from '../../graphQL/Mutations';
import { PropTypes } from 'prop-types'
import { useEffect, useState } from 'react';
import { array } from 'yup/lib/locale';
import Pagination from '../Pagination';

const SideBar = ({ lists, refetch, setActiveList, setChangeLayout, setRename, setShowOptions }) => {
    
    const [makeNewList, { errorNewList }] = useMutation(NEW_LIST_MUTATION);
    //todo: try and change 'refetch', to 'cache'
    //const {error, loading, data, refetch} = useQuery(GET_ALL_LISTS);

    //Pagination States
    const [currentPage, setCurrentPage] = useState(1);
    const [listsPerPage, setListsPerPage] = useState(5);

    const indexOfLastList = currentPage * listsPerPage;
    const indexOfFirstList = indexOfLastList - listsPerPage;
    const currentShownLists = lists.slice(indexOfFirstList, indexOfLastList);

    useEffect(() => {
        if(lists)
            setActiveList(lists[0]);
    }, [])

    const handleNewList = (values) => {
        makeNewList({variables: values })
        .then(data => {
            if (!data.data) {
            console.log('something went wrong');
            }
            else
            console.log(data.data);
        });
        refetch();
        values.listName = '';
    
    }

    if(errorNewList){
        return <div>error...</div>
    }

    const validateNewList = Yup.object({
        listName: Yup.string()
          .required('A Name is Required'),
    })

    return (
        <Wrapper>
            <SideBar2>
                <H2><Img src={menu} alt="" /></H2>
                <Ul>
                    <Li><P>My day</P></Li>
                    <Li><P>Important</P></Li>
                    <Li><P>Planned</P></Li>
                    <Li><P>Assigned to you</P></Li>
                    <Li><P>Flagged email</P></Li>
                    <Li><P>Tasks</P></Li>
                </Ul>

                <ListOfTasks 
                    lists={currentShownLists} 
                    setActiveList={setActiveList}
                    setChangeLayout={setChangeLayout}
                    setRename={setRename}
                    setShowOptions={setShowOptions}
                />
                
                <Formik
                    initialValues={{ listName: '' }}
                    validationSchema={validateNewList}
                    onSubmit={(handleNewList)}
                    >
                    {({values, errors}) => (
                        <Form>
                            <Field placeholder=" +  New List" autoComplete="off" name="listName" as={Input} /><br/>
                        </Form>
                    )}
                </Formik>

                <Pagination listsPerPage={listsPerPage} totalLists={lists.length} setCurrentPage={setCurrentPage} />
                
            </SideBar2>
        </Wrapper>
        );
    }

    SideBar.propTypes = {
        lists: PropTypes.array,
        refetch: PropTypes.func,
        setActiveList: PropTypes.func,
        lista: PropTypes.object,
        setChangeLayout: PropTypes.func,
        setRename: PropTypes.func,
        setShowOptions: PropTypes.func
    }
    
    export default SideBar;