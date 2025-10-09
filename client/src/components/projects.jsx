import { useState, useEffect } from 'react';
import { projectsAPI } from '../api';
import ListComponent from "./ListComponent";
import aiLogo from '../assets/ai logo.png';
import luxuryLogo from '../assets/luxry motors.png';
import yabuFitnessLogo from '../assets/yabufitness logo.png';

const data = [
     { 
          imagePath: aiLogo, 
          title: 'AI‑Robotics Application Form ',
          text: 'Built a clean, minimalistic application portal for AI/Robotics opportunities with structured fields (specialization, skills, motivation).'

     },
     { 
          imagePath: luxuryLogo, 
          title: 'Luxury Motors—Premium Car Dealership Website', 
          text: 'Designed a polished showcase site for luxury vehicles, including hero banner, gallery, testimonials, and services.'
     },
     { 
          imagePath: yabuFitnessLogo, 
          title: 'YABUS Fitness — Premium Fitness Experience', 
          text: 'Developed a sleek, modern website for YABUS Fitness with sections for classes, trainers, testimonials, and membership plans.'
     },
          
]

function Projects(){
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        completion: '',
        description: '',
    });

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        setLoading(true);
        try {
            const data = await projectsAPI.getAll();
            setProjects(data);
        } catch (error) {
            console.error('Failed to load projects:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await projectsAPI.create(formData);
            setFormData({ title: '', completion: '', description: '' });
            loadProjects();
            alert('Project added successfully!');
        } catch (error) {
            console.error('Failed to create project:', error);
            alert('Failed to add project');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await projectsAPI.delete(id);
                loadProjects();
                alert('Project deleted successfully!');
            } catch (error) {
                console.error('Failed to delete project:', error);
                alert('Failed to delete project');
            }
        }
    };

    return(
        <div className="projects-page">
            <h3>PROJECTS</h3>
            
            {/* Project Form Section */}
            <div className="project-form-section">
                <div className="form-container">
                    <h4>ADD NEW PROJECT</h4>
                    <p className="form-description">Create and manage your project portfolio</p>
                    <form onSubmit={handleSubmit} className="project-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="project-title">Project Title *</label>
                                <input
                                    type="text"
                                    id="project-title"
                                    placeholder="Enter project title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="completion-date">Completion Date *</label>
                                <input
                                    type="date"
                                    id="completion-date"
                                    placeholder="Select completion date"
                                    value={formData.completion}
                                    onChange={(e) => setFormData({...formData, completion: e.target.value})}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="project-description">Project Description *</label>
                            <textarea
                                id="project-description"
                                placeholder="Describe your project details, technologies used, and key features"
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                required
                                rows="4"
                            />
                        </div>
                        <button type="submit" className="submit-project-btn">
                            <span className="btn-text">ADD PROJECT</span>
                            <span className="btn-icon">+</span>
                        </button>
                    </form>
                </div>
            </div>

            {/* Featured Projects Section */}
            <div className="featured-projects-section">
                <h4>FEATURED PROJECTS</h4>
                <p className="section-description">Showcase of my best work and portfolio highlights</p>
                <ListComponent items={data}/>
            </div>
            
            {/* Dynamic Projects Section */}
            <div className="stored-projects-section">
                <h4>STORED PROJECTS ({projects.length})</h4>
                <p className="section-description">Projects saved to the database</p>
                {loading ? (
                    <div className="loading-container">
                        <p>Loading projects...</p>
                    </div>
                ) : (
                    <div className="projects-grid">
                        {projects.map((project) => (
                            <div key={project._id} className="project-card">
                                <div className="project-header">
                                    <h5>{project.title}</h5>
                                    <span className="completion-date">
                                        {new Date(project.completion).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className="project-description">{project.description}</p>
                                <button 
                                    onClick={() => handleDelete(project._id)}
                                    className="delete-btn"
                                >
                                    <span>DELETE</span>
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
            {/* Footer */}
            <footer className="site-footer">
                <p>&copy; 2025 Natnael Zewday. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Projects;