import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Mail, Phone, Globe, Linkedin, MapPin, Calendar, Code, Database, Cloud, Brain, Award, ExternalLink, Menu, X, Star, Zap, Rocket, Target, Terminal, Minimize2, Maximize2, RotateCcw, MessageCircle, Send, Bot, User } from 'lucide-react';

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
  
  const heroRef = useRef<HTMLDivElement>(null);
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
        description: "Leading development and deployment of advanced ML solutions across business domains, collaborating with teams to optimize performance with state-of-the-art ML algorithms, and mentoring junior engineers."
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
        description: "Developed dynamic pricing models for train tickets using ML algorithms, implemented data streaming pipelines with Kafka and PySpark."
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
        technologies: ["Python", "Django", "React", "TensorFlow"]
      },
      {
        name: "Supermarket Automation System",
        description: "Designed computer vision-based automation using OpenCV and TensorFlow for inventory management and real-time analysis.",
        technologies: ["OpenCV", "TensorFlow", "Python", "Computer Vision"]
      },
      {
        name: "AI-Based Fire Detection Application",
        description: "Created a fire detection app with Django and React, utilizing TensorFlow for AI-based detection in critical environments.",
        technologies: ["Django", "React", "TensorFlow", "AI Detection"]
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
  }, [terminalOpen]);

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

  // OpenRouter API configuration
  const apiKeys = [
    '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',
    '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',
    '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',
    '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',
    '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',
    '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',
    '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',
    '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',
    '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',
    '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'
  ];

  // Track current API key index and failed keys
  const [currentKeyIndex, setCurrentKeyIndex] = useState(0);
  const [failedKeys, setFailedKeys] = useState<Set<number>>(new Set());

  const callOpenRouterAPI = async (message: string): Promise<string> => {
    // Find next available API key
    let keyIndex = currentKeyIndex;
    let attempts = 0;
    const maxAttempts = apiKeys.length;

    while (attempts < maxAttempts) {
      // Skip failed keys
      if (failedKeys.has(keyIndex)) {
        keyIndex = (keyIndex + 1) % apiKeys.length;
        attempts++;
        continue;
      }

      const apiKey = apiKeys[keyIndex];
      
      try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': window.location.origin,
            'X-Title': 'Amin Najafgholizadeh Portfolio'
          },
          body: JSON.stringify({
            model: 'anthropic/claude-3.5-sonnet',
            messages: [
              {
                role: 'system',
                content: `You are a professional assistant representing Amin Najafgholizadeh. Answer questions about him based on this CV information: ${cvSummary}. Be conversational, helpful, and accurate. Keep responses concise but informative.`
              },
              {
                role: 'user',
                content: message
              }
            ],
            max_tokens: 500,
            temperature: 0.7
          })
        });

        if (response.status === 402) {
          // Payment required - mark this key as failed and try next
          console.log(`API key ${keyIndex + 1} failed with 402 Payment Required. Trying next key...`);
          setFailedKeys(prev => new Set([...prev, keyIndex]));
          keyIndex = (keyIndex + 1) % apiKeys.length;
          attempts++;
          continue;
        }

        if (!response.ok) {
          throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();
        
        // Success! Update current key index for next time
        setCurrentKeyIndex(keyIndex);
        
        return data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
        
      } catch (error) {
        console.error(`Error with API key ${keyIndex + 1}:`, error);
        
        // If it's a 402 error, mark key as failed
        if (error instanceof Error && error.message.includes('402')) {
          setFailedKeys(prev => new Set([...prev, keyIndex]));
        }
        
        keyIndex = (keyIndex + 1) % apiKeys.length;
        attempts++;
      }
    }

    // All keys failed
    throw new Error('All API keys have been exhausted or failed. Please check your OpenRouter account.');
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
      return await callOpenRouterAPI(message);
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
      // Get AI response from OpenRouter
      const response = await callOpenRouterAPI(userMessage);
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
      {/* Animated Background */}
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
      <section id="hero" ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="hero-gradient"></div>
          <div className="geometric-shapes"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
          <div className={`transition-all duration-1000 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
            <h1 className="hero-title text-6xl md:text-8xl font-bold mb-6">
              <span className="inline-block animate-text-shimmer bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 bg-clip-text text-transparent bg-300% animate-gradient">
                Amin Najafgholizadeh
              </span>
            </h1>
          </div>
          
          <div className={`transition-all duration-1000 delay-300 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-2xl md:text-4xl text-gray-300 mb-8 font-light">
              <span className="typing-animation">Senior Machine Learning Engineer & Full Stack Developer</span>
            </h2>
          </div>
          
          <div className={`transition-all duration-1000 delay-500 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
            <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              Building the future with AI and cutting-edge technology. 4+ years of experience in machine learning, 
              full-stack development, and data science.
            </p>
          </div>
          
          <div className={`flex flex-col sm:flex-row gap-6 justify-center transition-all duration-1000 delay-700 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
            <button
              onClick={() => scrollToSection('contact')}
              className="cta-button group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
            >
              <span className="flex items-center justify-center space-x-2">
                <Mail className="transition-transform duration-300 group-hover:rotate-12" size={20} />
                <span>Get In Touch</span>
              </span>
            </button>
            <button
              onClick={() => scrollToSection('experience')}
              className="cta-button-outline group border-2 border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25"
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
          <h2 className="section-title text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl font-semibold mb-6 text-white animate-slide-in-left">
                Professional Summary
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6 animate-fade-in text-lg">
                Machine Learning Software Engineer and Full Stack Developer with over 4 years of experience in building 
                scalable ML models, web applications, and data processing pipelines. Proficient in deep learning, 
                image processing, and SQL databases.
              </p>
              <p className="text-gray-300 leading-relaxed mb-8 animate-fade-in text-lg">
                Experienced in Python, TensorFlow, PyTorch, Django, and React. Passionate about interdisciplinary 
                collaboration in ecological research and data science.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
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

      {/* Experience Section */}
      <section id="experience" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Professional Experience
            </span>
          </h2>
          
          <div className="relative">
            <div className="timeline-line absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-teal-500 rounded-full"></div>
            
            <div className="space-y-16">
              <ExperienceItem
                title="Senior Machine Learning Engineer"
                company="Arian Saeed Industrial Group"
                location="Tehran, Iran"
                period="May 2024 – Present"
                description={[
                  "Lead the development and deployment of advanced ML solutions across business domains.",
                  "Collaborate with cross-functional teams to optimize performance with state-of-the-art ML algorithms.",
                  "Mentor junior engineers on best practices for production-grade ML models and scalable architectures.",
                  "Design and implement end-to-end ML pipelines for real-time data processing and inference."
                ]}
                isLeft={false}
                delay={0}
              />
              
              <ExperienceItem
                title="Full Stack Software Engineer"
                company="Arad"
                location="Tehran, Iran"
                period="Jan 2023 – May 2024"
                description={[
                  "Developed and deployed scalable ML algorithms using Python, Django, and React frameworks.",
                  "Led development teams in successfully launching multiple web applications with 99.9% uptime.",
                  "Built and maintained responsive web interfaces ensuring seamless user experience across devices.",
                  "Implemented CI/CD pipelines and automated testing frameworks to improve deployment efficiency."
                ]}
                isLeft={true}
                delay={200}
              />
              
              <ExperienceItem
                title="Data Scientist"
                company="Motometrix Inc"
                location="Boston, MA, USA"
                period="Jul 2022 – Jan 2023"
                description={[
                  "Designed and implemented deep learning models for commodity detection and product differentiation.",
                  "Developed advanced Bayesian statistical methods to distinguish visually similar items with 95% accuracy.",
                  "Built real-time dashboards and monitoring systems to evaluate model performance and data quality.",
                  "Collaborated with product teams to integrate ML solutions into existing business workflows."
                ]}
                isLeft={false}
                delay={400}
              />
              
              <ExperienceItem
                title="Machine Learning Engineer"
                company="Part AI Research Center"
                location="Tehran, Iran"
                period="Jun 2021 – Jul 2022"
                description={[
                  "Developed dynamic pricing models for train tickets using advanced machine learning algorithms.",
                  "Implemented robust data streaming and processing pipelines with Apache Kafka and PySpark.",
                  "Deployed scalable AI services using Docker containers and Kubernetes orchestration.",
                  "Optimized model performance resulting in 30% improvement in prediction accuracy."
                ]}
                isLeft={true}
                delay={600}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
              Education
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <EducationCard
              degree="MBA in Technology"
              school="Allameh Tabataba'i University"
              location="Tehran, Iran"
              period="2023 – 2025 (Expected)"
              delay={0}
            />
            <EducationCard
              degree="Bachelor's in Electrical and Electronics Engineering"
              school="Amirkabir University of Technology - Tehran Polytechnic"
              location="Tehran, Iran"
              period="2018 – 2022"
              delay={200}
            />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Technical Skills
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <SkillCategory
              icon={<Code className="text-blue-400" size={32} />}
              title="Programming Languages"
              skills={["Python", "Java", "C++", "JavaScript", "Solidity", "Django"]}
              color="blue"
              delay={0}
            />
            <SkillCategory
              icon={<Brain className="text-purple-400" size={32} />}
              title="Machine Learning"
              skills={["TensorFlow", "PyTorch", "Keras", "Scikit-learn", "GANs"]}
              color="purple"
              delay={200}
            />
            <SkillCategory
              icon={<Database className="text-green-400" size={32} />}
              title="Data & Big Data"
              skills={["SQL", "NoSQL", "Hadoop", "Spark", "Kafka"]}
              color="green"
              delay={400}
            />
            <SkillCategory
              icon={<Cloud className="text-orange-400" size={32} />}
              title="Cloud & DevOps"
              skills={["AWS", "GCP", "Docker", "Git", "Agile"]}
              color="orange"
              delay={600}
            />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProjectCard
              title="Intelligent Quality Control System"
              description="Developed an intelligent QC system with Python, Django, React, and TensorFlow for automating inspection processes in manufacturing environments."
              technologies={["Python", "Django", "React", "TensorFlow"]}
              delay={0}
            />
            <ProjectCard
              title="Supermarket Automation System"
              description="Designed computer vision-based automation using OpenCV and TensorFlow for inventory management and real-time analysis."
              technologies={["OpenCV", "TensorFlow", "Python", "Computer Vision"]}
              delay={200}
            />
            <ProjectCard
              title="AI-Based Fire Detection Application"
              description="Created a fire detection app with Django and React, utilizing TensorFlow for AI-based detection in critical environments."
              technologies={["Django", "React", "TensorFlow", "AI Detection"]}
              delay={400}
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          
          <div className="text-center mb-12">
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-in">
              I'm always open to discussing new opportunities, innovative projects, or just connecting with fellow tech enthusiasts.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
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
    <div className={`experience-item relative flex items-center ${isLeft ? 'md:flex-row-reverse' : ''}`} style={{ animationDelay: `${delay}ms` }}>
      <div className="timeline-dot absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-gray-900 shadow-lg shadow-blue-500/50"></div>
      <div className={`ml-16 md:ml-0 md:w-1/2 ${isLeft ? 'md:pr-16' : 'md:pl-16'}`}>
        <div className="experience-card bg-gradient-to-br from-gray-800/80 to-gray-700/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-600/30 hover:border-blue-400/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
          <h3 className="text-2xl font-bold text-white mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{title}</h3>
          <p className="text-blue-400 font-semibold mb-2 text-lg">{company}</p>
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

export default App;