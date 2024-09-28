'use client';

import {ChangeEvent, useState} from "react";

export async function createTask(title: string, description: string, isComplete: boolean = false) {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("isComplete", isComplete ? "true" : "false");
    formData.append("creationDate", new Date().toISOString());

    const res = await fetch("http://127.0.0.1:4000/create_task", {
        method: "POST",
        body: formData
    });

    const data = res.json()
    console.log(data)
}

export default function ActionMenu() {
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newTaskData, setNewTaskData] = useState({title: '', description: ''});


    const handleFormInputChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        setNewTaskData({...newTaskData, [event.target.name]: event.target.value})
    }

    const createForm = <form onSubmit={() => {
        createTask(newTaskData.title, newTaskData.description)
    }}>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" value={newTaskData.title} onChange={handleFormInputChange}/>
        <label htmlFor="description">Description</label>
        <textarea name="description" value={newTaskData.description} onChange={handleFormInputChange}/>
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