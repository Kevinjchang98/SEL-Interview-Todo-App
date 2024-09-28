'use client';

import {ChangeEvent, FormEvent, useState} from "react";


export default function ActionMenu() {
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newTaskData, setNewTaskData] = useState({title: '', description: ''});

    async function createTask(event: FormEvent) {
        const formData = new FormData();
        formData.append("title", newTaskData.title);
        formData.append("description", newTaskData.description);

        const res = await fetch("http://127.0.0.1:4000/create_task", {
            method: "POST",
            body: formData
        });

        const data = res.json()
        console.log(data)
    }

    const handleFormInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskData({...newTaskData, [event.target.name]: event.target.value})
    }

    const createForm = <form onSubmit={createTask}>
        <input type="text" name="title" value={newTaskData.title} onChange={handleFormInputChange}/>
        <input type="text" name="description" value={newTaskData.description} onChange={handleFormInputChange}/>
        <button type="submit">Add</button>
    </form>

    return <div>
        <button onClick={() => {
            setShowCreateForm(!showCreateForm)
        }}>New task
        </button>
        {showCreateForm ? createForm : null}
    </div>
}