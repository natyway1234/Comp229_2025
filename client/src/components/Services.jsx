import { useState, useEffect } from 'react';
import { servicesAPI } from '../api';

function Services(){
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
    });

    useEffect(() => {
        loadServices();
    }, []);

    const loadServices = async () => {
        setLoading(true);
        try {
            const data = await servicesAPI.getAll();
            setServices(data);
        } catch (error) {
            console.error('Failed to load services:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await servicesAPI.create(formData);
            setFormData({ title: '', description: '' });
            loadServices();
            alert('Service added successfully!');
        } catch (error) {
            console.error('Failed to create service:', error);
            alert('Failed to add service');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            try {
                await servicesAPI.delete(id);
                loadServices();
                alert('Service deleted successfully!');
            } catch (error) {
                console.error('Failed to delete service:', error);
                alert('Failed to delete service');
            }
        }
    };

    return(
        <div className="services-page">
            <h3>Services</h3>
            
            {/* Service Form */}
            <div className="service-form-section">
                <h4>Add New Service</h4>
                <form onSubmit={handleSubmit} className="service-form">
                    <input
                        type="text"
                        placeholder="Service Title"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        required
                    />
                    <textarea
                        placeholder="Description"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        required
                    />
                    <button type="submit">Add Service</button>
                </form>
            </div>

            {/* Static Services Display */}
            <h4>Featured Services</h4>
            <div className="services-grid">
                <div className="service-card">
                    <img src="/src/assets/Website Development Logo.jpg" alt="Web Development" />
                    <div className="text-content">
                        <h3>Web Development</h3>
                        <p>Custom web applications built with modern frameworks like React, Vue.js, and Angular. I specialize in responsive design, performance optimization, and user experience enhancement. Services include frontend development, API integration, and cross-browser compatibility.</p>
                    </div>
                </div>
                <div className="service-card">
                    <img src="/src/assets/Mobile app development.jpg" alt="Mobile App Development" />
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
            ) : (
                <div className="services-grid">
                    {services.map((service) => (
                        <div key={service._id} className="service-card">
                            <div className="text-content">
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                                <button 
                                    onClick={() => handleDelete(service._id)}
                                    className="delete-btn"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
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