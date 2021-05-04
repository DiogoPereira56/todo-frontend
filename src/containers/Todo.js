/* eslint-disable no-unused-vars */
import '../fonts.css';
import { Wrapper, NoList, H2, Unauthorized, A, P } from '../components/Todo.styles';
import SimpleHeader from '../components/SimpleHeader.js';
import CenterColumn from '../components/CenterColumn/CenterColumn.js';
import SideBar from '../components/SideBar/SideBar.js';
import TopNavbar from '../components/TopNavbar/TopNavbar.js';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CLIENT_INFORMATION } from '../graphQL/Queries';
import { useEffect, useState } from 'react';
import {
    CLIENT_LISTS_MUTATION,
    LIST_INFO_MUTATION,
    SEARCHED_TASKS_MUTATION,
    TOTAL_SEARCHED_TASKS_MUTATION,
} from '../graphQL/Mutations';

const Todo = () => {
    //Queries
    const { error: errorAuth, loading: loadingAuth, data: dataClient } = useQuery(GET_CLIENT_INFORMATION);
    //Mutations
    const [getClientLists] = useMutation(CLIENT_LISTS_MUTATION, {
        onError() {
            console.log('error');
        },
    });
    const [getListTasks] = useMutation(LIST_INFO_MUTATION);
    const [getSearchedTasks] = useMutation(SEARCHED_TASKS_MUTATION);
    const [getTotalSearchedTasks] = useMutation(TOTAL_SEARCHED_TASKS_MUTATION);
    //Layout states
    const [showOptions, setShowOptions] = useState(false);
    const [rename, setRename] = useState(false);
    const [changeLayout, setChangeLayout] = useState(false);
    const [activeList, setActiveList] = useState();
    const [showAllTasks, setShowAllTasks] = useState(false);
    const [orderByTitle, setOrderByTitle] = useState(false);
    const [searchIsActive, setSearchIsActive] = useState(false);
    //Paginated states
    const [currentPage, setCurrentPage] = useState(1);
    const [currentTaskPage, setCurrentTaskPage] = useState(1);
    const [listsPerPage] = useState(10);
    const [tasksPerPage] = useState(13);
    const [currentSearchedTasksPage, setCurrentSearchedTasksPage] = useState(1);
    const [paginatedLists, setPaginatedLists] = useState();
    const [searchedTasks, setSearchedTasks] = useState();
    const [totalSearchedTasks, setTotalSearchedTasks] = useState(1);
    const [totalLists, setTotalLists] = useState(1);
    //Other States
    const [loggedIdClient, setLoggedIdClient] = useState();
    const [search, setSearch] = useState();
    const [order, setOrder] = useState('ASC');

    function changePaginatedLists() {
        const offset = listsPerPage * (currentPage - 1);
        getClientLists({ variables: { limit: listsPerPage, offset: offset } }).then((data) => {
            if (data.data) {
                setPaginatedLists(data.data.getClientInformations.list);
                setLoggedIdClient(data.data.getClientInformations.idClient);
                if (data.data.getClientInformations.list[0]) {
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
            }
        });
    }

    /* function searchTasks() {
        const offset = tasksPerPage * (currentSearchedTasksPage - 1);
        getSearchedTasks({
            variables: {
                limit: tasksPerPage,
                offset: offset,
                idClient: loggedIdClient,
                orderByTitle: orderByTitle,
                search: search,
            },
        }).then((data) => {
            console.log(data.data.getSearchedTasks);
            setSearchedTasks(data.data.getSearchedTasks);
        });
    } */

    const doTotalSearchedTasks = (values) => {
        getTotalSearchedTasks({ variables: { idClient: loggedIdClient, search: values.search } }).then(
            (data) => {
                //console.log(data.data.getTotalSearchedTasks);
                setTotalSearchedTasks(data.data.getTotalSearchedTasks);
            },
        );
    };

    const handleSearchedTasks = (values) => {
        setCurrentSearchedTasksPage(1);
        setSearch(values.search);
        const offset = tasksPerPage * (currentSearchedTasksPage - 1);
        getSearchedTasks({
            variables: {
                limit: tasksPerPage,
                offset: offset,
                idClient: loggedIdClient,
                orderByTitle: orderByTitle,
                search: values.search,
                order: order,
            },
        }).then((data) => {
            //console.log(data.data.getSearchedTasks);
            setSearchedTasks(data.data.getSearchedTasks);
        });
        setSearchIsActive(true);
        setShowAllTasks(false);
        doTotalSearchedTasks(values);
    };

    useEffect(() => {
        changePaginatedLists();
    }, [currentPage]);

    return (
        <div>
            {loadingAuth && <div>Loading...</div>}
            {errorAuth && (
                <div>
                    <SimpleHeader />
                    <Unauthorized>
                        <P>You are Probably not logged in</P>
                        <br />
                        <P>
                            Please go ahead and do it <A href="/">here</A>
                        </P>
                    </Unauthorized>
                </div>
            )}
            {dataClient && (
                <TopNavbar
                    name={dataClient.getClientInformation.name}
                    handleSearchedTasks={handleSearchedTasks}
                />
            )}
            {dataClient && (
                <Wrapper>
                    <SideBar
                        lists={paginatedLists}
                        setActiveList={setActiveList}
                        setChangeLayout={setChangeLayout}
                        setRename={setRename}
                        setShowOptions={setShowOptions}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                        listsPerPage={listsPerPage}
                        setPaginatedLists={setPaginatedLists}
                        setShowAllTasks={setShowAllTasks}
                        orderByTitle={orderByTitle}
                        setSearchIsActive={setSearchIsActive}
                        order={order}
                        setTotalLists={setTotalLists}
                        totalLists={totalLists}
                        setCurrentTaskPage={setCurrentTaskPage}
                    />

                    {!activeList && (
                        <NoList>
                            <H2>You Still Haven&apos;t created any List, try doing so in the side bar</H2>
                        </NoList>
                    )}
                    {activeList && (
                        <CenterColumn
                            lists={paginatedLists}
                            activeList={activeList}
                            changeLayout={changeLayout}
                            setChangeLayout={setChangeLayout}
                            setActiveList={setActiveList}
                            rename={rename}
                            setRename={setRename}
                            showOptions={showOptions}
                            setShowOptions={setShowOptions}
                            setPaginatedLists={setPaginatedLists}
                            showAllTasks={showAllTasks}
                            loggedIdClient={loggedIdClient}
                            setOrderByTitle={setOrderByTitle}
                            orderByTitle={orderByTitle}
                            searchedTasks={searchedTasks}
                            currentSearchedTasksPage={currentSearchedTasksPage}
                            searchIsActive={searchIsActive}
                            search={search}
                            setSearchedTasks={setSearchedTasks}
                            setCurrentSearchedTasksPage={setCurrentSearchedTasksPage}
                            totalSearchedTasks={totalSearchedTasks}
                            order={order}
                            setOrder={setOrder}
                            setTotalLists={setTotalLists}
                            currentTaskPage={currentTaskPage}
                            setCurrentTaskPage={setCurrentTaskPage}
                        />
                    )}
                </Wrapper>
            )}
        </div>
    );
};

export default Todo;
