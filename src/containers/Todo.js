import styled from 'styled-components'
import '../fonts.css'
import CenterColumn from '../components/CenterColumn/CenterColumn.js';
import SideBar from '../components/SideBar/SideBar.js';
import TopNavbar from '../components/TopNavbar/TopNavbar.js';
import { useMutation, useQuery } from '@apollo/client';
import { DECODED_TOKEN, GET_CLIENT_INFORMATION } from '../graphQL/Queries';
import { useEffect, useState } from 'react';
import { CLIENT_LISTS_MUTATION, LIST_INFO_MUTATION } from '../graphQL/Mutations';


const Wrapper = styled.div`
  display: flex;
  flex: 1 1 0px;
  will-change: width;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
`

const Todo = () => {
  //Queries
  const {error: errorAuth, loading: loadingAuth, data: dataClient, refetch} = useQuery(GET_CLIENT_INFORMATION);
  //Mutations
  const [getClientLists] = useMutation(CLIENT_LISTS_MUTATION);
  const [getListTasks] = useMutation(LIST_INFO_MUTATION);
  //Layout states
  const [showOptions, setShowOptions] = useState(false);
  const [rename, setRename] = useState(false);
  const [changeLayout, setChangeLayout] = useState(false);
  const [activeList, setActiveList] = useState();
  //Paginated states
  const [currentPage, setCurrentPage] = useState(1);
  const [listsPerPage, setListsPerPage] = useState(5);
  const [paginatedLists, setPaginatedLists] = useState();

    function changePaginatedLists() {

        const offset = listsPerPage * (currentPage - 1);
        getClientLists({variables: {limit: listsPerPage, offset: offset}})
        .then( data => {
            if (!data.data) {
                console.log('something went wrong');
            } else{
                setPaginatedLists(data.data.getClientInformations.list);
                getListTasks({variables: {
                    idList: data.data.getClientInformations.list[0].idList,
                    idClient: data.data.getClientInformations.list[0].idClient,
                    limit: 11,
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
    }

    useEffect(() => {
      changePaginatedLists();

    }, [currentPage])

  return (
    <div>
      {loadingAuth && (<div>Loading...</div>)}
      {errorAuth && (<div>You are Probably not logged in <br/><br/>Please go ahead and do it <a href='/'>here</a></div>)}
      {dataClient && ( <TopNavbar name={dataClient.getClientInformation.name}/> )}
      {dataClient && ( 
      <Wrapper>
        <SideBar 
          lists={paginatedLists} 
          refetch={refetch} 
          setActiveList={setActiveList}
          setChangeLayout={setChangeLayout}
          setRename={setRename}
          setShowOptions={setShowOptions}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          listsPerPage={listsPerPage}
          setPaginatedLists={setPaginatedLists}
        />
        
        <CenterColumn 
          lists={paginatedLists} 
          activeList={activeList}
          changeLayout={changeLayout}
          setChangeLayout={setChangeLayout}
          refetch={refetch}
          setActiveList={setActiveList}
          rename={rename}
          setRename={setRename}
          showOptions={showOptions}
          setShowOptions={setShowOptions}
          setPaginatedLists={setPaginatedLists}
        />
      </Wrapper>
      )}
    </div>
  );
}

export default Todo;
