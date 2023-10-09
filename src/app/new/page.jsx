'use client'
import axios from "axios"
import { useRouter } from "next/navigation"

export default function NewPage() {

    const router = useRouter()

    const onSubmit = async (e) => {
        e.preventDefault()
        const title = e.target.title.value
        const description = e.target.description.value

        const postData = { title, description }

        try {
            const res = await axios.post('/api/tasks', postData)
            router.push('/')
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className="h-screen flex justify-center items-center">
            <form action="" method="post" className="bg-slate-800 p-10 w-2/4" onSubmit={onSubmit}>
                <label className="font-bold text-sm" htmlFor="title">Titulo de tarea</label>
                <input placeholder="Titulo" className="border border-gray-400 p-2 mb-4 w-full text-black" type="text" name="title" id="title" />
                <label className="font-bold text-sm" htmlFor="description">Descripcion de la terea</label>
                <textarea placeholder="Describe tu tarea" className="border border-gray-400 p-2 mb-4 w-full text-black" name="description" id="description" cols="30" rows="10"></textarea>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Crear</button>
            </form>
        </div>
    )
}