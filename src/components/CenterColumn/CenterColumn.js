import {CenterBar, TasksToolbar, TasksToolbarTitleContainer, TasksToolbarTitleItem, H2, 
    Img, TaskToolbarRight, Button, BaseAdd, Add, Input, Task, CheckBox, ChangeTask,
    DescriptionContainer, Description, Wrapper, Hide} from './CenterColumn.styles'
import '../../fonts.css'
import more from '../../imgs/more.png'
import sort from '../../imgs/sort.png'
import { useState } from 'react';
import hide from '../../imgs/hide.png'

const CenterColumn = () => {

    const [changeLayout, setChangeLayout] = useState(false);

    return (
        <Wrapper>
            <CenterBar>
                <TasksToolbar>

                    <TasksToolbarTitleContainer>
                        <TasksToolbarTitleItem><H2>listName</H2></TasksToolbarTitleItem>
                        <TasksToolbarTitleItem><H2><Img src={more} alt="" /></H2></TasksToolbarTitleItem>
                    </TasksToolbarTitleContainer>
                    
                    {changeLayout &&(
                        <TaskToolbarRight changeLayout>
                        <Img src={sort} alt="" />
                        <Button>Sort</Button>
                    </TaskToolbarRight>
                    )}

                    {!changeLayout &&(
                        <TaskToolbarRight>
                        <Img src={sort} alt="" />
                        <Button>Sort</Button>
                    </TaskToolbarRight>
                    )}
                    
                </TasksToolbar>

                <BaseAdd>
                    <Add>+</Add>
                    <Input placeholder="Add a Task" />
                </BaseAdd>
                
                <Task onClick={() => setChangeLayout(true)}>
                    <CheckBox type="checkbox"/>task1
                </Task>
                <Task onClick={() => setChangeLayout(true)}>
                    <CheckBox type="checkbox"/>task2
                </Task>
            </CenterBar>

            {changeLayout && (
                <DescriptionContainer>
                    <H2>TaskName</H2>
                    <form>
                        <Description placeholder="Description"/>
                    </form>
                    <Hide onClick={() => setChangeLayout(false)} src={hide} alt="" />
                </DescriptionContainer>
            )}
        </Wrapper>
        );
    }
    
    export default CenterColumn;