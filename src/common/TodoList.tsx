import React, {MouseEvent, KeyboardEvent, FC, useState, ChangeEvent} from "react";
import s from '../Todolost.module.css'
import {v1} from "uuid";
import {filterValuesType, TasksType, todolistsType} from "../state/state";

const toUpperFirst = (word: string): string =>  word[0].toUpperCase() + word.slice(1)
const arrayBt: Array<filterValuesType> = ["all", "active", "completed"]
const errorText = `Поле не может быть пустым`

type TodoListType = {
    tasks: Array<TasksType>
    onClickRemoveList: (e: MouseEvent<HTMLButtonElement>, uuid: string) => void
    currentTodoList: todolistsType
    changeFilter: (value: filterValuesTywatpe, todoListId: string) => void
}

export const TodoList: FC<TodoListType> = ({tasks,changeFilter, currentTodoList, ...props}) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const onChangeRadioCallback = (id: string, isDone: boolean): void => {
        setTasks(tasks.map((task: TasksType) => task.id === id ? {...task, isDone} : task))
    }

    const removeTasks = (id: string) => setTasks(tasks.filter((data: TasksType) => data.id !== id))

    const tasksElements = tasks.map((d: TasksType, i: number) => {
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
        const stl = currentTodoList.filter === word ? `${s.bt__filter} ${s.bt__bc__green}` : s.bt__filter
        return <button className={stl} onClick={() => changeFilter(word, currentTodoList.uuid)}>{toUpperFirst(word)}</button>
    })
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => e.charCode === 13 ? addTask() : null
    const addTask = () => {
        const trimTitle = title.trim()
        if (trimTitle) {
            setTasks([...tasks, {id: v1(), title: trimTitle, isDone: false}])
            setTitle("")
        } else {
            setError(true)
        }
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }

    return (
        <div className={s.wrapper__todolist__list}>
            <div className={s.title__list__task}>
                <b>{currentTodoList.title}</b>
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
                        onClick={(e) => props.onClickRemoveList(e, currentTodoList.uuid)}
                        className={s.delete__list}
                    >Delete
                    </button>
                </div>
            </div>
        </div>
    )
}
