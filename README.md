# AI News Hub

A modern, responsive AI news aggregator powered by NewsAPI and Google Gemini.

## Features

- 📰 Real-time AI news feed (NewsAPI)
- 🤖 AI-powered article summaries (Google Gemini)
- 📊 Smart categorization and insights
- 🌓 Dark mode & theme customization
- 📱 Fully responsive design
- 🔍 Advanced search functionality

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Query & Zustand
- Framer Motion & Headless UI

## Getting Started

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Environment Setup**
   Create a `.env` file in the root directory (copy from `.env` template):

   ```env
   VITE_NEWS_API_KEY=your_newsapi_key
   VITE_GEMINI_API_KEY=your_gemini_api_key
   ```

   - Get NewsAPI key from [newsapi.org](https://newsapi.org)
   - Get Gemini API key from [makersuite.google.com](https://makersuite.google.com)

3. **Run Development Server**

   ```bash
   npm run dev
   ```

4. **Build for Production**

   ```bash
   npm run build
   ```

## Project Structure

- `src/components`: UI molecules and organisms
- `src/pages`: Route pages
- `src/services`: API integrations
- `src/hooks`: Custom React hooks
- `src/store`: State management (Zustand)
- `src/types`: TypeScript definitions
