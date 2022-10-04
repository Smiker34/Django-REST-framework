import React from 'react'


const ToDoListItem = ({ item }) => {
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.note}</td>
            <td>{item.create_date}</td>
            <td>{item.project}</td>
            <td>{item.creator}</td>
        </tr>
    )
}

const TODOList = ({ items }) => {
    return (
        <table className="table">
            <tr>
                <th>Id</th>
                <th>Note</th>
                <th>Created_date</th>
                <th>Project</th>
                <th>Creator</th>
            </tr>
            {items.map((item) => <ToDoListItem item={item} />)}
        </table>
    )
}

export default TODOList