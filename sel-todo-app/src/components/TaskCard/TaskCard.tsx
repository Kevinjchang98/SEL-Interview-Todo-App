"use client";

import styles from "./TaskCard.module.css";

import { useState } from "react";
import { createTask } from "@/components/ActionMenu/ActionMenu";

interface TaskCardProps {
  task: TaskArrayTypes;
}

// id, title, description, isComplete
export type TaskArrayTypes = [number, string, string, boolean];

/**
 * Component to display a particular task's basic info as a brief overview
 * @param props
 * @constructor
 */
export default function TaskCard(props: TaskCardProps) {
  const [initial_id, title, description, isComplete] = props.task;
  const [id, setId] = useState<number>(initial_id);
  const [isChecked, setChecked] = useState(isComplete);
  const [isDeleted, setDeleted] = useState(false);

  async function refreshCurrentTaskIsComplete() {
    const formData = new FormData();
    formData.append("id", id.toString());

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DB_HOST}/get_task_overview`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();

    return data[0]?.[3];
  }

  async function handleCheckboxChange() {
    const formData = new FormData();
    formData.append("id", id.toString());

    await fetch(`${process.env.NEXT_PUBLIC_DB_HOST}/toggle_complete`, {
      method: "POST",
      body: formData,
    });

    setChecked(await refreshCurrentTaskIsComplete());
  }

  async function handleDelete() {
    const formData = new FormData();
    formData.append("id", id.toString());

    await fetch(`${process.env.NEXT_PUBLIC_DB_HOST}/delete_task`, {
      method: "POST",
      body: formData,
    });

    setDeleted(true);
  }

  async function handleUndoDelete() {
    // Note this creates the same task contents but different ID in the backend
    const id = await createTask(title, description, isChecked);

    if (id) {
      setId(id);
      setDeleted(false);
    }
  }

  return (
    <div className={isDeleted ? styles.deleted : ""}>
      <div className={styles.title_container}>
        <input
          type="checkbox"
          disabled={isDeleted}
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <h2>
          <a href={isDeleted ? "#" : `/details/${id}`}>{title}</a>
        </h2>
        {!isDeleted ? (
          <button onClick={handleDelete}>Delete</button>
        ) : (
          <button onClick={handleUndoDelete}>Undo</button>
        )}
      </div>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
