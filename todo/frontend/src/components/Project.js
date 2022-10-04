import React from "react";

const ProjectListItem = ({ item, index }) => {
    return (
        <tr>
            <td>{index}</td>
            <td>{item.Title}</td>
            <td>{item.Link}</td>
            <td>{item.Users}</td>
        </tr>
    )
}

const ProjectList = ({ items }) => {
    return (
        <table className="table">
            <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Link</th>
                <th>Users</th>
            </tr>
            {items.map((item, index) => <ProjectListItem item={item} index={index} />)}
        </table>
    )
}

export default ProjectList