# Amin Najafgholizadeh Portfolio

A modern, interactive portfolio built with **Vite**, **React**, and **TypeScript**. Showcasing experience, skills, and featured projects with beautiful design and engaging UI elements.

## ✨ Features
- Responsive, animated, and modern UI
- Interactive project detail modals
- AI-powered chatbot assistant
- Terminal-style command interface
- Sections for About, Experience, Education, Skills, Projects, and Contact
- Built with Tailwind CSS for rapid styling

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/)

### Installation
```bash
git clone <this-repo-url>
cd <repo-directory>
npm install
```

### Development
Start the local development server:
```bash
npm run dev
```
Visit [http://localhost:5173](http://localhost:5173) in your browser.

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

## 📦 Tech Stack
- [Vite](https://vitejs.dev/) (build tool)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)

## 👤 Author
**Amin Najafgholizadeh**  
Senior Machine Learning Engineer & Full Stack Developer  
[aminnajafgholizadeh.com](https://aminnajafgholizadeh.com)  
[LinkedIn](https://www.linkedin.com/in/amin-najafgholizadeh-6ab8ba202)

---

_This project is open source. Feel free to fork, customize, and use for your own portfolio!_ 