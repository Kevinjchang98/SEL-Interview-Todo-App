import TaskCard, {TaskArrayTypes} from "@/components/TaskCard/TaskCard";

/**
 * Fetches the list of tasks
 */
async function fetchTaskList() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DB_HOST}/`, {
    cache: "no-store",
  });
  return res.json();
}

/**
 * Component to render multiple TaskCard's for each task a user has
 * @constructor
 */
export default async function TaskList() {
  const tasksList: Array<TaskArrayTypes> = await fetchTaskList();

  if (tasksList.length === 0) {
    return <div><p>No tasks yet. Try creating some!</p></div>
  }

  return (
    <div>
      {tasksList.map((task) => (
        <TaskCard task={task} key={task[0]}/>
      ))}
    </div>
  );
}
