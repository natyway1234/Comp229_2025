import { useState, useEffect } from 'react';
import { servicesAPI, handleApiError } from '../api';

function Services(){
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: ''
    });

    useEffect(() => {
        loadServices();
    }, []);

    const loadServices = async () => {
        setLoading(true);
        setError(''); // Clear errors when loading
        try {
            const data = await servicesAPI.getAll();
            setServices(data);
        } catch (error) {
            handleApiError(error, setError);
        } finally {
            setLoading(false);
        }
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return; // Prevent duplicate submissions
        setLoading(true);
        setError(''); // Clear previous errors
        try {
            if (editingId) {
                // Update existing service
                await servicesAPI.update(editingId, formData);
                alert('Service updated successfully!');
            } else {
                // Create new service
                await servicesAPI.create(formData);
                alert('Service added successfully!');
            }
            setFormData({ title: '', description: '' });
            setEditingId(null);
            loadServices();
        } catch (error) {
            handleApiError(error, setError);
        } finally {
            setLoading(false);
        }
    };

    // Handle edit button click
    const handleEdit = (service) => {
        setFormData({
            title: service.title,
            description: service.description
        });
        setEditingId(service._id);
    };

    // Handle cancel edit
    const handleCancelEdit = () => {
        setFormData({ title: '', description: '' });
        setEditingId(null);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            setLoading(true);
            setError(''); // Clear previous errors
            try {
                await servicesAPI.delete(id);
                loadServices();
                alert('Service deleted successfully!');
            } catch (error) {
                handleApiError(error, setError);
            } finally {
                setLoading(false);
            }
        }
    };
    return(
        <div className="services-page">
            <h3>Services</h3>
            
            {/* Service Form */}
            <div className="service-form-section">
                <h4>{editingId ? 'Edit Service' : 'Add New Service'}</h4>
                <form onSubmit={handleSubmit} className="service-form">
                    {error && <p style={{color: 'red'}}>Error: {error}</p>}
                    <input
                        type="text"
                        name="title"
                        placeholder="Service Title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        disabled={loading}
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                        disabled={loading}
                    />
                    <div className="form-actions">
                        <button type="submit" disabled={loading}>
                            {loading ? 'Processing...' : (editingId ? 'Update Service' : 'Add Service')}
                        </button>
                        {editingId && (
                            <button type="button" onClick={handleCancelEdit} className="cancel-btn" disabled={loading}>
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Static Services Display */}
            <h4>Featured Services</h4>
            <div className="services-grid">
                <div className="service-card">
                    <img src="/website_development_logo.jpg" alt="Web Development" />
                    <div className="text-content">
                        <h3>Web Development</h3>
                        <p>Custom web applications built with modern frameworks like React, Vue.js, and Angular. I specialize in responsive design, performance optimization, and user experience enhancement. Services include frontend development, API integration, and cross-browser compatibility.</p>
                    </div>
                </div>
                <div className="service-card">
                    <img src="/mobile_app.jpg" alt="Mobile App Development" />
                    <div className="text-content">
                        <h3>Mobile App Development</h3>
                        <p>Native and cross-platform mobile applications for iOS and Android. Using React Native and Flutter, I create high-performance mobile apps with intuitive user interfaces. Services include app design, development, testing, and App Store deployment.</p>
                    </div>
                </div>
            </div>

            {/* Dynamic Services from Backend */}
            <h4>Stored Services ({services.length})</h4>
            {loading ? (
                <p>Loading services...</p>
            ) : error ? (
                <p style={{color: 'red'}}>Error: {error}</p>
            ) : (
                <div className="services-grid">
                    {services.map((service) => (
                        <div key={service._id} className="service-card">
                            <div className="text-content">
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                                <div className="service-actions">
                                    <button 
                                        onClick={() => handleEdit(service)}
                                        className="edit-btn"
                                        disabled={loading}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(service._id)}
                                        className="delete-btn"
                                        disabled={loading}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {services.length === 0 && (
                        <p>No services stored yet.</p>
                    )}
                </div>
            )}
            
            {/* Footer */}
            <footer className="site-footer">
                <p>&copy; 2025 Natnael Zewday. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Services;
