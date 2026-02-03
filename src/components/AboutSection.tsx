import { Card, CardContent } from "@/components/ui/card";
import profilePhoto from "@/assets/profile-photo.jpg";

const AboutSection = () => {
  const skills = [
    "Python", "C/C++", "JavaScript", "PHP", 
    "Linux", "Docker", "Arduino", "SolidWorks",
    "Cisco", "VMware", "Laravel", "IoT"
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-hero-gradient bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Passionate about creating digital solutions that make a difference
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Photo Section */}
          <div className="order-1 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-hero-gradient rounded-3xl blur opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
              <img 
                src={profilePhoto} 
                alt="Fatur Rahman" 
                className="relative w-80 h-80 object-cover rounded-2xl shadow-2xl transform group-hover:scale-105 transition-all duration-300"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="order-2 space-y-6">
            <Card className="bg-card-gradient border-border/50 shadow-subtle-glow">
              <CardContent className="p-8">
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Hi, I’m Fatur Rahman, a fresh graduate from the Computer Technology Study Program, IT Del in Toba, North Sumatra. I have a strong passion for cybersecurity, cloud computing, and networking, with additional interest in IoT automation, web development, and digital 3D design.
                </p>
                
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                 I enjoy applying technology to solve real-world problems—whether it’s building responsive websites, automating systems with IoT, securing networks, or designing creative digital solutions. Through academic projects and self-learning, I have developed a balance of technical expertise, problem-solving skills, and adaptability to new challenges.
                </p>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-primary">Core Technologies</h3>
                  <div className="flex flex-wrap gap-3">
                    {skills.map((skill, index) => (
                      <span 
                        key={skill}
                        className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20 hover:bg-primary/20 transition-colors duration-300 cursor-default"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;