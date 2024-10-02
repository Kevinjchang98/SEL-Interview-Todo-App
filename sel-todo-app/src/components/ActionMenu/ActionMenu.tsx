import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import styles from "./ActionMenu.module.css";
import { TaskArrayTypes } from "@/components/TaskCard/TaskCard";
import {fetchTaskList} from "@/app/common-db-utils";

/**
 * API call to backend for creating a new task
 * @param title Title of the task
 * @param description Description of the task
 * @param isComplete Bool for if the task is complete or not
 */
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

  await fetch(`${process.env.NEXT_PUBLIC_DB_HOST}/create_task`, {
    method: "POST",
    body: formData,
  });
}

/**
 * Menu of actions users may perform on task list
 * @constructor
 */
export default function ActionMenu({
  setTasksList,
}: {
  setTasksList: Dispatch<SetStateAction<Array<TaskArrayTypes>>>;
}) {
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

  // Form for creating a new task
  const createForm = (
    <form
      className={styles.create_task_form}
      onSubmit={async (event) => {
        event.preventDefault();

        // POST request to create task in database
        await createTask(newTaskData.title, newTaskData.description);
        // Re-fetch task list from database
        setTasksList(await fetchTaskList());
        // Clear form to let user add more if desired
        setNewTaskData({ title: "", description: "" });
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
    <div className={styles.action_menu_container}>
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
