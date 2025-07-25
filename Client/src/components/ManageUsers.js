import React from "react";
import "./ManageUsers.css";

function ManageUsers() {
  // Dummy user data
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "User" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Admin" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User" },
  ];

  const handleEdit = (user) => {
    alert(`Editing user: ${user.name}`);
  };

  const handleDelete = (user) => {
    alert(`Deleting user: ${user.name}`);
  };

  return (
    <div className="manage-users-container">
      <h2>Manage Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageUsers;
