import {redirect} from "next/navigation";

export default async function TaskDetails({params}: { params: { id: string } }) {
    const formData = new FormData()
    console.log(params.id)
    formData.append("id", params.id)

    const res = await fetch("http://127.0.0.1:4000/get_task_details", {
        method: "POST",
        body: formData
    })
    const data = await res.json()
    console.log(data[0])

    const {id, title, description, iscomplete} = data[0]

    return <div>
        <h1>{title}</h1>
        <p>{description}</p>
    </div>
}