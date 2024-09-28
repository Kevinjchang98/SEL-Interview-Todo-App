'use client';

import {ChangeEvent, useState} from "react";

interface TaskCardProps {
    task: TaskArrayTypes
}

// id, title, description, isComplete
export type TaskArrayTypes = [number, string, string, boolean]

export default function TaskCard(props: TaskCardProps) {
    const [id, title, description, isComplete] = props.task
    const [isChecked, setChecked] = useState(isComplete)

    async function refreshCurrentTaskState() {
        const formData = new FormData();
        formData.append("id", id.toString())

        const res = await fetch("http://127.0.0.1:4000/get_task_overview", {
            method: "POST",
            body: formData
        })
        const data = await res.json()

        return data[0][3]
    }

    async function handleCheckboxChange(event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault()

        const formData = new FormData();
        formData.append("id", id.toString())

        const res = await fetch("http://127.0.0.1:4000/toggle_complete", {
            method: "POST",
            body: formData
        })

        setChecked(await refreshCurrentTaskState())
    }

    return <div>
        <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange}/>
        <h2>{title}</h2>
        <p>{description}</p>
    </div>
}