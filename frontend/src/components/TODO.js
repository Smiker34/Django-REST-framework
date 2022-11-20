import React from 'react'
import { Link } from 'react-router-dom'


const ToDoListItem = ({ item, delete_todo }) => {
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.note}</td>
            <td>{item.create_date}</td>
            <td>{item.project}</td>
            <td>{item.creator}</td>
            <td><button onClick={() => delete_todo(item.id)} type='button'>Delete</button></td>
        </tr>
    )
}

const TODOList = ({ items, delete_todo }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Note</th>
                    <th>Created_date</th>
                    <th>Project</th>
                    <th>Creator</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {items.map((item) => <ToDoListItem item={item} delete_todo={delete_todo} />)}
            </tbody>
            <Link to='/TODO/create'>Create</Link>
        </table>
    )
}

export default TODOList