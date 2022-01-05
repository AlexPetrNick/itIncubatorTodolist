import React, {ChangeEvent, FC, MouseEvent, useState} from 'react';
import './App.css';
import {TodoList} from "./common/TodoList";
import s from './Todolost.module.css'
import {filterValuesType, stateType, tasksObjectType, todolistsType} from "./state/state";
import {v1} from "uuid";

type AppType = {
    state: stateType
    tasks: tasksObjectType
}

let App: FC<AppType> = (props) => {
    const [listTasks, setListTasks] = useState<Array<todolistsType>>(props.state.todolists)
    const [tasks, setTasks] = useState<tasksObjectType>(props.tasks)
    const [stateTitle, setStateTitle] = useState<string>('')

    const onClickRemoveList = (e:MouseEvent<HTMLButtonElement>, uuid: string) => {
        setListTasks(listTasks.filter(data => data.uuid !== uuid))
        delete tasks[uuid]
    }
    const onClickAddListCallback = (e: MouseEvent<HTMLButtonElement>) => {
        const tempUuid = v1()
        const newList:todolistsType = {uuid: tempUuid, title: stateTitle, filter: "all"}
        if (stateTitle) {
            const tasksCopy = {...tasks}
            tasksCopy[tempUuid] = []
            setTasks(tasksCopy)
            setListTasks([...listTasks, newList])
        }
        setStateTitle('')
    }
    const onChangeInputCallback = (e: ChangeEvent<HTMLInputElement>) => setStateTitle(e.currentTarget.value)

    const changeFilter = (value: filterValuesType, todoListId: string) => {
        setListTasks(listTasks.map(l => l.uuid === todoListId ? {...l, filter: value} : l))
    }
    const changeCheckBoxTask = (uuid:string, idTask: string, isDone:boolean) => {
        setTasks({...tasks, [uuid]: tasks[uuid].map(t => t.id === idTask ? {...t, isDone} : t)})
    }
    const removeTask = (uuid:string, idTask: string) => {
        setTasks({...tasks, [uuid]: tasks[uuid].filter(t => t.id !== idTask)})
    }
    const addTask = (uuid:string, title: string) => {
        setTasks({...tasks, [uuid]: [...tasks[uuid], {id:v1(), title, isDone: false}]})
    }

    const todoListArray = listTasks.map((todos) => {
        let tasksForTodoList = tasks[todos.uuid]
        if (todos.filter === "active") tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
        if (todos.filter === "completed") tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
        return (
            <TodoList
                tasks={tasksForTodoList}
                onClickRemoveList={onClickRemoveList}
                currentTodoList={todos}
                changeFilter={changeFilter}
                changeCheckBoxTask={changeCheckBoxTask}
                removeTask={removeTask}
                addTask={addTask}
            />
        )
    })

    return (
        <div className="App">
            <div className={s.header}>
                <div>
                    <input
                        className={s.input__list}
                        type="text"
                        value={stateTitle}
                        placeholder={"Введите заголовок..."}
                        onChange={onChangeInputCallback}
                    />
                    <button
                        className={s.bt__list__add}
                        onClick={onClickAddListCallback}
                    >Добавить
                    </button>
                </div>
            </div>
            <div className={s.window__todolists}>
                {todoListArray}
            </div>
        </div>
    );
}
export default App;
