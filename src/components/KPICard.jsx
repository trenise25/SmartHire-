import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

function KPICard({ title, value, icon, color = 'primary' }) {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        // Animated counter effect
        const duration = 1000; // 1 second
        const steps = 30;
        const increment = value / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
                setDisplayValue(value);
                clearInterval(timer);
            } else {
                setDisplayValue(Math.floor(current));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [value]);

    const colorMap = {
        primary: 'var(--primary-color)',
        success: 'var(--success-color)',
        warning: 'var(--warning-color)',
        danger: 'var(--danger-color)',
        info: 'var(--info-color)'
    };

    return (
        <Card
            className="custom-card h-100"
            style={{
                background: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)'
            }}
        >
            <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                    <div>
                        <p className="mb-1" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                            {title}
                        </p>
                        <h2
                            className="mb-0 stat-number"
                            style={{
                                color: colorMap[color],
                                fontSize: '2.5rem',
                                fontWeight: 700
                            }}
                        >
                            {displayValue.toLocaleString()}
                        </h2>
                    </div>
                    <div
                        style={{
                            fontSize: '2rem',
                            opacity: 0.5
                        }}
                    >
                        {icon}
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}

export default KPICard;
