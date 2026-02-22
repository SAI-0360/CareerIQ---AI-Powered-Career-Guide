import './tabs.css';

const ResourceLink = ({ resource }) => {
    const typeMap = {
        YouTube: { cls: 'resource-youtube', icon: '▶' },
        Coursera: { cls: 'resource-coursera', icon: '📘' },
        Docs: { cls: 'resource-docs', icon: '📄' },
        Book: { cls: 'resource-book', icon: '📚' },
    };
    const { cls, icon } = typeMap[resource.type] || { cls: 'resource-docs', icon: '🔗' };
    return (
        <a href={resource.url} target="_blank" rel="noopener noreferrer" className={`resource-link ${cls}`}>
            <span>{icon}</span> {resource.title}
        </a>
    );
};

export default function OverviewTab({ data }) {
    const { goalOverview, skillGap } = data;

    return (
        <div className="tab-content">
            {/* GOAL OVERVIEW */}
            <section className="tab-section">
                <div className="section-label">Goal Overview</div>
                <div className="overview-grid">
                    {/* Summary card */}
                    <div className="card overview-summary-card">
                        <h2 className="card-title">Role Summary</h2>
                        <p className="card-body">{goalOverview.summary}</p>
                        <div className="divider" />
                        <h3 className="card-subtitle">Daily Work</h3>
                        <p className="card-body">{goalOverview.nature}</p>
                    </div>

                    {/* Responsibilities */}
                    <div className="card">
                        <h2 className="card-title">Key Responsibilities</h2>
                        <ul className="resp-list">
                            {goalOverview.responsibilities?.map((r, i) => (
                                <li key={i} className="resp-item">
                                    <span className="resp-bullet">›</span>
                                    <span>{r}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* SKILL GAP */}
            <section className="tab-section">
                <div className="section-label">Skill Gap Analysis</div>
                <div className="skillgap-grid">
                    {/* Current Skills */}
                    <div className="card">
                        <div className="skill-header">
                            <h2 className="card-title">✅ Skills You Have</h2>
                            <span className="badge badge-green">{skillGap.currentSkills?.length} skills</span>
                        </div>
                        <div className="chips-wrap">
                            {skillGap.currentSkills?.map((s, i) => (
                                <span key={i} className="chip chip-have">{s}</span>
                            ))}
                        </div>
                    </div>

                    {/* Missing Skills */}
                    <div className="card">
                        <div className="skill-header">
                            <h2 className="card-title">❌ Skills to Learn</h2>
                            <span className="badge badge-red">{skillGap.missingSkills?.length} gaps</span>
                        </div>
                        <div className="chips-wrap">
                            {skillGap.missingSkills?.map((s, i) => (
                                <span key={i} className="chip chip-missing">{s}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
