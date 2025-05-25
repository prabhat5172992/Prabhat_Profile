import React, { useState, useEffect } from 'react';
import { ChevronDown, Mail, Phone, MapPin, Github, Linkedin, Code, Briefcase, GraduationCap, User, Folder } from 'lucide-react';

const Portfolio = () => {
    const [activeSection, setActiveSection] = useState('hero');
    const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.3 }
        );

        document.querySelectorAll('section[id]').forEach((section) => {
            observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    const skills = [
        { name: 'React.js', level: 95 },
        { name: 'Redux', level: 90 },
        { name: 'JavaScript', level: 92 },
        { name: 'TypeScript', level: 88 },
        { name: 'HTML5/CSS3', level: 95 },
        { name: 'Node.js', level: 85 },
        { name: 'MongoDB', level: 80 }
    ];

    const experiences = [
        {
            title: 'Sr. React Developer',
            company: 'Shell India Pvt. Ltd.',
            period: 'Jan 2022 - Present',
            description: 'Working as a UI lead, architect the entire application and created using React, Redux toolkit.',
            achievements: ['Led UI architecture design', 'Implemented Redux Toolkit', 'Mentored development team']
        },
        {
            title: 'Consultant',
            company: 'Genpact Headstrong Capital Markets',
            period: 'Jan 2019 - December 2021',
            description: 'Created web pages and incentive coupon campaigns from scratch.',
            achievements: ['Built campaign management system', 'Developed incentive modules', 'Performance optimization']
        },
        {
            title: 'Software Engineer',
            company: 'Wipro Technologies',
            period: 'Jan 2016 - Jan 2019',
            description: 'Developed web pages and modules for large applications using React and Redux.',
            achievements: ['Module development', 'Large scale applications', 'React ecosystem expertise']
        }
    ];

    const projects = [
        {
            title: 'C-CAT (GOM Pathfinder)',
            period: 'Jan 2022 - Present',
            description: 'Developed C-CAT (Concept Assessment Tool) from scratch using Redux Toolkit. Involved in client requirement gathering, selecting UI framework, assisting the design team in Figma.',
            technologies: ['Redux UI', 'Python API', 'AWS RDS'],
            features: [
                'Certificate-based user authentication',
                'Role-based user management',
                'Dynamic React page creation from JSON schema',
                'Custom dashboards for different user roles',
                'Approval workflow system'
            ]
        },
        {
            title: 'Digital Wallet Onboarding Platform',
            period: 'Jan 2021 - December 2021',
            description: 'Created different page routes and configurations using Kraken JS. Built React pages to support multiple screen flow.',
            technologies: ['Kraken JS', 'React', 'Node.js', 'Signal FX', 'Splunk'],
            features: [
                'Multiple page routes configuration',
                'Multi-screen workflow support',
                'Automated manual tasks with Node scripts',
                'Live page monitoring with analytics'
            ]
        },
        {
            title: 'PayPal EMEA WebOps',
            period: 'Jan 2019 - December 2020',
            description: 'Created a currency converter page helping to find exchange rates for debit cards issued by PayPal in Europe.',
            technologies: ['React', 'MasterCard API', 'European Central Bank API'],
            features: [
                'Currency conversion with real-time rates',
                'Searchable dropdown components',
                'Responsive pagination system',
                'Multiple incentive campaign pages'
            ]
        }
    ];

    interface ScrollToSectionProps {
        targetId: string;
        children: React.ReactNode;
    }

    const ScrollToSection: React.FC<ScrollToSectionProps> = ({ targetId, children }) => (
        <button
            onClick={() => document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' })}
            className="transition-all duration-300 hover:scale-105"
        >
            {children}
        </button>
    );

    return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Prabhat Ranjan
            </div>
            <div className="hidden md:flex space-x-8">
              {['hero', 'about', 'experience', 'projects', 'skills', 'contact'].map((section) => (
                <ScrollToSection key={section} targetId={section}>
                  <span className={`capitalize hover:text-blue-400 transition-colors ${
                    activeSection === section ? 'text-blue-400' : 'text-white/80'
                  }`}>
                    {section === 'hero' ? 'Home' : section}
                  </span>
                </ScrollToSection>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; viewBox=&quot;0 0 1000 1000&quot;><defs><radialGradient id=&quot;a&quot; cx=&quot;50%&quot; cy=&quot;50%&quot;><stop offset=&quot;0%&quot; stop-color=&quot;rgba(120,180,255,0.1)&quot;/><stop offset=&quot;100%&quot; stop-color=&quot;rgba(120,180,255,0)&quot;/></radialGradient></defs><circle cx=&quot;200&quot; cy=&quot;200&quot; r=&quot;150&quot; fill=&quot;url(%23a)&quot;/><circle cx=&quot;800&quot; cy=&quot;300&quot; r=&quot;200&quot; fill=&quot;url(%23a)&quot;/><circle cx=&quot;400&quot; cy=&quot;700&quot; r=&quot;180&quot; fill=&quot;url(%23a)&quot;/></svg>')] opacity-50"></div>
        
        <div className={`text-center z-10 transform transition-all duration-1000 ${
          isVisible['hero'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="mb-8">
            <div className="w-40 h-40 mx-auto mb-6 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-6xl font-bold shadow-2xl animate-pulse">
              PR
            </div>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-fade-in">
            Prabhat Ranjan
          </h1>
          <h2 className="text-2xl md:text-3xl text-blue-300 mb-6 animate-slide-up">
            Senior React Developer
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            7.8 years of experience in web development, specializing in architecting and developing web apps for BFSI, digital payment, and Energy sectors.
          </p>
          <div className="flex justify-center space-x-6 mb-12">
            <a href="mailto:prabhat5172992@gmail.com" className="hover:scale-110 transition-transform duration-300">
              <Mail className="w-8 h-8 text-blue-400 hover:text-blue-300" />
            </a>
            <a href="#" className="hover:scale-110 transition-transform duration-300">
              <Linkedin className="w-8 h-8 text-blue-400 hover:text-blue-300" />
            </a>
            <a href="#" className="hover:scale-110 transition-transform duration-300">
              <Github className="w-8 h-8 text-blue-400 hover:text-blue-300" />
            </a>
          </div>
          <ScrollToSection targetId="about">
            <ChevronDown className="w-8 h-8 mx-auto animate-bounce text-blue-400" />
          </ScrollToSection>
        </div>
      </section>

    {/* About Section */ }
    < section id = "about" className = "py-20 px-6" >
        <div className="container mx-auto max-w-4xl">
            <div className={`transform transition-all duration-1000 ${isVisible.about ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}>
                <h2 className="text-4xl font-bold text-center mb-12 flex items-center justify-center">
                    <User className="w-8 h-8 mr-3 text-blue-400" />
                    About Me
                </h2>
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-2xl">
                    <p className="text-lg leading-relaxed mb-6 text-white/90">
                        Senior Software Engineer with 7.8 years of experience in web development, including internships since Feb 2016.
                        Proficient in JavaScript, React, Redux, Node.js, and TypeScript. Specialized in architecting and developing web apps
                        for BFSI, digital payment, and Energy sectors.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-xl font-semibold mb-3 text-blue-300">Contact Info</h3>
                            <div className="space-y-2">
                                <div className="flex items-center">
                                    <MapPin className="w-4 h-4 mr-2 text-blue-400" />
                                    <span>Bengaluru, India</span>
                                </div>
                                <div className="flex items-center">
                                    <Phone className="w-4 h-4 mr-2 text-blue-400" />
                                    <span>+91 8867412196</span>
                                </div>
                                <div className="flex items-center">
                                    <Mail className="w-4 h-4 mr-2 text-blue-400" />
                                    <span>prabhat5172992@gmail.com</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-3 text-blue-300">Languages & Hobbies</h3>
                            <div className="space-y-2">
                                <div><strong>Languages:</strong> English, Hindi</div>
                                <div><strong>Hobbies:</strong> Chess, Badminton, Volleyball</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section >

    {/* Experience Section */ }
    < section id = "experience" className = "py-20 px-6 bg-black/20" >
        <div className="container mx-auto max-w-6xl">
            <div className={`transform transition-all duration-1000 ${isVisible.experience ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}>
                <h2 className="text-4xl font-bold text-center mb-12 flex items-center justify-center">
                    <Briefcase className="w-8 h-8 mr-3 text-blue-400" />
                    Experience
                </h2>
                <div className="space-y-8">
                    {experiences.map((exp, index) => (
                        <div key={index} className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                                <div>
                                    <h3 className="text-2xl font-bold text-blue-300 mb-1">{exp.title}</h3>
                                    <p className="text-xl text-white/80 mb-2">{exp.company}</p>
                                </div>
                                <span className="text-blue-400 font-semibold bg-blue-400/10 px-3 py-1 rounded-full">
                                    {exp.period}
                                </span>
                            </div>
                            <p className="text-white/90 mb-4">{exp.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {exp.achievements.map((achievement, i) => (
                                    <span key={i} className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                                        {achievement}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </section >

    {/* Projects Section */ }
    < section id = "projects" className = "py-20 px-6" >
        <div className="container mx-auto max-w-6xl">
            <div className={`transform transition-all duration-1000 ${isVisible.projects ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}>
                <h2 className="text-4xl font-bold text-center mb-12 flex items-center justify-center">
                    <Folder className="w-8 h-8 mr-3 text-blue-400" />
                    Featured Projects
                </h2>
                <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-8">
                    {projects.map((project, index) => (
                        <div key={index} className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-2xl font-bold text-blue-300">{project.title}</h3>
                                <span className="text-blue-400 font-semibold">{project.period}</span>
                            </div>
                            <p className="text-white/90 mb-4">{project.description}</p>

                            <div className="mb-4">
                                <h4 className="text-lg font-semibold text-purple-300 mb-2">Technologies:</h4>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech, i) => (
                                        <span key={i} className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-lg font-semibold text-green-300 mb-2">Key Features:</h4>
                                <ul className="space-y-1">
                                    {project.features.slice(0, 3).map((feature, i) => (
                                        <li key={i} className="text-white/80 text-sm flex items-start">
                                            <span className="text-green-400 mr-2">•</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </section >

    {/* Skills Section */ }
    < section id = "skills" className = "py-20 px-6 bg-black/20" >
        <div className="container mx-auto max-w-4xl">
            <div className={`transform transition-all duration-1000 ${isVisible.skills ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}>
                <h2 className="text-4xl font-bold text-center mb-12 flex items-center justify-center">
                    <Code className="w-8 h-8 mr-3 text-blue-400" />
                    Skills
                </h2>
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-2xl">
                    <div className="grid gap-6">
                        {skills.map((skill, index) => (
                            <div key={index} className="skill-item">
                                <div className="flex justify-between mb-2">
                                    <span className="text-lg font-semibold text-white">{skill.name}</span>
                                    <span className="text-blue-400 font-semibold">{skill.level}%</span>
                                </div>
                                <div className="bg-white/10 rounded-full h-3 overflow-hidden">
                                    <div
                                        className="bg-gradient-to-r from-blue-400 to-purple-500 h-full rounded-full transition-all duration-1000 ease-out"
                                        style={{
                                            width: isVisible.skills ? `${skill.level}%` : '0%',
                                            transitionDelay: `${index * 100}ms`
                                        }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </section >

    {/* Education Section */ }
    < section className = "py-20 px-6" >
        <div className="container mx-auto max-w-4xl">
            <h2 className="text-4xl font-bold text-center mb-12 flex items-center justify-center">
                <GraduationCap className="w-8 h-8 mr-3 text-blue-400" />
                Education
            </h2>
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-2xl text-center">
                <h3 className="text-2xl font-bold text-blue-300 mb-2">Computer Science and Engineering (B.E)</h3>
                <p className="text-xl text-white/80 mb-2">Nitte Meenakshi Institute of Technology</p>
                <p className="text-lg text-green-400 font-semibold">CGPA: 7.94</p>
            </div>
        </div>
      </section >

    {/* Contact Section */ }
    < section id = "contact" className = "py-20 px-6 bg-black/20" >
        <div className="container mx-auto max-w-4xl">
            <div className={`transform transition-all duration-1000 ${isVisible.contact ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}>
                <h2 className="text-4xl font-bold text-center mb-12 flex items-center justify-center">
                    <Mail className="w-8 h-8 mr-3 text-blue-400" />
                    Get In Touch
                </h2>
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-2xl text-center">
                    <p className="text-xl text-white/90 mb-8">
                        Ready to collaborate on your next project? Let's connect and build something amazing together!
                    </p>
                    <div className="flex justify-center space-x-8">
                        <a
                            href="mailto:prabhat5172992@gmail.com"
                            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                        >
                            Send Email
                        </a>
                        <a
                            href="tel:+918867412196"
                            className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                        >
                            Call Now
                        </a>
                    </div>
                </div>
            </div>
        </div>
      </section >

    {/* Footer */ }
    < footer className = "py-8 text-center border-t border-white/10" >
        <p className="text-white/60">
            © 2024 Prabhat Ranjan. Crafted with React & TypeScript.
        </p>
      </footer >

    {/* <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        
        .animate-slide-up {
          animation: slide-up 1s ease-out 0.3s forwards;
          opacity: 0;
        }
        
        .skill-item:hover .bg-gradient-to-r {
          box-shadow: 0 0 20px rgba(96, 165, 250, 0.5);
        }
        
        html {
          scroll-behavior: smooth;
        }
      `}</style> */}
    </div >
  );
};

export default Portfolio;
