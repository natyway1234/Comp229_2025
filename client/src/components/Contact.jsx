import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Contact() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        contactNumber: '',
        email: '',
        message: ''
    });

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Log form data to console (as per requirement - doesn't need to be fully functional)
        console.log('Form submitted with data:', formData);
        
        // Show alert to user
        alert('Thank you for your message! Redirecting to Home page...');
        
        // Redirect to Home page
        navigate('/');
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
                <h4>Send Me a Message</h4>
                <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="firstName">First Name *</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name *</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="contactNumber">Contact Number *</label>
                            <input
                                type="tel"
                                id="contactNumber"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleInputChange}
                                required
                            />
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
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="message">Message *</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            rows="5"
                            placeholder="Tell me about your project or how I can help you..."
                            required
                        ></textarea>
                    </div>
                    
                    <button type="submit" className="submit-btn">Send Message</button>
                </form>
                </div>
            </div>
            
            {/* Footer */}
            <footer className="site-footer">
                <p>&copy; 2025 Natnael Zewday. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Contact;
