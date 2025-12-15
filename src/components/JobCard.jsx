import { Link } from 'react-router-dom';
import { Card, Badge } from 'react-bootstrap';

function JobCard({ job }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        return `${Math.floor(diffDays / 30)} months ago`;
    };

    return (
        <Card
            className="h-100 custom-card job-card"
            style={{
                background: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                transition: 'all var(--transition-base)'
            }}
        >
            <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                        <Card.Title className="mb-1" style={{ color: 'var(--text-primary)' }}>
                            {job.title}
                        </Card.Title>
                        <Card.Subtitle className="mb-2" style={{ color: 'var(--text-secondary)' }}>
                            {job.company}
                        </Card.Subtitle>
                    </div>
                    {job.remote && (
                        <Badge bg="success" className="badge-custom badge-success">
                            Remote
                        </Badge>
                    )}
                </div>

                <div className="mb-3">
                    <small style={{ color: 'var(--text-secondary)' }}>
                        📍 {job.location} • 💼 {job.type}
                    </small>
                </div>

                <div className="mb-3">
                    {job.skills.slice(0, 3).map((skill, index) => (
                        <Badge
                            key={index}
                            bg="primary"
                            className="me-2 mb-2 badge-outline"
                            style={{
                                background: 'transparent',
                                border: '2px solid var(--primary-color)',
                                color: 'var(--primary-color)',
                                padding: '0.25rem 0.75rem',
                                borderRadius: 'var(--radius-full)'
                            }}
                        >
                            {skill}
                        </Badge>
                    ))}
                    {job.skills.length > 3 && (
                        <Badge bg="secondary" className="mb-2">
                            +{job.skills.length - 3} more
                        </Badge>
                    )}
                </div>

                <div className="mb-3">
                    <strong style={{ color: 'var(--primary-color)' }}>{job.salary}</strong>
                </div>

                <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-center">
                        <small style={{ color: 'var(--text-tertiary)' }}>
                            {formatDate(job.postedDate)}
                        </small>
                        <Link
                            to={`/jobs/${job.id}`}
                            className="btn btn-primary btn-sm"
                            style={{
                                background: 'var(--primary-color)',
                                border: 'none',
                                borderRadius: 'var(--radius-md)',
                                padding: '0.5rem 1rem',
                                fontWeight: 600
                            }}
                        >
                            View Details
                        </Link>
                    </div>
                </div>

                {job.applicants > 0 && (
                    <div className="mt-2">
                        <small style={{ color: 'var(--text-tertiary)' }}>
                            👥 {job.applicants} applicants
                        </small>
                    </div>
                )}
            </Card.Body>
        </Card>
    );
}

export default JobCard;
