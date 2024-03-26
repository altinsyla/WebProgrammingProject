import React, {useEffect, useState} from 'react'
import axios from 'axios'

const UserList = () => {
    const [users,
        setUsers] = useState([])

    useEffect(() => {
        const fetchUsers = async() => {
            const result = await axios.get('http://localhost:5001/api/users');

            console.log(result.data)
            setUsers(result.data)
        }
        fetchUsers();
    }, [])
    return (
        <div>
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Gender</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.name}>
                            <td>{user.name}</td>
                            <td>{user.gender}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default UserList