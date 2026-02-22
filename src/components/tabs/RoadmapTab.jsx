import { useState } from 'react';
import './tabs.css';

const typeIcons = {
    YouTube: '▶',
    Coursera: '📘',
    Docs: '📄',
    Book: '📚',
};

const typeCls = {
    YouTube: 'resource-youtube',
    Coursera: 'resource-coursera',
    Docs: 'resource-docs',
    Book: 'resource-book',
};

export default function RoadmapTab({ data }) {
    const { roadmap } = data;
    const [expanded, setExpanded] = useState(0);

    return (
        <div className="tab-content">
            <section className="tab-section">
                <div className="section-label">Learning Roadmap</div>
                <div className="roadmap-timeline">
                    {roadmap?.map((phase, pi) => (
                        <div key={pi} className="phase-block">
                            {/* PHASE HEADER */}
                            <div
                                className={`phase-header ${expanded === pi ? 'phase-open' : ''}`}
                                onClick={() => setExpanded(expanded === pi ? -1 : pi)}
                                id={`phase-${pi}`}
                            >
                                <div className="phase-left">
                                    <div className="phase-dot">
                                        <span className="phase-num">{pi + 1}</span>
                                    </div>
                                    <div>
                                        <div className="phase-title">{phase.phase}</div>
                                        <div className="phase-duration">{phase.duration} · {phase.skills?.length} skills</div>
                                    </div>
                                </div>
                                <div className="phase-chevron">{expanded === pi ? '▲' : '▼'}</div>
                            </div>

                            {/* PHASE CONTENT */}
                            {expanded === pi && (
                                <div className="phase-content animate-fade-up">
                                    {phase.skills?.map((skill, si) => (
                                        <div key={si} className="skill-card card">
                                            <div className="skill-name">{skill.name}</div>
                                            {skill.description && (
                                                <p className="skill-desc">{skill.description}</p>
                                            )}
                                            <div className="skill-resources">
                                                {skill.resources?.map((res, ri) => (
                                                    <a
                                                        key={ri}
                                                        href={res.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={`resource-link ${typeCls[res.type] || 'resource-docs'}`}
                                                    >
                                                        <span>{typeIcons[res.type] || '🔗'}</span>
                                                        <span>{res.title}</span>
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* CONNECTOR LINE */}
                            {pi < roadmap.length - 1 && <div className="phase-connector" />}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
