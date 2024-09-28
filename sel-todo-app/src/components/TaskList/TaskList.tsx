import TaskCard, {TaskArrayTypes} from "@/components/TaskCard/TaskCard";

async function fetchTaskList() {
    const res = await fetch("http://127.0.0.1:4000/")
    return res.json()
}

export default async function TaskList() {
    let tasksList: Array<TaskArrayTypes> = await fetchTaskList()

    return <div>
        {tasksList.map(task => <TaskCard task={task} />)}
    </div>
}
