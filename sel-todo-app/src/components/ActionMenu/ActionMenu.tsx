"use client";

import { ChangeEvent, useState } from "react";
import styles from "./ActionMenu.module.css";

export async function createTask(
  title: string,
  description: string,
  isComplete: boolean = false
) {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("isComplete", isComplete ? "true" : "false");
  formData.append("creationDate", new Date().toISOString());

  const res = await fetch(`${process.env.NEXT_PUBLIC_DB_HOST}/create_task`, {
    method: "POST",
    body: formData,
  });

  const data = res.json();
}

export default function ActionMenu() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTaskData, setNewTaskData] = useState({
    title: "",
    description: "",
  });

  const handleFormInputChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewTaskData({ ...newTaskData, [event.target.name]: event.target.value });
  };

  const createForm = (
    <form
      className={styles.create_task_form}
      onSubmit={() => {
        createTask(newTaskData.title, newTaskData.description);
      }}
    >
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        value={newTaskData.title}
        onChange={handleFormInputChange}
        required
      />
      <label htmlFor="description">Description</label>
      <textarea
        name="description"
        value={newTaskData.description}
        onChange={handleFormInputChange}
        required
      />
      <button type="submit">Add</button>
    </form>
  );

  return (
    <div>
      <button
        className={styles.new_task_button}
        onClick={() => {
          setShowCreateForm(!showCreateForm);
        }}
      >
        +
      </button>
      {showCreateForm ? createForm : null}
    </div>
  );
}
