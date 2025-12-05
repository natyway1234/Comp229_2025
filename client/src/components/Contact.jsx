import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { contactsAPI, handleApiError } from '../api';

function Contact() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: ''
    });

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Load contacts when component mounts
    useEffect(() => {
        loadContacts();
    }, []);

    const loadContacts = async () => {
        setLoading(true);
        setError(''); // Clear errors when loading
        try {
            const data = await contactsAPI.getAll();
            setContacts(data);
        } catch (error) {
            handleApiError(error, setError);
        } finally {
            setLoading(false);
        }
    };

    // Handle form submission (create or update)
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isAuthenticated()) {
            alert('Please sign in or sign up to add or edit contacts.');
            navigate('/signin');
            return;
        }
        if (loading) return; // Prevent duplicate submissions
        setLoading(true);
        setError(''); // Clear previous errors
        try {
            if (editingId) {
                // Update existing contact
                await contactsAPI.update(editingId, formData);
                alert('Contact updated successfully!');
            } else {
                // Create new contact
                await contactsAPI.create(formData);
                alert('Contact added successfully!');
            }
            setFormData({ firstname: '', lastname: '', email: '' });
            setEditingId(null);
            loadContacts();
        } catch (error) {
            handleApiError(error, setError);
        } finally {
            setLoading(false);
        }
    };

    // Handle edit button click
    const handleEdit = (contact) => {
        if (!isAuthenticated()) {
            alert('Please sign in or sign up to edit contacts.');
            navigate('/signin');
            return;
        }
        setFormData({
            firstname: contact.firstname,
            lastname: contact.lastname,
            email: contact.email
        });
        setEditingId(contact._id);
    };

    // Handle cancel edit
    const handleCancelEdit = () => {
        setFormData({ firstname: '', lastname: '', email: '' });
        setEditingId(null);
    };

    // Handle contact deletion
    const handleDelete = async (id) => {
        if (!isAuthenticated()) {
            alert('Please sign in or sign up to delete contacts.');
            navigate('/signin');
            return;
        }
        if (window.confirm('Are you sure you want to delete this contact?')) {
            setLoading(true);
            setError(''); // Clear previous errors
            try {
                await contactsAPI.delete(id);
                loadContacts();
                alert('Contact deleted successfully!');
            } catch (error) {
                handleApiError(error, setError);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="contact-page">
            <h3>Contact Me</h3>
            
            {/* Main Contact Content */}
            <div className="contact-main-content">
                {/* Contact Information Panel */}
                <div className="contact-info-panel">
                    <h4>Get In Touch</h4>
                    <div className="contact-details">
                        <p><strong>Email:</strong> natyway1234@gmail.com</p>
                        <p><strong>Phone:</strong> 416-890-9234</p>
                        <p><strong>Location:</strong> Toronto, Canada</p>
                    </div>
                </div>

                {/* Interactive Contact Form */}
                <div className="contact-form-container">
                <h4>{editingId ? 'Edit Contact' : 'Send Me a Message'}</h4>
                {!isAuthenticated() && (
                    <div style={{ 
                        padding: '15px', 
                        backgroundColor: '#fff3cd', 
                        border: '1px solid #ffc107', 
                        borderRadius: '4px', 
                        marginBottom: '15px' 
                    }}>
                        <p style={{ margin: 0 }}>
                            <strong>Authentication Required:</strong> Please <Link to="/signin" style={{ color: '#007bff' }}>sign in</Link> or <Link to="/signup" style={{ color: '#007bff' }}>sign up</Link> to add or edit contacts.
                        </p>
                    </div>
                )}
                <form onSubmit={handleSubmit} className="contact-form">
                    {error && <p style={{color: 'red'}}>Error: {error}</p>}
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
                                disabled={loading}
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
                                disabled={loading}
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
                            disabled={loading}
                        />
                    </div>
                    
                    <div className="form-actions">
                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading ? 'Processing...' : (editingId ? 'Update Contact' : 'Send Message')}
                        </button>
                        {editingId && (
                            <button type="button" onClick={handleCancelEdit} className="cancel-btn" disabled={loading}>
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
                </div>
            </div>

            {/* Display Stored Contacts */}
            <div className="stored-contacts-section">
                <h4>Stored Contacts ({contacts.length})</h4>
                {loading ? (
                    <p>Loading contacts...</p>
                ) : error ? (
                    <p style={{color: 'red'}}>Error: {error}</p>
                ) : (
                    <div className="contacts-list">
                        {contacts.map((contact) => (
                            <div key={contact._id} className="contact-item">
                                <div className="contact-info">
                                    <h5>{contact.firstname} {contact.lastname}</h5>
                                    <p>{contact.email}</p>
                                </div>
                                <div className="contact-actions">
                                    {isAuthenticated() ? (
                                        <>
                                            <button 
                                                onClick={() => handleEdit(contact)}
                                                className="edit-btn"
                                                disabled={loading}
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(contact._id)}
                                                className="delete-btn"
                                                disabled={loading}
                                            >
                                                Delete
                                            </button>
                                        </>
                                    ) : (
                                        <p style={{ fontSize: '0.9em', color: '#666' }}>
                                            <Link to="/signin" style={{ color: '#007bff' }}>Sign in</Link> to edit or delete
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                        {contacts.length === 0 && (
                            <p>No contacts stored yet.</p>
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

export default Contact;
