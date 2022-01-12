import React, {FC, useState, FocusEventHandler, MouseEvent, ChangeEvent} from "react";
import s from "../Todolost.module.css";

type propsType = {
    title: string
    updateCallback: (title:string) => void
}

export const EditableSpan:FC<propsType> = (props) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

    const onDoubleClick = (e:MouseEvent<HTMLSpanElement>) => {
        setEditMode(true)
    }
    const onBlurClickHandler = () => {
        props.updateCallback(title)
        setEditMode(false)
    }

    const setInputHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        <div>
            {editMode ?
                <input
                    onBlur={onBlurClickHandler}
                    onChange={setInputHandler}
                    value={title}
                /> :
                <span
                    className={s.title__tasks}
                    onDoubleClick={onDoubleClick}
                >{title}</span>
            }
        </div>
    )
}