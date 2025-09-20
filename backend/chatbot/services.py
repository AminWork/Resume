import requests
import os
from datetime import datetime

class ChatbotService:
    def __init__(self):
        self.knowledge_base = {
            'personal': {
                'name': 'Amin Najafgholizadeh',
                'title': 'Senior Machine Learning Engineer & Full Stack Developer',
                'location': 'Tehran, Iran',
                'email': 'aminnajaf1379@gmail.com',
                'phone': '+98 914 770 3397',
                'website': 'aminnajafgholizadeh.com',
                'linkedin': 'linkedin.com/in/amin-najafgholizadeh-6ab8ba202',
                'summary': 'Machine Learning Software Engineer and Full Stack Developer with over 4 years of experience in building scalable ML models, web applications, and data processing pipelines.'
            },
            'experience': [
                {
                    'title': 'Senior Machine Learning Engineer',
                    'company': 'Arian Saeed Industrial Group',
                    'location': 'Tehran, Iran',
                    'period': 'May 2024 – Present',
                    'description': 'Leading development and deployment of advanced ML solutions across business domains, collaborating with teams to optimize performance with state-of-the-art ML algorithms, and mentoring junior engineers.',
                    'logo': '/assets/company-logos/Arian Saeed Industrial Group.jpeg'
                },
                {
                    'title': 'Full Stack Software Engineer',
                    'company': 'Arad',
                    'location': 'Tehran, Iran',
                    'period': 'Jan 2023 – May 2024',
                    'description': 'Developed and deployed scalable ML algorithms using Python, Django, and React frameworks, led development teams in launching web applications with 99.9% uptime.'
                },
                {
                    'title': 'Data Scientist',
                    'company': 'Motometrix Inc',
                    'location': 'Boston, MA, USA',
                    'period': 'Jul 2022 – Jan 2023',
                    'description': 'Designed deep learning models for commodity detection and product differentiation, developed Bayesian statistical methods with 95% accuracy.'
                },
                {
                    'title': 'Machine Learning Engineer',
                    'company': 'Part AI Research Center',
                    'location': 'Tehran, Iran',
                    'period': 'Jun 2021 – Jul 2022',
                    'description': 'Developed dynamic pricing models for train tickets using ML algorithms, implemented data streaming pipelines with Kafka and PySpark.',
                    'logo': '/assets/company-logos/Part AI Research Center.webp'
                }
            ],
            'education': [
                {
                    'degree': 'MBA in Technology',
                    'school': 'Allameh Tabataba\'i University',
                    'location': 'Tehran, Iran',
                    'period': '2023 – 2025 (Expected)'
                },
                {
                    'degree': 'Bachelor\'s in Electrical and Electronics Engineering',
                    'school': 'Amirkabir University of Technology - Tehran Polytechnic',
                    'location': 'Tehran, Iran',
                    'period': '2018 – 2022'
                }
            ],
            'skills': {
                'programming': ['Python', 'JavaScript', 'Java', 'C++', 'Solidity', 'Django'],
                'ml': ['TensorFlow', 'PyTorch', 'Keras', 'Scikit-learn', 'GANs'],
                'web': ['React', 'Node.js', 'Django', 'HTML', 'CSS'],
                'data': ['SQL', 'NoSQL', 'Hadoop', 'Spark', 'Kafka'],
                'cloud': ['AWS', 'GCP', 'Docker', 'Git', 'Agile']
            },
            'projects': [
                {
                    'name': 'Intelligent Quality Control System',
                    'description': 'Developed an intelligent QC system with Python, Django, React, and TensorFlow for automating inspection processes in manufacturing environments.',
                    'technologies': ['Python', 'Django', 'React', 'TensorFlow'],
                    'features': ['Automated visual inspection', 'Real-time defect detection', 'Integration with manufacturing lines', 'Customizable reporting dashboard']
                },
                {
                    'name': 'Supermarket Automation System',
                    'description': 'Designed computer vision-based automation using OpenCV and TensorFlow for inventory management and real-time analysis.',
                    'technologies': ['OpenCV', 'TensorFlow', 'Python', 'Computer Vision'],
                    'features': ['Automated inventory tracking', 'Real-time shelf analysis', 'Computer vision for product recognition', 'Sales analytics dashboard']
                },
                {
                    'name': 'AI-Based Fire Detection Application',
                    'description': 'Created a fire detection app with Django and React, utilizing TensorFlow for AI-based detection in critical environments.',
                    'technologies': ['Django', 'React', 'TensorFlow', 'AI Detection'],
                    'features': ['AI-powered fire detection', 'Real-time alerts', 'Integration with safety systems', 'Mobile/web dashboard']
                }
            ]
        }
        
        self.api_key = os.getenv('OPENROUTER_API_KEY')

    def _get_resume_context(self):
        """Generate comprehensive resume context for the AI"""
        personal = self.knowledge_base['personal']
        
        context = f"""
PROFESSIONAL PROFILE:
Name: {personal['name']}
Title: {personal['title']}
Location: {personal['location']}
Contact: {personal['email']} | {personal['phone']}
Website: {personal['website']}
LinkedIn: {personal['linkedin']}

SUMMARY:
{personal['summary']}

WORK EXPERIENCE:
"""
        
        for i, exp in enumerate(self.knowledge_base['experience'], 1):
            context += f"""
{i}. {exp['title']} | {exp['company']} | {exp['location']} | {exp['period']}
   Description: {exp['description']}
"""
        
        context += "\nEDUCATION:\n"
        for i, edu in enumerate(self.knowledge_base['education'], 1):
            context += f"{i}. {edu['degree']} | {edu['school']} | {edu['location']} | {edu['period']}\n"
        
        context += "\nTECHNICAL SKILLS:\n"
        for category, skills in self.knowledge_base['skills'].items():
            context += f"{category.title()}: {', '.join(skills)}\n"
        
        context += "\nKEY PROJECTS:\n"
        for i, project in enumerate(self.knowledge_base['projects'], 1):
            context += f"""{i}. {project['name']}
   Description: {project['description']}
   Technologies: {', '.join(project['technologies'])}
   Features: {', '.join(project['features'])}

"""
        
        return context

    def process_message(self, message):
        """Process incoming message using OpenRouter API with resume context"""
        try:
            if not self.api_key:
                return "I'm sorry, but the chatbot is not properly configured. Please contact the administrator."
            
            resume_context = self._get_resume_context()
            
            response = requests.post(
                "https://openrouter.ai/api/v1/chat/completions",
                headers={
                    "Content-Type": "application/json",
                    "Authorization": f"Bearer {self.api_key}"
                },
                json={
                    "model": "meta-llama/llama-4-maverick:free",
                    "messages": [
                        {
                            "role": "system",
                            "content": f"""You are an AI assistant representing Amin Najafgholizadeh, a Senior Machine Learning Engineer and Full Stack Developer. 
                            
Your role is to provide helpful, accurate, and professional information about Amin based on his resume and professional background provided below.
                            
Guidelines:
- Be conversational, friendly, and professional
- Answer questions accurately based on the provided information
- If asked about something not in the resume, politely indicate you don't have that information
- Encourage users to contact Amin directly for detailed discussions about opportunities
- Keep responses concise but informative
- Use first-person perspective when appropriate ("I am currently working as...")
                            
Amin's Resume Information:
{resume_context}
                            
Please answer the user's questions based on this information."""
                        },
                        {
                            "role": "user",
                            "content": message
                        }
                    ],
                    "max_tokens": 500,
                    "temperature": 0.7
                }
            )
            
            if response.status_code == 200:
                data = response.json()
                return data['choices'][0]['message']['content']
            else:
                print(f"OpenRouter API Error: {response.status_code} - {response.text}")
                return self._fallback_response(message)
                
        except Exception as e:
            print(f"Error calling OpenRouter API: {str(e)}")
            return self._fallback_response(message)
    
    def _fallback_response(self, message):
        """Provide fallback response when API is unavailable"""
        message_lower = message.lower().strip()
        
        if any(greeting in message_lower for greeting in ['hello', 'hi', 'hey']):
            return "Hello! I'm Amin's AI assistant. I'm here to help you learn about his professional background. What would you like to know?"
        
        if any(exp_word in message_lower for exp_word in ['experience', 'work', 'job']):
            current_job = self.knowledge_base['experience'][0]
            return f"Amin is currently working as a {current_job['title']} at {current_job['company']} since {current_job['period'].split(' – ')[0]}. He has over 4 years of experience in machine learning and full-stack development."
        
        if any(skill_word in message_lower for skill_word in ['skill', 'technology', 'programming']):
            return "Amin has strong technical skills including Python, JavaScript, machine learning frameworks like TensorFlow and PyTorch, web technologies like React and Django, and cloud platforms like AWS and GCP."
        
        if any(contact_word in message_lower for contact_word in ['contact', 'email', 'phone']):
            personal = self.knowledge_base['personal']
            return f"You can reach Amin at: Email: {personal['email']} | Phone: {personal['phone']} | Website: {personal['website']} | LinkedIn: {personal['linkedin']}"
        
        return "I'd be happy to help you learn more about Amin! You can ask me about his work experience, technical skills, education, projects, or contact information. (Note: I'm currently running in fallback mode - some features may be limited)"
    
    def analyze_experience(self, experience_data):
        """Analyze a specific work experience using AI"""
        try:
            if not self.api_key:
                return self._fallback_experience_analysis(experience_data)
            
            response = requests.post(
                "https://openrouter.ai/api/v1/chat/completions",
                headers={
                    "Content-Type": "application/json",
                    "Authorization": f"Bearer {self.api_key}"
                },
                json={
                    "model": "meta-llama/llama-4-maverick:free",
                    "messages": [
                        {
                            "role": "system",
                            "content": """You are an AI career analyst providing detailed insights about work experiences. 
                            
Your task is to analyze the provided work experience and generate structured insights including:
1. Key Technical Skills demonstrated
2. Business Impact and Achievements
3. Professional Growth indicators
4. Industry-specific expertise gained
5. Leadership and collaboration aspects

Provide your analysis in a structured JSON format with the following structure:
{
  "overview": "Brief summary of the role's significance",
  "key_skills": ["skill1", "skill2", "skill3"],
  "achievements": ["achievement1", "achievement2"],
  "growth_areas": ["area1", "area2"],
  "industry_impact": "How this role contributes to industry expertise",
  "leadership_qualities": "Leadership and mentoring aspects",
  "unique_aspects": "What makes this experience unique or valuable"
}

Be specific, professional, and insightful in your analysis."""
                        },
                        {
                            "role": "user",
                            "content": f"""Please analyze this work experience:

Position: {experience_data.get('title', 'N/A')}
Company: {experience_data.get('company', 'N/A')}
Location: {experience_data.get('location', 'N/A')}
Period: {experience_data.get('period', 'N/A')}
Description: {experience_data.get('description', 'N/A')}

Provide a comprehensive analysis of this role."""
                        }
                    ],
                    "max_tokens": 800,
                    "temperature": 0.7
                }
            )
            
            if response.status_code == 200:
                data = response.json()
                analysis_text = data['choices'][0]['message']['content']
                
                # Try to parse as JSON, if not return as text
                try:
                    import json
                    # Look for JSON in the response
                    start = analysis_text.find('{')
                    end = analysis_text.rfind('}') + 1
                    if start != -1 and end != 0:
                        json_str = analysis_text[start:end]
                        return json.loads(json_str)
                    else:
                        # If no JSON found, return structured fallback
                        return self._structure_analysis_text(analysis_text)
                except:
                    return self._structure_analysis_text(analysis_text)
            else:
                print(f"OpenRouter API Error: {response.status_code} - {response.text}")
                return self._fallback_experience_analysis(experience_data)
                
        except Exception as e:
            print(f"Error analyzing experience: {str(e)}")
            return self._fallback_experience_analysis(experience_data)
    
    def _structure_analysis_text(self, text):
        """Convert plain text analysis to structured format"""
        return {
            "overview": text[:200] + "..." if len(text) > 200 else text,
            "key_skills": ["Machine Learning", "Python", "Leadership", "Team Collaboration"],
            "achievements": ["Advanced ML Solutions", "Performance Optimization", "Team Leadership"],
            "growth_areas": ["Technical Leadership", "Cross-domain Expertise", "Mentoring"],
            "industry_impact": "Significant contribution to industrial ML applications",
            "leadership_qualities": "Mentoring junior engineers and leading technical initiatives",
            "unique_aspects": "Combination of technical depth and leadership experience"
        }
    
    def _fallback_experience_analysis(self, experience_data):
        """Provide fallback analysis when API is unavailable"""
        title = experience_data.get('title', 'Position')
        company = experience_data.get('company', 'Company')
        
        return {
            "overview": f"This {title} role at {company} represents significant professional growth and technical expertise development.",
            "key_skills": ["Technical Leadership", "Problem Solving", "Project Management"],
            "achievements": ["Successfully delivered complex projects", "Improved system performance", "Mentored team members"],
            "growth_areas": ["Advanced technical skills", "Leadership capabilities", "Domain expertise"],
            "industry_impact": "Contributed to advancing technology solutions in the industry",
            "leadership_qualities": "Demonstrated leadership in technical projects and team collaboration",
            "unique_aspects": "Unique combination of technical expertise and practical implementation experience"
        }
