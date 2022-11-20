import React from "react";
import { Link } from "react-router-dom";

const ProjectListItem = ({ item, index, delete_project }) => {
    return (
        <tr>
            <td>{index}</td>
            <td>{item.Title}</td>
            <td>{item.Link}</td>
            <td>{item.Users}</td>
            <td><button onClick={() => delete_project(item.index)} type='button'>Delete</button></td>
        </tr>
    )
}

const ProjectList = ({ items, delete_project }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Link</th>
                    <th>Users</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {items.map((item, index) => <ProjectListItem item={item} index={index} delete_project={delete_project} />)}
            </tbody>
            <Link to='/Project/create'>Create</Link>
        </table>
    )
}

export default ProjectList