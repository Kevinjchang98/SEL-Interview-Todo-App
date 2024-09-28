import TaskCard from "@/components/TaskCard/TaskCard";

async function fetchTaskList() {
    const res = await fetch("http://127.0.0.1:4000/")
    return res.json()
}

export default async function TaskList() {
    let tasksList: Array<Array<string>> = await fetchTaskList()
    console.log(tasksList)

    return <div>
        {tasksList.map(task => <TaskCard task={task} />)}
    </div>
}
