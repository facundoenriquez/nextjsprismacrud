import TaskCard from "@/components/TaskCard"
import axios from "axios"

async function loadTasks() {
    const res = await axios.get('http://localhost:3000/api/tasks')
    return res.data
}

export default async function HomePage() {

    const tasks = await loadTasks()

    return (
        <section className="container mx-auto">
            <div className="grid grid-cols-3 gap-3 mt-10">
                {tasks.map(task => (
                    <TaskCard task={task} key={task.id} />
                ))}
            </div>
        </section>
    )
}
