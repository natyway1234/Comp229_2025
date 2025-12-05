import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { contactsAPI, handleApiError } from '../api';

function Contact() {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    useEffect(() => {
        loadContacts();
    }, []);

    const loadContacts = async () => {
        setLoading(true);
        setError('');
        try {
            const data = await contactsAPI.getAll();
            setContacts(data);
        } catch (error) {
            handleApiError(error, setError);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isAuthenticated()) {
            alert('Please sign in to add or edit contacts');
            navigate('/signin');
            return;
        }
        if (loading) return;
        setLoading(true);
        setError('');
        try {
            if (editingId) {
                await contactsAPI.update(editingId, formData);
                alert('Contact updated successfully!');
            } else {
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

    const handleEdit = (contact) => {
        if (!isAuthenticated()) {
            alert('Please sign in to edit contacts');
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

    const handleCancelEdit = () => {
        setFormData({ firstname: '', lastname: '', email: '' });
        setEditingId(null);
    };

    const handleDelete = async (id) => {
        if (!isAuthenticated()) {
            alert('Please sign in to delete contacts');
            navigate('/signin');
            return;
        }
        if (window.confirm('Are you sure you want to delete this contact?')) {
            setLoading(true);
            setError('');
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
            
            <div className="contact-main-content">
                <div className="contact-info-panel">
                    <h4>Get In Touch</h4>
                    <div className="contact-details">
                        <p><strong>Email:</strong> natyway1234@gmail.com</p>
                        <p><strong>Phone:</strong> 416-890-9234</p>
                        <p><strong>Location:</strong> Toronto, Canada</p>
                    </div>
                </div>

                <div className="contact-form-container">
                <h4>{editingId ? 'Edit Contact' : 'Send Me a Message'}</h4>
                {!isAuthenticated() && (
                    <div style={{ 
                        padding: '10px', 
                        backgroundColor: '#fff3cd', 
                        border: '1px solid #ffc107', 
                        borderRadius: '4px',
                        marginBottom: '15px'
                    }}>
                        <p>You must be signed in to add or edit contacts. <Link to="/signin">Sign in</Link> or <Link to="/signup">Sign up</Link></p>
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
                            disabled={loading || !isAuthenticated()}
                        />
                    </div>
                    
                    <div className="form-actions">
                        <button type="submit" className="submit-btn" disabled={loading || !isAuthenticated()}>
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
                                </div>
                            </div>
                        ))}
                        {contacts.length === 0 && (
                            <p>No contacts stored yet.</p>
                        )}
                    </div>
                )}
            </div>
            
            <footer className="site-footer">
                <p>&copy; 2025 Natnael Zewday. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Contact;
