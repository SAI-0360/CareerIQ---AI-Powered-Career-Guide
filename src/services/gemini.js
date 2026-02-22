const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const MODELS_TO_TRY = [
  'gemini-2.5-flash',
  'gemini-2.0-flash-001',
  'gemini-2.0-flash',
  'gemini-1.5-flash',
];

async function callGeminiREST(apiKey, model, prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 8192 },
    }),
  });

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    const err = new Error(errBody?.error?.message || `HTTP ${res.status}`);
    err.status = res.status;
    throw err;
  }

  const data = await res.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

const getApiKey = () => import.meta.env.VITE_GEMINI_API_KEY || null;

export const analyzeCareer = async (skills, targetRole, onStatus) => {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error('NO_API_KEY');

  const prompt = `You are a career intelligence expert specializing in the Indian tech ecosystem. Analyze the following and return ONLY a valid JSON object with no markdown, no code fences, no extra text whatsoever.

Current Skills: ${skills}
Target Role: ${targetRole}

IMPORTANT: All analysis must be tailored to the INDIAN market.
1. Use INR (₹) as the currency.
2. List salaries in LPA (Lakhs Per Annum) — e.g., "12 - 18 LPA".
3. Use Indian tech hubs for locations.
4. Include top Indian startups and MNCs in India for companies.

DO NOT copy the placeholder text below. Generate REAL, ACCURATE data for the specific Target Role.

Return this exact JSON structure:
{
  "goalOverview": {
    "summary": "[Generate a 2-3 sentence summary of the target role in the Indian context]",
    "nature": "[Describe what daily work looks like in Indian tech companies for this role]",
    "responsibilities": ["[Responsibility 1]", "[Responsibility 2]", "[Responsibility 3]", "[Responsibility 4]", "[Responsibility 5]"]
  },
  "skillGap": {
    "currentSkills": ["${skills}"],
    "missingSkills": ["[Missing Skill 1]", "[Missing Skill 2]", "[Missing Skill 3]", "[Missing Skill 4]"],
    "readinessScore": [Integer between 0 and 100 representing readiness],
    "readinessSummary": "[One sentence explaining the readiness score relative to Indian hiring standards]"
  },
  "marketValue": {
    "juniorSalary": "[e.g. 6 - 10 LPA]",
    "midSalary": "[e.g. 15 - 25 LPA]",
    "seniorSalary": "[e.g. 35 - 60 LPA]",
    "growthPotential": "[Describe salary growth outlook in India]",
    "currency": "INR (₹)"
  },
  "jobMarket": {
    "demandLevel": "[e.g. Very High, Medium, Low]",
    "demandDescription": "[One sentence on current hiring trends in India for this role]",
    "topIndustries": ["[Industry 1]", "[Industry 2]", "[Industry 3]", "[Industry 4]"],
    "topCompanies": ["[Company 1]", "[Company 2]", "[Company 3]", "[Company 4]", "[Company 5]"],
    "topLocations": ["[City 1]", "[City 2]", "[City 3]", "[City 4]"]
  },
  "futureOutlook": {
    "trend": "[e.g. Growing, Stable, Declining]",
    "trendDescription": "[One sentence on job growth in India]",
    "aiImpact": "[How AI tools affect this specific role in India]",
    "evolution": "[How the role will evolve in India over 5-10 years]"
  },
  "roadmap": [
    {
      "phase": "Phase 1 - Foundations",
      "duration": "[e.g. 4 weeks]",
      "skills": [
        {
          "name": "[Skill Name]",
          "description": "[Why this skill matters for the role]",
          "resources": [
            { "type": "YouTube", "title": "[Tutorial title]", "url": "https://www.youtube.com/results?search_query=[topic]" },
            { "type": "Coursera", "title": "[Course name]", "url": "https://www.coursera.org/search?query=[topic]" },
            { "type": "Docs", "title": "[Official Documentation]", "url": "https://docs.example.com" },
            { "type": "Book", "title": "[Book title by Author]", "url": "https://www.amazon.in/s?k=[topic]" }
          ]
        }
      ]
    },
    {
      "phase": "Phase 2 - Core Skills",
      "duration": "6 weeks",
      "skills": []
    },
    {
      "phase": "Phase 3 - Advanced Topics",
      "duration": "4 weeks",
      "skills": []
    }
  ]
}

Provide 3-4 realistic skills per phase with specific resources. readinessScore must be an integer 0-100. Return ONLY the JSON object.`;

  // Try each model in order until one works
  for (let i = 0; i < MODELS_TO_TRY.length; i++) {
    const model = MODELS_TO_TRY[i];
    if (onStatus) onStatus(`Trying ${model}...`);

    try {
      const text = await callGeminiREST(apiKey, model, prompt);
      const cleaned = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
      const parsed = JSON.parse(cleaned);
      console.log(`✅ Success with model: ${model}`);
      return parsed;
    } catch (err) {
      console.warn(`❌ ${model} failed:`, err.status, err.message?.slice(0, 100));

      const isKeyError = err.status === 400 && err.message?.includes('API key');
      if (isKeyError) throw new Error('INVALID_API_KEY');

      const isRateLimit = err.status === 429;
      if (isRateLimit && i < MODELS_TO_TRY.length - 1) {
        // Rate limited on this model — try next model immediately
        if (onStatus) onStatus(`Rate limit on ${model}, trying next model...`);
        continue;
      }

      if (isRateLimit) throw new Error('RATE_LIMITED');

      // For other errors (404, 500 etc), try next model
      if (i < MODELS_TO_TRY.length - 1) continue;
      throw err;
    }
  }

  throw new Error('All models failed');
};

export const generateCustomRoadmap = async (skills, targetRole, timeline, onStatus) => {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error('NO_API_KEY');

  const prompt = `You are an expert technical career coach. I need a custom learning roadmap for a candidate based in India.

Current Skills: ${skills}
Target Role: ${targetRole}
Available Time to Learn: ${timeline}

IMPORTANT INSTRUCTIONS:
Create a highly structured, realistic learning plan that fits exactly within the "${timeline}" duration.
If the time is short (e.g., 2 weeks), focus intensely on core interview prep and the most critical missing skills.
If the time is long (e.g., 6 months), build a comprehensive path starting from foundations to advanced topics and large projects.

Return ONLY a JSON array of phase objects. Do NOT wrap in any other object, markdown, or text.
Use this EXACT JSON structure:
[
  {
    "phase": "[Phase Title - e.g. Phase 1: Core Fundamentals]",
    "duration": "[Specific duration for this phase, e.g. 2 weeks]",
    "skills": [
      {
        "name": "[Topic/Skill Name]",
        "description": "[Why it is important]",
        "resources": [
          { "type": "YouTube", "title": "[Title]", "url": "https://www.youtube.com/results?search_query=[topic]" },
          { "type": "Docs", "title": "[Docs]", "url": "https://docs.example.com" }
        ]
      }
    ]
  }
]
Provide realistic sub-skills for each phase. Return ONLY the JSON array.`;

  for (let i = 0; i < MODELS_TO_TRY.length; i++) {
    const model = MODELS_TO_TRY[i];
    if (onStatus) onStatus(`Generating custom plan with ${model}...`);

    try {
      const text = await callGeminiREST(apiKey, model, prompt);
      const cleaned = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
      const parsed = JSON.parse(cleaned);
      if (!Array.isArray(parsed)) throw new Error('Response is not an array');
      console.log(`✅ Success generating custom roadmap with model: ${model}`);
      return parsed; // returns the array of phases
    } catch (err) {
      console.warn(`❌ custom roadmap ${model} failed:`, err.status, err.message?.slice(0, 100));

      const isKeyError = err.status === 400 && err.message?.includes('API key');
      if (isKeyError) throw new Error('INVALID_API_KEY');

      const isRateLimit = err.status === 429;
      if (isRateLimit && i < MODELS_TO_TRY.length - 1) {
        if (onStatus) onStatus(`Rate limit on ${model}, trying next...`);
        continue;
      }
      if (isRateLimit) throw new Error('RATE_LIMITED');
      if (i < MODELS_TO_TRY.length - 1) continue;
      throw err;
    }
  }
  throw new Error('All models failed');
};
