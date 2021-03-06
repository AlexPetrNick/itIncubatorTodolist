import React, {MouseEvent, KeyboardEvent, FC, useState, ChangeEvent} from "react";
import s from '../Todolost.module.css'
import {filterValuesType, TasksType, todolistsType} from "../state/state";
import {AddNewForm} from "./AddNewForm";
import {v1} from "uuid";
import {EditableSpan} from "./EditableSpan";

const toUpperFirst = (word: string): string =>  word[0].toUpperCase() + word.slice(1)
const arrayBt: Array<filterValuesType> = ["all", "active", "completed"]


type TodoListType = {
    tasks: Array<TasksType>
    onClickRemoveList: (e: MouseEvent<HTMLButtonElement>, uuid: string) => void
    currentTodoList: todolistsType
    changeFilter: (value: filterValuesType, todoListId: string) => void
    changeCheckBoxTask: (uuid:string, idTask: string, isDone:boolean) => void
    removeTask: (uuid:string, idTask: string) => void
    addTask: (uuid:string, title: string) => void
    isCompleted: boolean
    updateTask: (uuidTodolist:string, uuidTask:string, title:string) => void
    updateTitleTodolist: (uuidTodolist:string, title:string) => void
}

export const TodoList: FC<TodoListType> = ({tasks,changeFilter, currentTodoList, 
       changeCheckBoxTask,removeTask, addTask,isCompleted, updateTask, updateTitleTodolist, ...props}) => {
    const uuidTodo = currentTodoList.uuid
    const removeTasksCallback = (id:string) => removeTask(uuidTodo, id)
    const tasksElements = tasks.map((d: TasksType, i: number) => {
        const style = i % 2 === 0 ? `${s.li__task} ${s.back__white}` : s.li__task
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => changeCheckBoxTask(uuidTodo, d.id, e.currentTarget.checked)
        const updateCallback = (title:string) => {
            updateTask(uuidTodo, d.id, title)
        }
        return (
            <li className={style} key={d.id}>
                <input
                    className={s.check__tasks}
                    type="checkbox"
                    checked={d.isDone}
                    onChange={changeStatus}
                />
                <EditableSpan
                    title={d.title}
                    updateCallback={updateCallback}
                />
                <div className={s.bt__tasks__del} onClick={() => removeTasksCallback(d.id)}>X</div>
            </li>
        )
    })
    const btFilter = arrayBt.map((word: filterValuesType) => {
        let isDisabled = false
        const stl = currentTodoList.filter === word ? `${s.bt__filter} ${s.bt__bc__green}` : s.bt__filter
        if (word === 'active' && isCompleted) isDisabled = true
        return (
            <button
                key={Math.random()}
                className={stl}
                disabled={isDisabled}
                onClick={() => changeFilter(word, uuidTodo)}
            >{toUpperFirst(word)}</button>
            )

    })
    const removeListCallback = (e:MouseEvent<HTMLButtonElement>) => props.onClickRemoveList(e, uuidTodo)
    const addTaskCallback = (title:string) => addTask(uuidTodo,title)


    const updateCallback = (title:string) => updateTitleTodolist(uuidTodo, title)

    return (
        <div className={s.wrapper__todolist__list}>
            <div className={s.title__list__task}>
                <EditableSpan
                    title={currentTodoList.title}
                    updateCallback={updateCallback}
                />
            </div>
            <AddNewForm
                textPlaceholder={'?????????????? ???????????????? ?????????? ????????????'}
                textError={'???????? ???? ?????????? ???????? ????????????'}
                textButton={'add'}
                addOnClick={addTaskCallback}
            />
            <ul className={s.ul__tasks}>
                {tasksElements}
            </ul>
            <div className={s.wrapper__bt__list}>
                <div>
                    {btFilter}
                </div>
                <div>
                    <button onClick={removeListCallback} className={s.delete__list}>Delete</button>
                </div>
            </div>
            {isCompleted && <div className={s.completed__todolist}><i>ALL COMPLETED</i></div>}
        </div>
    )
}



