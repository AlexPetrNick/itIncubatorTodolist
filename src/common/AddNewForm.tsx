import s from "../Todolost.module.css";
import React, {FC, ChangeEvent, KeyboardEvent, useState} from "react";


type AddNewFormType = {
    addOnClick: (title:string) => void
    textButton: string
    textPlaceholder: string
    textError:string
}

export const AddNewForm:FC<AddNewFormType> = ({addOnClick,textButton,textError,textPlaceholder}) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => e.charCode === 13 ? onActionHandler(title) : null

    const onActionHandler = (title:string) => {
        const trimTitle = title.trim()
        if (trimTitle) {
            addOnClick(title)
            setTitle('')
        } else {
            setError(true)
        }
    }

    return (
        <div>
            <input
                value={title}
                onChange={onChangeTitle}
                onKeyPress={onKeyPressHandler}
                placeholder={textPlaceholder}
                className={error ? `${s.input__tasks} ${s.error__input}` : s.input__tasks}
            />
            <button
                onClick={() => onActionHandler(title)}
            >{textButton}</button>
            {error && <div className={s.error__empty__field}>{textError}</div>}
        </div>
    )
}