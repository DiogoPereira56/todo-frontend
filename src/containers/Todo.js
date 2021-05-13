/* eslint-disable no-unused-vars */
import '../fonts.css';
import { Wrapper, Unauthorized, A, P, FixPosition } from '../components/Todo.styles';
import SimpleHeader from '../components/SimpleHeader.js';
import CenterColumn from '../components/CenterColumn/CenterColumn.js';
import SideBar from '../components/SideBar/SideBar.js';
import TopNavbar from '../components/TopNavbar/TopNavbar.js';
import { useLazyQuery, useQuery } from '@apollo/client';
import {
    GET_CLIENT,
    GET_LIST_TASKS,
    CLIENT_TOTAL_LISTS,
    SEARCHED_TASKS,
    TOTAL_SEARCHED_TASKS,
} from '../graphQL/Queries';
import { useEffect, useState } from 'react';

const Todo = () => {
    //queries
    const [loadSearchedTasks, { loading: loadingSearchedTasks, data: searchedTasks }] = useLazyQuery(
        SEARCHED_TASKS,
    );
    const [loadTotalSearchedTasks, { data: totalSearchedTasks }] = useLazyQuery(TOTAL_SEARCHED_TASKS);
    //Layout states
    const [showOptions, setShowOptions] = useState(false);
    const [rename, setRename] = useState(false);
    const [changeLayout, setChangeLayout] = useState(false);
    const [showAllTasks, setShowAllTasks] = useState(false);
    const [orderByTitle, setOrderByTitle] = useState(false);
    const [searchIsActive, setSearchIsActive] = useState(false);
    const [hideSideBar, setHideSideBar] = useState(false);
    //Paginated states
    const [currentPage, setCurrentPage] = useState(1);
    const [currentTaskPage, setCurrentTaskPage] = useState(1);
    const [listsPerPage] = useState(10);
    const [tasksPerPage] = useState(13);
    const [currentSearchedTasksPage, setCurrentSearchedTasksPage] = useState(1);
    //Other States
    const [search, setSearch] = useState();
    const [order, setOrder] = useState('ASC');
    //Queries
    const { error: errorAuth, loading: loadingAuth, data: dataClient, refetch: refetchLists } = useQuery(
        GET_CLIENT,
        {
            variables: { limit: listsPerPage, offset: listsPerPage * (currentPage - 1) },
        },
    );
    const [
        loadListInfo,
        { loading: loadingListInfo, data: listInfo, fetchMore: fetchMoreListInfo },
    ] = useLazyQuery(GET_LIST_TASKS);
    const { data: dataTotalLists } = useQuery(CLIENT_TOTAL_LISTS);

    const doTotalSearchedTasks = (values) => {
        loadTotalSearchedTasks({
            variables: { idClient: dataClient.getClientInformation.idClient, search: values.search },
        });
    };

    const handleSearchedTasks = (values) => {
        setCurrentSearchedTasksPage(1);
        setSearch(values.search);
        const offset = tasksPerPage * (currentSearchedTasksPage - 1);
        loadSearchedTasks({
            variables: {
                limit: tasksPerPage,
                offset: offset,
                idClient: dataClient.getClientInformation.idClient,
                orderByTitle: orderByTitle,
                search: values.search,
                order: order,
            },
        });
        setSearchIsActive(true);
        setShowAllTasks(false);
        doTotalSearchedTasks(values);
    };

    useEffect(() => {
        refetchLists();
    }, [currentPage]);
    //console.log(dataClient);

    return (
        <div>
            {loadingAuth && <div>Loading...</div>}
            {errorAuth && (
                <div>
                    <div>
                        <SimpleHeader />
                    </div>
                    <Unauthorized>
                        <P>
                            You are Probably not logged in
                            <br />
                            <br />
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
            {dataClient && dataTotalLists && (
                <Wrapper>
                    <SideBar
                        setChangeLayout={setChangeLayout}
                        setRename={setRename}
                        setShowOptions={setShowOptions}
                        setCurrentPage={setCurrentPage}
                        listsPerPage={listsPerPage}
                        setShowAllTasks={setShowAllTasks}
                        orderByTitle={orderByTitle}
                        setSearchIsActive={setSearchIsActive}
                        order={order}
                        totalLists={dataTotalLists.getTotalLists}
                        setCurrentTaskPage={setCurrentTaskPage}
                        dataClient={dataClient.getClientInformation}
                        loadListInfo={loadListInfo}
                        currentPage={currentPage}
                        hideSideBar={hideSideBar}
                        setHideSideBar={setHideSideBar}
                    />

                    {dataClient && (
                        <CenterColumn
                            changeLayout={changeLayout}
                            setChangeLayout={setChangeLayout}
                            rename={rename}
                            setRename={setRename}
                            showOptions={showOptions}
                            setShowOptions={setShowOptions}
                            showAllTasks={showAllTasks}
                            setOrderByTitle={setOrderByTitle}
                            orderByTitle={orderByTitle}
                            searchedTasks={searchedTasks}
                            currentSearchedTasksPage={currentSearchedTasksPage}
                            searchIsActive={searchIsActive}
                            search={search}
                            loadSearchedTasks={loadSearchedTasks}
                            setCurrentSearchedTasksPage={setCurrentSearchedTasksPage}
                            totalSearchedTasks={totalSearchedTasks}
                            order={order}
                            setOrder={setOrder}
                            currentTaskPage={currentTaskPage}
                            setCurrentTaskPage={setCurrentTaskPage}
                            dataClient={dataClient.getClientInformation}
                            refetchLists={refetchLists}
                            currentPage={currentPage}
                            loadListInfo={loadListInfo}
                            listInfo={listInfo}
                            loadingListInfo={loadingListInfo}
                            fetchMoreListInfo={fetchMoreListInfo}
                            hideSideBar={hideSideBar}
                        />
                    )}
                </Wrapper>
            )}
        </div>
    );
};

export default Todo;
