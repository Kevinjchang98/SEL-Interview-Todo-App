"use client";

import TaskCard, { TaskArrayTypes } from "@/components/TaskCard/TaskCard";
import ActionMenu from "@/components/ActionMenu/ActionMenu";
import { useState } from "react";

/**
 * Component to render multiple TaskCard's for each task a user has
 * @constructor
 */
export default function TaskList({
  tasksListInitial,
}: {
  tasksListInitial: Array<TaskArrayTypes>;
}) {
  // const tasksList: Array<TaskArrayTypes> = await fetchTaskList();
  const [tasksList, setTasksList] =
    useState<Array<TaskArrayTypes>>(tasksListInitial);

  if (tasksList.length === 0) {
    return (
      <div>
        <p>No tasks yet. Try creating some!</p>
      </div>
    );
  }

  return (
    <>
      <h1>SEL Todo App</h1>
      <ActionMenu setTasksList={setTasksList} />
      <div>
        {tasksList.map((task) => (
          <TaskCard task={task} key={task[0]} />
        ))}
      </div>
    </>
  );
}
