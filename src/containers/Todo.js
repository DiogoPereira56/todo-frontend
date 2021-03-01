import styled from 'styled-components'
import '../fonts.css'
import CenterColumn from '../components/CenterColumn';
import SideBar from '../components/SideBar';
import TopNavbar from '../components/TopNavbar';

const Wrapper = styled.div`
  display: flex;
  flex: 1 1 0px;
  will-change: width;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
`

const Todo = () => {
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
