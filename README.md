# Amin Najafgholizadeh Portfolio

A modern, interactive portfolio built with **Vite**, **React**, **TypeScript**, and **Django**. Showcasing experience, skills, and featured projects with beautiful design and engaging UI elements, powered by an intelligent Django backend.

## ✨ Features
- Responsive, animated, and modern UI
- Interactive project detail modals
- **AI-powered chatbot assistant with Django backend**
- **Company logos in experience section**
- Terminal-style command interface
- **Session-based chat history**
- Sections for About, Experience, Education, Skills, Projects, and Contact
- Built with Tailwind CSS for rapid styling
- **RESTful API for chatbot functionality**

## 🏗️ Architecture

This project consists of two main components:
- **Frontend**: React/TypeScript application with Vite
- **Backend**: Django REST API for chatbot functionality

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/)
- [Python](https://python.org/) (v3.8 or newer recommended)
- [pip](https://pip.pypa.io/)

### Frontend Setup
```bash
git clone <this-repo-url>
cd <repo-directory>
npm install
```

### Backend Setup
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
```

### Development
Start both servers for full functionality:

**Backend (Django API):**
```bash
cd backend
source venv/bin/activate
python manage.py runserver 8000
```

**Frontend (React):**
```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.
The Django API will be available at [http://127.0.0.1:8000](http://127.0.0.1:8000).

### Build for Production
```bash
npm run build
```
The production-ready files will be in the `dist` folder.

## 🌐 Deploying to cPanel
1. **Build the project:**
   ```bash
   npm run build
   ```
2. **Upload to cPanel:**
   - Download the contents of the `dist` folder (including the `assets` directory).
   - Upload all files and folders inside `dist` to your cPanel's `public_html` directory (or the appropriate web root).
   - Your structure should look like:
     ```
     public_html/
       index.html
       assets/
         index-*.js
         index-*.css
     ```
3. **Access your site:**
   - Open your domain in a browser to view your portfolio.

> **Note:** For client-side routing, ensure your cPanel server is configured to serve `index.html` for all routes (if you add routing in the future).

## 🛠️ Customization
- Edit `src/App.tsx` to update content, sections, or add new features.
- Styles are managed with Tailwind CSS in `src/index.css` and `tailwind.config.js`.

## 🔗 API Endpoints

### POST /api/chat/
Send a message to the chatbot and get an intelligent response.

**Request:**
```json
{
    "message": "Tell me about Amin's experience",
    "session_id": "optional-session-id"
}
```

**Response:**
```json
{
    "response": "Amin is currently working as a Senior Machine Learning Engineer...",
    "timestamp": "2025-09-20T01:21:10Z",
    "session_id": "generated-session-id"
}
```

### GET /api/history/
Retrieve chat history for a session.

## 📦 Tech Stack

### Frontend
- [Vite](https://vitejs.dev/) (build tool)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [Swiper](https://swiperjs.com/) (for experience carousel)

### Backend
- [Django](https://djangoproject.com/) (web framework)
- [Django REST Framework](https://www.django-rest-framework.org/) (API)
- [django-cors-headers](https://github.com/adamchainz/django-cors-headers) (CORS support)
- [SQLite](https://sqlite.org/) (database - development)
- [Python](https://python.org/) (programming language)

## 👤 Author
**Amin Najafgholizadeh**  
Senior Machine Learning Engineer & Full Stack Developer  
[aminnajafgholizadeh.com](https://aminnajafgholizadeh.com)  
[LinkedIn](https://www.linkedin.com/in/amin-najafgholizadeh-6ab8ba202)

---

_This project is open source. Feel free to fork, customize, and use for your own portfolio!_ 