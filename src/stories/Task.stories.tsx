import React, {useState} from 'react'
import {Task} from "../Task";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {action} from "@storybook/addon-actions";


export default {
    title:'TODOLIST/TASK',
    component:Task,
    args:{
        task: {id: 'Hello', isDone: true, title: 'JS'},
        changeTaskStatus: action('changeTaskStatus'),
        removeTask: action('RemoveTask'),
        changeTaskTitle: action('ChangeTitle'),
    }
}as ComponentMeta<typeof Task>;

const Template:ComponentStory<typeof Task> = (args) => <Task {...args}/>


export const TaskIsDoneStory = Template.bind({})


export const TaskIsNotDoneStory = Template.bind({})

TaskIsNotDoneStory.args = {
    task: {id: 'Hello', isDone: false, title: 'JS'}
}


const TemplateSecond: ComponentStory<typeof Task> = (args) => {

    const [task,setTask] = useState({id: 'Hello', isDone: false, title: 'JS'})

    const changeTaskTitle = (id:string,title:string) => {
        setTask({...task,title: title})
    }

    const changeTaskStatus = (id:string,isDone:boolean) => {
        setTask({...task,isDone:isDone })
    }



    return<Task task={task} changeTaskStatus={changeTaskStatus} removeTask={action('Remove Task')} changeTaskTitle={changeTaskTitle}/>
}

export const WorkTaskStory = TemplateSecond.bind({})