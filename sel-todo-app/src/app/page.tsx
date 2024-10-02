import TaskList from "@/components/TaskList/TaskList";
import { TaskArrayTypes } from "@/components/TaskCard/TaskCard";
import {fetchTaskList} from "@/app/common-db-utils";

/**
 * Fetches the list of tasks
 */

export default async function Home() {
  const tasksList: Array<TaskArrayTypes> = await fetchTaskList();

  return (
    <>
      <TaskList tasksListInitial={tasksList} />
    </>
  );
}
