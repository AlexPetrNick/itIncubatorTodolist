import React, {MouseEvent, KeyboardEvent, Dispatch, FC, SetStateAction, useState, useEffect, ChangeEvent} from "react";
import s from '../Todolost.module.css'
import {v1} from "uuid";
import {filterValuesType, TasksType, todolistsType} from "../state/state";

type TodoListType = {
    title: string
    initTasks: Array<TasksType>
    uuid: string
    onClickRemoveList: (e: MouseEvent<HTMLButtonElement>, uuid: string) => void
}
const toUpperFirst = (word: string): string => {
    return word[0].toUpperCase() + word.slice(1);
}
const arrayBt: Array<filterValuesType> = ["all", "active", "completed"]

type eChangeCheckBox = ChangeEvent<HTMLInputElement> | MouseEvent<HTMLDivElement>

export const TodoList: FC<TodoListType> = (props) => {
    const errorText = `Поле не может быть пустым`
    const [tasks, setTasks] = useState<Array<TasksType>>(props.initTasks)
    const [title, setTitle] = useState<string>('')
    const [filter, setFilter] = useState<filterValuesType>("all")
    const [error, setError] = useState<boolean>(false)

    const onChangeRadioCallback = (id: string, isDone: boolean): void => {
        setTasks(tasks.map((task: TasksType) => task.id === id ? {...task, isDone} : task))
    }
    const removeTasks = (id: string) => setTasks(tasks.filter((data: TasksType) => data.id !== id))
    const filtringTasks = (tasks: Array<TasksType>): Array<TasksType> => {
        let filterTasks = tasks
        if (filter === 'completed') filterTasks = tasks.filter((data: TasksType) => data.isDone)
        if (filter === 'active') filterTasks = tasks.filter((data: TasksType) => !data.isDone)
        return filterTasks
    }
    const tasksElements = filtringTasks(tasks).map((d: TasksType, i: number) => {
        const style = i % 2 === 0 ? `${s.li__task} ${s.back__white}` : s.li__task
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => onChangeRadioCallback(d.id, e.currentTarget.checked)
        return (
            <li className={style} key={d.id}>
                <input
                    className={s.check__tasks}
                    type="checkbox"
                    checked={d.isDone}
                    onChange={changeStatus}
                />
                <div className={s.title__tasks}>{d.title}</div>
                <div className={s.bt__tasks__del} onClick={() => removeTasks(d.id)}>X</div>
            </li>
        )
    })
    const btFilter = arrayBt.map((word: filterValuesType) => {
        const stl = filter === word ? `${s.bt__filter} ${s.bt__bc__green}` : s.bt__filter
        return <button className={stl} onClick={() => setFilter(word)}>{toUpperFirst(word)}</button>
    })
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) addTask()
    }
    const addTask = () => {
        const trimTitle = title.trim()
        if (trimTitle) {
            setTasks([...tasks, {id: v1(), title: trimTitle, isDone: false}])
        } else {
            setError(true)
        }
        setTitle("")
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }


    return (
        <div className={s.wrapper__todolist__list}>
            <div className={s.title__list__task}>
                <b>{props.title}</b>
            </div>
            <div>
                <input
                    value={title}
                    onChange={onChangeTitle}
                    onKeyPress={onKeyPressHandler}
                    placeholder={"Введите новую задачу..."}
                    className={error ? `${s.input__tasks} ${s.error__input}` : s.input__tasks}
                />
                <button onClick={addTask}>+</button>
            </div>
            {error ? <div className={s.error__empty__field}>{errorText}</div>
                : <div className={s.field__message}></div>}
            <ul className={s.ul__tasks}>
                {tasksElements}
            </ul>
            <div className={s.wrapper__bt__list}>
                <div>
                    {btFilter}
                </div>
                <div>
                    <button
                        onClick={(e) => props.onClickRemoveList(e, props.uuid)}
                        className={s.delete__list}
                    >Delete
                    </button>
                </div>
            </div>
        </div>
    )
}
