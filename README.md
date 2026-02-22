<div align="center">
  <h1>⚡ CareerIQ</h1>
  <p><strong>AI-Powered Career Intelligence for the Indian Tech Ecosystem</strong></p>
</div>

<br />

## 📖 Overview

**CareerIQ** is a modern React application that uses the Google Gemini API to analyze your current skills against your dream job. It generates a comprehensive career report, including a skill gap analysis, accurate salary expectations (in INR), current job market trends in India, and a personalized, phase-by-phase learning roadmap.

---

## ✨ Features

* **🧠 Intelligent Skill Gap Analysis:** See exactly what technologies and soft skills you need to learn.
* **💰 Localized Salary Data:** Get realistic junior, mid, and senior salary ranges in LPA (Lakhs Per Annum).
* **📈 Job Market Insights:** View hiring trends, top industries, and top locations actively hiring for the role.
* **🗺️ Interactive Inbuilt Planner:** An integrated, milestone-driven personal tracker. Tell the AI how much time you have (e.g., "3 months"), and it builds a phase-by-phase study plan directly inside the app where you can check off topics and visualize your progress percentages.
* **💾 Auto-Save:** Powered by `localStorage`, your progress and active planner are automatically saved so you never lose your work.
* **🎨 Modern UI:** A beautiful, responsive design built with CSS glassmorphism, fluid animations, and a dark-mode neon aesthetic.

---

## 💻 Tech Stack

* **Framework:** React 18, Vite
* **Styling:** Vanilla CSS (Vars, Flexbox, CSS Grid)
* **Routing:** React Router v6
* **AI Engine:** Google Gemini REST API (`gemini-1.5-flash` / `gemini-2.0-flash`)

---

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

* **Node.js** (v18 or higher)
* **npm** (Node Package Manager)
* A free **Gemini API Key** from [Google AI Studio](https://aistudio.google.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone [your-repository-url]
   cd CareerIQ
   ```

2. **Install all dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a new file named `.env` in the root folder of the project.
   ```bash
   touch .env
   ```
   Open the file and add your Gemini API Key exactly like this:
   ```env
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser to see the app!

---

## ☁️ Deployment (Vercel)

If you are deploying this project to **Vercel**, you must manually add the API key to your Vercel project settings, because the `.env` file is ignored by Git.

1. Push your code to a GitHub repository.
2. Import the repository into Vercel.
3. Before clicking Deploy, open the **Environment Variables** section.
4. Add the Key: `VITE_GEMINI_API_KEY` and paste your API key as the value.
5. Click **Deploy**.

*(If you already deployed, go to Settings > Environment Variables, add the key, and then redeploy your build).*

---

## 📂 Project Structure

```text
src/
├── components/         # Reusable UI components
│   ├── Navbar.jsx
│   └── tabs/
│       ├── OverviewTab.jsx
│       ├── MarketValueTab.jsx
│       ├── JobMarketTab.jsx
│       ├── RoadmapTab.jsx
│       └── tabs.css
│
├── screens/            # Main application views
│   ├── HomeScreen.jsx
│   ├── Dashboard.jsx
│   └── PersonalPlanner.jsx
│
├── services/           # API logic
│   ├── gemini.js
│   └── demoData.js
│
├── App.jsx             # Global Context + Routing
├── index.css           # Global styles
└── main.jsx            # Entry point
```

---

## ⚠️ Troubleshooting

* **"Failed to analyze career" Error:** Make sure your `.env` file is named exactly `.env` (no extension) and the variable starts with `VITE_`.
* **Rate Limit Exceeded (Error 429):** The free tier of the Gemini API limits requests per minute. If the app stops generating plans, wait 2-3 minutes for the limit to reset and try again.
