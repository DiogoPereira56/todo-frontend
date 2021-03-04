import styled from 'styled-components'
import '../fonts.css'
import CenterColumn from '../components/CenterColumn/CenterColumn.js';
import SideBar from '../components/SideBar/SideBar.js';
import TopNavbar from '../components/TopNavbar/TopNavbar.js';
//import useFetch from "../components/useFetch";

const Wrapper = styled.div`
  display: flex;
  flex: 1 1 0px;
  will-change: width;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
`

const Todo = () => {
  //const { error, isPending, data: tasks } = useFetch('http://localhost:8000/tasks')
  return (
    <div>
      <TopNavbar />
      <Wrapper>
        <SideBar />
        <CenterColumn />
      </Wrapper>
    </div>
  );
}

export default Todo;
