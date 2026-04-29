import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Trophy, Wrench, Heart } from "lucide-react";

const SkillsSection = () => {
  const certificates = [
    { year: "2026", name: "Cisco Internet of Things" },
    { year: "2026", name: "CCNA 200-301 Network Fundamentals" },
    { year: "2025", name: "Accelerate Your Job Search with AI" },
    { year: "2025", name: "Operating Systems and You: Becoming a Power User" },
    { year: "2025", name: "The Bits and Bytes of Computer Networking" },
    { year: "2025", name: "Sertifikat Pencapaian TOEFL ITP" },
    { year: "2024", name: "HCIA-Storage V4.5 Course" },
    { year: "2024", name: "HCIA-IoT V3.0 Course" },
    { year: "2024", name: "HCIA-Datacom V1.0 Course" },
    { year: "2023", name: "HCIA-Cloud Service V3.5 (Indonesian)" },
  ];

  const achievements = [
    { year: "2024", name: "3rd place in on-campus CTF competition" },
    { year: "2024", name: "Huawei ICT Competition 2024-2025 National Final" },
    { year: "2024", name: "Participated in KRI (Kontes Robot Indonesia)" },
  ];

  const softSkills = [
    "Analytical Thinking",
    "Problem Solving",
    "Collaboration",
    "Adaptability",
    "Communication",
  ];

  const hardSkillCategories = [
    {
      category: "Network Engineering",
      items: ["WAN", "LAN", "EIGRP", "OSPF", "NAT Configuration", "Cisco Packet Tracer"],
    },
    {
      category: "Virtualization",
      items: ["Ubuntu Linux", "Kali Linux", "VMware", "VirtualBox", "CentOS", "Docker"],
    },
    {
      category: "Internet of Things (IoT)",
      items: ["Sensor Integration", "MQTT", "Arduino IDE", "Proteus"],
    },
    {
      category: "Embedded Systems",
      items: ["Arduino", "ESP32", "Microcontroller Programming", "Proteus"],
    },
    {
      category: "Web Programming",
      items: ["HTML", "CSS", "JavaScript", "Laravel", "Bootstrap"],
    },
    {
      category: "Cloud Computing",
      items: ["Ansible for Automation", "VMware"],
    },
    {
      category: "Mechanical Design",
      items: ["SolidWorks for Product Modeling", "Robotics"],
    },
  ];

  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-hero-gradient bg-clip-text text-transparent">
            Skills, Achievements & Other Experience
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A summary of my certifications, skills, and accomplishments
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Certificates */}
          <Card className="bg-card-gradient border-border/50 shadow-subtle-glow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-primary">
                <Award className="w-6 h-6" />
                Certificates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {certificates.map((cert, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <Badge variant="outline" className="border-primary/30 text-primary shrink-0">
                      {cert.year}
                    </Badge>
                    <span className="text-muted-foreground">{cert.name}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="bg-card-gradient border-border/50 shadow-subtle-glow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-primary">
                <Trophy className="w-6 h-6" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {achievements.map((ach, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <Badge variant="outline" className="border-primary/30 text-primary shrink-0">
                      {ach.year}
                    </Badge>
                    <span className="text-muted-foreground">{ach.name}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Soft Skills */}
          <Card className="bg-card-gradient border-border/50 shadow-subtle-glow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-primary">
                <Heart className="w-6 h-6" />
                Soft Skills
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {softSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20 hover:bg-primary/20 transition-colors duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Hard Skills */}
          <Card className="bg-card-gradient border-border/50 shadow-subtle-glow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-primary">
                <Wrench className="w-6 h-6" />
                Hard Skills
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {hardSkillCategories.map((cat) => (
                  <div key={cat.category}>
                    <h4 className="font-semibold text-foreground mb-2">{cat.category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {cat.items.map((item) => (
                        <span
                          key={item}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium border border-primary/20"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
