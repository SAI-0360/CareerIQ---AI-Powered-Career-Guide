import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../App';
import OverviewTab from '../components/tabs/OverviewTab';
import MarketValueTab from '../components/tabs/MarketValueTab';
import JobMarketTab from '../components/tabs/JobMarketTab';
import RoadmapTab from '../components/tabs/RoadmapTab';
import './Dashboard.css';

const TABS = [
    { id: 'overview', label: 'Overview & Gap', icon: '🎯' },
    { id: 'market', label: 'Market Value', icon: '💰' },
    { id: 'jobs', label: 'Job Market & Future', icon: '🌐' },
    { id: 'roadmap', label: 'Roadmap', icon: '🗺️' },
];

export default function Dashboard() {
    const { userData, analysisData, setUserData, setAnalysisData } = useApp();
    const [activeTab, setActiveTab] = useState('overview');
    const navigate = useNavigate();

    const handleChangeGoal = () => {
        setAnalysisData(null);
        setUserData({ skills: '', targetRole: '' });
        setTimeout(() => navigate('/'), 0);
    };

    const handleGoToPlanner = () => {
        navigate('/planner');
    };

    return (
        <div className="dashboard">
            {/* TOP NAV */}
            <nav className="dash-nav">
                <div className="container">
                    <div className="dash-nav-inner">
                        <div className="nav-brand" onClick={handleChangeGoal} style={{ cursor: 'pointer' }}>
                            <span className="brand-icon">⚡</span>
                            <span className="gradient-text">CareerIQ</span>
                        </div>
                        <div className="dash-nav-meta">
                            <div className="target-chip">
                                <span className="target-label">Target:</span>
                                <span className="target-role">{userData.targetRole}</span>
                            </div>
                            <button className="btn btn-primary btn-sm" onClick={handleGoToPlanner} id="quick-planner-btn">
                                🚀 Go to Planner
                            </button>
                            <button className="btn btn-ghost btn-sm" onClick={handleChangeGoal} id="change-goal-btn">
                                ↩ Change Goal
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* HERO STRIP */}
            <div className="dash-hero">
                <div className="container">
                    <div className="dash-hero-inner">
                        <div>
                            <div className="section-label">Career Intelligence Dashboard</div>
                            <h1 className="dash-title">
                                {userData.targetRole}
                            </h1>
                            <p className="dash-subtitle">{analysisData.goalOverview?.summary}</p>
                        </div>
                        <div className="readiness-widget">
                            <div className="readiness-score">
                                <span className="readiness-number gradient-text">{analysisData.skillGap?.readinessScore}%</span>
                                <span className="readiness-text">Readiness</span>
                            </div>
                            <div className="progress-track" style={{ width: 160 }}>
                                <div
                                    className="progress-fill"
                                    style={{ width: `${analysisData.skillGap?.readinessScore}%` }}
                                />
                            </div>
                            <p className="readiness-hint">{analysisData.skillGap?.readinessSummary}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* TABS */}
            <div className="dash-tabs-bar">
                <div className="container">
                    <div className="tabs-row">
                        {TABS.map((tab) => (
                            <button
                                key={tab.id}
                                className={`tab-btn ${activeTab === tab.id ? 'tab-active' : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                                id={`tab-${tab.id}`}
                            >
                                <span>{tab.icon}</span>
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* TAB CONTENT */}
            <div className="dash-content">
                <div className="container">
                    <div className="animate-fade" key={activeTab}>
                        {activeTab === 'overview' && <OverviewTab data={analysisData} />}
                        {activeTab === 'market' && <MarketValueTab data={analysisData} />}
                        {activeTab === 'jobs' && <JobMarketTab data={analysisData} />}
                        {activeTab === 'roadmap' && (
                            <>
                                <RoadmapTab data={analysisData} />
                                <div className="planner-cta">
                                    <div className="planner-cta-content">
                                        <h3>Ready to start learning?</h3>
                                        <p>Turn this roadmap into a personalized study plan with progress tracking.</p>
                                        <button
                                            className="btn btn-primary"
                                            onClick={handleGoToPlanner}
                                            id="go-to-planner-btn"
                                        >
                                            🚀 Open Personal Planner
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
