// Layout component containing navigation bar and custom logo
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
// Logo served from public directory

function Layout() {
    const { isAuthenticated, user, signOut } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = () => {
        signOut();
        navigate('/');
        alert('Signed out successfully!');
    };

    return (
        <>
            <div className="header-container">
                <div className="header-title-section">
                    <img src="/robintech_logo.png" alt="Logo" className='logo'/>
                    <h1>RobinTech Web Co.</h1>
                </div>
                {/* Navigation bar positioned in top right */}
                <nav className="navbar">
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/projects">Projects</Link>
                    <Link to="/services">Services</Link>
                    <Link to="/contact">Contact</Link>
                    <Link to="/users">Users</Link>
                    {isAuthenticated() ? (
                        <>
                            <span style={{ color: 'green', margin: '0 10px' }}>
                                {user?.firstname} {user?.lastname}
                            </span>
                            <button 
                                onClick={handleSignOut}
                                style={{
                                    padding: '5px 15px',
                                    backgroundColor: '#dc3545',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/signin">Sign In</Link>
                            <Link to="/signup">Sign Up</Link>
                        </>
                    )}
                </nav>
            </div>
            <br />
            <hr />
        </>
    );
}

export default Layout;