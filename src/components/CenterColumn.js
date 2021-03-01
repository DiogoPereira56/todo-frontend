import {CenterBar, TasksToolbar, TasksToolbarTop, TasksToolbarHeadline, TasksToolbarTitleContainer, TasksToolbarTitleItem, H2, 
    Img, TaskToolbarRight, TasksToolbarActions, TasksToolbarActionsItem, Button, FlexContainer, FlexBoxFix, MainBackground, 
    BaseAdd, Add, Input, Task, CheckBox} from './CenterColumn.styles'
import '../fonts.css'
import more from '../imgs/more.png'

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