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
        <table className="table">
            <thead>
                <tr>
                    <th>First_name</th>
                    <th>Last_name</th>
                    <th>Birthday</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user_) => <UserItem user={user_} />)}
            </tbody>
        </table>
    )
}

export default UserList