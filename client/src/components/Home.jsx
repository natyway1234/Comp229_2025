import { Link } from 'react-router-dom';

function Home(){
    return(
        <main className="home">
            <h1 className="hero-title">NATNAEL ZEWDAY</h1>
            <p className="hero-subtitle">FULL-STACK DEVELOPER & DIGITAL SOLUTIONS ARCHITECT</p>
            <div className="hero-highlight">
                <span className="highlight-text">INNOVATIVE • CREATIVE • RESULTS-DRIVEN</span>
            </div>
            
            {/* Mission Statement */}
            <section className="mission-card">
                <h2>MY MISSION</h2>
                <div className="mission-highlight">
                    <p className="mission-bold">
                        <strong>PASSIONATELY COMMITTED</strong> to creating innovative, user-centered web solutions that solve real-world problems
                        and enhance digital experiences across all platforms.
                    </p>
                    <p className="mission-bold">
                        With <strong>DEEP EXPERTISE</strong> in modern web technologies and a keen eye for design, I deliver exceptional 
                        digital solutions that not only meet but <strong>EXCEED CLIENT EXPECTATIONS</strong>.
                    </p>
                    <p className="mission-bold">
                        <strong>DEDICATED TO EXCELLENCE</strong> through continuous learning, staying current with emerging technologies
                        and industry best practices to provide strategic insights and sustainable solutions.
                    </p>
                </div>
            </section>
            
            {/* Navigation Buttons */}
            <div className="cta-row">
                <Link to="/about" className="nav-button bold-cta">
                    <span className="button-text">DISCOVER MY STORY</span>
                    <span className="button-arrow">→</span>
                </Link>
                <Link to="/projects" className="nav-button bold-cta">
                    <span className="button-text">EXPLORE PROJECTS</span>
                    <span className="button-arrow">→</span>
                </Link>
                <Link to="/services" className="nav-button bold-cta">
                    <span className="button-text">VIEW SERVICES</span>
                    <span className="button-arrow">→</span>
                </Link>
                <Link to="/contact" className="nav-button bold-cta">
                    <span className="button-text">LET'S CONNECT</span>
                    <span className="button-arrow">→</span>
                </Link>
            </div>
            
            {/* Footer */}
            <footer className="site-footer">
                <p>&copy; 2025 Natnael Zewday. All rights reserved.</p>
            </footer>
        </main>
    );
}

export default Home;