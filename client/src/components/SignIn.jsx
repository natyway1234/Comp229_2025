import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { authAPI, handleApiError } from '../api';

function SignIn() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signIn } = useAuth();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            console.log('Signin attempt with email:', formData.email);
            const response = await authAPI.signin(formData);
            console.log('Signin response:', response);
            if (response && response.success) {
                signIn(response.token, response.user);
                alert('Signed in successfully!');
                navigate('/projects');
            } else {
                setError(response?.message || 'Sign in failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Signin error:', error);
            const errorMessage = error.message || 'An error occurred during sign in. Please try again.';
            setError(errorMessage);
            handleApiError(error, setError);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '50px auto', padding: '20px' }}>
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>
                {error && (
                    <div style={{ color: 'red', marginBottom: '15px' }}>
                        {error}
                    </div>
                )}
                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: loading ? 'not-allowed' : 'pointer'
                    }}
                >
                    {loading ? 'Signing In...' : 'Sign In'}
                </button>
            </form>
            <p style={{ marginTop: '15px', textAlign: 'center' }}>
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
        </div>
    );
}

export default SignIn;

