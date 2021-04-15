import styled from 'styled-components'
import '../fonts.css'
import CenterColumn from '../components/CenterColumn/CenterColumn.js';
import SideBar from '../components/SideBar/SideBar.js';
import TopNavbar from '../components/TopNavbar/TopNavbar.js';
import { useQuery } from '@apollo/client';
import { DECODED_TOKEN, GET_CLIENT_INFORMATION } from '../graphQL/Queries';
import { useEffect, useState } from 'react';


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
  //Layout states
  const [showOptions, setShowOptions] = useState(false);
  const [rename, setRename] = useState(false);
  const [changeLayout, setChangeLayout] = useState(false);
  const [activeList, setActiveList] = useState();

  return (
    <div>
      {loadingAuth && (<div>Loading...</div>)}
      {errorAuth && (<div>You are Probably not logged in <br/><br/>Please go ahead and do it <a href='/'>here</a></div>)}
      {dataClient && ( <TopNavbar name={dataClient.getClientInformation.name}/> )}
      {dataClient && ( 
      <Wrapper>
        <SideBar 
          lists={dataClient.getClientInformation.lists} 
          refetch={refetch} 
          setActiveList={setActiveList}
          setChangeLayout={setChangeLayout}
          setRename={setRename}
          setShowOptions={setShowOptions}
        />
        
        <CenterColumn 
          lists={dataClient.getClientInformation.lists} 
          activeList={activeList}
          changeLayout={changeLayout}
          setChangeLayout={setChangeLayout}
          refetch={refetch}
          setActiveList={setActiveList}
          rename={rename}
          setRename={setRename}
          showOptions={showOptions}
          setShowOptions={setShowOptions}
        />
      </Wrapper>
      )}
    </div>
  );
}

export default Todo;
