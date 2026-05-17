# 📖 OpenShelf

**OpenShelf** is a premium, full-stack digital library management platform designed for modern readers. It allows users to curate personal collections, track reading progress, discover community favorites, and visualize their reading habits through a sleek analytics dashboard.

Built with a focus on **strict type safety** and **user experience**, OpenShelf is a portfolio-level project showcasing modern web development best practices.

## ✨ Features

- 🛡️ **Strict TypeScript Migration**: Entire codebase migrated to strict TypeScript for enterprise-grade stability and developer experience.
- 🎨 **Glass-Morphism Design**: A beautiful, responsive UI built with Tailwind CSS and custom glass-morphism effects.
- 🖼️ **Automatic Book Covers**: Integration with the Google Books API to automatically fetch real book covers and metadata during entry.
- 📊 **Analytics Dashboard**: Visualize your reading progress, genre distribution, and library statistics.
- 📈 **Reading Progress Tracking**: Track pages read vs. total pages with visual progress bars and status updates (Reading, Completed, Want to Read).
- 🌍 **Global Explore**: A public discovery area to browse books and reviews from the entire community.
- 💬 **Ratings & Reviews**: Share your thoughts and rate your favorite books.
- 🔐 **Secure JWT Auth**: Robust authentication and private data ownership logic.
- 🌓 **Dark Mode Support**: Seamless toggle between light and dark themes.

## 🚀 Tech Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Axios, React Icons, Notistack.
- **Backend**: Node.js, Express, TypeScript, MongoDB (Mongoose), JWT, Bcrypt.js.
- **APIs**: Google Books API for metadata enrichment.

## 🛠️ Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account (or local MongoDB)

### Installation

1. **Clone the repository**
2. **Setup Backend**:
   - `cd backend`
   - `npm install`
   - Create a `.env` file with:
     ```env
     PORT=5555
     MONGODB_URL=your_mongodb_uri
     JWT_SECRET=your_secret_key
     ```
   - `npm run dev`
3. **Setup Frontend**:
   - `cd frontend`
   - `npm install`
   - `npm run dev`

## 🏗️ Architecture

OpenShelf follows a clean, **3-Layer Architecture** on the backend:
1. **Routes**: Entry points for HTTP requests.
2. **Controllers**: Request handling and response mapping.
3. **Services**: All business logic and database interactions.

The frontend utilizes the **Context API** for global state management and custom **Axios interceptors** for secure, authenticated API requests.

---
*Created with ❤️ by Sarat (Redesigned & Enhanced by Gemini CLI)*
