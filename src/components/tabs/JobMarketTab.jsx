import './tabs.css';

const demandColors = {
    'Very High': 'badge-green',
    'High': 'badge-blue',
    'Moderate': 'badge-amber',
    'Low': 'badge-red',
};

export default function JobMarketTab({ data }) {
    const { jobMarket, futureOutlook } = data;

    const demandClass = demandColors[jobMarket?.demandLevel] || 'badge-blue';

    const trendColors = {
        'Growing': '#10b981',
        'Stable': '#3b82f6',
        'Declining': '#ef4444',
    };
    const trendColor = trendColors[futureOutlook?.trend] || '#3b82f6';

    return (
        <div className="tab-content">
            {/* DEMAND */}
            <section className="tab-section">
                <div className="section-label">Current Demand</div>
                <div className="card demand-card">
                    <div className="demand-top">
                        <div>
                            <h3 className="card-title">Market Demand</h3>
                            <p className="card-body" style={{ marginTop: 6 }}>{jobMarket?.demandDescription}</p>
                        </div>
                        <span className={`badge ${demandClass} demand-badge`}>{jobMarket?.demandLevel}</span>
                    </div>
                </div>
            </section>

            {/* INDUSTRIES + COMPANIES */}
            <section className="tab-section">
                <div className="jm-grid">
                    <div className="card">
                        <h3 className="card-title">🏭 Top Industries Hiring</h3>
                        <ul className="list-items">
                            {jobMarket?.topIndustries?.map((industry, i) => (
                                <li key={i} className="list-item">
                                    <span className="list-num">{i + 1}</span>
                                    <span>{industry}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="card">
                        <h3 className="card-title">🏢 Top Companies</h3>
                        <ul className="list-items">
                            {jobMarket?.topCompanies?.map((company, i) => (
                                <li key={i} className="list-item">
                                    <span className="list-num">{i + 1}</span>
                                    <span>{company}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="card">
                        <h3 className="card-title">📍 Top Locations</h3>
                        <ul className="list-items">
                            {jobMarket?.topLocations?.map((loc, i) => (
                                <li key={i} className="list-item">
                                    <span className="list-num">{i + 1}</span>
                                    <span>{loc}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* FUTURE OUTLOOK */}
            <section className="tab-section">
                <div className="section-label">Future Outlook (5–10 years)</div>
                <div className="outlook-grid">
                    <div className="card outlook-card">
                        <div className="outlook-trend" style={{ color: trendColor }}>
                            {futureOutlook?.trend === 'Growing' ? '📈' : futureOutlook?.trend === 'Declining' ? '📉' : '➡️'}
                            <span>{futureOutlook?.trend}</span>
                        </div>
                        <p className="card-body">{futureOutlook?.trendDescription}</p>
                    </div>

                    <div className="card outlook-card">
                        <div className="outlook-trend" style={{ color: '#f59e0b' }}>
                            🤖 <span>AI & Automation Impact</span>
                        </div>
                        <p className="card-body">{futureOutlook?.aiImpact}</p>
                    </div>

                    <div className="card outlook-card">
                        <div className="outlook-trend" style={{ color: 'var(--accent-cyan)' }}>
                            🔮 <span>Role Evolution</span>
                        </div>
                        <p className="card-body">{futureOutlook?.evolution}</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
