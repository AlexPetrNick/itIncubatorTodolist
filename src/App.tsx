import React, {ChangeEvent, FC, MouseEvent, useState} from 'react';
import './App.css';
import {TodoList} from "./common/TodoList";
import s from './Todolost.module.css'
import {filterValuesType, stateType, tasksObjectType, todolistsType} from "./state/state";
import {v1} from "uuid";
import {AddNewForm} from "./common/AddNewForm";

type AppType = {
    state: stateType
    tasks: tasksObjectType
}

let App: FC<AppType> = (props) => {
    //@ts-ignore
    window.store = props.tasks
    const [listTasks, setListTasks] = useState<Array<todolistsType>>(props.state.todolists)
    const [tasks, setTasks] = useState<tasksObjectType>(props.tasks)

    const onClickRemoveList = (e: MouseEvent<HTMLButtonElement>, uuid: string) => {
        setListTasks(listTasks.filter(data => data.uuid !== uuid))
        delete tasks[uuid]
    }
    const addList = (title: string) => {
        const tempUuid = v1()
        setTasks({...tasks, [tempUuid]: []})
        setListTasks([...listTasks, {uuid: tempUuid, title: title, filter: "all"}])
    }
    const changeFilter = (value: filterValuesType, todoListId: string) => {
        setListTasks(listTasks.map(l => l.uuid === todoListId ? {...l, filter: value} : l))
    }
    const changeCheckBoxTask = (uuid: string, idTask: string, isDone: boolean) => {
        setTasks({...tasks, [uuid]: tasks[uuid].map(t => t.id === idTask ? {...t, isDone} : t)})
    }
    const removeTask = (uuid: string, idTask: string) => {
        setTasks({...tasks, [uuid]: tasks[uuid].filter(t => t.id !== idTask)})
    }
    const addTask = (uuid: string, title: string) => {
        setTasks({...tasks, [uuid]: [...tasks[uuid], {id: v1(), title, isDone: false}]})
    }

    const updateTask = (uuidTodolist:string, uuidTask:string, title:string) => {
        setTasks({...tasks, [uuidTodolist]:tasks[uuidTodolist].map((t)=>t.id === uuidTask ? {...t, title} : t)})
    }

    const updateTitleTodolist = (uuidTodolist:string, title:string) => {
        setListTasks(listTasks.map((l) => l.uuid === uuidTodolist ? {...l, title} : l))
    }

    const todoListArray = listTasks.map((todos) => {
        let isCompleted:boolean = false
        let tasksAll = tasks[todos.uuid]
        let tasksForTodoList = tasks[todos.uuid]
        if (todos.filter === "active") tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
        if (todos.filter === "completed") tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
        if (tasksAll.every(t => t.isDone) && tasksAll.length !== 0 && tasksForTodoList.length === tasksAll.length) isCompleted=true
        return (
            <TodoList
                key={Math.random()}
                tasks={tasksForTodoList}
                onClickRemoveList={onClickRemoveList}
                currentTodoList={todos}
                changeFilter={changeFilter}
                changeCheckBoxTask={changeCheckBoxTask}
                removeTask={removeTask}
                addTask={addTask}
                isCompleted={isCompleted}
                updateTask={updateTask}
                updateTitleTodolist={updateTitleTodolist}
            />
        )
    })

    return (
        <div className="App">
            <div className={s.header}>
                <AddNewForm
                    textPlaceholder={'Введите название нового листа'}
                    textError={'Поле не может быть пустым'}
                    textButton={'Добавить лист'}
                    addOnClick={addList}
                />
            </div>
            <div className={s.window__todolists}>
                {todoListArray}
            </div>
        </div>
    );
}
export default App;
