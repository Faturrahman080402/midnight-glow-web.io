import { Card, CardContent } from "@/components/ui/card";

import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import project5 from "@/assets/project-5.jpg";
import project6 from "@/assets/project-6.jpg";

const ProjectsSection = () => {
  const projects = [
    {
      id: 1,
      title: "PDLC Glass System with UV Detection",
      description: "Leading the development of UV detection systems and automatic curtains to improve safety and energy efficiency, reducing UV exposure by up to 80% in indoor environments.",
      image: project1,
      technologies: ["C", "Arduino IDE", "ML8511 Sensor", "DHT11", "Arduino Uno"],
    },
    {
      id: 2,
      title: "Automatic Garbage Collection Ship",
      description: "3D casing design in SolidWorks for autonomous garbage collection ship that detects garbage in waters and monitors pollution levels using camera detection.",
      image: project2,
      technologies: ["SolidWorks", "3D Design", "Environmental Monitoring"],
    },
    {
      id: 3,
      title: "I-Travel Website Information System",
      description: "Comprehensive travel website providing information about tourist attractions, restaurants, accommodations, and travel routes between Kualanamu and Silangit Airports.",
      image: project3,
      technologies: ["HTML", "CSS", "JavaScript", "PHP", "SQL"],
    },
    {
      id: 4,
      title: "Mesh LoRa on NS3 Simulator",
      description: "Development and simulation of LoRa Mesh networks using NS3 simulator to optimize long-range and energy-efficient communication performance for IoT applications.",
      image: project4,
      technologies: ["NS3", "Ubuntu", "LoRa", "Network Simulation"],
    },
    {
      id: 5,
      title: "Deep Focus",
      description: "A productivity and focus application designed to help users concentrate on their tasks with minimal distractions.",
      image: project5,
      technologies: ["React", "TypeScript", "Tailwind CSS"],
      url: "https://deep-focuss.lovable.app"
    },
    {
      id: 6,
      title: "Toba Market",
      description: "An e-commerce marketplace platform showcasing products and services from the Toba region.",
      image: project6,
      technologies: ["React", "TypeScript", "Tailwind CSS"],
      url: "https://tobamarket.lovable.app"
    }
  ];

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-hero-gradient bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A showcase of my recent work, ranging from web applications to mobile solutions
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => {
            const CardWrapper = project.url ? 'a' : 'div';
            const cardProps = project.url ? { href: project.url, target: "_blank", rel: "noopener noreferrer" } : {};
            
            return (
              <CardWrapper key={project.id} {...cardProps}>
                <Card 
                  className={`group bg-card-gradient border-border/50 shadow-subtle-glow hover:shadow-glow transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up ${project.url ? 'cursor-pointer' : ''}`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-all duration-300"></div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;