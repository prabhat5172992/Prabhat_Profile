import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  Code,
  Briefcase,
  GraduationCap,
  User,
  Folder,
  ExternalLink,
  Award,
  Calendar,
  Building,
  Globe,
  Download,
  CheckCircle,
} from 'lucide-react';
import profilePic from '../assets/pic.jpeg';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = ['home', 'about', 'experience', 'projects', 'skills', 'education', 'contact'];
      let closestSection = sectionIds[0];
      let minDistance = Number.POSITIVE_INFINITY;

      for (let i = 0; i < sectionIds.length; i++) {
        const section = document.getElementById(sectionIds[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          const distance = Math.abs(rect.top - 100); // 100 = header offset
          if (rect.top - 100 <= 0 && distance < minDistance) {
            minDistance = distance;
            closestSection = sectionIds[i];
          }
        }
      }
      setActiveSection(closestSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to download pre-stored PDF or generate from content if not present
  const downloadCV = async () => {
    // Use absolute path for public folder assets
    const pdfUrl = '/resume/Prabhat_Ranjan_Combined_Resume.pdf';

    try {
      // Try to fetch the PDF file
      const response = await fetch(pdfUrl, { method: 'HEAD' });
      if (response.ok) {
        // If PDF exists, trigger download
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = 'Prabhat_Ranjan_CV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return;
      }
    } catch (err) {
      // If fetch fails, fallback to generating PDF
    }

    // If PDF not found, generate from cvContent
    const cvContent = `
PRABHAT RANJAN
Associate Team Lead | React.js Developer

Contact Information:
• Email: prabhat5172992@gmail.com
• Phone: +91 8867412196
• Location: Bengaluru, India
• GitHub: https://github.com/prabhat5172992
• LinkedIn: https://www.linkedin.com/in/prabhat-ranjan-980256a4/

PROFESSIONAL SUMMARY:
Associate Team Lead with 9+ years of experience in building scalable web applications using React.js, Redux, and TypeScript. Passionate about creating exceptional user experiences and leading development teams to success. Leading a team of 10 developers, architecting applications using React, Redux toolkit, Micro Frontend architecture with module federation and Single SPA. Also working with Python, AWS, DevOps, CI/CD, Docker, Harness, Quay, Datadog, and AI initiatives using Vertex AI Gemini model and LangChain.

WORK EXPERIENCE:

Associate Team Lead | Verint CES India Pvt. Ltd. | Jan 2024 - Present
• Leading a team of 10 developers and architecting applications using React, Redux toolkit
• Working on Micro Frontend architecture using module federation and Single SPA
• Backend development using Python and AWS
• DevOps and CI/CD using AWS, Docker, Harness, Quay, Datadog
• AI initiatives using Vertex AI Gemini model and LangChain

Sr. React Developer | Shell India Pvt. Ltd. | Jan 2022 - December 2023
• Led UI architecture and design decisions
• Implemented scalable React applications with Redux Toolkit
• Mentored junior developers and conducted code reviews
• Collaborated with cross-functional teams on project requirements

Consultant | Genpact Headstrong Capital Markets | Jan 2019 - December 2021
• Developed responsive web applications from ground up
• Built incentive coupon campaign management systems
• Implemented modern JavaScript frameworks and libraries
• Optimized application performance and user experience

Software Engineer | Wipro Technologies | Jan 2016 - Jan 2019
• Built scalable web modules for enterprise applications
• Collaborated with backend teams for API integration
• Participated in agile development processes
• Maintained and enhanced existing codebases

TECHNICAL SKILLS:
• Frontend: React.js (95%), Redux (92%), JavaScript (94%), TypeScript (88%), HTML5/CSS3 (96%)
• Backend: Node.js (85%), Express.js (82%), Python (70%)
• Database: MongoDB (80%)
• Tools: AWS, Docker, Harness, Quay, Datadog, Single SPA, Micro Frontend

EDUCATION:
Bachelor of Technology in Computer Science
Nitte Meenakshi Institute of Technology, Bengaluru (2012 - 2016)

PROJECTS:
• C-CAT (GOM Pathfinder) - Shell India
• Digital Wallet User Onboarding Platform - Genpact
• PayPal EMEA WebOps - PayPal Client
• MAPD EBCV TR - Visa Innovant LLC
    `;

    // Dynamically import jsPDF and generate PDF
    import('jspdf').then(({ default: jsPDF }) => {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      const marginLeft = 10;
      const marginTop = 15;
      const pageWidth = 190; // a4 width - margins
      const lines = doc.splitTextToSize(cvContent.trim(), pageWidth);

      let cursorY = marginTop;
      const lineHeight = 7;
      lines.forEach((line: string) => {
        if (cursorY > 280) { // Prevent writing off the page
          doc.addPage();
          cursorY = marginTop;
        }
        doc.text(line, marginLeft, cursorY);
        cursorY += lineHeight;
      });

      doc.save('Prabhat_Ranjan_CV.pdf');
    });
  };

  const navigationItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' }
  ];

  const skills = [
    { name: 'React.js', level: 95, category: 'Frontend' },
    { name: 'Redux', level: 92, category: 'State Management' },
    { name: 'JavaScript', level: 94, category: 'Programming' },
    { name: 'TypeScript', level: 88, category: 'Programming' },
    { name: 'HTML5/CSS3', level: 96, category: 'Frontend' },
    { name: 'Node.js', level: 85, category: 'Backend' },
    { name: 'Express.js', level: 82, category: 'Backend' },
    { name: 'MongoDB', level: 80, category: 'Database' },
    { name: 'Python', level: 70, category: 'Database' }
  ];

  const experiences = [
    {
      title: 'Associate Team Lead',
      company: 'Verint CES India Pvt. Ltd.',
      location: 'Bengaluru',
      period: 'Jan 2024 - Present',
      duration: '1+ years',
      type: 'Full-time',
      description: 'Working as a Team lead, leading a team of 10 developers, architecting the entire application and created using React, Redux toolkit.Mainlt working on applications using Micro Frontend architecture using module federation and Single SPA. Also working on the backend using Python and AWS. Also working on the DevOps and CI/CD side using AWS, Docker, Harness, Quay, Datadog. Also working on AI inititives using Vertex AI Gemini model and LangChain.',
      responsibilities: [
        'Leading UI architecture and design decisions',
        'Creating Single SPA and Micro Frontend widgets using our in house framework',
        'Mentoring junior developers and conducting code reviews',
        'Collaborating with cross-functional teams on project requirements'
      ],
      technologies: ['React.js', 'Redux Toolkit', 'TypeScript', 'Material-UI', 'Python', 'AWS', 'Docker', 'Harness', 'Quay', 'Datadog', 'Vertex AI Gemini', 'LangChain', 'Single SPA', 'Micro Frontend', 'Python']
    },
    {
      title: 'Sr. React Developer',
      company: 'Shell India Pvt. Ltd.',
      location: 'Bengaluru (Client Side)',
      period: 'Jan 2022 - December 2023',
      duration: '3+ years',
      type: 'Full-time',
      description: 'Working as a UI lead, architect the entire application and created using React, Redux toolkit.',
      responsibilities: [
        'Leading UI architecture and design decisions',
        'Implementing scalable React applications with Redux Toolkit',
        'Mentoring junior developers and conducting code reviews',
        'Collaborating with cross-functional teams on project requirements'
      ],
      technologies: ['React.js', 'Redux Toolkit', 'TypeScript', 'Material-UI']
    },
    {
      title: 'Consultant',
      company: 'Genpact Headstrong Capital Markets',
      location: 'Bengaluru',
      period: 'Jan 2019 - December 2021',
      duration: '3 years',
      type: 'Full-time',
      description: 'Created web pages and incentive coupon campaigns from scratch.',
      responsibilities: [
        'Developed responsive web applications from ground up',
        'Built incentive coupon campaign management systems',
        'Implemented modern JavaScript frameworks and libraries',
        'Optimized application performance and user experience'
      ],
      technologies: ['React.js', 'Redux', 'JavaScript', 'CSS3', 'REST APIs']
    },
    {
      title: 'Software Engineer',
      company: 'Wipro Technologies',
      location: 'Bengaluru',
      period: 'Jan 2016 - Jan 2019',
      duration: '3 years',
      type: 'Full-time',
      description: 'Developed web pages and modules for large applications using React and Redux.',
      responsibilities: [
        'Built scalable web modules for enterprise applications',
        'Collaborated with backend teams for API integration',
        'Participated in agile development processes',
        'Maintained and enhanced existing codebases'
      ],
      technologies: ['React.js', 'Redux', 'JavaScript', 'HTML5', 'CSS3']
    }
  ];

  const projects = [
    {
      title: 'C-CAT (GOM Pathfinder)',
      company: 'Shell India',
      period: 'Jan 2022 - Present',
      status: 'Production',
      description: 'Developed C-CAT (Concept Assessment Tool) from scratch using Redux Toolkit. Involved in complete SDLC from requirement gathering to deployment.',
      responsibilities: [
        'Client requirement gathering and analysis',
        'UI framework selection and architecture design',
        'Collaboration with design team using Figma',
        'API development coordination with backend team',
        'Database schema design with database developers'
      ],
      technologies: ['Redux UI', 'Python API', 'AWS RDS', 'Figma', 'Swagger'],
      keyFeatures: [
        'Certificate-based user authentication and route security',
        'Role-based user management (Admin, Owner, Approver, Editor)',
        'Admin tool for dynamic React page creation from JSON schema',
        'Custom dashboards for different user roles',
        'Approval workflow for project submission and review',
        'Comprehensive logging for approval history and user activities',
        'Page locking mechanism during approval stages',
        'Selective summary display and PDF downloads',
        'Audit log creation to record RBAC activities',
        'File viewer for displaying files, folders, and sub-folders'
      ]
    },
    {
      title: 'Digital Wallet User Onboarding Platform',
      company: 'Genpact',
      period: 'Jan 2021 - December 2021',
      status: 'Production',
      description: 'Built a comprehensive digital wallet onboarding platform with multiple screen workflows and automated monitoring systems.',
      responsibilities: [
        'Created different page routes and configurations using Kraken JS',
        'Developed React pages supporting multiple screen workflows',
        'Automated manual tasks through custom Node.js scripts',
        'Implemented live page monitoring using Signal FX and Splunk',
        'Code review and production deployment management'
      ],
      technologies: ['Kraken JS', 'React.js', 'Node.js', 'Signal FX', 'Splunk', 'Mocha', 'Chai'],
      keyFeatures: [
        'Multi-step user onboarding workflow',
        'Real-time page monitoring and analytics',
        'Automated task execution and scheduling',
        'Comprehensive unit testing with Mocha and Chai',
        'Production deployment and release management'
      ]
    },
    {
      title: 'PayPal EMEA WebOps',
      company: 'Genpact (PayPal Client)',
      period: 'Jan 2019 - December 2020',
      status: 'Production',
      description: 'Developed currency conversion and web optimization tools for PayPal Europe operations, handling millions of transactions.',
      responsibilities: [
        'Built currency converter for PayPal debit cards in Europe',
        'Integrated MasterCard exchange rates and ECB reference rates',
        'Created reusable React components for multiple country pages',
        'Implemented A/B testing for performance optimization',
        'Migrated legacy Dust.js templates to modern React components'
      ],
      technologies: ['React.js', 'Redux', 'MasterCard API', 'European Central Bank API', 'Dust.js'],
      keyFeatures: [
        'Real-time currency conversion with live exchange rates',
        'Searchable dropdown components with form integration',
        'Custom responsive pagination system',
        'Multiple instant/leap/coupon-based incentive pages',
        'Performance optimization and browser rendering enhancement',
        'Cross-browser compatibility and responsive design'
      ]
    },
    {
      title: 'MAPD EBCV TR (Visa Innovant LLC)',
      company: 'Wipro Technologies',
      period: 'December 2016 - Jan 2019',
      status: 'Production',
      description: 'Led UI development for a comprehensive merchant management system handling payment processing and file sharing.',
      responsibilities: [
        'Led UI development team of 12 people across 3 modules',
        'Individually managed 6+ complex modules',
        'Analyzed mockup designs and prepared development boilerplates',
        'Collaborated with business stakeholders for requirement analysis',
        'Coordinated with backend teams for Swagger API design'
      ],
      technologies: ['React.js', 'Redux', 'Redux-Saga', 'CWBSUI Components', 'Groovy', 'Java'],
      keyFeatures: [
        'Merchant management module with MMS API integration',
        'Merchant and reseller onboarding system',
        'Data export functionality (CSV and XML formats)',
        'Role-based hierarchy management for merchants',
        'Secure file sharing module with CMS API',
        'Encrypted file sharing between merchants and resellers',
        'Custom reusable components (Date picker, Expandable tables, Stepper, Search dropdown)'
      ]
    }
  ];

  type ScrollToSectionProps = {
    targetId: string;
    children: React.ReactNode;
    className?: string;
  };

  const ScrollToSection: React.FC<ScrollToSectionProps> = ({ targetId, children, className = "" }) => (
    <button
      onClick={() => {
        // setActiveSection(targetId); // Set active section immediately on click
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
      }}
      className={`transition-all duration-300 ${className}`}
      type="button"
    >
      {children}
    </button>
  );

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading Portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Enhanced Navigation with scroll effect */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white shadow-lg border-b border-gray-200'
        : 'bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm'
        }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              {/* Profile Image Placeholder in Header */}
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md">
                <img src={profilePic} alt="Profile" className="w-full h-full rounded-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                Prabhat Ranjan
              </div>
            </div>
            <div className="hidden md:flex space-x-8">
              {navigationItems.map((item) => (
                <ScrollToSection key={item.id} targetId={item.id}>
                  <span className={`hover:text-blue-600 transition-colors font-medium ${activeSection === item.id ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-700'
                    }`}>
                    {item.label}
                  </span>
                </ScrollToSection>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Professional Hero Section */}
      <section id="home" className="pt-24 pb-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <div className="mb-6">
                <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                  Associate Team Lead
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Prabhat Ranjan
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Associate Team Lead with 9+ years of experience in building scalable web applications using React.js, Redux, and TypeScript. Passionate about creating exceptional user experiences and leading development teams to success. Also leading a team of 10 developers, architecting the entire application and created using React, Redux toolkit. Mainly working on applications using Micro Frontend architecture using module federation and Single SPA. Also working on the backend using Python and AWS. Also working on the DevOps and CI/CD side using AWS, Docker, Harness, Quay, Datadog. Also working on AI initiatives using Vertex AI Gemini model and LangChain.
                Have worked with major corporations like Shell India, PayPal, Visa, and more.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>Bengaluru, India</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>prabhat5172992@gmail.com</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>+91 8867412196</span>
                </div>
              </div>
              <div className="flex space-x-4">
                <a
                  href="mailto:prabhat5172992@gmail.com"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 flex items-center"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Get In Touch
                </a>
                <button
                  onClick={downloadCV}
                  className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-lg font-medium transition-all duration-300 flex items-center hover:bg-gray-50"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download CV
                </button>
              </div>
            </div>
            <div className="lg:w-1/2 lg:pl-12">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                {/* Profile Image Placeholder above Professional Highlights */}
                <div className="text-center mb-6">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl font-bold shadow-lg border-4 border-white">
                    <img src={profilePic} alt="Profile" className="w-full h-full rounded-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Professional Highlights</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Experience</span>
                    <span className="font-semibold text-blue-600">9+ Years</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Current Role</span>
                    <span className="font-semibold">Associate Team Lead</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Specialization</span>
                    <span className="font-semibold">React & Redux, Python</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Industries</span>
                    <span className="font-semibold">BFSI, Energy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About Me</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Passionate about creating exceptional web experiences with modern technologies
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Professional Journey</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                With nearly 8 years in the industry, I've evolved from a junior developer to a senior architect,
                leading complex projects and mentoring teams. My expertise spans the entire React ecosystem,
                from component architecture to state management and performance optimization.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                I've successfully delivered projects for major corporations including Shell India, PayPal,
                and Visa, focusing on scalable, maintainable, and user-centric solutions.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
                  <div className="text-gray-600">Projects Delivered</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
                  <div className="text-gray-600">Components Built</div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Core Competencies</h4>
                <div className="grid grid-cols-2 gap-3">
                  {['Frontend Architecture', 'React.js Development', 'Redux State Management', 'TypeScript', 'Performance Optimization', 'Team Leadership', 'Code Reviews', 'Agile Development', 'Leading Innovations'].map((skill, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Personal Interests</h4>
                <div className="flex flex-wrap gap-2">
                  {['Chess', 'Badminton', 'Volleyball'].map((hobby, index) => (
                    <span key={index} className="bg-white px-3 py-1 rounded-full text-sm text-gray-700 border">
                      {hobby}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Professional Experience</h2>
            <p className="text-xl text-gray-600">
              A track record of delivering excellence across diverse industries
            </p>
          </div>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="p-8">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{exp.title}</h3>
                      <div className="flex items-center text-blue-600 text-lg font-semibold mb-2">
                        <Building className="w-4 h-4 mr-2" />
                        {exp.company}
                      </div>
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin className="w-4 h-4 mr-2" />
                        {exp.location}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-2">
                        {exp.period}
                      </div>
                      <div className="text-gray-500 text-sm">{exp.duration} • {exp.type}</div>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">{exp.description}</p>
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Responsibilities:</h4>
                    <ul className="grid md:grid-cols-2 gap-2">
                      {exp.responsibilities.map((resp, i) => (
                        <li key={i} className="flex items-start text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, i) => (
                        <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <p className="text-xl text-gray-600">
              Showcasing complex applications built for enterprise clients
            </p>
          </div>
          <div className="space-y-12">
            {projects.map((project, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                <div className="p-8">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{project.title}</h3>
                      <div className="flex items-center text-blue-600 text-lg font-semibold mb-2">
                        <Building className="w-4 h-4 mr-2" />
                        {project.company}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-2">
                        {project.status}
                      </div>
                      <div className="text-gray-500 text-sm">{project.period}</div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>

                  <div className="grid lg:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Responsibilities:</h4>
                      <ul className="space-y-2">
                        {project.responsibilities.map((resp, i) => (
                          <li key={i} className="flex items-start text-gray-600">
                            <CheckCircle className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Features:</h4>
                      <ul className="space-y-2">
                        {project.keyFeatures.slice(0, 5).map((feature, i) => (
                          <li key={i} className="flex items-start text-gray-600">
                            <Award className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Technology Stack:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium border border-blue-200">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Technical Skills</h2>
            <p className="text-xl text-gray-600">
              Proficient in modern web technologies and frameworks
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Technical Proficiency</h3>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <span className="text-lg font-semibold text-gray-900">{skill.name}</span>
                        <span className="text-sm text-gray-500 ml-2">({skill.category})</span>
                      </div>
                      <span className="text-blue-600 font-bold text-lg">{skill.level}%</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Expertise Areas</h3>
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Frontend Development</h4>
                  <div className="flex flex-wrap gap-2">
                    {['React.js', 'Redux', 'TypeScript', 'JavaScript ES6+', 'HTML5', 'CSS3', 'Responsive Design', 'Single SPA'].map((tech, i) => (
                      <span key={i} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Backend & Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'Git', 'Webpack', 'Agile', 'Python'].map((tech, i) => (
                      <span key={i} className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Architecture & Leadership</h4>
                  <div className="flex flex-wrap gap-2">
                    {['System Architecture', 'Code Reviews', 'Team Leadership', 'Mentoring', 'Performance Optimization'].map((skill, i) => (
                      <span key={i} className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Education</h2>
            <p className="text-xl text-gray-600">
              Academic background that laid the foundation for my career
            </p>
          </div>
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Bachelor of Technology in Computer Science</h3>
                <div className="flex items-center text-blue-600 text-lg font-semibold mb-2">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Nitte Meenakshi Institute of Technology, Bengaluru
                </div>
                <div className="text-gray-500 text-sm mb-4">2012 - 2016</div>
                <p className="text-gray-600 leading-relaxed">
                  Specialized in software engineering principles, data structures, algorithms, and web technologies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50 flex items-center" style={{ minHeight: '75vh' }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-600">
              I’m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
          </div>
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  required
                />
              </div>
              <textarea
                rows={5}
                placeholder="Your Message"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all mb-6"
                required
              ></textarea>
                <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center"
                onClick={e => {
                  e.preventDefault();
                  const form = e.currentTarget.form;
                  if (!form) return;
                  const name = (form[0] as HTMLInputElement).value;
                  const email = (form[1] as HTMLInputElement).value;
                  const message = (form[2] as HTMLTextAreaElement).value;
                  const mailto = `mailto:prabhat5172992@gmail.com?subject=Contact from ${encodeURIComponent(name)} (${encodeURIComponent(email)})&body=${encodeURIComponent(message)}`;
                  window.location.href = mailto;
                }}
                >
                Send Message
                </button>
            </form>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm mb-2">© 2025 Prabhat Ranjan. All rights reserved.</p>
          <div className="flex justify-center space-x-4">
            <a href="https://github.com/prabhat5172992" target='_blank' className="text-gray-400 hover:text-white transition-colors" aria-label="GitHub">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.263.82-.582 0-.288-.01-1.05-.016-2.06-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.76-1.606-2.665-.304-5.466-1.334-5.466-5.933 0-1.31.468-2.382 1.236-3.222-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 013.003-.404c1.02.005 2.047.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.12 3.176.77.84 1.235 1.912 1.235 3.222 0 4.61-2.803 5.625-5.475 5.922.43.37.813 1.096.813 2.21 0 1.595-.014 2.88-.014 3.27 0 .322.216.698.825.58C20.565 21.796 24 17.297 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/prabhat-ranjan-980256a4/" target='_blank' className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.75 20.5h-3v-11h3v11zm-1.5-12.5c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.25 12.5h-3v-5.5c0-1.378-.028-3.152-1.92-3.152-1.92 0-2.217 1.5-2.217 3.045v5.607h-3v-11h2.885v1.5h.041c.402-.762 1.384-1.563 2.85-1.563 3.048 0 3.611 2.008 3.611 4.621v6.442z" />
              </svg>
            </a>
            <a href="https://x.com/Prabhat26289643" target='_blank' className="text-gray-400 hover:text-white transition-colors" aria-label="X">
              {/* Twitter/X icon SVG from simpleicons.org */}
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <title>X</title>
                <path d="M17.53 2.477h3.924l-8.56 9.85 10.09 13.196h-7.96l-6.25-8.23-7.16 8.23H.09l9.13-10.51L0 2.477h8.09l5.77 7.67zm-1.36 17.13h2.17L6.56 4.29H4.26z" />
              </svg>
              <span className="sr-only">X</span>
            </a>
            <a href="https://www.instagram.com/prabhat_ranjan2/" target='_blank' className="text-gray-400 hover:text-white transition-colors">
              {/* Instagram icon SVG from simpleicons.org */}
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <title>Instagram</title>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.011 3.584-.069 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.011-4.85-.069c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.77.131 4.672.414 3.678 1.408 2.684 2.402 2.401 3.5 2.342 4.782 2.283 6.062 2.27 6.471 2.27 12s.013 5.938.072 7.218c.059 1.282.342 2.38 1.336 3.374.994.994 2.092 1.277 3.374 1.336C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.282-.059 2.38-.342 3.374-1.336.994-.994 1.277-2.092 1.336-3.374.059-1.28.072-1.689.072-7.218s-.013-5.938-.072-7.218c-.059-1.282-.342-2.38-1.336-3.374C19.328.414 18.23.131 16.948.072 15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
              </svg>
            </a>
          </div>
          <p className="text-xs mt-4">
            Built with <span className="text-red-500">❤️</span> using React and Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Portfolio;