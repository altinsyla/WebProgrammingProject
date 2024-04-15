import React, {useEffect, useState} from 'react'
import axios from 'axios'

const TaskList = () => {
    const [tasks,
        setTasks] = useState([])

    useEffect(() => {
        const fetchTasks = async() => {
            const result = await axios.get('http://localhost:5001/api/tasks');

            console.log(result.data)
            setTasks(result.data)
        }
        fetchTasks();
    }, [])
    return (
        <div>
            <h2>Tasks</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <tr key={tasks.name}>
                            <td>{task.name}</td>
                            <td>{task.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default TaskList