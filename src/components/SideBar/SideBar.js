import {Wrapper, SideBar2, H2, Img, Li, P, Input, Ul} from './SideBar.styles'
import '../../fonts.css'
import menu from '../../imgs/menu.png'

const SideBar = () => {
    

    return (
        <Wrapper>
            <SideBar2>
                <H2><Img src={menu} alt="" /></H2>
                <Ul>
                    <Li><P>My day</P></Li>
                    <Li><P>Important</P></Li>
                    <Li><P>Planned</P></Li>
                    <Li><P>Assigned to you</P></Li>
                    <Li><P>Flagged email</P></Li>
                    <Li><P>Tasks</P></Li>
                </Ul> 
                <form>
                    <Input placeholder="+ New List"></Input>
                </form>
                {
                //{ error && <div>{ error }</div> }
                //{ isPending && <div>Loading...</div> }
                //{ listTasks && <BlogList listTasks={listTasks} /> }
                }
            </SideBar2>
        </Wrapper>
        );
    }
    
    export default SideBar;