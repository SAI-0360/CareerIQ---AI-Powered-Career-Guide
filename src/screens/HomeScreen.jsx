import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../App';
import { analyzeCareer } from '../services/gemini';
import { DEMO_DATA } from '../services/demoData';
import './HomeScreen.css';

const exampleRoles = [
    'Software Engineer',
    'Product Manager',
    'Data Scientist',
    'UI/UX Designer',
    'Marketing Manager'
];

export default function HomeScreen() {
    const { setUserData, setAnalysisData } = useApp();
    const navigate = useNavigate();

    const [skills, setSkills] = useState('');
    const [targetRole, setTargetRole] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingStatus, setLoadingStatus] = useState('');
    const [error, setError] = useState('');
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!skills.trim() || !targetRole.trim()) {
            setError('Please fill in both fields.');
            return;
        }
        setError('');
        setLoading(true);
        setLoadingStatus('Analyzing your career...');

        try {
            const data = await analyzeCareer(skills.trim(), targetRole.trim(), setLoadingStatus);
            setUserData({ skills: skills.trim(), targetRole: targetRole.trim() });
            setAnalysisData(data);
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            if (err.message === 'INVALID_API_KEY') {
                setError('API Key is invalid or expired. Check your .env file.');
            } else if (err.message === 'RATE_LIMITED') {
                setError('Rate limit exceeded. Please try again in a minute.');
            } else {
                setError('Failed to analyze career. Check API connection.');
            }
        } finally {
            setLoading(false);
            setLoadingStatus('');
        }
    };

    const handleDemo = () => {
        setUserData({ skills: 'JavaScript, React, Node.js, HTML/CSS, Git', targetRole: 'Full Stack Engineer' });
        setAnalysisData(DEMO_DATA);
        navigate('/dashboard');
    };

    return (
        <div className="home-screen">
            <nav className="home-nav">
                <div className="container">
                    <div className="nav-brand">
                        <span className="brand-icon">⚡</span>
                        <span className="gradient-text">CareerIQ</span>
                    </div>
                </div>
            </nav>

            <main className="home-main">
                <div className="container">
                    <div className="home-hero animate-fade-up">
                        <div className="hero-badge badge badge-purple" style={{ marginBottom: 24 }}>
                            AI-Powered Career Intelligence
                        </div>
                        <h1 className="hero-title">
                            Know Exactly What It Takes to{' '}
                            <span className="gradient-text">Land Your Dream Role</span>
                        </h1>
                        <p className="hero-subtitle">
                            Enter your current skills and target role. Our AI generates a complete career intelligence
                            report — skill gaps, salaries, job market insights, and a personalized learning roadmap.
                        </p>
                    </div>

                    {!showForm ? (
                        <div className="landing-actions animate-fade-up" style={{ animationDelay: '0.1s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginTop: '2rem' }}>
                            <button
                                type="button"
                                className="btn btn-primary shine-effect"
                                style={{ padding: '1rem 3rem', fontSize: '1.25rem', borderRadius: '100px' }}
                                onClick={() => setShowForm(true)}
                                id="get-started-btn"
                            >
                                🚀 Get Started
                            </button>

                            <div className="demo-divider" style={{ margin: '1rem 0' }}>
                                <span>or</span>
                            </div>

                            <button
                                type="button"
                                className="btn btn-secondary demo-btn"
                                onClick={handleDemo}
                                id="demo-btn"
                            >
                                <span>🎭</span>
                                Try Demo — Full Stack Engineer
                            </button>
                        </div>
                    ) : (
                        <div className="home-form-wrapper animate-fade-up" style={{ animationDelay: '0.1s' }}>
                            <button
                                type="button"
                                className="btn btn-ghost btn-sm"
                                style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                                onClick={() => setShowForm(false)}
                            >
                                <span>←</span> Back
                            </button>
                            <form className="home-form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="current-skills">
                                        <span className="label-icon">🧠</span>
                                        Your Current Skills
                                    </label>
                                    <textarea
                                        id="current-skills"
                                        className="form-textarea"
                                        placeholder="e.g. JavaScript, React, Node.js, SQL, Git..."
                                        value={skills}
                                        onChange={(e) => setSkills(e.target.value)}
                                        rows={3}
                                        disabled={loading}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="target-role">
                                        <span className="label-icon">🎯</span>
                                        Your Target Role
                                    </label>
                                    <input
                                        id="target-role"
                                        className="form-input"
                                        type="text"
                                        placeholder="e.g. Full Stack Engineer, ML Engineer..."
                                        value={targetRole}
                                        onChange={(e) => setTargetRole(e.target.value)}
                                        disabled={loading}
                                    />
                                    <div className="role-suggestions">
                                        {exampleRoles.map((role) => (
                                            <button
                                                key={role}
                                                type="button"
                                                className="suggestion-chip"
                                                onClick={() => setTargetRole(role)}
                                                disabled={loading}
                                            >
                                                {role}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {error && (
                                    <div className="form-error">
                                        <span>⚠️</span> {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="btn btn-primary submit-btn"
                                    disabled={loading}
                                    id="analyze-btn"
                                >
                                    {loading ? (
                                        <>
                                            <div className="spinner" />
                                            {loadingStatus}
                                        </>
                                    ) : (
                                        <>
                                            <span>⚡</span>
                                            Analyze My Career
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    )}

                    <div className="home-features animate-fade-up" style={{ animationDelay: '0.2s' }}>
                        {[
                            { icon: '📊', title: 'Skill Gap Analysis', desc: 'See exactly what skills you need to bridge the gap' },
                            { icon: '💰', title: 'Salary Intelligence', desc: 'Real salary data across experience levels' },
                            { icon: '🗺️', title: 'Learning Roadmap', desc: 'Phase-by-phase plan with curated resources' },
                            { icon: '✅', title: 'Progress Tracker', desc: 'Check off milestones and track your journey' },
                        ].map((f) => (
                            <div key={f.title} className="feature-card card">
                                <div className="feature-icon">{f.icon}</div>
                                <h3 className="feature-title">{f.title}</h3>
                                <p className="feature-desc">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
