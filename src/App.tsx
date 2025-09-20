import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Mail, Phone, Globe, Linkedin, MapPin, Calendar, Code, Database, Cloud, Brain, Award, ExternalLink, Menu, X, Star, Zap, Rocket, Target, Terminal, Minimize2, Maximize2, RotateCcw, MessageCircle, Send, Bot, User, Clock, ChevronRight } from 'lucide-react';
import ForceGraph3D from '3d-force-graph';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalMinimized, setTerminalMinimized] = useState(false);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<Array<{type: 'input' | 'output' | 'error', content: string}>>([
    { type: 'output', content: 'Welcome to Amin\'s Interactive Terminal!' },
    { type: 'output', content: 'Type "help" to see available commands.' },
    { type: 'output', content: '' }
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [chatbotMinimized, setChatbotMinimized] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{type: 'user' | 'bot', content: string, timestamp: Date}>>([
    { type: 'bot', content: 'Hi! I\'m Amin\'s AI assistant powered by advanced language models. Ask me anything about his experience, skills, projects, or background!', timestamp: new Date() }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [chatButtonPulse, setChatButtonPulse] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [openProject, setOpenProject] = useState<string | null>(null);
  const [analysisModalOpen, setAnalysisModalOpen] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<any>(null);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const forceGraphRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const learningParallaxRef = useRef<HTMLDivElement>(null);
  const masteryParallaxRef = useRef<HTMLDivElement>(null);
  const creationParallaxRef = useRef<HTMLDivElement>(null);
  const collaborationParallaxRef = useRef<HTMLDivElement>(null);
  const terminalInputRef = useRef<HTMLInputElement>(null);
  const terminalContentRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);
  const chatContentRef = useRef<HTMLDivElement>(null);

  // Knowledge base for the chatbot
  const knowledgeBase = {
    personal: {
      name: "Amin Najafgholizadeh",
      title: "Senior Machine Learning Engineer & Full Stack Developer",
      location: "Tehran, Iran",
      email: "najafgholizadehamin@gmail.com",
      phone: "+98 914 770 3397",
      website: "aminnajafgholizadeh.com",
      linkedin: "linkedin.com/in/amin-najafgholizadeh-6ab8ba202",
      summary: "Machine Learning Software Engineer and Full Stack Developer with over 4 years of experience in building scalable ML models, web applications, and data processing pipelines."
    },
    experience: [
      {
        title: "Senior Machine Learning Engineer",
        company: "Arian Saeed Industrial Group",
        location: "Tehran, Iran",
        period: "May 2024 – Present",
        description: "Leading development and deployment of advanced ML solutions across business domains, collaborating with teams to optimize performance with state-of-the-art ML algorithms, and mentoring junior engineers.",
        logo: "/assets/company-logos/Arian%20Saeed%20Industrial%20Group.jpeg"
      },
      {
        title: "Full Stack Software Engineer",
        company: "Arad",
        location: "Tehran, Iran",
        period: "Jan 2023 – May 2024",
        description: "Developed and deployed scalable ML algorithms using Python, Django, and React frameworks, led development teams in launching web applications with 99.9% uptime."
      },
      {
        title: "Data Scientist",
        company: "Motometrix Inc",
        location: "Boston, MA, USA",
        period: "Jul 2022 – Jan 2023",
        description: "Designed deep learning models for commodity detection and product differentiation, developed Bayesian statistical methods with 95% accuracy."
      },
      {
        title: "Machine Learning Engineer",
        company: "Part AI Research Center",
        location: "Tehran, Iran",
        period: "Jun 2021 – Jul 2022",
        description: "Developed dynamic pricing models for train tickets using ML algorithms, implemented data streaming pipelines with Kafka and PySpark.",
        logo: "/assets/company-logos/Part%20AI%20Research%20Center.webp"
      }
    ],
    education: [
      {
        degree: "MBA in Technology",
        school: "Allameh Tabataba'i University",
        location: "Tehran, Iran",
        period: "2023 – 2025 (Expected)"
      },
      {
        degree: "Bachelor's in Electrical and Electronics Engineering",
        school: "Amirkabir University of Technology - Tehran Polytechnic",
        location: "Tehran, Iran",
        period: "2018 – 2022"
      }
    ],
    skills: {
      programming: ["Python", "JavaScript", "Java", "C++", "Solidity", "Django"],
      ml: ["TensorFlow", "PyTorch", "Keras", "Scikit-learn", "GANs"],
      web: ["React", "Node.js", "Django", "HTML", "CSS"],
      data: ["SQL", "NoSQL", "Hadoop", "Spark", "Kafka"],
      cloud: ["AWS", "GCP", "Docker", "Git", "Agile"]
    },
    projects: [
      {
        name: "Intelligent Quality Control System",
        description: "Developed an intelligent QC system with Python, Django, React, and TensorFlow for automating inspection processes in manufacturing environments.",
        technologies: ["Python", "Django", "React", "TensorFlow"],
        features: ["Automated visual inspection", "Real-time defect detection", "Integration with manufacturing lines", "Customizable reporting dashboard"]
      },
      {
        name: "Supermarket Automation System",
        description: "Designed computer vision-based automation using OpenCV and TensorFlow for inventory management and real-time analysis.",
        technologies: ["OpenCV", "TensorFlow", "Python", "Computer Vision"],
        features: ["Automated inventory tracking", "Real-time shelf analysis", "Computer vision for product recognition", "Sales analytics dashboard"]
      },
      {
        name: "AI-Based Fire Detection Application",
        description: "Created a fire detection app with Django and React, utilizing TensorFlow for AI-based detection in critical environments.",
        technologies: ["Django", "React", "TensorFlow", "AI Detection"],
        features: ["AI-powered fire detection", "Real-time alerts", "Integration with safety systems", "Mobile/web dashboard"]
      }
    ]
  };

  const commands = {
    help: () => [
      'Available commands:',
      '  help          - Show this help message',
      '  about         - Display personal information',
      '  skills        - List technical skills',
      '  experience    - Show work experience',
      '  education     - Display education background',
      '  projects      - List featured projects',
      '  contact       - Show contact information',
      '  whoami        - Display current user',
      '  pwd           - Print working directory',
      '  ls            - List directory contents',
      '  cat <file>    - Display file contents',
      '  clear         - Clear terminal',
      '  date          - Show current date and time',
      '  uname         - System information',
      '  history       - Show command history',
      '  echo <text>   - Display text',
      '  cowsay <text> - ASCII cow says something',
      ''
    ],
    about: () => [
      'Amin Najafgholizadeh',
      'Senior Machine Learning Engineer & Full Stack Developer',
      'Location: Tehran, Iran',
      'Experience: 4+ years in ML, AI, and Full Stack Development',
      'Passionate about building scalable ML solutions and web applications',
      ''
    ],
    skills: () => [
      'Technical Skills:',
      '├── Programming Languages',
      '│   ├── Python ⭐⭐⭐⭐⭐',
      '│   ├── JavaScript ⭐⭐⭐⭐⭐',
      '│   ├── Java ⭐⭐⭐⭐',
      '│   ├── C++ ⭐⭐⭐⭐',
      '│   └── Solidity ⭐⭐⭐',
      '├── Machine Learning',
      '│   ├── TensorFlow ⭐⭐⭐⭐⭐',
      '│   ├── PyTorch ⭐⭐⭐⭐⭐',
      '│   ├── Keras ⭐⭐⭐⭐',
      '│   └── Scikit-learn ⭐⭐⭐⭐⭐',
      '├── Web Development',
      '│   ├── Django ⭐⭐⭐⭐⭐',
      '│   ├── React ⭐⭐⭐⭐⭐',
      '│   └── Node.js ⭐⭐⭐⭐',
      '└── Cloud & DevOps',
      '    ├── AWS ⭐⭐⭐⭐',
      '    ├── GCP ⭐⭐⭐⭐',
      '    └── Docker ⭐⭐⭐⭐⭐',
      ''
    ],
    experience: () => [
      'Work Experience:',
      '',
      '🏢 Senior Machine Learning Engineer',
      '   Company: Arian Saeed Industrial Group',
      '   Period: May 2024 – Present',
      '   Location: Tehran, Iran',
      '',
      '🏢 Full Stack Software Engineer',
      '   Company: Arad',
      '   Period: Jan 2023 – May 2024',
      '   Location: Tehran, Iran',
      '',
      '🏢 Data Scientist',
      '   Company: Motometrix Inc',
      '   Period: Jul 2022 – Jan 2023',
      '   Location: Boston, MA, USA',
      '',
      '🏢 Machine Learning Engineer',
      '   Company: Part AI Research Center',
      '   Period: Jun 2021 – Jul 2022',
      '   Location: Tehran, Iran',
      ''
    ],
    education: () => [
      'Education:',
      '',
      '🎓 MBA in Technology',
      '   University: Allameh Tabataba\'i University',
      '   Period: 2023 – 2025 (Expected)',
      '   Location: Tehran, Iran',
      '',
      '🎓 Bachelor\'s in Electrical and Electronics Engineering',
      '   University: Amirkabir University of Technology - Tehran Polytechnic',
      '   Period: 2018 – 2022',
      '   Location: Tehran, Iran',
      ''
    ],
    projects: () => [
      'Featured Projects:',
      '',
      '🚀 Intelligent Quality Control System',
      '   Tech: Python, Django, React, TensorFlow',
      '   Description: Automated inspection processes',
      '',
      '🚀 Supermarket Automation System',
      '   Tech: OpenCV, TensorFlow, Computer Vision',
      '   Description: Inventory management and analysis',
      '',
      '🚀 AI-Based Fire Detection Application',
      '   Tech: Django, React, TensorFlow',
      '   Description: Critical environment monitoring',
      ''
    ],
    contact: () => [
      'Contact Information:',
      '',
      '📧 Email: najafgholizadehamin@gmail.com',
      '📱 Phone: +98 914 770 3397',
      '🌐 Website: aminnajafgholizadeh.com',
      '💼 LinkedIn: linkedin.com/in/amin-najafgholizadeh-6ab8ba202',
      '📍 Location: Tehran, Iran',
      ''
    ],
    whoami: () => ['amin'],
    pwd: () => ['/home/amin/portfolio'],
    ls: () => [
      'total 8',
      'drwxr-xr-x  2 amin amin 4096 Dec 2024 about.txt',
      'drwxr-xr-x  2 amin amin 4096 Dec 2024 skills.json',
      'drwxr-xr-x  2 amin amin 4096 Dec 2024 experience.md',
      'drwxr-xr-x  2 amin amin 4096 Dec 2024 projects/',
      'drwxr-xr-x  2 amin amin 4096 Dec 2024 contact.vcf',
      ''
    ],
    date: () => [new Date().toString()],
    uname: () => ['Linux amin-portfolio 5.15.0 #1 SMP x86_64 GNU/Linux'],
    history: () => commandHistory.map((cmd, i) => `${i + 1}  ${cmd}`),
    clear: () => null,
    cowsay: (text: string) => [
      ` ${'_'.repeat(text.length + 2)}`,
      `< ${text || 'Hello from Amin!'} >`,
      ` ${'‾'.repeat(text.length + 2)}`,
      '        \\   ^__^',
      '         \\  (oo)\\_______',
      '            (__)\\       )\\/\\',
      '                ||----w |',
      '                ||     ||',
      ''
    ]
  };

  useEffect(() => {
    setIsLoaded(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['hero', 'about', 'experience', 'education', 'skills', 'projects', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === '`') {
        e.preventDefault();
        setTerminalOpen(!terminalOpen);
      }
      if (e.key === 'Escape') {
        setChatbotOpen(false);
        setTerminalOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyDown);
    
    // Stop chat button pulsing after 10 seconds
    const pulseTimer = setTimeout(() => {
      setChatButtonPulse(false);
    }, 10000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(pulseTimer);
    };
  }, []);

  useEffect(() => {
    if (!forceGraphRef.current) return;

    const deg2rad = (deg: number) => deg * Math.PI / 180;
    
    const N = 100;
    const nodes = [...Array(N).keys()].map(i => ({
      id: i,
      val: (Math.random() * 1.5) + 1
    }));

    const generateLinks = (nodes: any[]) => {
      let links: any[] = [];
      nodes.forEach(node => {
        let numNodeLinks = Math.round(Math.random() * (0.75 + Math.random())) + 1;
        for(let i = 0; i < numNodeLinks; i++) {
          links.push({
            source: node.id,
            target: Math.round(Math.random() * (node.id > 0 ? node.id - 1 : node.id))
          });
        }
      });
      return links;
    };
    
    const links = generateLinks(nodes);
    const gData = { nodes, links };
    const distance = 1500;

    const Graph = new ForceGraph3D(forceGraphRef.current)
      .enableNodeDrag(false)
      .enableNavigationControls(false)
      .enablePointerInteraction(false)
      .showNavInfo(false)
      .cameraPosition({ z: distance })
      .nodeRelSize(4)
      .nodeOpacity(1)
      .linkWidth(5)
      .linkDirectionalParticles(5)
      .linkDirectionalParticleWidth(5)
      .width(window.innerWidth)
      .height(window.innerHeight)
      .backgroundColor('rgba(0,0,17,0)')
      .graphData(gData);

    try {
      const bloomPass = new (THREE as any).UnrealBloomPass();
      bloomPass.strength = 3;
      bloomPass.radius = 1;
      bloomPass.threshold = 0.5;
      if (Graph.postProcessingComposer) {
        Graph.postProcessingComposer().addPass(bloomPass);
      }
    } catch (error) {
      console.log('Bloom effect not available, continuing without it');
    }

    let currentAngle = 0;
    const rotationInterval = setInterval(() => {
      Graph.cameraPosition({
        x: distance * Math.sin(deg2rad(currentAngle)),
        z: distance * Math.cos(deg2rad(currentAngle))
      });
      currentAngle += 0.5;
    }, 10);

    const handleGraphResize = () => {
      Graph.width(window.innerWidth).height(window.innerHeight).refresh();
    };
    window.addEventListener('resize', handleGraphResize);

    const handleGraphClick = (event: MouseEvent) => {
      event.preventDefault();
      const newLinks = generateLinks(nodes);
      const newGData = { nodes, links: newLinks };
      Graph.graphData(newGData);
    };
    forceGraphRef.current.addEventListener('click', handleGraphClick);
    forceGraphRef.current.addEventListener('touchstart', handleGraphClick);

    return () => {
      clearInterval(rotationInterval);
      window.removeEventListener('resize', handleGraphResize);
      if (forceGraphRef.current) {
        forceGraphRef.current.removeEventListener('click', handleGraphClick);
        forceGraphRef.current.removeEventListener('touchstart', handleGraphClick);
      }
    };
  }, [isLoaded]);

  useEffect(() => {
    if (terminalOpen && !terminalMinimized && terminalInputRef.current) {
      terminalInputRef.current.focus();
    }
  }, [terminalOpen, terminalMinimized]);

  useEffect(() => {
    if (chatbotOpen && !chatbotMinimized && chatInputRef.current) {
      chatInputRef.current.focus();
    }
  }, [chatbotOpen, chatbotMinimized]);

  // GSAP Parallax animation setup for all sections
  useEffect(() => {
    if (!isLoaded) return;

    const parallaxSections = [
      { ref: parallaxRef, prefix: 'innovation' },
      { ref: learningParallaxRef, prefix: 'learning' },
      { ref: masteryParallaxRef, prefix: 'mastery' },
      { ref: creationParallaxRef, prefix: 'creation' },
      { ref: collaborationParallaxRef, prefix: 'collaboration' }
    ];

    const contexts: gsap.Context[] = [];

    parallaxSections.forEach(({ ref, prefix }) => {
      if (!ref.current) return;

      const ctx = gsap.context(() => {
        // Create parallax timeline with ScrollTrigger
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
            onUpdate: (self) => {
              // Add dynamic effects based on scroll progress
              const progress = self.progress;
              gsap.set(`.${prefix}-data-stream, .data-stream`, { opacity: 0.3 + progress * 0.7 });
            }
          }
        });

        // Parallax layers with different speeds (use both prefixed and generic classes)
        tl.fromTo(`.${prefix}-parallax-bg, .parallax-bg`, { y: 0 }, { y: -200 }, 0)
          .fromTo(`.${prefix}-parallax-circuit1, .parallax-circuit1`, { y: 50 }, { y: -300 }, 0)
          .fromTo(`.${prefix}-parallax-circuit2, .parallax-circuit2`, { y: -100 }, { y: -400 }, 0)
          .fromTo(`.${prefix}-parallax-data-flow, .parallax-data-flow`, { y: -50 }, { y: -500 }, 0)
          .fromTo(`.${prefix}-parallax-nodes, .parallax-nodes`, { y: 0 }, { y: -150 }, 0)
          .fromTo(`.${prefix}-parallax-code, .parallax-code`, { y: 30 }, { y: -250 }, 0);
      }, ref);

      contexts.push(ctx);
    });

    // Global floating animations for all parallax elements
    const globalCtx = gsap.context(() => {
      gsap.to('.floating-hex', {
        y: -20,
        rotation: 180,
        duration: 4,
        ease: 'power2.inOut',
        stagger: 0.2,
        repeat: -1,
        yoyo: true
      });

      gsap.to('.floating-binary', {
        x: 10,
        opacity: 0.8,
        duration: 3,
        ease: 'sine.inOut',
        stagger: 0.1,
        repeat: -1,
        yoyo: true
      });

      gsap.to('.data-stream', {
        strokeDashoffset: -100,
        duration: 2,
        ease: 'none',
        repeat: -1
      });
    });

    contexts.push(globalCtx);

    return () => {
      contexts.forEach(ctx => ctx.revert()); // Cleanup all contexts
    };
  }, [isLoaded]);

  useEffect(() => {
    if (terminalContentRef.current) {
      terminalContentRef.current.scrollTop = terminalContentRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  useEffect(() => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // CV Summary for LLM context
  const cvSummary = `
AMIN NAJAFGHOLIZADEH - CV SUMMARY

CONTACT:
- Email: najafgholizadehamin@gmail.com
- Website: aminnajafgholizadeh.com
- LinkedIn: amin-najafgholizadeh-6ab8ba202
- Location: Tehran, Iran
- Phone: +98 914 770 3397

PROFESSIONAL SUMMARY:
Machine Learning Software Engineer and Full Stack Developer with over 4 years of experience in building scalable ML models, web applications, and data processing pipelines. Proficient in deep learning, image processing, and SQL databases. Experienced in Python, TensorFlow, PyTorch, Django, and React. Passionate about interdisciplinary collaboration in ecological research and data science.

WORK EXPERIENCE:

1. Senior Machine Learning Engineer | Arian Saeed Industrial Group, Tehran, Iran | May 2024 – Present
   - Lead the development and deployment of advanced ML solutions across business domains
   - Collaborate with teams to optimize performance with state-of-the-art ML algorithms
   - Mentor junior engineers on best practices for production-grade ML models

2. Full Stack Software Engineer | Arad, Tehran, Iran | Jan 2023 – May 2024
   - Developed and deployed scalable ML algorithms using Python, Django, and React
   - Led development teams in successfully launching web applications
   - Built and maintained web interfaces for seamless user experience

3. Data Scientist | Motometrix Inc, Boston, MA, USA | Jul 2022 – Jan 2023
   - Designed deep learning models for commodity detection and product differentiation
   - Developed Bayesian statistical methods to distinguish visually similar items
   - Built real-time dashboards to monitor and evaluate model performance

4. Machine Learning Engineer | Part AI Research Center, Tehran, Iran | Jun 2021 – Jul 2022
   - Developed dynamic pricing models for train tickets using machine learning algorithms
   - Implemented data streaming and processing pipelines with Kafka and PySpark
   - Deployed AI services using Docker containers for scalable solutions

EDUCATION:
- MBA in Technology | Allameh Tabataba'i University, Tehran, Iran | 2023 – 2025 (Expected)
- Bachelor's in Electrical and Electronics Engineering | Amirkabir University of Technology - Tehran Polytechnic, Tehran, Iran | 2018 – 2022

TECHNICAL SKILLS:
- Programming Languages: Python, Java, C++, JavaScript (React, Node.js), Solidity, Django
- Machine Learning: TensorFlow, PyTorch, Keras, Scikit-learn, GANs
- Data & Big Data: SQL, NoSQL, Hadoop, Spark, Kafka, Data Analysis, Data Visualization
- Cloud & DevOps: AWS, GCP, Docker, Git, Agile Methodologies
- Other: Problem Solving, Team Leadership, Communication

KEY PROJECTS:
1. Intelligent Quality Control System - Developed with Python, Django, React, and TensorFlow for automating inspection
2. Supermarket Automation System - Designed computer vision-based automation using OpenCV and TensorFlow for inventory management
3. AI-Based Fire Detection Application - Created fire detection app with Django and React, utilizing TensorFlow for AI-based detection

LANGUAGES:
- English (Fluent)
- German (Beginner)

ADDITIONAL INFORMATION:
- Experienced in building SQL databases and data management systems for large-scale projects
- Strong knowledge of AI-driven pipelines, especially in image processing and ecological data analysis
- Passionate about contributing to ecological research through advanced software and data science solutions
`;


  const apiKeys = [

  ];

  // Track current API key index and failed keys
  const [currentKeyIndex, setCurrentKeyIndex] = useState(0);
  const [failedKeys, setFailedKeys] = useState<Set<number>>(new Set());

  const callDjangoChatAPI = async (message: string): Promise<string> => {
    console.log('Calling Django API with message:', message);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/chat/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message,
          session_id: sessionStorage.getItem('chat_session_id') || undefined
        })
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        const errorData = await response.text();
        console.error(`Django API Error (${response.status}):`, errorData);
        throw new Error(`API request failed: ${response.status} - ${errorData}`);
      }

      const data = await response.json();
      console.log('Response data:', data);
      
      // Store session ID for future requests
      if (data.session_id) {
        sessionStorage.setItem('chat_session_id', data.session_id);
      }
      
      return data.response || 'Sorry, I could not generate a response.';
        
    } catch (error) {
      console.error('Django API Error:', error);
      throw error;
    }
  };

  // Reset failed keys periodically (every hour) in case credits are refilled
  useEffect(() => {
    const resetInterval = setInterval(() => {
      setFailedKeys(new Set());
      setCurrentKeyIndex(0);
      console.log('Reset failed API keys - trying all keys again');
    }, 60 * 60 * 1000); // 1 hour

    return () => clearInterval(resetInterval);
  }, []);

  // Legacy function for backward compatibility (now just calls the main function)
  const callOpenRouterAPILegacy = async (message: string) => {
    
    try {
      return await callDjangoChatAPI(message);
    } catch (error) {
      console.error('OpenRouter API Error:', error);
      
      // Fallback to local knowledge base
      return getLocalResponse(message);
    }
  };

  // Chatbot response logic
  const generateChatResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    // Greetings
    if (lowerInput.match(/^(hi|hello|hey|greetings)/)) {
      return "Hello! I'm here to help you learn about Amin's professional background. What would you like to know?";
    }
    
    // Experience questions
    if (lowerInput.includes('experience') || lowerInput.includes('work') || lowerInput.includes('job')) {
      const currentJob = knowledgeBase.experience[0];
      return `Amin is currently working as a ${currentJob.title} at ${currentJob.company} since ${currentJob.period.split(' – ')[0]}. He has over 4 years of experience in machine learning and full-stack development. Would you like to know about his previous roles?`;
    }
    
    // Skills questions
    if (lowerInput.includes('skill') || lowerInput.includes('technology') || lowerInput.includes('programming')) {
      if (lowerInput.includes('python')) {
        return "Yes! Python is one of Amin's strongest skills. He has extensive experience using Python for machine learning, data science, web development with Django, and automation scripts.";
      }
      if (lowerInput.includes('javascript') || lowerInput.includes('react')) {
        return "Absolutely! Amin is proficient in JavaScript and React. He has built multiple full-stack applications using React for the frontend and has experience with Node.js as well.";
      }
      if (lowerInput.includes('machine learning') || lowerInput.includes('ml') || lowerInput.includes('ai')) {
        return "Amin specializes in machine learning and AI! He has experience with TensorFlow, PyTorch, Keras, and Scikit-learn. He's worked on deep learning, computer vision, natural language processing, and has experience with GANs and Bayesian methods.";
      }
      return "Amin has a diverse skill set including Python, JavaScript, Java, C++, machine learning frameworks like TensorFlow and PyTorch, web technologies like React and Django, and cloud platforms like AWS and GCP. What specific technology are you interested in?";
    }
    
    // Education questions
    if (lowerInput.includes('education') || lowerInput.includes('study') || lowerInput.includes('university') || lowerInput.includes('degree')) {
      return "Amin is currently pursuing an MBA in Technology at Allameh Tabataba'i University (2023-2025). He completed his Bachelor's in Electrical and Electronics Engineering from Amirkabir University of Technology - Tehran Polytechnic in 2022.";
    }
    
    // Projects questions
    if (lowerInput.includes('project') || lowerInput.includes('portfolio')) {
      return "Amin has worked on several impressive projects including an Intelligent Quality Control System, Supermarket Automation System, and AI-Based Fire Detection Application. Each project showcases his expertise in machine learning and full-stack development. Which project would you like to learn more about?";
    }
    
    // Contact questions
    if (lowerInput.includes('contact') || lowerInput.includes('reach') || lowerInput.includes('email') || lowerInput.includes('phone')) {
      return `You can reach Amin at:\n📧 Email: ${knowledgeBase.personal.email}\n📱 Phone: ${knowledgeBase.personal.phone}\n🌐 Website: ${knowledgeBase.personal.website}\n💼 LinkedIn: ${knowledgeBase.personal.linkedin}`;
    }
    
    // Location questions
    if (lowerInput.includes('location') || lowerInput.includes('where') || lowerInput.includes('live')) {
      return `Amin is based in ${knowledgeBase.personal.location}. He has also worked remotely for companies in the USA, including Motometrix Inc in Boston, MA.`;
    }
    
    // Company-specific questions
    if (lowerInput.includes('arian saeed')) {
      return "Arian Saeed Industrial Group is Amin's current workplace where he serves as a Senior Machine Learning Engineer since May 2024. He leads the development and deployment of advanced ML solutions across business domains.";
    }
    
    if (lowerInput.includes('motometrix')) {
      return "Motometrix Inc was a Boston-based company where Amin worked as a Data Scientist from July 2022 to January 2023. He designed deep learning models for commodity detection and developed Bayesian statistical methods with 95% accuracy.";
    }
    
    // General questions about Amin
    if (lowerInput.includes('who is') || lowerInput.includes('about amin') || lowerInput.includes('tell me about')) {
      return `${knowledgeBase.personal.name} is a ${knowledgeBase.personal.title} based in ${knowledgeBase.personal.location}. ${knowledgeBase.personal.summary} He's passionate about building scalable ML solutions and contributing to innovative projects.`;
    }
    
    // Default response
    return "I'd be happy to help you learn more about Amin! You can ask me about his work experience, technical skills, education, projects, or how to contact him. What specific information are you looking for?";
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    setCommandHistory(prev => [...prev, trimmedCmd]);
    setTerminalHistory(prev => [...prev, { type: 'input', content: `amin@portfolio:~$ ${trimmedCmd}` }]);

    const [command, ...args] = trimmedCmd.split(' ');
    const commandFunc = commands[command as keyof typeof commands];

    if (command === 'clear') {
      setTerminalHistory([]);
      return;
    }

    if (command === 'echo') {
      setTerminalHistory(prev => [...prev, { type: 'output', content: args.join(' ') }]);
      return;
    }

    if (command === 'cat') {
      const filename = args[0];
      const fileContents = {
        'about.txt': commands.about(),
        'skills.json': commands.skills(),
        'experience.md': commands.experience(),
        'contact.vcf': commands.contact()
      };
      
      if (filename && fileContents[filename as keyof typeof fileContents]) {
        const content = fileContents[filename as keyof typeof fileContents];
        content.forEach(line => {
          setTerminalHistory(prev => [...prev, { type: 'output', content: line }]);
        });
      } else {
        setTerminalHistory(prev => [...prev, { type: 'error', content: `cat: ${filename || 'filename'}: No such file or directory` }]);
      }
      return;
    }

    if (commandFunc) {
      const result = commandFunc(args.join(' '));
      if (result) {
        result.forEach(line => {
          setTerminalHistory(prev => [...prev, { type: 'output', content: line }]);
        });
      }
    } else {
      setTerminalHistory(prev => [...prev, { type: 'error', content: `Command not found: ${command}. Type 'help' for available commands.` }]);
    }
  };

  const handleTerminalKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(terminalInput);
      setTerminalInput('');
      setHistoryIndex(-1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setTerminalInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setTerminalInput('');
        } else {
          setHistoryIndex(newIndex);
          setTerminalInput(commandHistory[newIndex]);
        }
      }
    }
  };

  const handleChatSubmit = async () => {
    if (!chatInput.trim()) return;

    const userMessage = chatInput.trim();
    setIsProcessing(true);
    setChatHistory(prev => [...prev, { type: 'user', content: userMessage, timestamp: new Date() }]);
    setChatInput('');
    setIsTyping(true);

    try {
      // Get AI response from Django backend
      const response = await callDjangoChatAPI(userMessage);
      setChatHistory(prev => [...prev, { type: 'bot', content: response, timestamp: new Date() }]);
      setIsTyping(false);
      setIsProcessing(false);
    } catch (error) {
      console.error('Chat error:', error);
      setChatHistory(prev => [...prev, { 
        type: 'bot', 
        content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment.", 
        timestamp: new Date() 
      }]);
      setIsTyping(false);
      setIsProcessing(false);
    }
  };

  const handleChatKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleChatSubmit();
    }
  };

  const analyzeExperience = async (experience: any) => {
    setAnalysisLoading(true);
    setAnalysisModalOpen(true);
    setCurrentAnalysis(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/analyze-experience/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: experience.title,
          company: experience.company,
          location: experience.location,
          period: experience.period,
          description: experience.description
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const analysis = await response.json();
      setCurrentAnalysis(analysis);
    } catch (error) {
      console.error('Experience analysis error:', error);
      setCurrentAnalysis({
        overview: "Unable to generate analysis at this time. Please try again later.",
        key_skills: ["Technical Skills", "Problem Solving", "Leadership"],
        achievements: ["Project Delivery", "Team Collaboration", "Technical Innovation"],
        growth_areas: ["Professional Development", "Technical Expertise", "Leadership"],
        industry_impact: "Significant contribution to technology advancement",
        leadership_qualities: "Strong leadership and collaboration skills",
        unique_aspects: "Unique combination of technical and business skills"
      });
    } finally {
      setAnalysisLoading(false);
    }
  };

  const navItems = [
    { id: 'hero', label: 'Home', icon: <Rocket size={16} /> },
    { id: 'about', label: 'About', icon: <Target size={16} /> },
    { id: 'experience', label: 'Experience', icon: <Zap size={16} /> },
    { id: 'education', label: 'Education', icon: <Award size={16} /> },
    { id: 'skills', label: 'Skills', icon: <Code size={16} /> },
    { id: 'projects', label: 'Projects', icon: <Star size={16} /> },
    { id: 'contact', label: 'Contact', icon: <Mail size={16} /> }
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen overflow-x-hidden">
      
      {/* Enhanced Glitch Effect Styles */}
      <style>{`
        .glitch-intense {
          position: relative;
          display: inline-block;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          animation: glitch-skew 2s infinite linear alternate-reverse;
        }
        
        .glitch-intense::before,
        .glitch-intense::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        
        .glitch-intense::before {
          animation: glitch-anim-1 3s infinite linear alternate-reverse;
          color: #ff0018;
          z-index: -1;
        }
        
        .glitch-intense::after {
          animation: glitch-anim-2 2s infinite linear alternate-reverse;
          color: #00fff9;
          z-index: -2;
        }
        
        @keyframes glitch-anim-1 {
          0% {
            clip-path: polygon(0 2%, 100% 2%, 100% 5%, 0 5%);
            transform: translate(-2px, 2px);
          }
          2% {
            clip-path: polygon(0 78%, 100% 78%, 100% 100%, 0 100%);
            transform: translate(-1px, -1px);
          }
          4% {
            clip-path: polygon(0 78%, 100% 78%, 100% 100%, 0 100%);
            transform: translate(2px, 1px);
          }
          6% {
            clip-path: polygon(0 78%, 100% 78%, 100% 100%, 0 100%);
            transform: translate(-1px, 2px);
          }
          8% {
            clip-path: polygon(0 54%, 100% 54%, 100% 44%, 0 44%);
            transform: translate(1px, -1px);
          }
          10% {
            clip-path: polygon(0 54%, 100% 54%, 100% 44%, 0 44%);
            transform: translate(-2px, 1px);
          }
          12% {
            clip-path: polygon(0 30%, 100% 30%, 100% 25%, 0 25%);
            transform: translate(2px, -2px);
          }
          14% {
            clip-path: polygon(0 30%, 100% 30%, 100% 25%, 0 25%);
            transform: translate(-1px, 1px);
          }
          16% {
            clip-path: polygon(0 68%, 100% 68%, 100% 70%, 0 70%);
            transform: translate(1px, 2px);
          }
          18% {
            clip-path: polygon(0 68%, 100% 68%, 100% 70%, 0 70%);
            transform: translate(-2px, -1px);
          }
          20% {
            clip-path: polygon(0 91%, 100% 91%, 100% 95%, 0 95%);
            transform: translate(2px, 1px);
          }
          22% {
            clip-path: polygon(0 91%, 100% 91%, 100% 95%, 0 95%);
            transform: translate(-1px, -2px);
          }
          24% {
            clip-path: polygon(0 15%, 100% 15%, 100% 20%, 0 20%);
            transform: translate(1px, 1px);
          }
          26% {
            clip-path: polygon(0 15%, 100% 15%, 100% 20%, 0 20%);
            transform: translate(-2px, 2px);
          }
          28% {
            clip-path: polygon(0 40%, 100% 40%, 100% 39%, 0 39%);
            transform: translate(2px, -1px);
          }
          30% {
            clip-path: polygon(0 40%, 100% 40%, 100% 39%, 0 39%);
            transform: translate(-1px, 1px);
          }
          32% {
            clip-path: polygon(0 76%, 100% 76%, 100% 77%, 0 77%);
            transform: translate(1px, -2px);
          }
          34% {
            clip-path: polygon(0 76%, 100% 76%, 100% 77%, 0 77%);
            transform: translate(-2px, 2px);
          }
          36% {
            clip-path: polygon(0 50%, 100% 50%, 100% 55%, 0 55%);
            transform: translate(2px, 1px);
          }
          38% {
            clip-path: polygon(0 50%, 100% 50%, 100% 55%, 0 55%);
            transform: translate(-1px, -1px);
          }
          40% {
            clip-path: polygon(0 12%, 100% 12%, 100% 8%, 0 8%);
            transform: translate(1px, 2px);
          }
          42% {
            clip-path: polygon(0 12%, 100% 12%, 100% 8%, 0 8%);
            transform: translate(-2px, -2px);
          }
          44% {
            clip-path: polygon(0 86%, 100% 86%, 100% 88%, 0 88%);
            transform: translate(2px, 1px);
          }
          46% {
            clip-path: polygon(0 86%, 100% 86%, 100% 88%, 0 88%);
            transform: translate(-1px, 2px);
          }
          48% {
            clip-path: polygon(0 33%, 100% 33%, 100% 28%, 0 28%);
            transform: translate(1px, -1px);
          }
          50% {
            clip-path: polygon(0 33%, 100% 33%, 100% 28%, 0 28%);
            transform: translate(-2px, 1px);
          }
          52% {
            clip-path: polygon(0 65%, 100% 65%, 100% 61%, 0 61%);
            transform: translate(2px, -2px);
          }
          54% {
            clip-path: polygon(0 65%, 100% 65%, 100% 61%, 0 61%);
            transform: translate(-1px, 2px);
          }
          56% {
            clip-path: polygon(0 95%, 100% 95%, 100% 98%, 0 98%);
            transform: translate(1px, 1px);
          }
          58% {
            clip-path: polygon(0 95%, 100% 95%, 100% 98%, 0 98%);
            transform: translate(-2px, -1px);
          }
          60% {
            clip-path: polygon(0 18%, 100% 18%, 100% 22%, 0 22%);
            transform: translate(2px, 2px);
          }
          62% {
            clip-path: polygon(0 18%, 100% 18%, 100% 22%, 0 22%);
            transform: translate(-1px, -2px);
          }
          64% {
            clip-path: polygon(0 72%, 100% 72%, 100% 74%, 0 74%);
            transform: translate(1px, 1px);
          }
          66% {
            clip-path: polygon(0 72%, 100% 72%, 100% 74%, 0 74%);
            transform: translate(-2px, 2px);
          }
          68% {
            clip-path: polygon(0 45%, 100% 45%, 100% 48%, 0 48%);
            transform: translate(2px, -1px);
          }
          70% {
            clip-path: polygon(0 45%, 100% 45%, 100% 48%, 0 48%);
            transform: translate(-1px, 1px);
          }
          72% {
            clip-path: polygon(0 84%, 100% 84%, 100% 90%, 0 90%);
            transform: translate(1px, -2px);
          }
          74% {
            clip-path: polygon(0 84%, 100% 84%, 100% 90%, 0 90%);
            transform: translate(-2px, 2px);
          }
          76% {
            clip-path: polygon(0 6%, 100% 6%, 100% 12%, 0 12%);
            transform: translate(2px, 1px);
          }
          78% {
            clip-path: polygon(0 6%, 100% 6%, 100% 12%, 0 12%);
            transform: translate(-1px, -1px);
          }
          80% {
            clip-path: polygon(0 58%, 100% 58%, 100% 62%, 0 62%);
            transform: translate(1px, 2px);
          }
          82% {
            clip-path: polygon(0 58%, 100% 58%, 100% 62%, 0 62%);
            transform: translate(-2px, -2px);
          }
          84% {
            clip-path: polygon(0 26%, 100% 26%, 100% 30%, 0 30%);
            transform: translate(2px, 1px);
          }
          86% {
            clip-path: polygon(0 26%, 100% 26%, 100% 30%, 0 30%);
            transform: translate(-1px, 2px);
          }
          88% {
            clip-path: polygon(0 80%, 100% 80%, 100% 82%, 0 82%);
            transform: translate(1px, -1px);
          }
          90% {
            clip-path: polygon(0 80%, 100% 80%, 100% 82%, 0 82%);
            transform: translate(-2px, 1px);
          }
          92% {
            clip-path: polygon(0 36%, 100% 36%, 100% 42%, 0 42%);
            transform: translate(2px, -2px);
          }
          94% {
            clip-path: polygon(0 36%, 100% 36%, 100% 42%, 0 42%);
            transform: translate(-1px, 2px);
          }
          96% {
            clip-path: polygon(0 92%, 100% 92%, 100% 96%, 0 96%);
            transform: translate(1px, 1px);
          }
          98% {
            clip-path: polygon(0 92%, 100% 92%, 100% 96%, 0 96%);
            transform: translate(-2px, -1px);
          }
          100% {
            clip-path: polygon(0 2%, 100% 2%, 100% 5%, 0 5%);
            transform: translate(2px, 2px);
          }
        }
        
        @keyframes glitch-anim-2 {
          0% {
            clip-path: polygon(0 25%, 100% 25%, 100% 30%, 0 30%);
            transform: translate(2px, -2px);
          }
          3% {
            clip-path: polygon(0 3%, 100% 3%, 100% 3%, 0 3%);
            transform: translate(-1px, 2px);
          }
          5% {
            clip-path: polygon(0 90%, 100% 90%, 100% 90%, 0 90%);
            transform: translate(2px, 1px);
          }
          7% {
            clip-path: polygon(0 43%, 100% 43%, 100% 43%, 0 43%);
            transform: translate(-2px, -1px);
          }
          9% {
            clip-path: polygon(0 69%, 100% 69%, 100% 69%, 0 69%);
            transform: translate(1px, 2px);
          }
          11% {
            clip-path: polygon(0 15%, 100% 15%, 100% 15%, 0 15%);
            transform: translate(2px, -2px);
          }
          13% {
            clip-path: polygon(0 58%, 100% 58%, 100% 58%, 0 58%);
            transform: translate(-1px, 1px);
          }
          15% {
            clip-path: polygon(0 88%, 100% 88%, 100% 88%, 0 88%);
            transform: translate(1px, -1px);
          }
          17% {
            clip-path: polygon(0 34%, 100% 34%, 100% 34%, 0 34%);
            transform: translate(-2px, 2px);
          }
          19% {
            clip-path: polygon(0 77%, 100% 77%, 100% 77%, 0 77%);
            transform: translate(2px, 1px);
          }
          21% {
            clip-path: polygon(0 6%, 100% 6%, 100% 6%, 0 6%);
            transform: translate(-1px, -2px);
          }
          23% {
            clip-path: polygon(0 51%, 100% 51%, 100% 51%, 0 51%);
            transform: translate(1px, 2px);
          }
          25% {
            clip-path: polygon(0 82%, 100% 82%, 100% 82%, 0 82%);
            transform: translate(2px, -1px);
          }
          27% {
            clip-path: polygon(0 18%, 100% 18%, 100% 18%, 0 18%);
            transform: translate(-2px, 1px);
          }
          29% {
            clip-path: polygon(0 63%, 100% 63%, 100% 63%, 0 63%);
            transform: translate(1px, -2px);
          }
          31% {
            clip-path: polygon(0 95%, 100% 95%, 100% 95%, 0 95%);
            transform: translate(-1px, 2px);
          }
          33% {
            clip-path: polygon(0 29%, 100% 29%, 100% 29%, 0 29%);
            transform: translate(2px, 1px);
          }
          35% {
            clip-path: polygon(0 74%, 100% 74%, 100% 74%, 0 74%);
            transform: translate(-2px, -1px);
          }
          37% {
            clip-path: polygon(0 11%, 100% 11%, 100% 11%, 0 11%);
            transform: translate(1px, 2px);
          }
          39% {
            clip-path: polygon(0 56%, 100% 56%, 100% 56%, 0 56%);
            transform: translate(2px, -2px);
          }
          41% {
            clip-path: polygon(0 87%, 100% 87%, 100% 87%, 0 87%);
            transform: translate(-1px, 1px);
          }
          43% {
            clip-path: polygon(0 32%, 100% 32%, 100% 32%, 0 32%);
            transform: translate(1px, -1px);
          }
          45% {
            clip-path: polygon(0 79%, 100% 79%, 100% 79%, 0 79%);
            transform: translate(-2px, 2px);
          }
          47% {
            clip-path: polygon(0 14%, 100% 14%, 100% 14%, 0 14%);
            transform: translate(2px, 1px);
          }
          49% {
            clip-path: polygon(0 65%, 100% 65%, 100% 65%, 0 65%);
            transform: translate(-1px, -2px);
          }
          51% {
            clip-path: polygon(0 92%, 100% 92%, 100% 92%, 0 92%);
            transform: translate(1px, 2px);
          }
          53% {
            clip-path: polygon(0 38%, 100% 38%, 100% 38%, 0 38%);
            transform: translate(2px, -1px);
          }
          55% {
            clip-path: polygon(0 71%, 100% 71%, 100% 71%, 0 71%);
            transform: translate(-2px, 1px);
          }
          57% {
            clip-path: polygon(0 23%, 100% 23%, 100% 23%, 0 23%);
            transform: translate(1px, -2px);
          }
          59% {
            clip-path: polygon(0 86%, 100% 86%, 100% 86%, 0 86%);
            transform: translate(-1px, 2px);
          }
          61% {
            clip-path: polygon(0 47%, 100% 47%, 100% 47%, 0 47%);
            transform: translate(2px, 1px);
          }
          63% {
            clip-path: polygon(0 9%, 100% 9%, 100% 9%, 0 9%);
            transform: translate(-2px, -1px);
          }
          65% {
            clip-path: polygon(0 54%, 100% 54%, 100% 54%, 0 54%);
            transform: translate(1px, 2px);
          }
          67% {
            clip-path: polygon(0 83%, 100% 83%, 100% 83%, 0 83%);
            transform: translate(2px, -2px);
          }
          69% {
            clip-path: polygon(0 35%, 100% 35%, 100% 35%, 0 35%);
            transform: translate(-1px, 1px);
          }
          71% {
            clip-path: polygon(0 76%, 100% 76%, 100% 76%, 0 76%);
            transform: translate(1px, -1px);
          }
          73% {
            clip-path: polygon(0 20%, 100% 20%, 100% 20%, 0 20%);
            transform: translate(-2px, 2px);
          }
          75% {
            clip-path: polygon(0 61%, 100% 61%, 100% 61%, 0 61%);
            transform: translate(2px, 1px);
          }
          77% {
            clip-path: polygon(0 4%, 100% 4%, 100% 4%, 0 4%);
            transform: translate(-1px, -2px);
          }
          79% {
            clip-path: polygon(0 49%, 100% 49%, 100% 49%, 0 49%);
            transform: translate(1px, 2px);
          }
          81% {
            clip-path: polygon(0 85%, 100% 85%, 100% 85%, 0 85%);
            transform: translate(2px, -1px);
          }
          83% {
            clip-path: polygon(0 27%, 100% 27%, 100% 27%, 0 27%);
            transform: translate(-2px, 1px);
          }
          85% {
            clip-path: polygon(0 72%, 100% 72%, 100% 72%, 0 72%);
            transform: translate(1px, -2px);
          }
          87% {
            clip-path: polygon(0 16%, 100% 16%, 100% 16%, 0 16%);
            transform: translate(-1px, 2px);
          }
          89% {
            clip-path: polygon(0 59%, 100% 59%, 100% 59%, 0 59%);
            transform: translate(2px, 1px);
          }
          91% {
            clip-path: polygon(0 91%, 100% 91%, 100% 91%, 0 91%);
            transform: translate(-2px, -1px);
          }
          93% {
            clip-path: polygon(0 41%, 100% 41%, 100% 41%, 0 41%);
            transform: translate(1px, 2px);
          }
          95% {
            clip-path: polygon(0 75%, 100% 75%, 100% 75%, 0 75%);
            transform: translate(2px, -2px);
          }
          97% {
            clip-path: polygon(0 12%, 100% 12%, 100% 12%, 0 12%);
            transform: translate(-1px, 1px);
          }
          100% {
            clip-path: polygon(0 25%, 100% 25%, 100% 30%, 0 30%);
            transform: translate(1px, -1px);
          }
        }
        
        @keyframes glitch-skew {
          0% {
            transform: skew(0deg);
            filter: hue-rotate(0deg) saturate(1) brightness(1);
          }
          10% {
            transform: skew(2deg);
            filter: hue-rotate(90deg) saturate(1.2) brightness(1.1);
          }
          20% {
            transform: skew(-1deg);
            filter: hue-rotate(180deg) saturate(0.8) brightness(0.9);
          }
          30% {
            transform: skew(3deg);
            filter: hue-rotate(270deg) saturate(1.4) brightness(1.2);
          }
          40% {
            transform: skew(-2deg);
            filter: hue-rotate(360deg) saturate(0.6) brightness(0.8);
          }
          50% {
            transform: skew(1deg);
            filter: hue-rotate(45deg) saturate(1.1) brightness(1.05);
          }
          60% {
            transform: skew(-3deg);
            filter: hue-rotate(135deg) saturate(1.3) brightness(1.15);
          }
          70% {
            transform: skew(2deg);
            filter: hue-rotate(225deg) saturate(0.9) brightness(0.95);
          }
          80% {
            transform: skew(-1deg);
            filter: hue-rotate(315deg) saturate(1.2) brightness(1.1);
          }
          90% {
            transform: skew(1.5deg);
            filter: hue-rotate(60deg) saturate(0.7) brightness(0.85);
          }
          100% {
            transform: skew(0deg);
            filter: hue-rotate(0deg) saturate(1) brightness(1);
          }
        }
        
        .glitch-intense:hover {
          animation-duration: 0.8s;
        }
        
        .glitch-intense:hover::before {
          animation-duration: 1.2s;
        }
        
        .glitch-intense:hover::after {
          animation-duration: 1s;
        }
        
        /* Digital noise overlay */
        .glitch-noise {
          position: relative;
          overflow: hidden;
        }
        
        .glitch-noise::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            radial-gradient(circle, transparent 20%, rgba(255, 0, 24, 0.3) 20.5%, rgba(255, 0, 24, 0.3) 21%, transparent 21.5%),
            linear-gradient(90deg, transparent 24%, rgba(0, 255, 249, 0.2) 25%, rgba(0, 255, 249, 0.2) 26%, transparent 27%),
            linear-gradient(90deg, transparent 74%, rgba(255, 0, 24, 0.2) 75%, rgba(255, 0, 24, 0.2) 76%, transparent 77%);
          background-size: 75px 65px, 50px 50px, 80px 80px;
          animation: glitch-noise 0.8s steps(8) infinite;
          opacity: 0;
          pointer-events: none;
        }
        
        .glitch-noise:hover::after {
          opacity: 1;
        }
        
        @keyframes glitch-noise {
          0% { background-position: 0 0, 0 0, 0 0; }
          12.5% { background-position: -5px -2px, 2px -1px, -1px 3px; }
          25% { background-position: 2px -4px, -1px 2px, 3px -2px; }
          37.5% { background-position: -3px 1px, 3px -3px, -2px 1px; }
          50% { background-position: 1px -2px, -2px 2px, 2px -3px; }
          62.5% { background-position: -2px 3px, 1px -1px, -3px 2px; }
          75% { background-position: 3px -1px, -3px 3px, 1px -2px; }
          87.5% { background-position: -1px 2px, 2px -2px, -2px -1px; }
          100% { background-position: 0 0, 0 0, 0 0; }
        }
      `}</style>
      
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-teal-900/10"></div>
        <div className="floating-particles"></div>
        <div 
          className="mouse-glow"
          style={{
            left: mousePosition.x - 100,
            top: mousePosition.y - 100,
          }}
        ></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-gray-900/95 backdrop-blur-xl shadow-2xl border-b border-blue-500/20' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className={`text-xl font-bold text-blue-400 transition-all duration-700 ${
              isLoaded ? 'animate-slide-in-left' : 'opacity-0'
            }`}>
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Amin Najafgholizadeh
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-1">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`nav-item group relative px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeSection === item.id 
                      ? 'text-blue-400 bg-blue-500/10 shadow-lg shadow-blue-500/20' 
                      : 'text-gray-300 hover:text-blue-400 hover:bg-blue-500/5'
                  } ${isLoaded ? 'animate-slide-in-down' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center space-x-2">
                    <span className="transition-transform duration-300 group-hover:scale-110">
                      {item.icon}
                    </span>
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 ${
                    activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></div>
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-110"
              >
                <div className={`transition-transform duration-300 ${mobileMenuOpen ? 'rotate-180' : ''}`}>
                  {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-500 overflow-hidden ${
          mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-gray-900/95 backdrop-blur-xl border-t border-blue-500/20">
            <div className="px-4 py-3 space-y-2">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`mobile-nav-item w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    activeSection === item.id 
                      ? 'text-blue-400 bg-blue-500/10' 
                      : 'text-gray-300 hover:text-blue-400 hover:bg-blue-500/5'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Chatbot Button */}
      <button
        onClick={() => {
          setChatbotOpen(true);
          setChatButtonPulse(false);
        }}
        className={`fixed bottom-6 left-6 z-50 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 group ${
          chatButtonPulse ? 'animate-attention-pulse' : ''
        }`}
        title="Chat with AI Assistant"
      >
        <div className="relative">
          <MessageCircle className="transition-transform duration-300 group-hover:rotate-12" size={24} />
          {chatButtonPulse && (
            <>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </>
          )}
        </div>
      </button>

      {/* Terminal Button */}
      <button
        onClick={() => setTerminalOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white p-4 rounded-full shadow-2xl hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-110 group"
        title="Open Terminal (Ctrl + `)"
      >
        <Terminal className="transition-transform duration-300 group-hover:rotate-12" size={24} />
      </button>

      {/* Chatbot */}
      {chatbotOpen && (
        <div className={`fixed bottom-20 left-6 z-50 w-96 bg-gray-900/95 backdrop-blur-xl border border-purple-500/30 rounded-lg shadow-2xl transition-all duration-500 ${
          chatbotMinimized ? 'h-12' : 'h-96'
        }`}>
          {/* Chatbot Header */}
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-800/80 to-pink-800/80 rounded-t-lg border-b border-purple-500/30">
            <div className="flex items-center space-x-2">
              <Bot className="text-purple-300" size={20} />
              <span className="text-white text-sm font-medium">AI Assistant</span>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-300">Online</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setChatbotMinimized(!chatbotMinimized)}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                {chatbotMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
              </button>
              <button
                onClick={() => setChatbotOpen(false)}
                className="text-gray-400 hover:text-red-400 transition-colors duration-200"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Chatbot Content */}
          {!chatbotMinimized && (
            <div className="flex flex-col h-80">
              <div
                ref={chatContentRef}
                className="flex-1 p-4 overflow-y-auto space-y-3"
              >
                {chatHistory.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : 'bg-gray-700/80 text-gray-200 border border-purple-500/20'
                    }`}>
                      <div className="flex items-start space-x-2">
                        {message.type === 'bot' && <Bot size={16} className="text-purple-400 mt-0.5 flex-shrink-0" />}
                        {message.type === 'user' && <User size={16} className="text-blue-200 mt-0.5 flex-shrink-0" />}
                        <div>
                          <p className="text-sm whitespace-pre-line">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-700/80 text-gray-200 border border-purple-500/20 p-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Bot size={16} className="text-purple-400" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-3 border-t border-purple-500/30">
                <div className="flex items-center space-x-2">
                  <input
                    ref={chatInputRef}
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={handleChatKeyDown}
                    className="flex-1 bg-gray-800/50 text-white text-sm rounded-lg px-3 py-2 border border-purple-500/30 focus:border-purple-400 focus:outline-none"
                    placeholder={isProcessing ? "Processing..." : "Ask me about Amin..."}
                    disabled={isTyping || isProcessing}
                  />
                  <button
                    onClick={handleChatSubmit}
                    disabled={isTyping || isProcessing || !chatInput.trim()}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white p-2 rounded-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {isProcessing ? (
                      <div className="w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Send size={16} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Terminal */}
      {terminalOpen && (
        <div className={`fixed inset-4 z-50 bg-gray-900/95 backdrop-blur-xl border border-gray-700 rounded-lg shadow-2xl transition-all duration-500 ${
          terminalMinimized ? 'h-12' : 'h-auto'
        }`}>
          {/* Terminal Header */}
          <div className="flex items-center justify-between p-3 bg-gray-800 rounded-t-lg border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-gray-300 text-sm font-medium ml-4">amin@portfolio:~</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setTerminalMinimized(!terminalMinimized)}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                {terminalMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
              </button>
              <button
                onClick={() => {
                  setTerminalHistory([
                    { type: 'output', content: 'Welcome to Amin\'s Interactive Terminal!' },
                    { type: 'output', content: 'Type "help" to see available commands.' },
                    { type: 'output', content: '' }
                  ]);
                  setTerminalInput('');
                }}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <RotateCcw size={16} />
              </button>
              <button
                onClick={() => setTerminalOpen(false)}
                className="text-gray-400 hover:text-red-400 transition-colors duration-200"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Terminal Content */}
          {!terminalMinimized && (
            <div className="flex flex-col h-96">
              <div
                ref={terminalContentRef}
                className="flex-1 p-4 overflow-y-auto font-mono text-sm"
              >
                {terminalHistory.map((entry, index) => (
                  <div
                    key={index}
                    className={`mb-1 ${
                      entry.type === 'input' 
                        ? 'text-green-400' 
                        : entry.type === 'error' 
                        ? 'text-red-400' 
                        : 'text-gray-300'
                    }`}
                  >
                    {entry.content}
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-gray-700">
                <div className="flex items-center space-x-2">
                  <span className="text-green-400 font-mono text-sm">amin@portfolio:~$</span>
                  <input
                    ref={terminalInputRef}
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    onKeyDown={handleTerminalKeyDown}
                    className="flex-1 bg-transparent text-white font-mono text-sm outline-none"
                    placeholder="Type a command..."
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Hero Section */}
      <section id="hero" ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
        <div className="absolute inset-0">
          <div className="hero-gradient"></div>
          <div className="geometric-shapes"></div>
          {/* 3D Force Graph Background */}
          <div 
            ref={forceGraphRef} 
            className="absolute inset-0 opacity-40 pointer-events-auto"
            style={{ zIndex: 1 }}
            title="Click to regenerate network"
          ></div>
        </div>
        
        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <div className={`transition-all duration-1000 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
            <h1 className="hero-title text-4xl sm:text-6xl md:text-8xl font-bold mb-6">
              <span className="glitch-intense glitch-noise inline-block bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 bg-clip-text text-transparent" data-text="AMIN NAJAFGHOLIZADEH">
                Amin Najafgholizadeh
              </span>
            </h1>
          </div>
          
          <div className={`transition-all duration-1000 delay-300 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-lg sm:text-2xl md:text-4xl text-gray-300 mb-8 font-light">
              <span className="typing-animation">Senior Machine Learning Engineer & Full Stack Developer</span>
            </h2>
          </div>
          
          <div className={`transition-all duration-1000 delay-500 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
            <p className="text-base sm:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              Building the future with AI and cutting-edge technology. 4+ years of experience in machine learning, 
              full-stack development, and data science.
            </p>
          </div>
          
          <div className={`flex flex-col sm:flex-row gap-6 justify-center transition-all duration-1000 delay-700 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
            <button
              onClick={() => scrollToSection('contact')}
              className="cta-button group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
            >
              <span className="flex items-center justify-center space-x-2">
                <Mail className="transition-transform duration-300 group-hover:rotate-12" size={20} />
                <span>Get In Touch</span>
              </span>
            </button>
            <button
              onClick={() => scrollToSection('experience')}
              className="cta-button-outline group border-2 border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25"
            >
              <span className="flex items-center justify-center space-x-2">
                <Zap className="transition-transform duration-300 group-hover:scale-110" size={20} />
                <span>View My Work</span>
              </span>
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce-slow">
            <ChevronDown className="text-gray-400 animate-pulse" size={32} />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-800/50 backdrop-blur-sm relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-4xl sm:text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl sm:text-3xl font-semibold mb-6 text-white animate-slide-in-left">
                Professional Summary
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6 animate-fade-in text-base sm:text-lg">
                Machine Learning Software Engineer and Full Stack Developer with over 4 years of experience in building 
                scalable ML models, web applications, and data processing pipelines. Proficient in deep learning, 
                image processing, and SQL databases.
              </p>
              <p className="text-gray-300 leading-relaxed mb-8 animate-fade-in text-base sm:text-lg">
                Experienced in Python, TensorFlow, PyTorch, Django, and React. Passionate about interdisciplinary 
                collaboration in ecological research and data science.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="stat-card text-center p-6 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-xl backdrop-blur-sm border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-105">
                  <div className="text-4xl font-bold text-blue-400 mb-2 counter" data-target="4">4+</div>
                  <div className="text-sm text-gray-400">Years Experience</div>
                </div>
                <div className="stat-card text-center p-6 bg-gradient-to-br from-teal-600/20 to-blue-600/20 rounded-xl backdrop-blur-sm border border-teal-500/20 hover:border-teal-400/40 transition-all duration-300 hover:scale-105">
                  <div className="text-4xl font-bold text-teal-400 mb-2 counter" data-target="50">50+</div>
                  <div className="text-sm text-gray-400">Projects Completed</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6 animate-slide-in-right">
              <ContactInfo
                icon={<MapPin className="text-blue-400" size={24} />}
                label="Location"
                value="Tehran, Iran"
              />
              <ContactInfo
                icon={<Mail className="text-purple-400" size={24} />}
                label="Email"
                value="najafgholizadehamin@gmail.com"
              />
              <ContactInfo
                icon={<Phone className="text-teal-400" size={24} />}
                label="Phone"
                value="+98 914 770 3397"
              />
              <ContactInfo
                icon={<Globe className="text-green-400" size={24} />}
                label="Website"
                value="aminnajafgholizadeh.com"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tech Parallax Transition Section */}
      <section ref={parallaxRef} className="relative h-screen overflow-hidden">
        {/* Dynamic Tech Innovation Background */}
        <div className="absolute inset-0">
          {/* Circuit Board Base */}
          <div className="absolute inset-0 bg-gray-900" />
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(59, 130, 246, 0.1) 2px, rgba(59, 130, 246, 0.1) 4px),
              repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(20, 184, 166, 0.1) 2px, rgba(20, 184, 166, 0.1) 4px)
            `,
            backgroundSize: '50px 50px'
          }} />
          
          {/* Flowing Data Streams */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-60 animate-pulse" />
            <div className="absolute top-2/5 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-teal-400 to-transparent opacity-60 animate-pulse" style={{ animationDelay: '1.5s' }} />
            <div className="absolute bottom-2/5 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-60 animate-pulse" style={{ animationDelay: '3s' }} />
            <div className="absolute bottom-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-teal-400 to-transparent opacity-60 animate-pulse" style={{ animationDelay: '4.5s' }} />
          </div>
          
          {/* Circuit Nodes */}
          <div className="absolute top-1/4 left-1/5 w-3 h-3 bg-blue-400 rounded-full animate-ping opacity-75" />
          <div className="absolute top-2/5 right-1/4 w-2 h-2 bg-teal-400 rounded-full animate-ping opacity-75" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-2/5 left-1/3 w-2.5 h-2.5 bg-blue-400 rounded-full animate-ping opacity-75" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-1/4 right-1/5 w-2 h-2 bg-teal-400 rounded-full animate-ping opacity-75" style={{ animationDelay: '3s' }} />
          
          {/* Tech Grid Overlay */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.4) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(20, 184, 166, 0.4) 0%, transparent 50%)
            `,
            backgroundSize: '400px 400px'
          }} />
        </div>
        <svg 
          viewBox="0 0 1200 800" 
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background Tech Grid */}
          <defs>
            <pattern id="circuit-pattern" patternUnits="userSpaceOnUse" width="100" height="100">
              <rect width="100" height="100" fill="rgba(59, 130, 246, 0.05)" />
              <path d="M 0,50 L 50,50 L 50,0" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="1" fill="none" />
              <path d="M 50,100 L 50,50 L 100,50" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="1" fill="none" />
              <circle cx="50" cy="50" r="3" fill="rgba(59, 130, 246, 0.4)" />
            </pattern>
            
            <pattern id="data-pattern" patternUnits="userSpaceOnUse" width="80" height="80">
              <rect width="80" height="80" fill="transparent" />
              <path d="M 0,40 Q 20,20 40,40 T 80,40" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="2" fill="none" />
            </pattern>

            <linearGradient id="data-flow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0)" />
              <stop offset="50%" stopColor="rgba(59, 130, 246, 0.8)" />
              <stop offset="100%" stopColor="rgba(20, 184, 166, 0)" />
            </linearGradient>

            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/> 
              </feMerge>
            </filter>
          </defs>

          {/* Background Layer */}
          <rect className="parallax-bg" width="100%" height="100%" fill="url(#circuit-pattern)" />
          
          {/* Circuit Board Mountains */}
          <g className="parallax-circuit1">
            <path d="M 0,600 Q 200,400 400,500 T 800,450 L 1200,480 L 1200,800 L 0,800 Z" 
                  fill="rgba(31, 41, 55, 0.8)" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="2" />
            <circle cx="300" cy="480" r="8" fill="rgba(59, 130, 246, 0.6)" className="floating-hex" />
            <rect x="600" y="440" width="16" height="16" fill="rgba(139, 92, 246, 0.6)" className="floating-hex" />
            <polygon points="900,460 920,440 940,460 920,480" fill="rgba(20, 184, 166, 0.6)" className="floating-hex" />
          </g>

          {/* Mid Circuit Layer */}
          <g className="parallax-circuit2">
            <path d="M 0,700 Q 300,550 600,600 T 1200,580 L 1200,800 L 0,800 Z" 
                  fill="rgba(17, 24, 39, 0.9)" stroke="rgba(139, 92, 246, 0.4)" strokeWidth="2" />
            <circle cx="450" cy="580" r="6" fill="rgba(139, 92, 246, 0.8)" className="floating-hex" />
            <rect x="750" y="570" width="12" height="12" fill="rgba(59, 130, 246, 0.8)" className="floating-hex" />
          </g>

          {/* Data Flow Streams */}
          <g className="parallax-data-flow">
            <path className="data-stream" 
                  d="M 50,200 Q 200,150 350,200 T 650,180 Q 800,160 950,200 T 1150,180" 
                  stroke="url(#data-flow-gradient)" 
                  strokeWidth="3" 
                  fill="none" 
                  strokeDasharray="20 10" 
                  filter="url(#glow)" />
            <path className="data-stream" 
                  d="M 100,350 Q 250,300 400,350 T 700,330 Q 850,310 1000,350" 
                  stroke="url(#data-flow-gradient)" 
                  strokeWidth="2" 
                  fill="none" 
                  strokeDasharray="15 8" 
                  filter="url(#glow)" />
          </g>

          {/* Floating Code Elements */}
          <g className="parallax-code">
            <text x="200" y="250" fill="rgba(59, 130, 246, 0.7)" fontSize="14" fontFamily="monospace" className="floating-binary">
              {'01001000 01100101 01101100 01101100 01101111'}
            </text>
            <text x="800" y="320" fill="rgba(59, 130, 246, 0.7)" fontSize="12" fontFamily="monospace" className="floating-binary">
              {'function deploy() {'}
            </text>
            <text x="820" y="340" fill="rgba(20, 184, 166, 0.7)" fontSize="12" fontFamily="monospace" className="floating-binary">
              {'  return success;'}
            </text>
            <text x="800" y="360" fill="rgba(59, 130, 246, 0.7)" fontSize="12" fontFamily="monospace" className="floating-binary">
              {'}'}
            </text>
          </g>

          {/* Network Nodes */}
          <g className="parallax-nodes">
            <circle cx="150" cy="300" r="4" fill="rgba(59, 130, 246, 0.8)" filter="url(#glow)" className="floating-hex" />
            <circle cx="350" cy="280" r="3" fill="rgba(139, 92, 246, 0.8)" filter="url(#glow)" className="floating-hex" />
            <circle cx="550" cy="320" r="5" fill="rgba(20, 184, 166, 0.8)" filter="url(#glow)" className="floating-hex" />
            <circle cx="750" cy="290" r="4" fill="rgba(59, 130, 246, 0.8)" filter="url(#glow)" className="floating-hex" />
            <circle cx="950" cy="310" r="3" fill="rgba(139, 92, 246, 0.8)" filter="url(#glow)" className="floating-hex" />
            
            {/* Connecting Lines */}
            <line x1="150" y1="300" x2="350" y2="280" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="1" />
            <line x1="350" y1="280" x2="550" y2="320" stroke="rgba(139, 92, 246, 0.4)" strokeWidth="1" />
            <line x1="550" y1="320" x2="750" y2="290" stroke="rgba(20, 184, 166, 0.4)" strokeWidth="1" />
            <line x1="750" y1="290" x2="950" y2="310" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="1" />
          </g>

          {/* Floating Tech Icons */}
          <g className="parallax-nodes">
            <rect x="100" y="400" width="20" height="20" rx="3" fill="rgba(59, 130, 246, 0.6)" className="floating-hex" />
            <polygon points="400,420 410,400 420,420 410,440" fill="rgba(139, 92, 246, 0.6)" className="floating-hex" />
            <rect x="700" y="380" width="16" height="16" rx="8" fill="rgba(20, 184, 166, 0.6)" className="floating-hex" />
            <polygon points="1000,400 1015,385 1030,400 1015,415" fill="rgba(59, 130, 246, 0.6)" className="floating-hex" />
          </g>

          {/* Central Focus Text */}
          <g className="relative z-10">
            <text x="600" y="400" textAnchor="middle" fill="rgba(255, 255, 255, 0.9)" 
                  fontSize="48" fontWeight="bold" fontFamily="Inter, sans-serif" filter="url(#glow)">
              {'INNOVATION'}
            </text>
            <text x="600" y="450" textAnchor="middle" fill="rgba(139, 92, 246, 0.8)" 
                  fontSize="24" fontFamily="Inter, sans-serif">
              {'Through Technology'}
            </text>
          </g>
        </svg>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
          <div className="animate-bounce-slow opacity-60">
            <ChevronDown className="text-blue-400 animate-pulse" size={32} />
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 relative bg-gradient-to-br from-gray-900 via-purple-950/20 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-4xl sm:text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Professional Experience
            </span>
          </h2>
          
          {/* Interactive Experience Slider */}
          <div className="relative max-w-5xl mx-auto">
            <Swiper
              modules={[Navigation, Pagination, EffectFade, Mousewheel]}
              spaceBetween={30}
              effect="fade"
              loop={true}
              autoHeight={true}
              mousewheel={{
                invert: false,
                forceToAxis: false,
                sensitivity: 1,
                releaseOnEdges: false,
              }}
              pagination={{
                el: '.experience-pagination',
                clickable: true,
              }}
              className="experience-slider"
            >
              {knowledgeBase.experience.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="experience-slide relative overflow-hidden">
                    {/* Holographic Card Container */}
                    <div className="holographic-card group relative bg-gradient-to-br from-slate-900/80 via-purple-900/20 to-slate-900/80 backdrop-blur-xl border border-cyan-400/30 rounded-3xl p-1 shadow-2xl transform-gpu hover:scale-[1.02] transition-all duration-700">
                      
                      {/* Animated Border */}
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-400/50 via-purple-500/50 to-pink-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
                      <div className="absolute inset-[2px] rounded-3xl bg-gradient-to-br from-slate-900/95 via-purple-900/30 to-slate-900/95 backdrop-blur-xl" />
                      
                      {/* Particle Field Background */}
                      <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                        <div className="particles-container absolute inset-0">
                          {[...Array(15)].map((_, i) => (
                            <div key={i} className={`particle particle-${i} absolute w-1 h-1 bg-cyan-400/60 rounded-full animate-ping`} 
                                 style={{
                                   left: `${Math.random() * 100}%`,
                                   top: `${Math.random() * 100}%`,
                                   animationDelay: `${Math.random() * 3}s`,
                                   animationDuration: `${2 + Math.random() * 2}s`
                                 }} />
                          ))}
                        </div>
                      </div>
                      
                      <div className="relative z-10 flex flex-col lg:flex-row items-center p-8">
                        {/* Futuristic Experience Visualization */}
                        <div className="experience-visual relative w-full lg:w-96 h-80 flex-shrink-0 mb-8 lg:mb-0 lg:mr-10">
                          {/* Holographic Display */}
                          <div className="absolute inset-0 rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-500/20 via-purple-600/20 to-pink-500/20 border border-cyan-400/40">
                            {/* Scanning Lines */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent animate-pulse" />
                            <div className="absolute top-0 left-0 w-full h-0.5 bg-cyan-400/50 animate-bounce" style={{ animationDuration: '3s' }} />
                            
                            {/* 3D Isometric Grid */}
                            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 320">
                              <defs>
                                <pattern id="grid-pattern" patternUnits="userSpaceOnUse" width="40" height="40">
                                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(34, 211, 238, 0.2)" strokeWidth="0.5"/>
                                </pattern>
                                <linearGradient id="holo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor="rgba(34, 211, 238, 0.8)" />
                                  <stop offset="50%" stopColor="rgba(168, 85, 247, 0.6)" />
                                  <stop offset="100%" stopColor="rgba(236, 72, 153, 0.8)" />
                                </linearGradient>
                              </defs>
                              
                              {/* Grid Background */}
                              <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                              
                              {/* Central Hexagon */}
                              <polygon points="200,100 240,130 240,190 200,220 160,190 160,130" 
                                       fill="url(#holo-gradient)" opacity="0.3" className="animate-pulse" />
                              
                              {/* Data Streams */}
                              <path d="M 50,160 Q 100,140 150,160 T 250,140 Q 300,120 350,140" 
                                    stroke="rgba(34, 211, 238, 0.6)" strokeWidth="2" fill="none" 
                                    className="animate-pulse" strokeDasharray="10 5" />
                              
                              {/* Floating Data Points */}
                              <circle cx="100" cy="150" r="3" fill="rgba(34, 211, 238, 0.8)" className="animate-ping" />
                              <circle cx="300" cy="130" r="2.5" fill="rgba(168, 85, 247, 0.8)" className="animate-ping" style={{ animationDelay: '0.5s' }} />
                              <circle cx="200" cy="200" r="2" fill="rgba(236, 72, 153, 0.8)" className="animate-ping" style={{ animationDelay: '1s' }} />
                            </svg>
                            
                            {/* Company Hologram */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center text-white transform group-hover:scale-110 transition-transform duration-500">
                                {item.logo ? (
                                  <div className="mb-3 animate-bounce" style={{ animationDuration: '3s' }}>
                                    <img 
                                      src={item.logo} 
                                      alt={`${item.company} logo`}
                                      className="w-32 h-32 object-contain mx-auto rounded-lg bg-white/80 p-2 border-2 border-cyan-400"
                                      style={{ display: 'block', visibility: 'visible', opacity: 1, zIndex: 10 }}
                                      onLoad={() => console.log(`Successfully loaded logo: ${item.logo}`)}
                                      onError={(e) => {
                                        console.log(`Failed to load logo: ${item.logo}`);
                                        e.currentTarget.style.display = 'none';
                                        e.currentTarget.nextSibling.style.display = 'block';
                                      }}
                                    />
                                    <div className="text-4xl hidden">🏢</div>
                                  </div>
                                ) : (
                                  <div className="text-4xl mb-3 filter drop-shadow-lg animate-bounce" style={{ animationDuration: '3s' }}>🏢</div>
                                )}
                                <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-1">
                                  {item.company}
                                </div>
                                <div className="text-sm text-cyan-300/80 font-medium">{item.location}</div>
                              </div>
                            </div>
                            
                            {/* Corner Brackets */}
                            <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-cyan-400/60" />
                            <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-cyan-400/60" />
                            <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-cyan-400/60" />
                            <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-cyan-400/60" />
                          </div>
                        </div>
                        
                        {/* Advanced Experience Content */}
                        <div className="experience-content flex-1 text-center lg:text-left space-y-6">
                          {/* Timeline Badge */}
                          <div className="relative inline-block">
                            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-full blur-sm" />
                            <span className="relative inline-flex items-center px-6 py-3 text-sm font-bold text-cyan-300 bg-slate-800/80 border border-cyan-400/40 rounded-full backdrop-blur-sm">
                              <Clock className="mr-2" size={14} />
                              {item.period}
                            </span>
                          </div>
                          
                          {/* Job Title with Glitch Effect */}
                          <h3 className="text-3xl lg:text-4xl font-black text-white mb-4 relative group-hover:animate-pulse">
                            <span className="bg-gradient-to-r from-white via-cyan-300 to-purple-300 bg-clip-text text-transparent">
                              {item.title}
                            </span>
                          </h3>
                          
                          {/* Company Info */}
                          <div className="flex items-center justify-center lg:justify-start space-x-4 text-lg font-semibold">
                            <span className="text-cyan-400">{item.company}</span>
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                            <span className="text-purple-300">{item.location}</span>
                          </div>
                          
                          {/* Neural Network Description */}
                          <div className="space-y-4 text-gray-300 leading-relaxed">
                            {item.description.split('. ').map((desc, i) => (
                              <div key={i} className="relative group/desc">
                                <div className="absolute -left-4 top-2 w-2 h-2 bg-cyan-400/60 rounded-full opacity-0 group-hover/desc:opacity-100 transition-opacity" />
                                <p className="text-base pl-6 transform group-hover/desc:translate-x-2 transition-transform duration-300">
                                  {desc.trim()}{i < item.description.split('. ').length - 1 && '.'}
                                </p>
                              </div>
                            ))}
                          </div>
                          
                          {/* Futuristic Action Button */}
                          <div className="pt-4">
                            <button 
                              onClick={() => analyzeExperience(item)}
                              className="group/btn relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-2xl overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25">
                              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                              <span className="relative z-10 mr-3">ANALYZE EXPERIENCE</span>
                              <div className="relative z-10 w-6 h-6 border-2 border-white/60 rounded-full flex items-center justify-center group-hover/btn:rotate-90 transition-transform duration-300">
                                <ChevronRight size={12} />
                              </div>
                              <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-20 bg-white animate-pulse" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            
            {/* Custom Pagination */}
            <div className="experience-pagination mt-8 flex justify-center" />
          </div>
        </div>
      </section>

      {/* Learning Evolution Parallax Section */}
      <section ref={learningParallaxRef} className="relative h-screen overflow-hidden">
        {/* Dynamic Neural Network Background */}
        <div className="absolute inset-0">
          {/* Brain Structure Base */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-950 to-gray-900" />
          
          {/* Neural Network Pattern */}
          <div className="absolute inset-0 opacity-25" style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.3) 0%, transparent 40%),
              radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.2) 0%, transparent 35%),
              radial-gradient(circle at 60% 70%, rgba(139, 92, 246, 0.25) 0%, transparent 45%),
              radial-gradient(circle at 30% 80%, rgba(168, 85, 247, 0.2) 0%, transparent 40%)
            `,
            backgroundSize: '400px 400px, 350px 350px, 300px 300px, 380px 380px'
          }} />
          
          {/* Synaptic Connections */}
          <div className="absolute inset-0">
            {/* Diagonal neural pathways */}
            <div className="absolute top-1/4 left-1/4 w-1/2 h-0.5 bg-gradient-to-r from-purple-400 via-transparent to-purple-300 rotate-12 animate-pulse opacity-60" />
            <div className="absolute top-1/3 right-1/4 w-1/3 h-0.5 bg-gradient-to-r from-violet-400 via-transparent to-violet-300 -rotate-45 animate-pulse opacity-60" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-1/3 left-1/3 w-2/5 h-0.5 bg-gradient-to-r from-purple-400 via-transparent to-purple-300 rotate-45 animate-pulse opacity-60" style={{ animationDelay: '2s' }} />
            <div className="absolute bottom-1/4 right-1/3 w-1/3 h-0.5 bg-gradient-to-r from-violet-400 via-transparent to-violet-300 -rotate-12 animate-pulse opacity-60" style={{ animationDelay: '3s' }} />
          </div>
          
          {/* Neural Nodes (Brain Synapses) */}
          <div className="absolute top-1/4 left-1/5 w-4 h-4 bg-purple-400 rounded-full animate-ping opacity-70" />
          <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-violet-400 rounded-full animate-ping opacity-70" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-1/3 left-2/5 w-3.5 h-3.5 bg-purple-400 rounded-full animate-ping opacity-70" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-1/4 right-1/5 w-3 h-3 bg-violet-400 rounded-full animate-ping opacity-70" style={{ animationDelay: '3s' }} />
          <div className="absolute top-1/2 left-1/2 w-2.5 h-2.5 bg-purple-300 rounded-full animate-ping opacity-70" style={{ animationDelay: '1.5s' }} />
          
          {/* Brain Wave Activity */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/6 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse" />
            <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-400 to-transparent animate-pulse" style={{ animationDelay: '2s' }} />
            <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse" style={{ animationDelay: '4s' }} />
          </div>
        </div>
        <svg 
          viewBox="0 0 1200 800" 
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="brain-pattern" patternUnits="userSpaceOnUse" width="120" height="120">
              <rect width="120" height="120" fill="rgba(139, 92, 246, 0.05)" />
              <circle cx="60" cy="60" r="2" fill="rgba(139, 92, 246, 0.3)" />
              <path d="M 30,60 Q 60,30 90,60 Q 60,90 30,60" stroke="rgba(139, 92, 246, 0.2)" strokeWidth="1" fill="none" />
            </pattern>
            
            <linearGradient id="neural-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(139, 92, 246, 0)" />
              <stop offset="50%" stopColor="rgba(139, 92, 246, 0.6)" />
              <stop offset="100%" stopColor="rgba(168, 85, 247, 0)" />
            </linearGradient>

            <filter id="neural-glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/> 
              </feMerge>
            </filter>
          </defs>

          {/* Neural Network Background */}
          <rect className="parallax-bg" width="100%" height="100%" fill="url(#brain-pattern)" />
          
          {/* Neural Network Layers */}
          <g className="parallax-circuit1">
            <path d="M 0,500 Q 300,350 600,400 T 1200,380 L 1200,800 L 0,800 Z" 
                  fill="rgba(75, 0, 130, 0.3)" stroke="rgba(139, 92, 246, 0.4)" strokeWidth="2" />
            {/* Neural Nodes */}
            <circle cx="200" cy="420" r="6" fill="rgba(139, 92, 246, 0.8)" className="floating-hex" filter="url(#neural-glow)" />
            <circle cx="400" cy="380" r="8" fill="rgba(168, 85, 247, 0.8)" className="floating-hex" filter="url(#neural-glow)" />
            <circle cx="600" cy="400" r="7" fill="rgba(139, 92, 246, 0.8)" className="floating-hex" filter="url(#neural-glow)" />
            <circle cx="800" cy="370" r="6" fill="rgba(168, 85, 247, 0.8)" className="floating-hex" filter="url(#neural-glow)" />
          </g>

          {/* Deep Learning Layer */}
          <g className="parallax-circuit2">
            <path d="M 0,650 Q 400,500 800,550 T 1200,530 L 1200,800 L 0,800 Z" 
                  fill="rgba(45, 0, 85, 0.4)" stroke="rgba(168, 85, 247, 0.5)" strokeWidth="2" />
            <circle cx="350" cy="540" r="5" fill="rgba(168, 85, 247, 0.9)" className="floating-hex" filter="url(#neural-glow)" />
            <circle cx="650" cy="520" r="6" fill="rgba(139, 92, 246, 0.9)" className="floating-hex" filter="url(#neural-glow)" />
          </g>

          {/* Knowledge Flow Streams */}
          <g className="parallax-data-flow">
            <path className="data-stream" 
                  d="M 100,250 Q 300,200 500,250 T 900,230 Q 1050,210 1100,250" 
                  stroke="url(#neural-gradient)" 
                  strokeWidth="4" 
                  fill="none" 
                  strokeDasharray="25 15" 
                  filter="url(#neural-glow)" />
            <path className="data-stream" 
                  d="M 150,400 Q 350,350 550,400 T 950,380" 
                  stroke="url(#neural-gradient)" 
                  strokeWidth="3" 
                  fill="none" 
                  strokeDasharray="20 12" 
                  filter="url(#neural-glow)" />
          </g>

          {/* Floating ML/AI Code */}
          <g className="parallax-code">
            <text x="180" y="300" fill="rgba(139, 92, 246, 0.8)" fontSize="13" fontFamily="monospace" className="floating-binary">
              {'model = Sequential()'}
            </text>
            <text x="700" y="280" fill="rgba(168, 85, 247, 0.8)" fontSize="12" fontFamily="monospace" className="floating-binary">
              {'X_train, y_train = load_data()'}
            </text>
            <text x="250" y="500" fill="rgba(139, 92, 246, 0.7)" fontSize="11" fontFamily="monospace" className="floating-binary">
              {'accuracy = model.evaluate()'}
            </text>
            <text x="800" y="450" fill="rgba(168, 85, 247, 0.7)" fontSize="12" fontFamily="monospace" className="floating-binary">
              {'neural_network.fit()'}
            </text>
          </g>

          {/* Learning Network Connections */}
          <g className="parallax-nodes">
            <circle cx="200" cy="200" r="4" fill="rgba(139, 92, 246, 0.9)" filter="url(#neural-glow)" className="floating-hex" />
            <circle cx="400" cy="180" r="5" fill="rgba(168, 85, 247, 0.9)" filter="url(#neural-glow)" className="floating-hex" />
            <circle cx="600" cy="220" r="4" fill="rgba(139, 92, 246, 0.9)" filter="url(#neural-glow)" className="floating-hex" />
            <circle cx="800" cy="190" r="6" fill="rgba(168, 85, 247, 0.9)" filter="url(#neural-glow)" className="floating-hex" />
            <circle cx="1000" cy="210" r="4" fill="rgba(139, 92, 246, 0.9)" filter="url(#neural-glow)" className="floating-hex" />
            
            {/* Neural Connections */}
            <line x1="200" y1="200" x2="400" y2="180" stroke="rgba(139, 92, 246, 0.5)" strokeWidth="2" />
            <line x1="400" y1="180" x2="600" y2="220" stroke="rgba(168, 85, 247, 0.5)" strokeWidth="2" />
            <line x1="600" y1="220" x2="800" y2="190" stroke="rgba(139, 92, 246, 0.5)" strokeWidth="2" />
            <line x1="800" y1="190" x2="1000" y2="210" stroke="rgba(168, 85, 247, 0.5)" strokeWidth="2" />
          </g>

          {/* Floating Learning Icons */}
          <g className="parallax-nodes">
            <polygon points="150,350 160,330 170,350 160,370" fill="rgba(139, 92, 246, 0.7)" className="floating-hex" />
            <rect x="500" y="320" width="18" height="18" rx="4" fill="rgba(168, 85, 247, 0.7)" className="floating-hex" />
            <circle cx="850" cy="340" r="9" fill="rgba(139, 92, 246, 0.6)" className="floating-hex" />
            <polygon points="1100,360 1115,340 1130,360 1115,380" fill="rgba(168, 85, 247, 0.6)" className="floating-hex" />
          </g>

          {/* Central Focus Text */}
          <g className="relative z-10">
            <text x="600" y="400" textAnchor="middle" fill="rgba(255, 255, 255, 0.95)" 
                  fontSize="46" fontWeight="bold" fontFamily="Inter, sans-serif" filter="url(#neural-glow)">
              {'LEARNING'}
            </text>
            <text x="600" y="450" textAnchor="middle" fill="rgba(168, 85, 247, 0.9)" 
                  fontSize="22" fontFamily="Inter, sans-serif">
              {'Through Evolution'}
            </text>
          </g>
        </svg>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
          <div className="animate-bounce-slow opacity-60">
            <ChevronDown className="text-purple-400 animate-pulse" size={32} />
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-4xl sm:text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
              Education
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {knowledgeBase.education.map((item, index) => (
              <EducationCard
                key={index}
                degree={item.degree}
                school={item.school}
                location={item.location}
                period={item.period}
                delay={index * 200}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Mastery Practice Parallax Section */}
      <section ref={masteryParallaxRef} className="relative h-screen overflow-hidden">
        {/* Dynamic Code Editor IDE Background */}
        <div className="absolute inset-0">
          {/* IDE Interface Base */}
          <div className="absolute inset-0 bg-gray-900" />
          
          {/* Code Editor Windows */}
          <div className="absolute top-4 left-4 right-4 bottom-4 bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
            {/* Title Bar */}
            <div className="h-8 bg-gray-700 flex items-center px-4 text-sm text-gray-300 border-b border-gray-600">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
              </div>
              <span className="ml-4">MLPipeline.py • main.tsx • docker-compose.yml</span>
            </div>
            
            {/* Line Numbers and Code Area */}
            <div className="flex h-full">
              {/* Line Numbers */}
              <div className="w-12 bg-gray-750 text-gray-500 text-xs font-mono pt-2 text-right pr-2">
                <div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div><div>7</div><div>8</div><div>9</div><div>10</div><div>11</div><div>12</div><div>13</div><div>14</div><div>15</div>
              </div>
              
              {/* Code Content */}
              <div className="flex-1 bg-gray-800 text-sm font-mono pt-2 pl-4 text-emerald-400 opacity-60">
                <div className="text-purple-400">class</div>
                <div className="ml-4 text-emerald-400">def optimize_model():</div>
                <div className="ml-8 text-blue-400">X_train, y_train = load_data()</div>
                <div className="ml-8 text-yellow-400">model = Sequential()</div>
                <div className="ml-8 text-pink-400">model.compile(optimizer='adam')</div>
                <div className="ml-8 text-teal-400">return model.fit(X_train, y_train)</div>
                <div />
                <div className="text-gray-500"># Docker deployment config</div>
                <div className="text-orange-400">FROM node:18-alpine</div>
                <div className="text-cyan-400">WORKDIR /app</div>
                <div className="text-green-400">COPY package*.json ./</div>
                <div className="text-blue-400">RUN npm install</div>
              </div>
            </div>
          </div>
          
          {/* Terminal Window */}
          <div className="absolute bottom-4 right-4 w-80 h-32 bg-black rounded border border-emerald-500 opacity-75">
            <div className="h-6 bg-gray-800 flex items-center px-2 text-xs text-emerald-400 border-b border-emerald-500">
              terminal
            </div>
            <div className="p-2 text-xs font-mono text-emerald-400">
              <div>$ npm run build</div>
              <div className="text-green-400">✓ Build complete in 2.3s</div>
              <div>$ docker compose up -d</div>
              <div className="text-blue-400 animate-pulse">Starting services...</div>
            </div>
          </div>
          
          {/* Floating Code Particles */}
          <div className="absolute top-1/4 left-1/5 text-emerald-400 text-xs font-mono opacity-50 animate-ping">{`{}`}</div>
          <div className="absolute top-1/3 right-1/4 text-teal-400 text-xs font-mono opacity-50 animate-ping" style={{ animationDelay: '1s' }}>{`[]`}</div>
          <div className="absolute bottom-1/3 left-1/3 text-emerald-400 text-xs font-mono opacity-50 animate-ping" style={{ animationDelay: '2s' }}>{`()`}</div>
          <div className="absolute bottom-1/4 right-1/5 text-teal-400 text-xs font-mono opacity-50 animate-ping" style={{ animationDelay: '3s' }}>{`<>`}</div>
        </div>
        <svg 
          viewBox="0 0 1200 800" 
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="code-matrix" patternUnits="userSpaceOnUse" width="80" height="80">
              <rect width="80" height="80" fill="rgba(16, 185, 129, 0.03)" />
              <text x="10" y="20" fill="rgba(16, 185, 129, 0.2)" fontSize="10" fontFamily="monospace">{'01'}</text>
              <text x="50" y="50" fill="rgba(52, 211, 153, 0.2)" fontSize="8" fontFamily="monospace">{'def'}</text>
              <text x="20" y="70" fill="rgba(16, 185, 129, 0.15)" fontSize="9" fontFamily="monospace">{'()'}</text>
            </pattern>
            
            <linearGradient id="mastery-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(16, 185, 129, 0)" />
              <stop offset="50%" stopColor="rgba(16, 185, 129, 0.8)" />
              <stop offset="100%" stopColor="rgba(52, 211, 153, 0)" />
            </linearGradient>

            <filter id="mastery-glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/> 
              </feMerge>
            </filter>
          </defs>

          {/* Code Matrix Background */}
          <rect className="parallax-bg" width="100%" height="100%" fill="url(#code-matrix)" />
          
          {/* Tech Stack Layers */}
          <g className="parallax-circuit1">
            <path d="M 0,480 Q 250,320 500,380 Q 750,440 1000,360 Q 1100,340 1200,360 L 1200,800 L 0,800 Z" 
                  fill="rgba(6, 95, 70, 0.4)" stroke="rgba(16, 185, 129, 0.6)" strokeWidth="2" />
            {/* Tech Stack Nodes */}
            <circle cx="180" cy="400" r="8" fill="rgba(16, 185, 129, 0.9)" className="floating-hex" filter="url(#mastery-glow)" />
            <circle cx="380" cy="350" r="10" fill="rgba(52, 211, 153, 0.9)" className="floating-hex" filter="url(#mastery-glow)" />
            <circle cx="580" cy="390" r="9" fill="rgba(16, 185, 129, 0.9)" className="floating-hex" filter="url(#mastery-glow)" />
            <circle cx="780" cy="340" r="8" fill="rgba(52, 211, 153, 0.9)" className="floating-hex" filter="url(#mastery-glow)" />
            <circle cx="980" cy="370" r="7" fill="rgba(16, 185, 129, 0.9)" className="floating-hex" filter="url(#mastery-glow)" />
          </g>

          {/* Advanced Skills Layer */}
          <g className="parallax-circuit2">
            <path d="M 0,620 Q 300,480 600,540 Q 900,600 1200,520 L 1200,800 L 0,800 Z" 
                  fill="rgba(4, 120, 87, 0.3)" stroke="rgba(52, 211, 153, 0.5)" strokeWidth="2" />
            <circle cx="300" cy="520" r="6" fill="rgba(52, 211, 153, 0.8)" className="floating-hex" filter="url(#mastery-glow)" />
            <circle cx="700" cy="500" r="7" fill="rgba(16, 185, 129, 0.8)" className="floating-hex" filter="url(#mastery-glow)" />
            <circle cx="900" cy="540" r="5" fill="rgba(52, 211, 153, 0.8)" className="floating-hex" filter="url(#mastery-glow)" />
          </g>

          {/* Code Execution Streams */}
          <g className="parallax-data-flow">
            <path className="data-stream" 
                  d="M 80,280 Q 280,230 480,280 T 880,260 Q 1020,240 1120,280" 
                  stroke="url(#mastery-gradient)" 
                  strokeWidth="5" 
                  fill="none" 
                  strokeDasharray="30 18" 
                  filter="url(#mastery-glow)" />
            <path className="data-stream" 
                  d="M 120,420 Q 320,370 520,420 T 920,400 Q 1080,380 1150,420" 
                  stroke="url(#mastery-gradient)" 
                  strokeWidth="4" 
                  fill="none" 
                  strokeDasharray="25 15" 
                  filter="url(#mastery-glow)" />
          </g>

          {/* Advanced Programming Code */}
          <g className="parallax-code">
            <text x="160" y="320" fill="rgba(16, 185, 129, 0.9)" fontSize="14" fontFamily="monospace" className="floating-binary">
              {'class MLPipeline:'}
            </text>
            <text x="680" y="300" fill="rgba(52, 211, 153, 0.9)" fontSize="13" fontFamily="monospace" className="floating-binary">
              {'async def optimize()'}
            </text>
            <text x="220" y="520" fill="rgba(16, 185, 129, 0.8)" fontSize="12" fontFamily="monospace" className="floating-binary">
              {'Docker • K8s • AWS'}
            </text>
            <text x="750" y="480" fill="rgba(52, 211, 153, 0.8)" fontSize="13" fontFamily="monospace" className="floating-binary">
              {'React • TypeScript'}
            </text>
            <text x="420" y="350" fill="rgba(16, 185, 129, 0.7)" fontSize="11" fontFamily="monospace" className="floating-binary">
              {'PostgreSQL • Redis'}
            </text>
          </g>

          {/* Technical Architecture Connections */}
          <g className="parallax-nodes">
            <circle cx="220" cy="220" r="5" fill="rgba(16, 185, 129, 0.9)" filter="url(#mastery-glow)" className="floating-hex" />
            <circle cx="420" cy="200" r="6" fill="rgba(52, 211, 153, 0.9)" filter="url(#mastery-glow)" className="floating-hex" />
            <circle cx="620" cy="240" r="5" fill="rgba(16, 185, 129, 0.9)" filter="url(#mastery-glow)" className="floating-hex" />
            <circle cx="820" cy="210" r="7" fill="rgba(52, 211, 153, 0.9)" filter="url(#mastery-glow)" className="floating-hex" />
            <circle cx="1020" cy="230" r="5" fill="rgba(16, 185, 129, 0.9)" filter="url(#mastery-glow)" className="floating-hex" />
            
            {/* Architecture Links */}
            <line x1="220" y1="220" x2="420" y2="200" stroke="rgba(16, 185, 129, 0.6)" strokeWidth="2" />
            <line x1="420" y1="200" x2="620" y2="240" stroke="rgba(52, 211, 153, 0.6)" strokeWidth="2" />
            <line x1="620" y1="240" x2="820" y2="210" stroke="rgba(16, 185, 129, 0.6)" strokeWidth="2" />
            <line x1="820" y1="210" x2="1020" y2="230" stroke="rgba(52, 211, 153, 0.6)" strokeWidth="2" />
          </g>

          {/* Floating Tech Icons */}
          <g className="parallax-nodes">
            <rect x="140" y="360" width="16" height="16" rx="3" fill="rgba(16, 185, 129, 0.8)" className="floating-hex" />
            <polygon points="480,340 490,320 500,340 490,360" fill="rgba(52, 211, 153, 0.8)" className="floating-hex" />
            <circle cx="840" cy="350" r="8" fill="rgba(16, 185, 129, 0.7)" className="floating-hex" />
            <rect x="1080" y="370" width="14" height="14" rx="2" fill="rgba(52, 211, 153, 0.7)" className="floating-hex" />
            <polygon points="320,380 335,365 350,380 335,395" fill="rgba(16, 185, 129, 0.6)" className="floating-hex" />
          </g>

          {/* Central Focus Text */}
          <g className="relative z-10">
            <text x="600" y="400" textAnchor="middle" fill="rgba(255, 255, 255, 0.95)" 
                  fontSize="46" fontWeight="bold" fontFamily="Inter, sans-serif" filter="url(#mastery-glow)">
              {'MASTERY'}
            </text>
            <text x="600" y="450" textAnchor="middle" fill="rgba(52, 211, 153, 0.9)" 
                  fontSize="22" fontFamily="Inter, sans-serif">
              {'Through Practice'}
            </text>
          </g>
        </svg>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
          <div className="animate-bounce-slow opacity-60">
            <ChevronDown className="text-emerald-400 animate-pulse" size={32} />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-4xl sm:text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Technical Skills
            </span>
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <SkillCategory
              icon={<Code className="text-blue-400" size={32} />}
              title="Programming Languages"
              skills={knowledgeBase.skills.programming}
              color="blue"
              delay={0}
            />
            <SkillCategory
              icon={<Brain className="text-purple-400" size={32} />}
              title="Machine Learning"
              skills={knowledgeBase.skills.ml}
              color="purple"
              delay={200}
            />
            <SkillCategory
              icon={<Database className="text-green-400" size={32} />}
              title="Data & Big Data"
              skills={knowledgeBase.skills.data}
              color="green"
              delay={400}
            />
            <SkillCategory
              icon={<Cloud className="text-orange-400" size={32} />}
              title="Cloud & DevOps"
              skills={knowledgeBase.skills.cloud}
              color="orange"
              delay={600}
            />
          </div>
        </div>
      </section>

      {/* Creation Code Parallax Section */}
      <section ref={creationParallaxRef} className="relative h-screen overflow-hidden">
        {/* Dynamic Creative Workspace Background */}
        <div className="absolute inset-0">
          {/* Design Studio Base */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-rose-950 to-gray-900" />
          
          {/* Design Canvas */}
          <div className="absolute top-8 left-8 w-2/3 h-3/4 bg-white rounded-lg shadow-2xl border-4 border-gray-700 overflow-hidden">
            {/* Canvas Header */}
            <div className="h-10 bg-gray-100 border-b border-gray-300 flex items-center px-4">
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-red-400 rounded-full" />
                <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                <div className="w-3 h-3 bg-green-400 rounded-full" />
              </div>
              <span className="ml-4 text-sm text-gray-600">Portfolio Design - Figma</span>
            </div>
            
            {/* Design Elements */}
            <div className="relative p-4 h-full bg-gray-50">
              {/* UI Components */}
              <div className="absolute top-8 left-8 w-32 h-20 bg-gradient-to-r from-pink-400 to-purple-500 rounded-lg opacity-80" />
              <div className="absolute top-8 right-8 w-24 h-16 bg-gradient-to-r from-blue-400 to-teal-500 rounded opacity-70" />
              <div className="absolute bottom-1/3 left-1/4 w-40 h-6 bg-gray-300 rounded opacity-60" />
              <div className="absolute bottom-1/4 left-1/4 w-32 h-4 bg-gray-200 rounded opacity-50" />
              
              {/* Design Grid */}
              <div className="absolute inset-4 opacity-20" style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(236, 72, 153, 0.3) 20px), repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(236, 72, 153, 0.3) 20px)',
                backgroundSize: '20px 20px'
              }} />
            </div>
          </div>
          
          {/* Design Tools Panel */}
          <div className="absolute top-8 right-8 w-16 h-80 bg-gray-800 rounded border border-pink-500 opacity-90">
            <div className="p-2 space-y-2">
              <div className="w-12 h-12 bg-pink-500 rounded flex items-center justify-center text-white text-xl font-bold">✏</div>
              <div className="w-12 h-12 bg-purple-500 rounded flex items-center justify-center text-white text-xl">🎨</div>
              <div className="w-12 h-12 bg-blue-500 rounded flex items-center justify-center text-white text-xl">📐</div>
              <div className="w-12 h-12 bg-teal-500 rounded flex items-center justify-center text-white text-xl">⚙️</div>
            </div>
          </div>
          
          {/* Code Preview Window */}
          <div className="absolute bottom-8 left-8 w-1/2 h-40 bg-gray-900 rounded border border-pink-400 opacity-85">
            <div className="h-8 bg-gray-800 flex items-center px-3 text-sm text-pink-400 border-b border-pink-400">
              component.tsx
            </div>
            <div className="p-3 text-xs font-mono">
              <div className="text-purple-400">const</div>
              <div className="ml-2 text-pink-400">{'Portfolio = () => {'}</div>
              <div className="ml-4 text-blue-400">return (</div>
              <div className="ml-6 text-green-400">{'<div className="hero">'}</div>
              <div className="ml-8 text-yellow-400">{'<h1>Innovation</h1>'}</div>
              <div className="ml-6 text-green-400">{'</div>'}</div>
              <div className="ml-4 text-blue-400">)</div>
              <div className="ml-2 text-pink-400">{'}'}</div>
            </div>
          </div>
          
          {/* Build Process Indicators */}
          <div className="absolute bottom-8 right-8 w-48 h-32 bg-black rounded border border-pink-500 opacity-80">
            <div className="h-6 bg-gray-900 flex items-center px-2 text-xs text-pink-400 border-b border-pink-500">
              Build Process
            </div>
            <div className="p-2 text-xs font-mono text-green-400">
              <div className="flex items-center"><div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-ping" />Compiling...</div>
              <div className="flex items-center"><div className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse" />Bundling assets</div>
              <div className="flex items-center"><div className="w-2 h-2 bg-blue-400 rounded-full mr-2" />Optimizing</div>
              <div className="text-pink-400 animate-pulse">🚀 Ready to deploy!</div>
            </div>
          </div>
          
          {/* Creative Particles */}
          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-pink-400 rotate-45 animate-ping opacity-60" />
          <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-purple-400 rounded-full animate-ping opacity-60" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-1/3 left-2/5 w-5 h-2 bg-pink-400 animate-ping opacity-60" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-purple-400 rotate-45 animate-ping opacity-60" style={{ animationDelay: '3s' }} />
        </div>
        <svg 
          viewBox="0 0 1200 800" 
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="build-grid" patternUnits="userSpaceOnUse" width="100" height="100">
              <rect width="100" height="100" fill="rgba(236, 72, 153, 0.04)" />
              <path d="M 0,50 L 100,50 M 50,0 L 50,100" stroke="rgba(236, 72, 153, 0.15)" strokeWidth="1" />
              <circle cx="25" cy="25" r="1.5" fill="rgba(236, 72, 153, 0.3)" />
              <circle cx="75" cy="75" r="1.5" fill="rgba(219, 39, 119, 0.3)" />
            </pattern>
            
            <linearGradient id="creation-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(236, 72, 153, 0)" />
              <stop offset="50%" stopColor="rgba(236, 72, 153, 0.9)" />
              <stop offset="100%" stopColor="rgba(219, 39, 119, 0)" />
            </linearGradient>

            <filter id="creation-glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/> 
              </feMerge>
            </filter>
          </defs>

          {/* Build Grid Background */}
          <rect className="parallax-bg" width="100%" height="100%" fill="url(#build-grid)" />
          
          {/* Creative Architecture Layers */}
          <g className="parallax-circuit1">
            <path d="M 0,450 Q 200,280 400,350 Q 600,420 800,320 Q 1000,220 1200,300 L 1200,800 L 0,800 Z" 
                  fill="rgba(157, 23, 77, 0.4)" stroke="rgba(236, 72, 153, 0.6)" strokeWidth="2" />
            {/* Creative Nodes */}
            <circle cx="200" cy="370" r="9" fill="rgba(236, 72, 153, 0.9)" className="floating-hex" filter="url(#creation-glow)" />
            <circle cx="400" cy="340" r="11" fill="rgba(219, 39, 119, 0.9)" className="floating-hex" filter="url(#creation-glow)" />
            <circle cx="600" cy="380" r="10" fill="rgba(236, 72, 153, 0.9)" className="floating-hex" filter="url(#creation-glow)" />
            <circle cx="800" cy="310" r="9" fill="rgba(219, 39, 119, 0.9)" className="floating-hex" filter="url(#creation-glow)" />
            <circle cx="1000" cy="330" r="8" fill="rgba(236, 72, 153, 0.9)" className="floating-hex" filter="url(#creation-glow)" />
          </g>

          {/* Innovation Build Layer */}
          <g className="parallax-circuit2">
            <path d="M 0,600 Q 250,460 500,520 Q 750,580 1000,480 Q 1100,440 1200,460 L 1200,800 L 0,800 Z" 
                  fill="rgba(190, 24, 93, 0.3)" stroke="rgba(219, 39, 119, 0.5)" strokeWidth="2" />
            <circle cx="280" cy="500" r="7" fill="rgba(219, 39, 119, 0.8)" className="floating-hex" filter="url(#creation-glow)" />
            <circle cx="650" cy="480" r="8" fill="rgba(236, 72, 153, 0.8)" className="floating-hex" filter="url(#creation-glow)" />
            <circle cx="950" cy="520" r="6" fill="rgba(219, 39, 119, 0.8)" className="floating-hex" filter="url(#creation-glow)" />
          </g>

          {/* Development Flow Streams */}
          <g className="parallax-data-flow">
            <path className="data-stream" 
                  d="M 60,260 Q 260,210 460,260 T 860,240 Q 1000,220 1140,260" 
                  stroke="url(#creation-gradient)" 
                  strokeWidth="6" 
                  fill="none" 
                  strokeDasharray="35 20" 
                  filter="url(#creation-glow)" />
            <path className="data-stream" 
                  d="M 100,400 Q 300,350 500,400 T 900,380 Q 1050,360 1180,400" 
                  stroke="url(#creation-gradient)" 
                  strokeWidth="5" 
                  fill="none" 
                  strokeDasharray="28 16" 
                  filter="url(#creation-glow)" />
          </g>

          {/* Creative Development Code */}
          <g className="parallax-code">
            <text x="140" y="310" fill="rgba(236, 72, 153, 0.9)" fontSize="15" fontFamily="monospace" className="floating-binary">
              {'const build = () => {'}
            </text>
            <text x="660" y="290" fill="rgba(219, 39, 119, 0.9)" fontSize="14" fontFamily="monospace" className="floating-binary">
              {'return innovation;'}
            </text>
            <text x="200" y="500" fill="rgba(236, 72, 153, 0.8)" fontSize="13" fontFamily="monospace" className="floating-binary">
              {'UI/UX • Design'}
            </text>
            <text x="720" y="460" fill="rgba(219, 39, 119, 0.8)" fontSize="14" fontFamily="monospace" className="floating-binary">
              {'deploy().success()'}
            </text>
            <text x="380" y="340" fill="rgba(236, 72, 153, 0.7)" fontSize="12" fontFamily="monospace" className="floating-binary">
              {'git commit -m "magic"'}
            </text>
            <text x="850" y="380" fill="rgba(219, 39, 119, 0.7)" fontSize="13" fontFamily="monospace" className="floating-binary">
              {'npm run build'}
            </text>
          </g>

          {/* Project Architecture Connections */}
          <g className="parallax-nodes">
            <circle cx="180" cy="200" r="6" fill="rgba(236, 72, 153, 0.9)" filter="url(#creation-glow)" className="floating-hex" />
            <circle cx="380" cy="180" r="7" fill="rgba(219, 39, 119, 0.9)" filter="url(#creation-glow)" className="floating-hex" />
            <circle cx="580" cy="220" r="6" fill="rgba(236, 72, 153, 0.9)" filter="url(#creation-glow)" className="floating-hex" />
            <circle cx="780" cy="190" r="8" fill="rgba(219, 39, 119, 0.9)" filter="url(#creation-glow)" className="floating-hex" />
            <circle cx="980" cy="210" r="6" fill="rgba(236, 72, 153, 0.9)" filter="url(#creation-glow)" className="floating-hex" />
            
            {/* Creative Links */}
            <line x1="180" y1="200" x2="380" y2="180" stroke="rgba(236, 72, 153, 0.6)" strokeWidth="2" />
            <line x1="380" y1="180" x2="580" y2="220" stroke="rgba(219, 39, 119, 0.6)" strokeWidth="2" />
            <line x1="580" y1="220" x2="780" y2="190" stroke="rgba(236, 72, 153, 0.6)" strokeWidth="2" />
            <line x1="780" y1="190" x2="980" y2="210" stroke="rgba(219, 39, 119, 0.6)" strokeWidth="2" />
          </g>

          {/* Floating Creative Elements */}
          <g className="parallax-nodes">
            <rect x="120" y="350" width="18" height="18" rx="4" fill="rgba(236, 72, 153, 0.8)" className="floating-hex" />
            <polygon points="460,330 475,310 490,330 475,350" fill="rgba(219, 39, 119, 0.8)" className="floating-hex" />
            <circle cx="820" cy="340" r="9" fill="rgba(236, 72, 153, 0.7)" className="floating-hex" />
            <rect x="1060" y="360" width="16" height="16" rx="3" fill="rgba(219, 39, 119, 0.7)" className="floating-hex" />
            <polygon points="300,370 318,352 336,370 318,388" fill="rgba(236, 72, 153, 0.6)" className="floating-hex" />
            <circle cx="700" cy="380" r="7" fill="rgba(219, 39, 119, 0.6)" className="floating-hex" />
          </g>

          {/* Central Focus Text */}
          <g className="relative z-10">
            <text x="600" y="400" textAnchor="middle" fill="rgba(255, 255, 255, 0.95)" 
                  fontSize="46" fontWeight="bold" fontFamily="Inter, sans-serif" filter="url(#creation-glow)">
              {'CREATION'}
            </text>
            <text x="600" y="450" textAnchor="middle" fill="rgba(219, 39, 119, 0.9)" 
                  fontSize="22" fontFamily="Inter, sans-serif">
              {'Through Code'}
            </text>
          </g>
        </svg>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
          <div className="animate-bounce-slow opacity-60">
            <ChevronDown className="text-pink-400 animate-pulse" size={32} />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-4xl sm:text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {knowledgeBase.projects.map((project, idx) => (
              <div key={project.name} onClick={() => setOpenProject(project.name)} className="cursor-pointer">
                <ProjectCard
                  title={project.name}
                  description={project.description}
                  technologies={project.technologies}
                  delay={idx * 200}
                />
              </div>
            ))}
          </div>
          {openProject && (
            <ProjectDetailModal
              project={knowledgeBase.projects.find(p => p.name === openProject)}
              onClose={() => setOpenProject(null)}
            />
          )}
        </div>
      </section>

      {/* Collaboration Connection Parallax Section */}
      <section ref={collaborationParallaxRef} className="relative h-screen overflow-hidden">
        {/* Dynamic Global Network Background */}
        <div className="absolute inset-0">
          {/* Global Network Base */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900" />
          
          {/* World Map Outline */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(34, 211, 238, 0.3) 0%, transparent 25%),
              radial-gradient(circle at 80% 40%, rgba(6, 182, 212, 0.3) 0%, transparent 25%),
              radial-gradient(circle at 60% 70%, rgba(34, 211, 238, 0.25) 0%, transparent 20%),
              radial-gradient(circle at 30% 80%, rgba(6, 182, 212, 0.25) 0%, transparent 20%),
              radial-gradient(circle at 70% 20%, rgba(34, 211, 238, 0.2) 0%, transparent 15%)
            `,
            backgroundSize: '400px 400px, 350px 350px, 300px 300px, 380px 380px, 280px 280px'
          }} />
          
          {/* Communication Signals */}
          <div className="absolute inset-0">
            {/* Signal transmission lines */}
            <div className="absolute top-1/4 left-1/6 w-2/3 h-px bg-gradient-to-r from-cyan-400 via-transparent to-teal-400 animate-pulse opacity-70" />
            <div className="absolute top-2/5 right-1/6 w-1/2 h-px bg-gradient-to-l from-cyan-400 via-transparent to-blue-400 animate-pulse opacity-70" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-2/5 left-1/4 w-3/5 h-px bg-gradient-to-r from-teal-400 via-transparent to-cyan-400 animate-pulse opacity-70" style={{ animationDelay: '2s' }} />
            <div className="absolute bottom-1/4 right-1/4 w-1/3 h-px bg-gradient-to-l from-blue-400 via-transparent to-cyan-400 animate-pulse opacity-70" style={{ animationDelay: '3s' }} />
            
            {/* Vertical connections */}
            <div className="absolute top-1/6 left-1/4 w-px h-2/3 bg-gradient-to-b from-cyan-400 via-transparent to-teal-400 animate-pulse opacity-60" style={{ animationDelay: '0.5s' }} />
            <div className="absolute top-1/5 right-1/3 w-px h-1/2 bg-gradient-to-b from-blue-400 via-transparent to-cyan-400 animate-pulse opacity-60" style={{ animationDelay: '2.5s' }} />
          </div>
          
          {/* Global Connection Hubs */}
          <div className="absolute top-1/4 left-1/5 w-6 h-6 border-2 border-cyan-400 rounded-full bg-cyan-400/20 animate-ping" />
          <div className="absolute top-1/3 right-1/4 w-5 h-5 border-2 border-teal-400 rounded-full bg-teal-400/20 animate-ping" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-1/3 left-2/5 w-7 h-7 border-2 border-cyan-400 rounded-full bg-cyan-400/20 animate-ping" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-1/4 right-1/5 w-5 h-5 border-2 border-blue-400 rounded-full bg-blue-400/20 animate-ping" style={{ animationDelay: '3s' }} />
          <div className="absolute top-1/2 left-1/2 w-4 h-4 border-2 border-teal-400 rounded-full bg-teal-400/20 animate-ping" style={{ animationDelay: '1.5s' }} />
          
          {/* Satellite Network */}
          <div className="absolute top-1/6 right-1/6 w-3 h-3 bg-cyan-400 rounded-full animate-pulse opacity-80" />
          <div className="absolute top-1/5 left-1/3 w-2.5 h-2.5 bg-teal-400 rounded-full animate-pulse opacity-80" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-1/6 right-1/3 w-3 h-3 bg-blue-400 rounded-full animate-pulse opacity-80" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-1/5 left-1/6 w-2.5 h-2.5 bg-cyan-400 rounded-full animate-pulse opacity-80" style={{ animationDelay: '3s' }} />
          
          {/* Data Transmission Waves */}
          <div className="absolute inset-0 opacity-25">
            <div className="absolute top-1/8 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />
            <div className="absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-teal-400 to-transparent animate-pulse" style={{ animationDelay: '2s' }} />
            <div className="absolute bottom-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse" style={{ animationDelay: '4s' }} />
            <div className="absolute bottom-1/8 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" style={{ animationDelay: '6s' }} />
          </div>
          
          {/* Communication Icons */}
          <div className="absolute top-1/3 left-1/6 text-cyan-400 text-2xl animate-ping opacity-60" style={{ animationDelay: '1s' }}>📡</div>
          <div className="absolute top-2/5 right-1/5 text-teal-400 text-xl animate-ping opacity-60" style={{ animationDelay: '3s' }}>🌐</div>
          <div className="absolute bottom-2/5 left-1/3 text-blue-400 text-2xl animate-ping opacity-60" style={{ animationDelay: '2s' }}>💬</div>
          <div className="absolute bottom-1/3 right-2/5 text-cyan-400 text-xl animate-ping opacity-60" style={{ animationDelay: '4s' }}>🔗</div>
        </div>
        <svg 
          viewBox="0 0 1200 800" 
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="network-mesh" patternUnits="userSpaceOnUse" width="150" height="150">
              <rect width="150" height="150" fill="rgba(34, 211, 238, 0.02)" />
              <circle cx="75" cy="75" r="2" fill="rgba(34, 211, 238, 0.4)" />
              <path d="M 0,75 L 150,75 M 75,0 L 75,150" stroke="rgba(34, 211, 238, 0.1)" strokeWidth="1" strokeDasharray="5 5" />
              <circle cx="25" cy="25" r="1" fill="rgba(6, 182, 212, 0.3)" />
              <circle cx="125" cy="125" r="1" fill="rgba(34, 211, 238, 0.3)" />
            </pattern>
            
            <linearGradient id="connection-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(34, 211, 238, 0)" />
              <stop offset="50%" stopColor="rgba(34, 211, 238, 0.9)" />
              <stop offset="100%" stopColor="rgba(6, 182, 212, 0)" />
            </linearGradient>

            <filter id="connection-glow">
              <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/> 
              </feMerge>
            </filter>
          </defs>

          {/* Network Mesh Background */}
          <rect className="parallax-bg" width="100%" height="100%" fill="url(#network-mesh)" />
          
          {/* Global Network Layers */}
          <g className="parallax-circuit1">
            <path d="M 0,420 Q 150,250 300,320 Q 450,390 600,280 Q 750,170 900,240 Q 1050,310 1200,220 L 1200,800 L 0,800 Z" 
                  fill="rgba(21, 94, 117, 0.4)" stroke="rgba(34, 211, 238, 0.6)" strokeWidth="2" />
            {/* Global Connection Nodes */}
            <circle cx="150" cy="340" r="10" fill="rgba(34, 211, 238, 0.9)" className="floating-hex" filter="url(#connection-glow)" />
            <circle cx="350" cy="300" r="12" fill="rgba(6, 182, 212, 0.9)" className="floating-hex" filter="url(#connection-glow)" />
            <circle cx="550" cy="360" r="11" fill="rgba(34, 211, 238, 0.9)" className="floating-hex" filter="url(#connection-glow)" />
            <circle cx="750" cy="280" r="10" fill="rgba(6, 182, 212, 0.9)" className="floating-hex" filter="url(#connection-glow)" />
            <circle cx="950" cy="320" r="9" fill="rgba(34, 211, 238, 0.9)" className="floating-hex" filter="url(#connection-glow)" />
          </g>

          {/* Future Collaboration Layer */}
          <g className="parallax-circuit2">
            <path d="M 0,580 Q 200,440 400,500 Q 600,560 800,460 Q 1000,360 1200,420 L 1200,800 L 0,800 Z" 
                  fill="rgba(8, 145, 178, 0.3)" stroke="rgba(6, 182, 212, 0.5)" strokeWidth="2" />
            <circle cx="250" cy="480" r="8" fill="rgba(6, 182, 212, 0.8)" className="floating-hex" filter="url(#connection-glow)" />
            <circle cx="600" cy="440" r="9" fill="rgba(34, 211, 238, 0.8)" className="floating-hex" filter="url(#connection-glow)" />
            <circle cx="900" cy="500" r="7" fill="rgba(6, 182, 212, 0.8)" className="floating-hex" filter="url(#connection-glow)" />
          </g>

          {/* Communication Flow Streams */}
          <g className="parallax-data-flow">
            <path className="data-stream" 
                  d="M 40,240 Q 240,190 440,240 T 840,220 Q 980,200 1160,240" 
                  stroke="url(#connection-gradient)" 
                  strokeWidth="7" 
                  fill="none" 
                  strokeDasharray="40 22" 
                  filter="url(#connection-glow)" />
            <path className="data-stream" 
                  d="M 80,380 Q 280,330 480,380 T 880,360 Q 1040,340 1180,380" 
                  stroke="url(#connection-gradient)" 
                  strokeWidth="6" 
                  fill="none" 
                  strokeDasharray="32 18" 
                  filter="url(#connection-glow)" />
            <path className="data-stream" 
                  d="M 120,520 Q 320,470 520,520 T 920,500" 
                  stroke="url(#connection-gradient)" 
                  strokeWidth="5" 
                  fill="none" 
                  strokeDasharray="28 16" 
                  filter="url(#connection-glow)" />
          </g>

          {/* Collaboration Code & Communication */}
          <g className="parallax-code">
            <text x="120" y="300" fill="rgba(34, 211, 238, 0.9)" fontSize="16" fontFamily="monospace" className="floating-binary">
              {'connect().then(success)'}
            </text>
            <text x="640" y="280" fill="rgba(6, 182, 212, 0.9)" fontSize="15" fontFamily="monospace" className="floating-binary">
              {'await collaborate()'}
            </text>
            <text x="180" y="480" fill="rgba(34, 211, 238, 0.8)" fontSize="14" fontFamily="monospace" className="floating-binary">
              {'LinkedIn • GitHub'}
            </text>
            <text x="700" y="440" fill="rgba(6, 182, 212, 0.8)" fontSize="15" fontFamily="monospace" className="floating-binary">
              {'let\'s build together'}
            </text>
            <text x="360" y="330" fill="rgba(34, 211, 238, 0.7)" fontSize="13" fontFamily="monospace" className="floating-binary">
              {'team.add(innovation)'}
            </text>
            <text x="830" y="360" fill="rgba(6, 182, 212, 0.7)" fontSize="14" fontFamily="monospace" className="floating-binary">
              {'future.create()'}
            </text>
          </g>

          {/* Global Network Connections */}
          <g className="parallax-nodes">
            <circle cx="160" cy="180" r="7" fill="rgba(34, 211, 238, 0.9)" filter="url(#connection-glow)" className="floating-hex" />
            <circle cx="360" cy="160" r="8" fill="rgba(6, 182, 212, 0.9)" filter="url(#connection-glow)" className="floating-hex" />
            <circle cx="560" cy="200" r="7" fill="rgba(34, 211, 238, 0.9)" filter="url(#connection-glow)" className="floating-hex" />
            <circle cx="760" cy="170" r="9" fill="rgba(6, 182, 212, 0.9)" filter="url(#connection-glow)" className="floating-hex" />
            <circle cx="960" cy="190" r="7" fill="rgba(34, 211, 238, 0.9)" filter="url(#connection-glow)" className="floating-hex" />
            <circle cx="1060" cy="220" r="6" fill="rgba(6, 182, 212, 0.9)" filter="url(#connection-glow)" className="floating-hex" />
            
            {/* Dynamic Network Links */}
            <line x1="160" y1="180" x2="360" y2="160" stroke="rgba(34, 211, 238, 0.6)" strokeWidth="2" strokeDasharray="8 4" />
            <line x1="360" y1="160" x2="560" y2="200" stroke="rgba(6, 182, 212, 0.6)" strokeWidth="2" strokeDasharray="8 4" />
            <line x1="560" y1="200" x2="760" y2="170" stroke="rgba(34, 211, 238, 0.6)" strokeWidth="2" strokeDasharray="8 4" />
            <line x1="760" y1="170" x2="960" y2="190" stroke="rgba(6, 182, 212, 0.6)" strokeWidth="2" strokeDasharray="8 4" />
            <line x1="960" y1="190" x2="1060" y2="220" stroke="rgba(34, 211, 238, 0.6)" strokeWidth="2" strokeDasharray="8 4" />
          </g>

          {/* Floating Collaboration Icons */}
          <g className="parallax-nodes">
            <rect x="100" y="340" width="20" height="20" rx="5" fill="rgba(34, 211, 238, 0.8)" className="floating-hex" />
            <polygon points="440,310 458,288 476,310 458,332" fill="rgba(6, 182, 212, 0.8)" className="floating-hex" />
            <circle cx="800" cy="320" r="10" fill="rgba(34, 211, 238, 0.7)" className="floating-hex" />
            <rect x="1040" y="340" width="18" height="18" rx="4" fill="rgba(6, 182, 212, 0.7)" className="floating-hex" />
            <polygon points="280,350 302,328 324,350 302,372" fill="rgba(34, 211, 238, 0.6)" className="floating-hex" />
            <circle cx="680" cy="360" r="8" fill="rgba(6, 182, 212, 0.6)" className="floating-hex" />
            <rect x="520" y="380" width="16" height="16" rx="3" fill="rgba(34, 211, 238, 0.6)" className="floating-hex" />
          </g>

          {/* Central Focus Text */}
          <g className="relative z-10">
            <text x="600" y="400" textAnchor="middle" fill="rgba(255, 255, 255, 0.95)" 
                  fontSize="44" fontWeight="bold" fontFamily="Inter, sans-serif" filter="url(#connection-glow)">
              {'COLLABORATION'}
            </text>
            <text x="600" y="450" textAnchor="middle" fill="rgba(6, 182, 212, 0.9)" 
                  fontSize="22" fontFamily="Inter, sans-serif">
              {'Through Connection'}
            </text>
          </g>
        </svg>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
          <div className="animate-bounce-slow opacity-60">
            <ChevronDown className="text-cyan-400 animate-pulse" size={32} />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-4xl sm:text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          
          <div className="text-center mb-12">
            <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-in">
              I'm always open to discussing new opportunities, innovative projects, or just connecting with fellow tech enthusiasts.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <ContactCard
              icon={<Mail className="text-blue-400" size={28} />}
              title="Email"
              value="najafgholizadehamin@gmail.com"
              href="mailto:najafgholizadehamin@gmail.com"
              delay={0}
            />
            <ContactCard
              icon={<Phone className="text-green-400" size={28} />}
              title="Phone"
              value="+98 914 770 3397"
              href="tel:+989147703397"
              delay={200}
            />
            <ContactCard
              icon={<Globe className="text-purple-400" size={28} />}
              title="Website"
              value="aminnajafgholizadeh.com"
              href="https://aminnajafgholizadeh.com"
              delay={400}
            />
            <ContactCard
              icon={<Linkedin className="text-blue-500" size={28} />}
              title="LinkedIn"
              value="Connect with me"
              href="https://www.linkedin.com/in/amin-najafgholizadeh-6ab8ba202"
              delay={600}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900/80 backdrop-blur-sm py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 animate-fade-in">
            © 2024 Amin Najafgholizadeh. Built with React & Tailwind CSS.
          </p>
        </div>
      </footer>

      {/* Experience Analysis Modal */}
      {analysisModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="max-w-4xl w-full bg-gray-900 rounded-2xl shadow-2xl relative animate-fade-in overflow-hidden border border-cyan-500/20">
            <button 
              onClick={() => setAnalysisModalOpen(false)} 
              className="absolute top-4 right-4 text-gray-400 hover:text-cyan-400 transition-colors text-2xl z-10"
            >
              <X size={28} />
            </button>
            
            <div className="max-h-[90vh] overflow-y-auto p-6 sm:p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  Experience Analysis
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
              </div>

              {analysisLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-400">Analyzing experience with AI...</p>
                  </div>
                </div>
              ) : currentAnalysis ? (
                <div className="space-y-8">
                  {/* Overview */}
                  <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-xl p-6 border border-cyan-400/20">
                    <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center">
                      <Brain className="mr-2" size={20} />
                      AI Overview
                    </h3>
                    <p className="text-gray-300 leading-relaxed">{currentAnalysis.overview}</p>
                  </div>

                  {/* Skills Grid */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-xl p-6 border border-blue-400/20">
                      <h3 className="text-lg font-bold text-blue-400 mb-4 flex items-center">
                        <Code className="mr-2" size={18} />
                        Key Skills
                      </h3>
                      <div className="space-y-2">
                        {currentAnalysis.key_skills?.map((skill: string, index: number) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            <span className="text-gray-300">{skill}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-xl p-6 border border-green-400/20">
                      <h3 className="text-lg font-bold text-green-400 mb-4 flex items-center">
                        <Star className="mr-2" size={18} />
                        Achievements
                      </h3>
                      <div className="space-y-2">
                        {currentAnalysis.achievements?.map((achievement: string, index: number) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="text-gray-300">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Growth and Impact */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-6 border border-purple-400/20">
                      <h3 className="text-lg font-bold text-purple-400 mb-4 flex items-center">
                        <Zap className="mr-2" size={18} />
                        Growth Areas
                      </h3>
                      <div className="space-y-2">
                        {currentAnalysis.growth_areas?.map((area: string, index: number) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                            <span className="text-gray-300">{area}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 rounded-xl p-6 border border-orange-400/20">
                      <h3 className="text-lg font-bold text-orange-400 mb-4 flex items-center">
                        <Target className="mr-2" size={18} />
                        Industry Impact
                      </h3>
                      <p className="text-gray-300 leading-relaxed">{currentAnalysis.industry_impact}</p>
                    </div>
                  </div>

                  {/* Leadership and Unique Aspects */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-yellow-900/30 to-amber-900/30 rounded-xl p-6 border border-yellow-400/20">
                      <h3 className="text-lg font-bold text-yellow-400 mb-4 flex items-center">
                        <Award className="mr-2" size={18} />
                        Leadership Qualities
                      </h3>
                      <p className="text-gray-300 leading-relaxed">{currentAnalysis.leadership_qualities}</p>
                    </div>

                    <div className="bg-gradient-to-br from-teal-900/30 to-cyan-900/30 rounded-xl p-6 border border-teal-400/20">
                      <h3 className="text-lg font-bold text-teal-400 mb-4 flex items-center">
                        <Rocket className="mr-2" size={18} />
                        Unique Aspects
                      </h3>
                      <p className="text-gray-300 leading-relaxed">{currentAnalysis.unique_aspects}</p>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface ContactInfoProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function ContactInfo({ icon, label, value }: ContactInfoProps) {
  return (
    <div className="flex items-center space-x-4 p-4 bg-gray-700/30 rounded-xl backdrop-blur-sm border border-gray-600/30 hover:border-blue-400/40 transition-all duration-300 hover:scale-105">
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <div className="text-sm text-gray-400">{label}</div>
        <div className="text-gray-300 font-medium">{value}</div>
      </div>
    </div>
  );
}

interface ExperienceItemProps {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  isLeft: boolean;
  delay: number;
}

function ExperienceItem({ title, company, location, period, description, isLeft, delay }: ExperienceItemProps) {
  return (
    <div className={`experience-item relative flex md:items-center ${isLeft ? 'md:flex-row-reverse' : 'md:flex-row'}`} style={{ animationDelay: `${delay}ms` }}>
      <div className="timeline-dot absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-gray-900 shadow-lg shadow-blue-500/50"></div>
      <div className={`ml-16 md:ml-0 md:w-1/2 ${isLeft ? 'md:pr-8 lg:pr-16' : 'md:pl-8 lg:pl-16'}`}>
        <div className="experience-card bg-gradient-to-br from-gray-800/80 to-gray-700/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-gray-600/30 hover:border-blue-400/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{title}</h3>
          <p className="text-blue-400 font-semibold mb-2 text-base sm:text-lg">{company}</p>
          <p className="text-gray-400 text-sm mb-2 flex items-center">
            <MapPin size={14} className="mr-1" />
            {location}
          </p>
          <p className="text-gray-500 text-sm mb-6 flex items-center">
            <Calendar size={14} className="mr-1" />
            {period}
          </p>
          <ul className="text-gray-300 space-y-3">
            {description.map((item, index) => (
              <li key={index} className="flex items-start group">
                <span className="text-blue-400 mr-3 mt-1 transition-transform duration-300 group-hover:scale-125">
                  <Star size={12} />
                </span>
                <span className="text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

interface EducationCardProps {
  degree: string;
  school: string;
  location: string;
  period: string;
  delay: number;
}

function EducationCard({ degree, school, location, period, delay }: EducationCardProps) {
  return (
    <div 
      className="education-card bg-gradient-to-br from-gray-700/80 to-gray-600/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-600/30 hover:border-teal-400/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/20"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center mb-6">
        <Award className="text-teal-400 mr-4 animate-pulse" size={32} />
        <h3 className="text-xl font-bold text-white">{degree}</h3>
      </div>
      <p className="text-gray-300 mb-3 font-medium">{school}</p>
      <p className="text-gray-400 mb-4 flex items-center">
        <MapPin size={16} className="mr-2" />
        {location}
      </p>
      <div className="flex items-center text-sm text-gray-500">
        <Calendar className="mr-2" size={16} />
        <span>{period}</span>
      </div>
    </div>
  );
}

interface SkillCategoryProps {
  icon: React.ReactNode;
  title: string;
  skills: string[];
  color: string;
  delay: number;
}

function SkillCategory({ icon, title, skills, color, delay }: SkillCategoryProps) {
  const colorClasses = {
    blue: 'from-blue-600/20 to-blue-400/20 border-blue-500/20 hover:border-blue-400/40',
    purple: 'from-purple-600/20 to-purple-400/20 border-purple-500/20 hover:border-purple-400/40',
    green: 'from-green-600/20 to-green-400/20 border-green-500/20 hover:border-green-400/40',
    orange: 'from-orange-600/20 to-orange-400/20 border-orange-500/20 hover:border-orange-400/40'
  };

  return (
    <div 
      className={`skill-category bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} backdrop-blur-sm p-8 rounded-2xl border transition-all duration-500 hover:scale-105 hover:shadow-2xl`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center mb-6">
        <div className="animate-pulse">{icon}</div>
        <h3 className="text-xl font-bold ml-4 text-white">{title}</h3>
      </div>
      <div className="space-y-3">
        {skills.map((skill, index) => (
          <div key={index} className="skill-item flex items-center group" style={{ animationDelay: `${delay + index * 100}ms` }}>
            <span className="text-blue-400 mr-3 transition-transform duration-300 group-hover:scale-125">
              <Zap size={14} />
            </span>
            <span className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors duration-300">{skill}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  delay: number;
}

function ProjectCard({ title, description, technologies, delay }: ProjectCardProps) {
  return (
    <div 
      className="project-card bg-gradient-to-br from-gray-700/80 to-gray-600/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-600/30 hover:border-pink-400/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/20 group"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center mb-4">
        <Rocket className="text-pink-400 mr-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" size={24} />
        <h3 className="text-xl font-bold text-white group-hover:text-pink-400 transition-colors duration-300">{title}</h3>
      </div>
      <p className="text-gray-300 mb-6 text-sm leading-relaxed">{description}</p>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-pink-600/20 text-pink-400 text-xs rounded-full border border-pink-500/30 hover:border-pink-400/50 transition-all duration-300 hover:scale-105"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  href: string;
  delay: number;
}

function ContactCard({ icon, title, value, href, delay }: ContactCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="contact-card bg-gradient-to-br from-gray-800/80 to-gray-700/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-600/30 hover:border-blue-400/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 block group"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
          {icon}
        </div>
        <h3 className="text-lg font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">{title}</h3>
        <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">{value}</p>
      </div>
    </a>
  );
}

function ProjectDetailModal({ project, onClose }: { project: any, onClose: () => void }) {
  if (!project) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="project-detail-page max-w-4xl w-full bg-gray-900 rounded-2xl shadow-2xl relative animate-fade-in overflow-hidden border border-pink-500/20">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-pink-400 transition-colors text-2xl z-10"><X size={28} /></button>
        <div className="max-h-[90vh] overflow-y-auto p-6 sm:p-8">
          <div className="project-hero p-6 rounded-xl mb-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-pink-400">{project.name}</h2>
          </div>
          <p className="text-gray-300 mb-6 text-center sm:text-lg">{project.description}</p>
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {project.technologies.map((tech: string, i: number) => (
              <span key={i} className="tech-item px-3 py-1 text-pink-400 text-xs rounded-full border border-pink-500/30">{tech}</span>
            ))}
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-white mb-4 text-center">Key Features</h3>
            <ul className="grid sm:grid-cols-2 gap-4 text-gray-300">
              {project.features?.map((f: string, i: number) => 
                <li key={i} className="feature-item flex items-start space-x-3 p-3 rounded-lg">
                  <Star size={16} className="text-pink-400 mt-1 flex-shrink-0" />
                  <span>{f}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;