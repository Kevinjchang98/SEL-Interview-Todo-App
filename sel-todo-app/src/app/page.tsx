import TaskList from "@/components/TaskList/TaskList";
import { TaskArrayTypes } from "@/components/TaskCard/TaskCard";

/**
 * Fetches the list of tasks
 */
export async function fetchTaskList() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DB_HOST}/`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function Home() {
  const tasksList: Array<TaskArrayTypes> = await fetchTaskList();

  return (
    <>
      <TaskList tasksListInitial={tasksList} />
    </>
  );
}
