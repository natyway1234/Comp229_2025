// Images are now served from public directory

function Services(){
    return(
        <div className="services-page">
            <h3>Services</h3>
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
            
            {/* Footer */}
            <footer className="site-footer">
                <p>&copy; 2025 Natnael Zewday. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Services;