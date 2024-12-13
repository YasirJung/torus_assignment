import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/index.ts';
import {
  setUsers,
  setLoading,
  setError,
  deleteUser,
  setCurrentPage,
} from '../store/slices/userSlice.ts';
import { incrementDeletedUsers } from '../store/slices/analyticsSlice.ts';
import { fetchUsers } from '../services/api.ts';
import { User } from '../types/index.ts';

const UserManagement: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // For navigation between pages
  const {
    users,
    loading,
    error,
    currentPage,
    itemsPerPage,
  } = useSelector((state: RootState) => state.users);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      dispatch(setLoading(true));
      try {
        const fetchedUsers = await fetchUsers();
        dispatch(setUsers(fetchedUsers));
      } catch (err) {
        dispatch(setError((err as Error).message));
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadUsers();
  }, [dispatch]);

  const handleDeleteUser = (userId: number) => {
    dispatch(deleteUser(userId));
    dispatch(incrementDeletedUsers());
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="bg-gray-800 text-white px-4 py-3">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-lg font-bold">Dynamic Dashboard</h1>
          <div>
            <button
              onClick={() => navigate('/analytics')}
              className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded"
            >
              Analytics Dashboard
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">User Management</h1>

        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <>
            <table className="w-full border-collapse border">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Status</th>
                  <th className="border px-4 py-2">Region</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="border px-4 py-2">{user.name}</td>
                    <td className="border px-4 py-2">{user.email}</td>
                    <td className="border px-4 py-2">{user.status}</td>
                    <td className="border px-4 py-2">{user.region}</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="text-white bg-blue-500 px-2 py-1 rounded"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-white bg-red-500 px-2 py-1 rounded ml-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => dispatch(setCurrentPage(currentPage - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => dispatch(setCurrentPage(currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}

        {selectedUser && (
          <div className="mt-8 p-4 bg-white shadow rounded-lg">
            <h2 className="text-2xl font-bold mb-4">User Details</h2>
            <p>
              <strong>Name:</strong> {selectedUser.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>Status:</strong> {selectedUser.status}
            </p>
            <p>
              <strong>Region:</strong> {selectedUser.region}
            </p>
            <button
              onClick={() => setSelectedUser(null)}
              className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
