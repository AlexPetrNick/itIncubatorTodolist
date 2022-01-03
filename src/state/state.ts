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
    tasks: Array<TasksType>
}

export type stateType = {
    todolists:Array<todolistsType>
}


export const addList = (list:todolistsType) => state.todolists.push(list)


export let state:stateType = {
    todolists: [
        {
            uuid: "d88f5344-64a8-11ec-90d6-0242ac120003",
            title: "Учеба",
            tasks: [
                {id: v1(), title: "CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "React", isDone: false},
                {id: v1(), title: "Redux", isDone: false},
                {id: v1(), title: "TypeScript ", isDone: false}
            ]
        }
    ]
}