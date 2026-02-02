import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Linkedin, Github, Instagram } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Trim inputs before submission
    const trimmedData = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      message: formData.message.trim()
    };

    // Client-side validation
    if (trimmedData.name.length < 2 || trimmedData.name.length > 100) {
      toast({
        title: "Invalid Name",
        description: "Name must be between 2 and 100 characters.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    if (trimmedData.message.length < 10 || trimmedData.message.length > 5000) {
      toast({
        title: "Invalid Message",
        description: "Message must be between 10 and 5000 characters.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('submit-contact', {
        body: trimmedData
      });

      if (error) throw error;
      
      // Check for application-level errors from the edge function
      if (data?.error) {
        throw new Error(data.error);
      }

      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon!",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const socialLinks = [
    {
      name: "Email",
      icon: Mail,
      url: "mailto:faturrahman3384@gmail.com",
      color: "hover:text-red-400"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/fatur-rahman-6711b4287",
      color: "hover:text-blue-400"
    },
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/Faturrahman080402",
      color: "hover:text-gray-400"
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://www.instagram.com/ftrachman14/?hl=en",
      color: "hover:text-pink-400"
    }
  ];

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-hero-gradient bg-clip-text text-transparent">
            Let's Work Together
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to bring your ideas to life? Get in touch and let's create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="bg-card-gradient border-border/50 shadow-subtle-glow">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary">Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    minLength={2}
                    maxLength={100}
                    className="bg-secondary border-border/50 focus:border-primary/50 transition-colors"
                  />
                </div>
                
                <div>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    maxLength={255}
                    required
                    className="bg-secondary border-border/50 focus:border-primary/50 transition-colors"
                  />
                </div>
                
                <div>
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    minLength={10}
                    maxLength={5000}
                    rows={6}
                    className="bg-secondary border-border/50 focus:border-primary/50 transition-colors resize-none"
                  />
                </div>
                
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow transition-all duration-300 hover:shadow-subtle-glow transform hover:scale-105"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            <Card className="bg-card-gradient border-border/50 shadow-subtle-glow">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-primary">Get In Touch</h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  I'm always interested in hearing about new opportunities, creative projects, 
                  or just having a chat about technology and design. Feel free to reach out!
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <span className="text-foreground">faturrahman3384@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <span className="text-primary text-sm">📍</span>
                    </div>
                    <span className="text-foreground">Toba, North Sumatra</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card-gradient border-border/50 shadow-subtle-glow">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-primary">Connect With Me</h3>
                <div className="flex space-x-6">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 bg-secondary rounded-full transition-all duration-300 hover:bg-secondary/80 transform hover:scale-110 ${social.color} group shadow-lg hover:shadow-glow`}
                      aria-label={social.name}
                    >
                      <social.icon className="w-6 h-6" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;