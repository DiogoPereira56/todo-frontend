/* eslint-disable no-unused-vars */
import { Wrapper, SideBar2, H2, Img, Li, P, Input, Ul, PaginationPosition } from './SideBar.styles';
import '../../fonts.css';
import menu from '../../imgs/menu.png';
import { gql, useMutation, useQuery } from '@apollo/client';
import ListOfTasks from './ListOfTasks';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { NEW_LIST_MUTATION, CLIENT_LISTS_MUTATION, GET_CLIENT_TOTAL_LISTS } from '../../graphQL/Mutations';
//import { GET_CLIENT_TOTAL_LISTS } from '../../graphQL/Queries';
import { PropTypes } from 'prop-types';
import Pagination from '../Pagination';
import { useEffect } from 'react';
import { GET_CLIENT, GET_CLIENT_INFORMATION } from '../../graphQL/Queries';

const SideBar = ({
    setActiveList,
    setChangeLayout,
    setRename,
    setShowOptions,
    setCurrentPage,
    currentPage,
    listsPerPage,
    setPaginatedLists,
    setShowAllTasks,
    orderByTitle,
    setSearchIsActive,
    order,
    setTotalLists,
    totalLists,
    refetchTotalLists,
    setCurrentTaskPage,
    dataClient,
    loadListInfo,
}) => {
    //const { data: totalLists } = useQuery(GET_CLIENT_TOTAL_LISTS);
    const [getTotalLists] = useMutation(GET_CLIENT_TOTAL_LISTS);

    const [makeNewList, { error: errorNewList }] = useMutation(NEW_LIST_MUTATION, {
        update: (cache, { data }) => {
            const newListFromResponse = data?.addList;
            const existingLists = cache.readQuery({
                query: GET_CLIENT,
                variables: { limit: listsPerPage, offset: 0 },
            });
            console.log(existingLists);

            cache.writeQuery({
                query: GET_CLIENT,
                data: {
                    getClientInformation: [...existingLists?.getClientInformation.list, newListFromResponse],
                },
                variables: { limit: listsPerPage, offset: 0 },
            });
        },
    });
    const [getClientLists] = useMutation(CLIENT_LISTS_MUTATION);
    //todo: try and change 'refetch', to 'cache'
    //const {error, loading, data, refetch} = useQuery(GET_ALL_LISTS);

    function changePaginatedLists() {
        const offset = listsPerPage * (currentPage - 1);
        getClientLists({ variables: { limit: listsPerPage, offset: offset } }).then((data) => {
            if (!data.data) {
                console.log('something went wrong');
            } else {
                //console.log(data.data.getClientInformations.list)
                setPaginatedLists(data.data.getClientInformations.list);
            }
        });
    }

    const doTotalLists = () => {
        getTotalLists().then((data) => {
            //console.log(data.data.getClientTotalLists);
            setTotalLists(data.data.getClientTotalLists);
        });
    };

    useEffect(() => {
        doTotalLists();
    }, []);

    //console.log(dataClient);
    const handleNewList = (values) => {
        makeNewList({ variables: values }).then((data) => {
            if (!data.data) {
                console.log('something went wrong');
            } else {
                //console.log(data.data);
                /* doTotalLists();
                    changePaginatedLists(); */
                refetchTotalLists();
            }
        });
        //.then(console.log(dataClient));
        values.listName = '';
    };

    function doShowAllTasks() {
        setShowAllTasks(true);
        setChangeLayout(false);
        setSearchIsActive(false);
    }

    if (errorNewList) {
        console.log(errorNewList);
        return <div>error...</div>;
    }

    const validateNewList = Yup.object({
        listName: Yup.string().required('A Name is Required'),
    });

    return (
        <Wrapper>
            <SideBar2>
                <H2>
                    <Img src={menu} alt="" />
                </H2>
                <Ul>
                    <Li onClick={() => doShowAllTasks()}>
                        <P>All Tasks</P>
                    </Li>
                </Ul>

                {dataClient && (
                    <ListOfTasks
                        lists={dataClient.list}
                        setActiveList={setActiveList}
                        setChangeLayout={setChangeLayout}
                        setRename={setRename}
                        setShowOptions={setShowOptions}
                        setShowAllTasks={setShowAllTasks}
                        orderByTitle={orderByTitle}
                        setSearchIsActive={setSearchIsActive}
                        order={order}
                        setCurrentTaskPage={setCurrentTaskPage}
                        loadListInfo={loadListInfo}
                    />
                )}

                <Formik
                    initialValues={{ listName: '' }}
                    validationSchema={validateNewList}
                    onSubmit={handleNewList}
                >
                    {() => (
                        <Form>
                            <Field placeholder=" +  New List" autoComplete="off" name="listName" as={Input} />
                            <br />
                        </Form>
                    )}
                </Formik>

                {/* console.log(totalLists) */}
                {totalLists && (
                    <PaginationPosition>
                        <Pagination
                            listsPerPage={listsPerPage}
                            //totalLists={totalLists.getClientTotalLists}
                            totalLists={totalLists}
                            setCurrentPage={setCurrentPage}
                        />
                    </PaginationPosition>
                )}

                {/* dataClient && dataClient.list.map((list) => <P key={list.idList}>{list.listName}</P>) */}
            </SideBar2>
        </Wrapper>
    );
};

SideBar.propTypes = {
    setActiveList: PropTypes.func,
    lista: PropTypes.object,
    setChangeLayout: PropTypes.func,
    setRename: PropTypes.func,
    setShowOptions: PropTypes.func,
    setCurrentPage: PropTypes.func,
    currentPage: PropTypes.number,
    listsPerPage: PropTypes.number,
    setPaginatedLists: PropTypes.func,
    setShowAllTasks: PropTypes.func,
    orderByTitle: PropTypes.bool,
    setSearchIsActive: PropTypes.func,
    order: PropTypes.string,
    setTotalLists: PropTypes.func,
    totalLists: PropTypes.number,
    refetchTotalLists: PropTypes.func,
    setCurrentTaskPage: PropTypes.func,
    dataClient: PropTypes.object,
    loadListInfo: PropTypes.func,
};

export default SideBar;
