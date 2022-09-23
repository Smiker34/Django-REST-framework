import React from "react";

const UserItem = ({ user }) => {
    return (
        <tr>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.birthday}</td>
            <td>{user.email}</td>
        </tr>
    )
}

const UserList = ({ users }) => {
    return (
        <table>
            <th>First_name</th>
            <th>Last_name</th>
            <th>Birthday</th>
            <th>Email</th>
            {users.map((user_) => <UserItem user={user_} />)}
        </table>
    )
}

export default UserList