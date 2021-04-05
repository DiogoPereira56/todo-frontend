import styled from 'styled-components'
import '../fonts.css'
import CenterColumn from '../components/CenterColumn/CenterColumn.js';
import SideBar from '../components/SideBar/SideBar.js';
import TopNavbar from '../components/TopNavbar/TopNavbar.js';
import { useQuery } from '@apollo/client';
import { DECODED_TOKEN } from '../graphQL/Queries';
import { useEffect } from 'react';


const Wrapper = styled.div`
  display: flex;
  flex: 1 1 0px;
  will-change: width;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
`

const Todo = () => {

  const {error: errorAuth, loading: loadingAuth, data: dataAuth} = useQuery(DECODED_TOKEN);
  /* const [decoded, {loading}] = useLazyQuery(DECODED_TOKEN); */
  /* const {error, loading, data: lists, refetch} = useQuery(GET_ALL_LISTS); */
  
  /* useEffect(() => {
    
  }, []) */

  /* if(loading){
    return <div>loading...</div>
  }
  if(error){
      return <div>error...</div>
  } */

  return (
    <div>
      {loadingAuth && (<div>Loading...</div>)}
      {errorAuth && (<div>{errorAuth.message} Error, <br/><br/>Please try again later</div>)}
      {dataAuth && ( <TopNavbar /> )}
      {dataAuth && ( 
      <Wrapper>
        <SideBar />
        <CenterColumn />
      </Wrapper>
      )}
    </div>
  );
}

export default Todo;
