import React, {FC, useState, MouseEvent, ChangeEvent, useEffect} from 'react';
import './App.css';
import {TodoList} from "./common/TodoList";
import s from './Todolost.module.css'
import {addList, addTaskWithID, stateType, tasksObjectType, todolistsType} from "./state/state";
import {v1} from "uuid";

type AppType = {
    state: stateType
    tasks: tasksObjectType
    addTaskWithID: (titleID:string) => void
}

let App: FC<AppType> = (props) => {
    const [listTasks, setListTasks] = useState<Array<todolistsType>>(props.state.todolists)
    const [stateTitle, setStateTitle] = useState<string>('')

    const onClickRemoveList = (e:MouseEvent<HTMLButtonElement>, uuid: string) => {
        setListTasks(listTasks.filter(data => data.uuid !== uuid))
    }
    const onClickAddListCallback = (e: MouseEvent<HTMLButtonElement>) => {
        const tempUuid = v1()
        const newList:todolistsType = {uuid: tempUuid, title: stateTitle, filter: "all"}
        if (stateTitle) {
            setListTasks([...listTasks, newList])
            props.addTaskWithID(tempUuid)
        }
        setStateTitle('')
    }
    const onChangeInputCallback = (e: ChangeEvent<HTMLInputElement>) => {
        setStateTitle(e.currentTarget.value)
    }


    const todoListArray = listTasks.map((todos) => {
        const tasksForTodoList = props.tasks[todos.uuid]
        return (
            <TodoList
                uuid={todos.uuid}
                initTasks={tasksForTodoList}
                title={todos.title}
                onClickRemoveList={onClickRemoveList}
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
