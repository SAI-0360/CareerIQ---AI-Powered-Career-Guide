import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../App';
import { generateCustomRoadmap } from '../services/gemini';
import './PersonalPlanner.css';

function parseTimeline(input) {
    const lower = input.toLowerCase().trim();
    const monthMatch = lower.match(/(\d+)\s*month/);
    const weekMatch = lower.match(/(\d+)\s*week/);
    if (monthMatch) return parseInt(monthMatch[1]) * 4;
    if (weekMatch) return parseInt(weekMatch[1]);
    const numMatch = lower.match(/\d+/);
    if (numMatch) return parseInt(numMatch[0]) * 4;
    return 12;
}

export default function PersonalPlanner() {
    const { userData } = useApp();
    const navigate = useNavigate();

    const STORAGE_KEY = `career_planner_${userData.targetRole?.replace(/\s+/g, '_').toLowerCase()}`;
    const TIMELINE_KEY = `${STORAGE_KEY}_timeline`;
    const CONFIRM_KEY = `${STORAGE_KEY}_confirmed`;
    const ROADMAP_KEY = `${STORAGE_KEY}_custom_roadmap`;

    const [timeline, setTimeline] = useState(() => {
        try {
            const saved = localStorage.getItem(TIMELINE_KEY);
            return (saved && saved !== '3 months') ? saved : '';
        } catch { return ''; }
    });

    const [timelineConfirmed, setTimelineConfirmed] = useState(() => {
        try { return localStorage.getItem(CONFIRM_KEY) === 'true'; } catch { return false; }
    });

    const [checked, setChecked] = useState(() => {
        try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; }
    });

    const [customRoadmap, setCustomRoadmap] = useState(() => {
        try { return JSON.parse(localStorage.getItem(ROADMAP_KEY)) || null; } catch { return null; }
    });

    const [loading, setLoading] = useState(false);
    const [loadingStatus, setLoadingStatus] = useState('');
    const [error, setError] = useState('');

    const totalWeeks = useMemo(() => parseTimeline(timeline), [timeline]);

    const phases = useMemo(() => {
        if (!timelineConfirmed || !customRoadmap?.length) return [];
        return customRoadmap.map((phase, i) => {
            const subtopics = phase.skills?.map((skill) => ({
                id: `${i}-${skill.name}`,
                label: skill.name,
                description: skill.description || '',
            })) || [];
            return {
                id: i,
                title: phase.phase,
                weeks: phase.duration,
                subtopics,
            };
        });
    }, [timelineConfirmed, customRoadmap]);

    // Save state changes
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
    }, [checked, STORAGE_KEY]);

    // Save timeline only when confirmed
    useEffect(() => {
        if (timelineConfirmed) {
            localStorage.setItem(TIMELINE_KEY, timeline);
            localStorage.setItem(CONFIRM_KEY, 'true');
        } else {
            localStorage.setItem(CONFIRM_KEY, 'false');
        }
    }, [timelineConfirmed, timeline, TIMELINE_KEY, CONFIRM_KEY]);

    useEffect(() => {
        if (customRoadmap) {
            localStorage.setItem(ROADMAP_KEY, JSON.stringify(customRoadmap));
        }
    }, [customRoadmap, ROADMAP_KEY]);

    const allItems = phases.flatMap((p) => p.subtopics.map((s) => s.id));
    const completedCount = allItems.filter((id) => checked[id]).length;
    const progress = allItems.length > 0 ? Math.round((completedCount / allItems.length) * 100) : 0;

    const toggleItem = (id) => {
        setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const handleTimelineConfirm = async () => {
        if (!timeline.trim()) return;

        // Skip fetch if we already have the cached roadmap for exactly this timeline text
        const cachedTimeline = localStorage.getItem(TIMELINE_KEY);
        if (customRoadmap && cachedTimeline === timeline.trim()) {
            setTimelineConfirmed(true);
            return;
        }

        setError('');
        setLoading(true);
        try {
            const roadmap = await generateCustomRoadmap(userData.skills, userData.targetRole, timeline.trim(), setLoadingStatus);
            setCustomRoadmap(roadmap);
            setChecked({}); // Clear checklist on new timeline
            setTimelineConfirmed(true);
        } catch (err) {
            console.error(err);
            setError('Failed to generate customized roadmap. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="planner-screen">
            {/* NAV */}
            <nav className="planner-nav">
                <div className="container">
                    <div className="planner-nav-inner">
                        <div className="nav-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                            <span className="brand-icon">⚡</span>
                            <span className="gradient-text">CareerIQ</span>
                        </div>
                        <div className="planner-nav-right">
                            <button className="btn btn-ghost btn-sm" onClick={() => navigate('/dashboard')} id="back-to-dashboard-btn">
                                ← Dashboard
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="planner-main">
                <div className="container">
                    {/* HEADER */}
                    <div className="planner-header animate-fade-up">
                        <div className="section-label">Personal Planner</div>
                        <h1 className="planner-title">
                            Your{' '}
                            <span className="gradient-text">{userData.targetRole}</span>
                            {' '}Journey
                        </h1>
                        <p className="planner-subtitle">
                            Set your timeline and track your progress through each learning phase.
                            Your progress is saved automatically.
                        </p>
                    </div>

                    {/* TIMELINE INPUT */}
                    {!timelineConfirmed ? (
                        <div className="timeline-setup card animate-fade-up" style={{ animationDelay: '0.1s' }}>
                            <div className="timeline-icon">⏱️</div>
                            <h2 className="timeline-heading">How long do you have?</h2>
                            <p className="timeline-desc">Enter your desired study timeline and we'll generate a custom roadmap.</p>
                            <div className="timeline-input-row">
                                <input
                                    id="timeline-input"
                                    type="text"
                                    className="form-input-plain"
                                    placeholder="e.g. 3 months, 6 weeks, 2 months..."
                                    value={timeline}
                                    onChange={(e) => setTimeline(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleTimelineConfirm()}
                                    disabled={loading}
                                />
                                <button className="btn btn-primary" onClick={handleTimelineConfirm} disabled={loading} id="confirm-timeline-btn">
                                    {loading ? 'Generating...' : 'Generate Plan'}
                                </button>
                            </div>

                            {error && <div className="error-message" style={{ marginTop: '1rem', textAlign: 'center' }}>{error}</div>}
                            {loading && <div className="loading-status" style={{ marginTop: '1rem', textAlign: 'center', color: 'var(--text-secondary)' }}>{loadingStatus}</div>}

                            {!loading && (
                                <div className="timeline-examples">
                                    {['1 month', '3 months', '6 months', '12 months'].map((t) => (
                                        <button
                                            key={t}
                                            className="suggestion-chip"
                                            onClick={() => setTimeline(t)}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="planner-active animate-fade-up">
                            {/* PROGRESS SUMMARY */}
                            <div className="progress-summary card">
                                <div className="progress-summary-top">
                                    <div>
                                        <div className="section-label">Overall Progress</div>
                                        <div className="progress-stats">
                                            <span className="stat-completed gradient-text">{completedCount}</span>
                                            <span className="stat-sep">/</span>
                                            <span className="stat-total">{allItems.length}</span>
                                            <span className="stat-label">topics completed</span>
                                        </div>
                                    </div>
                                    <div className="progress-percentage gradient-text">
                                        {progress}%
                                    </div>
                                </div>
                                <div className="progress-track">
                                    <div className="progress-fill" style={{ width: `${progress}%` }} />
                                </div>
                                <div className="progress-meta">
                                    <button
                                        className="btn btn-ghost btn-sm"
                                        onClick={() => setTimelineConfirmed(false)}
                                    >
                                        Change Timeline
                                    </button>
                                </div>
                            </div>

                            {/* PHASES */}
                            <div className="phases-list">
                                {phases.map((phase, pi) => {
                                    const phaseItems = phase.subtopics.map((s) => s.id);
                                    const phaseCompleted = phaseItems.filter((id) => checked[id]).length;
                                    const phaseProgress = phaseItems.length > 0 ? Math.round((phaseCompleted / phaseItems.length) * 100) : 0;

                                    return (
                                        <div key={phase.id} className="phase-card card">
                                            {/* Phase header */}
                                            <div className="phase-card-header">
                                                <div className="phase-card-left">
                                                    <div className={`phase-badge ${phaseProgress === 100 ? 'phase-done' : phaseProgress > 0 ? 'phase-progress' : 'phase-todo'}`}>
                                                        {phaseProgress === 100 ? '✓' : pi + 1}
                                                    </div>
                                                    <div>
                                                        <h3 className="phase-card-title">{phase.title}</h3>
                                                        <div className="phase-card-meta">
                                                            Duration: {phase.weeks} ·{' '}
                                                            {phaseCompleted}/{phaseItems.length} done
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="phase-card-progress">
                                                    <span className="phase-pct">{phaseProgress}%</span>
                                                    <div className="phase-mini-track">
                                                        <div className="phase-mini-fill" style={{ width: `${phaseProgress}%` }} />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Subtopics */}
                                            <ul className="subtopic-list">
                                                {phase.subtopics.map((topic) => (
                                                    <li
                                                        key={topic.id}
                                                        className={`subtopic-item ${checked[topic.id] ? 'subtopic-done' : ''}`}
                                                        onClick={() => toggleItem(topic.id)}
                                                        id={`topic-${topic.id}`}
                                                    >
                                                        <div className={`subtopic-check ${checked[topic.id] ? 'check-done' : ''}`}>
                                                            {checked[topic.id] && <span>✓</span>}
                                                        </div>
                                                        <div className="subtopic-body">
                                                            <span className="subtopic-label">{topic.label}</span>
                                                            {topic.description && (
                                                                <span className="subtopic-desc">{topic.description}</span>
                                                            )}
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* COMPLETION MESSAGE */}
                            {progress === 100 && (
                                <div className="completion-banner card animate-fade-up">
                                    <div className="completion-emoji">🎉</div>
                                    <h3 className="completion-title">Roadmap Complete!</h3>
                                    <p className="completion-desc">
                                        You've completed all topics on your path to becoming a <strong>{userData.targetRole}</strong>.
                                        Time to apply and land that role!
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
