import { useState, useEffect } from 'react';
import { usersAPI, handleApiError } from '../api';

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    });

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Load users when component mounts
    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        setLoading(true);
        try {
            const data = await usersAPI.getAll();
            setUsers(data);
        } catch (error) {
            handleApiError(error, setError);
        } finally {
            setLoading(false);
        }
    };

    // Handle form submission (create or update)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editingId) {
                // Update existing user
                await usersAPI.update(editingId, formData);
                alert('User updated successfully!');
            } else {
                // Create new user
                await usersAPI.create(formData);
                alert('User added successfully!');
            }
            setFormData({ firstname: '', lastname: '', email: '', password: '' });
            setEditingId(null);
            loadUsers();
        } catch (error) {
            handleApiError(error, setError);
        } finally {
            setLoading(false);
        }
    };

    // Handle edit button click
    const handleEdit = (user) => {
        setFormData({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: '' // Don't pre-fill password for security
        });
        setEditingId(user._id);
    };

    // Handle cancel edit
    const handleCancelEdit = () => {
        setFormData({ firstname: '', lastname: '', email: '', password: '' });
        setEditingId(null);
    };

    // Handle user deletion
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await usersAPI.delete(id);
                loadUsers();
                alert('User deleted successfully!');
            } catch (error) {
                handleApiError(error, setError);
            }
        }
    };

    return (
        <div className="users-page">
            <h3>User Management</h3>
            
            {/* User Form */}
            <div className="user-form-section">
                <h4>{editingId ? 'Edit User' : 'Add New User'}</h4>
                <form onSubmit={handleSubmit} className="user-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="firstname">First Name *</label>
                            <input
                                type="text"
                                id="firstname"
                                name="firstname"
                                value={formData.firstname}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastname">Last Name *</label>
                            <input
                                type="text"
                                id="lastname"
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="email">Email Address *</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password">Password *</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            placeholder={editingId ? "Enter new password" : "Enter password"}
                        />
                    </div>
                    
                    <div className="form-actions">
                        <button type="submit" className="submit-btn">
                            {editingId ? 'Update User' : 'Add User'}
                        </button>
                        {editingId && (
                            <button type="button" onClick={handleCancelEdit} className="cancel-btn">
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Display Stored Users */}
            <div className="stored-users-section">
                <h4>Stored Users ({users.length})</h4>
                {loading ? (
                    <p>Loading users...</p>
                ) : error ? (
                    <p style={{color: 'red'}}>Error: {error}</p>
                ) : (
                    <div className="users-list">
                        {users.map((user) => (
                            <div key={user._id} className="user-item">
                                <div className="user-info">
                                    <h5>{user.firstname} {user.lastname}</h5>
                                    <p>Email: {user.email}</p>
                                    <p>Created: {new Date(user.created).toLocaleDateString()}</p>
                                </div>
                                <div className="user-actions">
                                    <button 
                                        onClick={() => handleEdit(user)}
                                        className="edit-btn"
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(user._id)}
                                        className="delete-btn"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                        {users.length === 0 && (
                            <p>No users stored yet.</p>
                        )}
                    </div>
                )}
            </div>
            
            {/* Footer */}
            <footer className="site-footer">
                <p>&copy; 2025 Natnael Zewday. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Users;

