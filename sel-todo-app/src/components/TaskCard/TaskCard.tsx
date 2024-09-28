'use client';

import styles from "./TaskCard.module.css"

import {ChangeEvent, useState} from "react";
import {createTask} from "@/components/ActionMenu/ActionMenu";

interface TaskCardProps {
    task: TaskArrayTypes
}

// id, title, description, isComplete
export type TaskArrayTypes = [number, string, string, boolean]

export default function TaskCard(props: TaskCardProps) {
    const [id, title, description, isComplete] = props.task
    const [isChecked, setChecked] = useState(isComplete)
    const [isDeleted, setDeleted] = useState(false)

    async function refreshCurrentTaskIsComplete() {
        const formData = new FormData();
        formData.append("id", id.toString())

        const res = await fetch("http://127.0.0.1:4000/get_task_overview", {
            method: "POST",
            body: formData
        })
        const data = await res.json()

        return data[0]?.[3]
    }

    async function handleCheckboxChange(event: ChangeEvent<HTMLInputElement>) {
        const formData = new FormData();
        formData.append("id", id.toString())

        const res = await fetch("http://127.0.0.1:4000/toggle_complete", {
            method: "POST",
            body: formData
        })

        setChecked(await refreshCurrentTaskIsComplete())
    }

    async function handleDelete() {
        const formData = new FormData();
        formData.append("id", id.toString())

        const res = await fetch("http://127.0.0.1:4000/delete_task", {
            method: "POST",
            body: formData
        })

        setDeleted(true)
    }

    async function handleUndoDelete() {
        await createTask(title, description, isChecked)

        setDeleted(false)
    }

    return <div className={isDeleted ? styles.deleted : ""}>
        <input type="checkbox" disabled={isDeleted} checked={isChecked} onChange={handleCheckboxChange}/>
        {!isDeleted
            ? <button onClick={handleDelete}>Delete</button>
            : <button onClick={handleUndoDelete}>Undo</button>}
        <h2><a href={`/details/${id}`}>{title}</a></h2>
        <p>{description}</p>
    </div>
}