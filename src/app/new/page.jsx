'use client'
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function NewPage({ params }) {
    const router = useRouter()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        if (params.id) {
            const fetchData = async () => {
                try {
                    const res = await axios.get(`/api/tasks/${params.id}`)
                    const { title, description } = res.data
                    setTitle(title)
                    setDescription(description)
                } catch (error) {
                    console.log(error)
                }
            }
            fetchData()
        }
    }, [])

    const onSubmit = async (e) => {
        e.preventDefault()
        const postData = { title, description }
        if (params) {
            try {
                await axios.put(`/api/tasks/${params.id}`, postData)
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                await axios.post('/api/tasks', postData)
            } catch (error) {
                console.log(error)
            }
        }
        router.refresh()
        router.push('/')
    }

    const onDelete = async () => {
        try {
            await axios.delete(`/api/tasks/${params.id}`)
        } catch (error) {
            console.log(error)
        }
        router.refresh()
        router.push('/')
    }

    return (
        <div className="h-screen flex justify-center items-center">
            <form action="" method="post" className="bg-slate-800 p-10 w-2/4" onSubmit={onSubmit}>
                <label className="font-bold text-sm" htmlFor="title">Titulo de tarea</label>
                <input placeholder="Titulo" className="border border-gray-400 p-2 mb-4 w-full text-black" type="text" name="title" id="title" onChange={(e) => setTitle(e.target.value)} value={title} />
                <label className="font-bold text-sm" htmlFor="description">Descripcion de la terea</label>
                <textarea placeholder="Describe tu tarea" className="border border-gray-400 p-2 mb-4 w-full text-black" name="description" id="description" cols="30" rows="10" onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{
                    params.id ? 'Actualizar' : 'Crear'
                }</button>
                {params.id &&
                    <button type="button" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4" onClick={onDelete}>Eliminar</button>
                }
            </form>
        </div>
    )
}