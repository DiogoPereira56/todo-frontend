import {CenterBar, TasksToolbar, TasksToolbarTitleContainer, TasksToolbarTitleItem, H2, 
    Img, TaskToolbarRight, Button, BaseAdd, Add, Input, Task, CheckBox} from './CenterColumn.styles'
import '../../fonts.css'
import more from '../../imgs/more.png'
import sort from '../../imgs/sort.png'

const CenterColumn = () => {

    const changeLayout = () => {
        
    }
    return (
        <CenterBar>

            <TasksToolbar>

                <TasksToolbarTitleContainer>
                    <TasksToolbarTitleItem><H2>listName</H2></TasksToolbarTitleItem>
                    <TasksToolbarTitleItem><H2><Img src={more} alt="" /></H2></TasksToolbarTitleItem>
                </TasksToolbarTitleContainer>
                
                <TaskToolbarRight>
                    <Img src={sort} alt="" />
                    <Button>Sort</Button>
                </TaskToolbarRight>

            </TasksToolbar>

            <BaseAdd>
                <Add>+</Add>
                <Input placeholder="Add a Task" />
            </BaseAdd>
            
            <Task onClick={() => changeLayout()}><CheckBox type="checkbox"/>task1</Task>
            <Task onClick={() => changeLayout()}><CheckBox type="checkbox"/>task2</Task>

        </CenterBar>
        );
    }
    
    export default CenterColumn;