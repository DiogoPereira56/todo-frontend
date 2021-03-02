import styled from 'styled-components'
import '../fonts.css'
import CenterColumn from '../components/CenterColumn';
import SideBar from '../components/SideBar';
import TopNavbar from '../components/TopNavbar';
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
  //const { error, isPending, data: blogs } = useFetch('http://localhost:8000/blogs')
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
