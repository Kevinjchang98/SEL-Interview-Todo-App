interface TaskCardProps {
    task: Array<string>
}

export default function TaskCard(props: TaskCardProps) {
    const [id, title, description] = props.task

    return <div>
        <h2>{title}</h2>
        <p>{description}</p>
    </div>
}