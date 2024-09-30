'use client';

import {ChangeEvent, useEffect, useState} from "react";

export default function TaskDetails(props: { id: string }) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newTitle, setNewTitle] = useState('');


    useEffect(() => {
        const formData = new FormData()
        formData.append("id", props.id)

        fetch(`${process.env.NEXT_PUBLIC_DB_HOST}/get_task_details`, {
            method: "POST",
            body: formData
        }).then((res) => res.json()).then((data) => {
            console.log(data[0])
            const {_id, title, description, _isComplete} = data[0]
            setTitle(title)
            setNewTitle(title)
            setDescription(description)
            setNewDescription(description)
        })
    }, [title, description]);

    function updateTask() {
        const formData = new FormData()
        formData.append("id", props.id)
        formData.append("title", newTitle)
        formData.append("description", newDescription)

        fetch(`${process.env.NEXT_PUBLIC_DB_HOST}/update_task`, {
            method: "POST",
            body: formData
        }).then(() => {
            fetch(`${process.env.NEXT_PUBLIC_DB_HOST}/get_task_details`, {
                method: "POST",
                body: formData
            }).then((res) => res.json()).then((data) => {
                console.log(data[0])
                const {_id, title, description, _isComplete} = data[0]
                setTitle(title)
                setNewTitle(title)
                setDescription(description)
                setNewDescription(description)

                setIsEditing(false)
            })

        })
    }

    function handleEditDescription(event: ChangeEvent<HTMLTextAreaElement>) {
        // On initial change don't wipe newDescription. Only update when user changes it
        if (event.target.value !== "") {
            setNewDescription(event.target.value)
        }
    }

    function handleEditTitle(event: ChangeEvent<HTMLInputElement>) {
        // On initial change don't wipe newDescription. Only update when user changes it
        if (event.target.value !== "") {
            setNewTitle(event.target.value)
        }
    }

    return <div>
        <div>
            {/* Title text box if editing*/}
            {!isEditing ?
                <h1>{title}</h1> :
                <input type="text" name="title" defaultValue={newTitle} onChange={handleEditTitle}/>
            }

            {/* Edit and Save/cancel buttons*/}
            {!isEditing ?
                <button onClick={() => {
                    setIsEditing(true)
                }}>Edit</button> :
                <>
                    <button onClick={() => {
                        updateTask()
                    }}>Save
                    </button>
                    <button onClick={() => {
                        setIsEditing(false)
                        setNewTitle(title)
                        setNewDescription(description)
                    }}>Cancel
                    </button>
                </>
            }
        </div>

        {/* Description text box if editing*/}
        {isEditing
            ? <textarea name="description" defaultValue={newDescription} onChange={handleEditDescription}/> :
            <p>{description}</p>}
    </div>
}
