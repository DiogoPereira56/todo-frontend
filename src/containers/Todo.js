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

    const {error, loading, data} = useQuery(DECODED_TOKEN);
  
  useEffect(() => {
    console.log(data);
    /* console.log(data.getDecodedToken.id); */
  })

  return (
    <div>
      {loading && (<div>Loading...</div>)}
      {error && (<div>{error.message} Error, <br/><br/>Please try again later</div>)}
      {data && (data!='invalid') && ( <TopNavbar /> )}
      {data && (data!='invalid') && ( 
      <Wrapper>
        <SideBar />
        <CenterColumn />
      </Wrapper>
      )}
    </div>
  );
}

export default Todo;
