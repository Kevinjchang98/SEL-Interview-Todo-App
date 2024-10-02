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
  const [tasksList, setTasksList] =
    useState<Array<TaskArrayTypes>>(tasksListInitial);

  // Display "no tasks yet" message if we get an empty list from server
  const tasksListDisplay =
    tasksList.length === 0 ? (
      <p>No tasks yet. Try creating some!</p>
    ) : (
      tasksList.map((task) => <TaskCard task={task} key={task[0]} />)
    );

  return (
    <>
      <h1>SEL Todo App</h1>
      <ActionMenu setTasksList={setTasksList} />
      <div>{tasksListDisplay}</div>
    </>
  );
}
