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
    return(
        <div className="projects-page">
            <h3>Projects</h3>
            <ListComponent items={data}/>
            
            {/* Footer */}
            <footer className="site-footer">
                <p>&copy; 2025 Natnael Zewday. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Projects;