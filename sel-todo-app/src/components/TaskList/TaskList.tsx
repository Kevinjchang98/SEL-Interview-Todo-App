import TaskCard, { TaskArrayTypes } from "@/components/TaskCard/TaskCard";

async function fetchTaskList() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DB_HOST}/`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function TaskList() {
  const tasksList: Array<TaskArrayTypes> = await fetchTaskList();

  return (
    <div>
      {tasksList.map((task) => (
        <TaskCard task={task} key={task[0]} />
      ))}
    </div>
  );
}
