"use client";

import { ChangeEvent, useEffect, useState } from "react";
import styles from "./TaskDetails.module.css";
import {useRouter} from "next/navigation";

/**
 * Component to display details about a task. Also allows users to edit the title or description of the task
 * @param props
 * @constructor
 */
export default function TaskDetails(props: { id: string }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const router = useRouter()

  useEffect(() => {
    // Retrieve task details again when title or description changes
    const formData = new FormData();
    formData.append("id", props.id);

    fetch(`${process.env.NEXT_PUBLIC_DB_HOST}/get_task_details`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data[0] === undefined) {
          router.push('/')
        } else {
          const { _id, title, description, _isComplete } = data[0];
          setTitle(title);
          setNewTitle(title);
          setDescription(description);
          setNewDescription(description);
        }
      });
  }, [title, description, props.id, router]);

  function updateTask() {
    const formData = new FormData();
    formData.append("id", props.id);
    formData.append("title", newTitle);
    formData.append("description", newDescription);

    fetch(`${process.env.NEXT_PUBLIC_DB_HOST}/update_task`, {
      method: "POST",
      body: formData,
    }).then(() => {
      fetch(`${process.env.NEXT_PUBLIC_DB_HOST}/get_task_details`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          const { _id, title, description, _isComplete } = data[0];
          setTitle(title);
          setNewTitle(title);
          setDescription(description);
          setNewDescription(description);

          setIsEditing(false);
        });
    });
  }

  function handleEditDescription(event: ChangeEvent<HTMLTextAreaElement>) {
    // On initial change don't wipe newDescription. Only update when user changes it
    if (event.target.value !== "") {
      setNewDescription(event.target.value);
    }
  }

  function handleEditTitle(event: ChangeEvent<HTMLInputElement>) {
    // On initial change don't wipe newDescription. Only update when user changes it
    if (event.target.value !== "") {
      setNewTitle(event.target.value);
    }
  }

  return title === "" ? null : (
    <div className={styles.details_container}>
      <div className={styles.title_edit_container}>
        {/* Title text box if editing*/}
        {!isEditing ? (
          <h1>{title}</h1>
        ) : (
          <input
            type="text"
            name="title"
            defaultValue={newTitle}
            onChange={handleEditTitle}
            required
          />
        )}

        {/* Edit and Save/cancel buttons*/}
        {!isEditing ? (
          <button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Edit
          </button>
        ) : (
          <>
            <button
              onClick={() => {
                updateTask();
              }}
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setNewTitle(title);
                setNewDescription(description);
              }}
            >
              Cancel
            </button>
          </>
        )}
      </div>

      {/* Description text box if editing*/}
      {isEditing ? (
        <textarea
          name="description"
          defaultValue={newDescription}
          onChange={handleEditDescription}
          required
        />
      ) : (
        <p>{description}</p>
      )}
    </div>
  );
}
