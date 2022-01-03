import {v1} from "uuid";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
export type filterValuesType = "all" | "completed" | "active"

export type todolistsType = {
    uuid: string
    title: string
    filter: filterValuesType
}

export type stateType = {
    todolists:Array<todolistsType>
}

export type tasksObjectType = {
    [key:string] : Array<TasksType>
}


export const addList = (list:todolistsType) => state.todolists.push(list)


const todotasks1:string = "d88f5344-64a8-11ec-90d6-0242ac120003"


export let state:stateType = {
    todolists: [
        {
            uuid: todotasks1,
            title: "Учеба",
            filter: 'all',
        }
    ]
}

export const addTaskWithID = (idTasks:string) => {
    const tasksCopy = {...tasks}
    tasksCopy[idTasks] = []
    tasks = {...tasksCopy}
}


export let tasks:tasksObjectType = {
    [todotasks1]: [
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
        {id: v1(), title: "TypeScript ", isDone: false}
    ]
}