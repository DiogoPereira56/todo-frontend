import styled from 'styled-components'
import '../fonts.css'
import more from '../imgs/more.png'

//Wrapper that wrapps the rest of the code
const CenterBar = styled.div`
    color: #34373d;
    font-size: 1.4rem;
    font-weight: 500;
    background-color: transparent;
    margin-left: 290px;
`
const TasksToolbar = styled.div`
    display: block;
    padding: 12px 16px 0 16px;
    position: relative;
    flex-shrink: 0;
    margin: 0;
    text-decoration: none;
    user-select: none;
    text-rendering: optimizeLegibility;
`
const TasksToolbarTop = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 48px;
`

//List tittle
const TasksToolbarHeadline = styled.div`
    margin-right: 20px;
`
const TasksToolbarTitleContainer = styled.div`
    align-items: left;
    display: flex;
`
const TasksToolbarTitleItem = styled.div`
    min-width: 20px;
    margin-right: 20px;
    align-items: center;
`
const H2 = styled.h2`
    color: #3e69e4;
`
const Img = styled.img`
    width: 40px;
    
    &:hover{
        background: rgb(248, 248, 248);
    }
`

//Task Sorter
const TaskToolbarRight = styled.div`
    display: flex;
    text-align: right;
    margin-left:870px;
`
const TasksToolbarActions = styled.div`
    display: flex;
    align-items: center;
    flex: 1 1 auto;
    align-self: flex-end;
`
const TasksToolbarActionsItem = styled.div`
    align-self: flex-start;
    flex-shrink: 0;
    box-shadow: none;
    color: white;
    cursor: pointer;
    position: relative;
`
const Button = styled.button`
    padding: 2px 12px;
    margin-left: 2px;
    position: relative;
    cursor: pointer;
    color: #34373d;
    font-size: 1.4rem;
    line-height: 1.4rem;
    border: none;
    width: auto;
    height: auto;
    transition: background-color 100ms;
    border-radius: 2px;
    min-height: 32px;
    background: none;
    box-shadow: none;
    -webkit-font-smoothing: antialiased;
`

//Wrapper for tasks
const FlexContainer = styled.div`
    position: relative;
    flex: 1 1 0px;
    display: flex;

`
const FlexBoxFix = styled.div`
    flex-direction: column;
    display: flex;
    flex: 1;
`

const MainBackground = styled.div`
    position: relative;
    background: white;
    display: flex;
    flex-direction: column;
    flex: 1 1 0px;
`

//Add Tasks
const BaseAdd = styled.div`
    box-shadow: 0 17px 0 -16px #e5e5e5;
    padding: 0 13px;
    margin: 0 8px;
    overflow: hidden;
    position: relative;
    flex-shrink: 0;
    display: flex;
    align-items: center;
`
const Add = styled.button`
    width: 40px;
    height: 40px;
    padding: 4px;
    flex-shrink: 0;
    cursor: pointer;
    background: none;
    border: none;
    font-size: 25px;
`
const Input = styled.input`
    padding: 16px 12px;
    border: none !important;
    background: none !important;
    box-shadow: none !important;
    border-radius: 0 !important;
    font-size: 1.4rem;
    transition: none;
    color: #34373d;
    width: 100%;
    box-sizing: border-box;
    font-weight: 500;
    user-select: text;
`

//Tasks
const Task = styled.div`
    margin: 0 24px;
    flex: 1;
    background: linear-gradient( 180deg, white, white 52px, #e5e5e5 52px, #e5e5e5 52px );
    background-size: 100% 53px;
    box-shadow: inset 0 1px 0 0 #e5e5e5;
    padding: 10px;

    &:hover{
        background: #eeeeee;
    }
`
const CheckBox = styled.input`
    margin-right: 10px;
`
const CenterColumn = () => {
    return (
        <CenterBar>
            <TasksToolbar>
                <TasksToolbarTop>

                    <TasksToolbarHeadline>
                        <TasksToolbarTitleContainer>
                            <TasksToolbarTitleItem><H2>listName</H2></TasksToolbarTitleItem>
                            <TasksToolbarTitleItem><H2><Img src={more} alt="" /></H2></TasksToolbarTitleItem>
                        </TasksToolbarTitleContainer>
                    </TasksToolbarHeadline>

                    <TaskToolbarRight>
                        <TasksToolbarActions>
                            <TasksToolbarActionsItem>
                                <Button>Sort</Button>
                            </TasksToolbarActionsItem>
                        </TasksToolbarActions>
                    </TaskToolbarRight>

                </TasksToolbarTop>
            </TasksToolbar>

            <FlexContainer>
                <FlexBoxFix>
                    <MainBackground>

                        <BaseAdd>
                        <Add>+</Add>
                        <Input placeholder="Add a Task" />
                        </BaseAdd>
                        
                        <Task><CheckBox type="checkbox"/>task1</Task>
                        <Task><CheckBox type="checkbox"/>task2</Task>

                    </MainBackground>
                </FlexBoxFix>
            </FlexContainer>

        </CenterBar>
        );
    }
    
    export default CenterColumn;