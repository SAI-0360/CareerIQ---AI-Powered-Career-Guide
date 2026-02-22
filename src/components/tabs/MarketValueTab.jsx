import './tabs.css';

export default function MarketValueTab({ data }) {
    const { marketValue } = data;

    const levels = [
        { label: 'Junior', salary: marketValue?.juniorSalary, icon: '🌱', color: 'var(--accent-green)' },
        { label: 'Mid-Level', salary: marketValue?.midSalary, icon: '⚡', color: 'var(--accent-blue)' },
        { label: 'Senior', salary: marketValue?.seniorSalary, icon: '🚀', color: 'var(--accent-purple)' },
    ];

    return (
        <div className="tab-content">
            <section className="tab-section">
                <div className="section-label">Compensation Overview</div>
                <div className="salary-grid">
                    {levels.map((lvl) => (
                        <div key={lvl.label} className="card salary-card">
                            <div className="salary-icon" style={{ background: `${lvl.color}22` }}>
                                {lvl.icon}
                            </div>
                            <div className="salary-level">{lvl.label}</div>
                            <div className="salary-amount" style={{ color: lvl.color }}>{lvl.salary}</div>
                            <div className="salary-currency">Annual ({marketValue?.currency || 'USD'})</div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="tab-section">
                <div className="section-label">Growth Potential</div>
                <div className="card growth-card">
                    <div className="growth-icon">📈</div>
                    <div className="growth-text">
                        <h3 className="card-title">Salary Growth Outlook</h3>
                        <p className="card-body">{marketValue?.growthPotential}</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
