import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>

export type AddTaskActionType = ReturnType<typeof addTaskAC>

export type ChangeTaskStatusType = ReturnType<typeof changeTaskStatusAC>

export type ChangeTitleType = ReturnType<typeof changeTaskTitleAC>


export type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusType
    |ChangeTitleType
    | AddTodolistActionType
    |RemoveTodolistActionType


const initialState:TasksStateType = {}


    export const taskReducer = (state = initialState, action: ActionsType):TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':{
             const stateCopy = {...state};
             const tasks = state[action.todolistId];
             const filteredTasks = tasks.filter(t => t.id !== action.taskId)
             stateCopy[action.todolistId] = filteredTasks;
             return stateCopy;
        }
        case 'ADD-TASK':
            return {
                ...state,
                [action.todolistId]:[{id:v1(), title:action.title,isDone:false},...state[action.todolistId]]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistId]:state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t,isDone:action.isDone} : t)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todolistId]:state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t,title:action.title}:t)
            }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.todoListId]:[]
            }
        case 'REMOVE-TODOLIST':{
            // let copyState = {...state}
            // delete copyState[action.id]
            const {[action.id]:[],...rest} = {...state}
            return rest
        }

        default:
            return state
    }
}

export const removeTaskAC = (todolistId: string,taskId:string)=> {
    return {
        type: 'REMOVE-TASK',
        taskId,
        todolistId
    }as const
}


export const addTaskAC = (title: string,todolistId:string) => {
    return {
        type: 'ADD-TASK',
         title ,
        todolistId
    }as const
}

export const changeTaskStatusAC = (taskId:string,isDone: boolean,todolistId:string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        taskId,
        isDone,
        todolistId
    }as const
}


export const changeTaskTitleAC = (taskId:string,title: string,todolistId:string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        taskId,
        title,
        todolistId
    }as const
}