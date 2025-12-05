import { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { projectsAPI, handleApiError } from '../api';
import ListComponent from "./ListComponent";

const data = [
     { 
          imagePath: '/ai_logo.png', 
          title: 'AI‑Robotics Application Form ',
          text: 'Built a clean, minimalistic application portal for AI/Robotics opportunities with structured fields (specialization, skills, motivation).'

     },
     { 
          imagePath: '/luxry_motors.png', 
          title: 'Luxury Motors—Premium Car Dealership Website', 
          text: 'Designed a polished showcase site for luxury vehicles, including hero banner, gallery, testimonials, and services.'
     },
     { 
          imagePath: '/yabufitness_logo.png', 
          title: 'YABUS Fitness — Premium Fitness Experience', 
          text: 'Developed a sleek, modern website for YABUS Fitness with sections for classes, trainers, testimonials, and membership plans.'
     },
          
]

const ProjectCard = memo(({ project, onEdit, onDelete, isAuthenticated, loading }) => {
    const formattedDate = useMemo(() => {
        return new Date(project.completion).toLocaleDateString();
    }, [project.completion]);

    return (
        <div className="project-card">
            <h5>{project.title}</h5>
            <p>Completion: {formattedDate}</p>
            <p>Description: {project.description}</p>
            <div className="project-actions">
                {isAuthenticated ? (
                    <>
                        <button 
                            onClick={() => onEdit(project)}
                            className="edit-btn"
                            disabled={loading}
                        >
                            Edit
                        </button>
                        <button 
                            onClick={() => onDelete(project._id)}
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
    );
});

ProjectCard.displayName = 'ProjectCard';

function Projects(){
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [initialLoading, setInitialLoading] = useState(true);
    const [formLoading, setFormLoading] = useState(false);
    const [error, setError] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        completion: '',
        description: ''
    });

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = useCallback(async () => {
        setInitialLoading(true);
        setError('');
        try {
            console.log('Loading projects...');
            const data = await projectsAPI.getAll();
            console.log('Projects loaded:', data);
            setProjects(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error loading projects:', error);
            handleApiError(error, setError);
        } finally {
            setInitialLoading(false);
        }
    }, []);

    const authenticated = useMemo(() => isAuthenticated(), [isAuthenticated]);

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        if (!authenticated) {
            alert('Please sign in to add or edit projects');
            navigate('/signin');
            return;
        }
        if (formLoading) return;
        setFormLoading(true);
        setError('');
        try {
            if (editingId) {
                await projectsAPI.update(editingId, formData);
                alert('Project updated successfully!');
            } else {
                await projectsAPI.create(formData);
                alert('Project added successfully!');
            }
            setFormData({ title: '', completion: '', description: '' });
            setEditingId(null);
            loadProjects();
        } catch (error) {
            handleApiError(error, setError);
        } finally {
            setFormLoading(false);
        }
    }, [authenticated, editingId, formData, formLoading, navigate, loadProjects]);

    const handleEdit = useCallback((project) => {
        if (!authenticated) {
            alert('Please sign in to edit projects');
            navigate('/signin');
            return;
        }
        const completionDate = new Date(project.completion).toISOString().split('T')[0];
        setFormData({
            title: project.title,
            completion: completionDate,
            description: project.description
        });
        setEditingId(project._id);
    }, [authenticated, navigate]);

    const handleCancelEdit = useCallback(() => {
        setFormData({ title: '', completion: '', description: '' });
        setEditingId(null);
    }, []);

    const handleDelete = useCallback(async (id) => {
        if (!authenticated) {
            alert('Please sign in to delete projects');
            navigate('/signin');
            return;
        }
        if (window.confirm('Are you sure you want to delete this project?')) {
            setFormLoading(true);
            setError('');
            try {
                await projectsAPI.delete(id);
                loadProjects();
                alert('Project deleted successfully!');
            } catch (error) {
                handleApiError(error, setError);
            } finally {
                setFormLoading(false);
            }
        }
    }, [authenticated, navigate, loadProjects]);

    return(
        <div className="projects-page">
            <h3>Projects</h3>
            
            <div className="project-form-section">
                <h4>{editingId ? 'Edit Project' : 'Add New Project'}</h4>
                {!authenticated && (
                    <div style={{ 
                        padding: '10px', 
                        backgroundColor: '#fff3cd', 
                        border: '1px solid #ffc107', 
                        borderRadius: '4px',
                        marginBottom: '15px'
                    }}>
                        <p>You must be signed in to add or edit projects. <Link to="/signin">Sign in</Link> or <Link to="/signup">Sign up</Link></p>
                    </div>
                )}
                <form onSubmit={handleSubmit} className="project-form">
                    {error && <p style={{color: 'red'}}>Error: {error}</p>}
                    <div className="form-row">
                        <input
                            type="text"
                            name="title"
                            placeholder="Project Title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                            disabled={formLoading || !authenticated}
                        />
                        <input
                            type="date"
                            name="completion"
                            placeholder="Completion Date"
                            value={formData.completion}
                            onChange={handleInputChange}
                            required
                            disabled={formLoading || !authenticated}
                        />
                    </div>
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                        disabled={formLoading || !authenticated}
                    />
                    <div className="form-actions">
                        <button type="submit" disabled={formLoading || !authenticated}>
                            {formLoading ? 'Processing...' : (editingId ? 'Update Project' : 'Add Project')}
                        </button>
                        {editingId && (
                            <button type="button" onClick={handleCancelEdit} className="cancel-btn" disabled={formLoading}>
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <h4>Featured Projects</h4>
            <ListComponent items={data}/>
            
            <h4>Stored Projects ({projects.length})</h4>
            {initialLoading ? (
                <p>Loading projects...</p>
            ) : error ? (
                <p style={{color: 'red'}}>Error: {error}</p>
            ) : (
                <div className="projects-grid">
                    {projects.map((project) => (
                        <ProjectCard
                            key={project._id}
                            project={project}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            isAuthenticated={authenticated}
                            loading={formLoading}
                        />
                    ))}
                    {projects.length === 0 && (
                        <p>No projects stored yet.</p>
                    )}
                </div>
            )}
            
            <footer className="site-footer">
                <p>&copy; 2025 Natnael Zewday. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Projects;
