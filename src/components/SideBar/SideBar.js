import {Wrapper, SideBar2, H2, Img, Li, P, Input, Ul} from './SideBar.styles'
import '../../fonts.css'
import menu from '../../imgs/menu.png'
import { useMutation, useQuery } from '@apollo/client';
import ListOfTasks from './ListOfTasks';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { NEW_LIST_MUTATION, CLIENT_LISTS_MUTATION } from '../../graphQL/Mutations';
import { GET_CLIENT_TOTAL_LISTS } from '../../graphQL/Queries';
import { PropTypes } from 'prop-types'
import Pagination from '../Pagination';

const SideBar = ({ lists, setActiveList, setChangeLayout, setRename, 
    setShowOptions, setCurrentPage, currentPage, listsPerPage, setPaginatedLists, setShowAllTasks }) => {
    
    const { data: totalLists} = useQuery(GET_CLIENT_TOTAL_LISTS);
    const [makeNewList, { errorNewList }] = useMutation(NEW_LIST_MUTATION);
    const [getClientLists] = useMutation(CLIENT_LISTS_MUTATION);
    //todo: try and change 'refetch', to 'cache'
    //const {error, loading, data, refetch} = useQuery(GET_ALL_LISTS);

    function changePaginatedLists() {

        const offset = listsPerPage * (currentPage - 1);
        getClientLists({variables: {limit: listsPerPage, offset: offset}})
        .then( data => {
            if (!data.data) {
                console.log('something went wrong');
            } else{
                //console.log(data.data.getClientInformations.list)
                setPaginatedLists(data.data.getClientInformations.list);
            }
        })
    }

    const handleNewList = (values) => {
        makeNewList({variables: values })
        .then(data => {
            if (!data.data) {
            console.log('something went wrong');
            }
            else
            console.log(data.data);
            changePaginatedLists();
        });
        //refetch();
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
                    <Li onClick={() => setShowAllTasks(true)}><P>All Tasks</P></Li>
                </Ul>

                    {lists && (
                    <ListOfTasks 
                        lists={lists} 
                        setActiveList={setActiveList}
                        setChangeLayout={setChangeLayout}
                        setRename={setRename}
                        setShowOptions={setShowOptions}
                        setShowAllTasks={setShowAllTasks}
                    />)}
                
                <Formik
                    initialValues={{ listName: '' }}
                    validationSchema={validateNewList}
                    onSubmit={(handleNewList)}
                    >
                    {() => (
                        <Form>
                            <Field placeholder=" +  New List" autoComplete="off" name="listName" as={Input} /><br/>
                        </Form>
                    )}
                </Formik>

                {/* console.log(totalLists) */}
                {totalLists && (
                <Pagination 
                    listsPerPage={listsPerPage} 
                    totalLists={totalLists.getClientTotalLists} 
                    setCurrentPage={setCurrentPage} 
                />)}
                
            </SideBar2>
        </Wrapper>
        );
    }

    SideBar.propTypes = {
        lists: PropTypes.array,
        setActiveList: PropTypes.func,
        lista: PropTypes.object,
        setChangeLayout: PropTypes.func,
        setRename: PropTypes.func,
        setShowOptions: PropTypes.func,
        setCurrentPage: PropTypes.func,
        currentPage: PropTypes.number,
        listsPerPage: PropTypes.number,
        setPaginatedLists: PropTypes.func,
        setShowAllTasks: PropTypes.func
    }
    
    export default SideBar;