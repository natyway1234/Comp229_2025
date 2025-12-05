// src/api.js
// Use deployed backend as the API base URL
const API_BASE_URL = 'https://comp229-backend-f9fs.onrender.com/api';

// Get token from localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// Generic API call function
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getToken();
  
  try {
    console.log(`Making API call to: ${url}`, options);

    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // Add Authorization header if token exists
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      headers,
      ...options,
    });

    console.log(`API Response status: ${response.status}`);

    // Try to parse response as JSON
    let responseData;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      responseData = await response.json();
    } else {
      const text = await response.text();
      console.error('Non-JSON response:', text);
      throw new Error(`Server returned non-JSON response: ${text.substring(0, 100)}`);
    }

    if (!response.ok) {
      // Handle specific error cases
      if (response.status === 404) {
        const errorMessage = responseData.message || `Endpoint not found. Please check if the backend is running at ${API_BASE_URL}`;
        console.error('404 Not Found - API Error Response:', {
          status: response.status,
          statusText: response.statusText,
          url: url,
          errorData: responseData
        });
        throw new Error(errorMessage);
      }
      
      const errorMessage = responseData.message || responseData.error || `HTTP error! status: ${response.status}`;
      console.error('API Error Response:', {
        status: response.status,
        statusText: response.statusText,
        url: url,
        errorData: responseData
      });
      throw new Error(errorMessage);
    }

    return responseData;
  } catch (error) {
    console.error(`API call failed for ${url}:`, error);
    // If it's a network error, provide a more helpful message
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error(`Unable to connect to server at ${url}. Please check if the backend is running and accessible.`);
    }
    // If error message is just "Not Found", provide more context
    if (error.message === 'Not Found' || error.message.includes('Not Found')) {
      throw new Error(`Backend endpoint not found: ${url}. The backend might be sleeping (Render free tier) or the route is not configured. Please wait a moment and try again, or check the backend logs.`);
    }
    throw error;
  }
};

// Utility function to handle API errors in components
export const handleApiError = (error, setError) => {
  const message = error.message || 'An unexpected error occurred';
  if (setError) {
    setError(message);
  } else {
    console.error('API Error:', message);
    alert(message);
  }
};

// Contacts API
export const contactsAPI = {
  getAll: () => apiCall('/contacts'),
  getById: (id) => apiCall(`/contacts/${id}`),
  create: (contact) => apiCall('/contacts', {
    method: 'POST',
    body: JSON.stringify(contact),
  }),
  update: (id, contact) => apiCall(`/contacts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(contact),
  }),
  delete: (id) => apiCall(`/contacts/${id}`, { method: 'DELETE' }),
  deleteAll: () => apiCall('/contacts', { method: 'DELETE' }),
};

// Projects API
export const projectsAPI = {
  getAll: () => apiCall('/projects'),
  getById: (id) => apiCall(`/projects/${id}`),
  create: (project) => apiCall('/projects', {
    method: 'POST',
    body: JSON.stringify(project),
  }),
  update: (id, project) => apiCall(`/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(project),
  }),
  delete: (id) => apiCall(`/projects/${id}`, { method: 'DELETE' }),
  deleteAll: () => apiCall('/projects', { method: 'DELETE' }),
};

// Services API
export const servicesAPI = {
  getAll: () => apiCall('/services'),
  getById: (id) => apiCall(`/services/${id}`),
  create: (service) => apiCall('/services', {
    method: 'POST',
    body: JSON.stringify(service),
  }),
  update: (id, service) => apiCall(`/services/${id}`, {
    method: 'PUT',
    body: JSON.stringify(service),
  }),
  delete: (id) => apiCall(`/services/${id}`, { method: 'DELETE' }),
  deleteAll: () => apiCall('/services', { method: 'DELETE' }),
};

// Users API
export const usersAPI = {
  getAll: () => apiCall('/users'),
  getById: (id) => apiCall(`/users/${id}`),
  create: (user) => apiCall('/users', {
    method: 'POST',
    body: JSON.stringify(user),
  }),
  update: (id, user) => apiCall(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(user),
  }),
  delete: (id) => apiCall(`/users/${id}`, { method: 'DELETE' }),
  deleteAll: () => apiCall('/users', { method: 'DELETE' }),
};

// Authentication API
export const authAPI = {
  signup: (userData) => apiCall('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
  signin: (credentials) => apiCall('/auth/signin', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
};

// Test backend connection
export const testBackendConnection = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      const data = await response.json();
      return { success: true, data };
    } else {
      return { success: false, status: response.status, message: 'Backend returned error' };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};
