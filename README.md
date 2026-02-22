# ⚡ CareerIQ

**CareerIQ** is an AI-powered career intelligence dashboard tailored for the tech market. 
Built with React, Vite, and powered by the Google Gemini API, this tool analyzes your current skills and target role to generate highly customized, actionable insights.

It gives you exact salary figures in INR, localized job market demand in top tech hubs, and creates a dynamically generated, phase-by-phase learning roadmap that respects exactly how much time you have to learn.

---

## 🚀 Features

- **🧠 Skill Gap Analysis:** Identifies exactly what skills you are missing between your current stack and your dream role.
- **💰 Salary Intelligence:** Provides junior, mid, and senior level salary expectations (Lakhs Per Annum).
- **🗺️ Interactive Personal Planner:** Enter a timeframe (e.g., "6 weeks" or "3 months") and the AI will generate a tailored learning path. Track your progress with animated completion percentages.
- **💾 Local Storage Persistence:** Automatically saves your state, planner progress, and career analysis so you never lose your data on refresh.
- **🎭 Demo Mode:** Try the app instantly without an API key using the integrated Full Stack Engineer demo.
- **✨ Premium UI:** Built with sleek "glassmorphism" design, subtle neon gradients, and smooth CSS animations for a beautiful user experience. 

---

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite
- **Styling:** Vanilla CSS, CSS Variables, Glassmorphism
- **Routing:** React Router DOM (v6)
- **AI Integration:** Google Gemini REST API (gemini-1.5-flash / gemini-2.0-flash)
- **State Management:** React Context API + Local Storage

---

## 📦 Installation & Setup

### 1. Clone the repository
\`\`\`bash
git clone [your-repo-url]
cd [your-project-directory]
\`\`\`

### 2. Install dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Configure the Environment
Create a `.env` file in the root of your project:
\`\`\`bash
touch .env
\`\`\`

Inside the `.env` file, paste your Gemini API Key:
\`\`\`env
VITE_GEMINI_API_KEY=your_api_key_here
\`\`\`
*(Grab a free API key from [Google AI Studio](https://aistudio.google.com/).)*

### 4. Start the application!
\`\`\`bash
npm run dev
\`\`\`

The app will start at \`http://localhost:5173\`.

---

## 🗂️ Project Structure

\`\`\`text
src/
├── components/          # Reusable UI components (Navbar, OverviewTab, MarketValueTab, etc.)
├── screens/             # Main application views
│   ├── HomeScreen.jsx   # Landing page & initial input form
│   ├── Dashboard.jsx    # Tabbed interface showing the AI analysis
│   └── PersonalPlanner.jsx # Interactive roadmap tracking
├── services/            # API integration and logic
│   ├── gemini.js        # Core Google Gemini REST API fetches
│   └── demoData.js      # Mocked JSON data for the Demo Mode
├── App.jsx              # Global Context Provider & Routing
├── index.css            # Global design tokens and base styles
└── main.jsx             # React DOM entry point
\`\`\`

---

## 📝 Usage Notes & Troubleshooting

- **Rate Limiting:** The free tier of the Gemini API has rate limits (Error 429 `RESOURCE_EXHAUSTED`). If the app fails to generate a plan, wait 2-3 minutes and try again.
- **Empty State on Planner:** The Personal Planner requires you to actively type a timeframe (e.g., "2 weeks") and hit Generate to build a custom roadmap via the AI.
- **Data Deletion:** If you wish to clear your saved progress, click the "Change Goal" button in the Dashboard. This safely wipes Local Storage and redirects you to the start.

---

*Designed and Built for the Indian Tech Ecosystem.*
