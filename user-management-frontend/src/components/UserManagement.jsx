import { useState, useEffect } from "react";
import { addUser, deleteUser, updateUser, getUsers } from "../apiService";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [editingUserId, setEditingUserId] = useState(null);
  const [editingUser, setEditingUser] = useState({ name: "", email: "" });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const users = await getUsers();
    setUsers(users);
  };

  const handleAddUser = async () => {
    const user = await addUser(newUser);
    setUsers([user, ...users]);
    setNewUser({ name: "", email: "" });
  };

  const handleDeleteUser = async (id) => {
    await deleteUser(id);
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleUpdateUser = async (id, updatedUser) => {
    await updateUser(id, updatedUser);
    setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
    setEditingUserId(null);
  };

  const startEditingUser = (user) => {
    setEditingUserId(user.id);
    setEditingUser({ name: user.name, email: user.email });
  };

  const handleEditChange = (e) => {
    setEditingUser({ ...editingUser, [e.target.name]: e.target.value });
  };

  const handleSaveUser = async () => {
    await handleUpdateUser(editingUserId, editingUser);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-12 flex justify-center">
        User Management
      </h1>
      <div className="flex justify-center mb-8">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="border border-black p-2 mr-4 w-[20rem] rounded-lg"
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="border border-black p-2 mr-4 w-[20rem] rounded-lg"
          />
          <button
            onClick={handleAddUser}
            className="bg-blue-500 hover:bg-blue-800 text-white p-2 rounded-xl"
          >
            Add User
          </button>
        </div>
      </div>
      <ul className="space-y-2">
        {users.map((user) => (
          <li
            key={user.id}
            className="border border-black p-2 flex justify-between items-center bg-white text-black rounded"
          >
            {editingUserId === user.id ? (
              <>
                <div>
                  <input
                    type="text"
                    name="name"
                    value={editingUser.name}
                    onChange={handleEditChange}
                    className="border p-2 mr-2"
                  />
                  <input
                    type="email"
                    name="email"
                    value={editingUser.email}
                    onChange={handleEditChange}
                    className="border p-2 mr-2"
                  />
                </div>
                <div>
                  <button
                    onClick={handleSaveUser}
                    className="bg-green-500 hover:bg-green-700 text-white p-2 rounded-xl mr-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingUserId(null)}
                    className="bg-gray-500 hover:bg-gray-700 text-white p-2 rounded-xl"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="text-lg">
                  {user.name} ({user.email})
                </div>
                <div>
                  <button
                    onClick={() => startEditingUser(user)}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white p-2 rounded-xl mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="bg-red-500 hover:bg-red-700 text-white p-2 rounded-xl"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserManagement;
