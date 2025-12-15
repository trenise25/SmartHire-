import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Button, Badge, Modal, Form, Alert } from 'react-bootstrap';
import { getJobById, applyToJob, getJobs } from '../services/api';
import { getCurrentUser } from '../services/auth';

function JobDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [similarJobs, setSimilarJobs] = useState([]);
    const [showApplyModal, setShowApplyModal] = useState(false);
    const [applySuccess, setApplySuccess] = useState(false);
    const [applyError, setApplyError] = useState('');
    const user = getCurrentUser();

    useEffect(() => {
        const jobData = getJobById(id);
        if (jobData) {
            setJob(jobData);

            // Get similar jobs (same skills or type)
            const allJobs = getJobs();
            const similar = allJobs
                .filter(j => j.id !== jobData.id && (
                    j.type === jobData.type ||
                    j.skills.some(skill => jobData.skills.includes(skill))
                ))
                .slice(0, 3);
            setSimilarJobs(similar);
        }
    }, [id]);

    const handleApply = () => {
        if (!user) {
            navigate('/login');
            return;
        }

        if (user.role !== 'candidate') {
            setApplyError('Only candidates can apply to jobs');
            return;
        }

        setShowApplyModal(true);
    };

    const submitApplication = (e) => {
        e.preventDefault();

        try {
            applyToJob(job.id, {
                name: user.name,
                email: user.email,
                resume: 'resume.pdf'
            });

            setApplySuccess(true);
            setApplyError('');
            setTimeout(() => {
                setShowApplyModal(false);
                setApplySuccess(false);
            }, 2000);
        } catch (error) {
            setApplyError(error.message);
        }
    };

    if (!job) {
        return (
            <Container className="py-5 text-center">
                <h3 style={{ color: 'var(--text-secondary)' }}>Job not found</h3>
                <Link to="/jobs" className="btn btn-primary mt-3">Browse Jobs</Link>
            </Container>
        );
    }

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', paddingTop: '2rem', paddingBottom: '2rem' }}>
            <Container>
                <Row>
                    <Col lg={8}>
                        {/* Job Header */}
                        <div
                            className="p-4 mb-4"
                            style={{
                                background: 'var(--bg-secondary)',
                                borderRadius: 'var(--radius-lg)',
                                border: '1px solid var(--border-color)'
                            }}
                        >
                            <div className="d-flex justify-content-between align-items-start mb-3">
                                <div>
                                    <h1 className="mb-2" style={{ color: 'var(--text-primary)' }}>
                                        {job.title}
                                    </h1>
                                    <h4 style={{ color: 'var(--text-secondary)' }}>
                                        {job.company}
                                    </h4>
                                </div>
                                {job.remote && (
                                    <Badge bg="success" className="badge-custom badge-success">
                                        Remote
                                    </Badge>
                                )}
                            </div>

                            <div className="mb-3">
                                <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                                    📍 {job.location} • 💼 {job.type}
                                </p>
                                <p style={{ color: 'var(--primary-color)', fontWeight: 600, fontSize: '1.25rem', marginBottom: 0 }}>
                                    {job.salary}
                                </p>
                            </div>

                            <div className="mb-3">
                                {job.skills.map((skill, index) => (
                                    <Badge
                                        key={index}
                                        className="me-2 mb-2 badge-outline"
                                        style={{
                                            background: 'transparent',
                                            border: '2px solid var(--primary-color)',
                                            color: 'var(--primary-color)',
                                            padding: '0.5rem 1rem',
                                            borderRadius: 'var(--radius-full)',
                                            fontSize: '0.9rem'
                                        }}
                                    >
                                        {skill}
                                    </Badge>
                                ))}
                            </div>

                            <Button
                                onClick={handleApply}
                                className="btn-gradient w-100"
                                size="lg"
                                style={{
                                    padding: '0.75rem',
                                    borderRadius: 'var(--radius-md)',
                                    fontWeight: 600
                                }}
                            >
                                Apply Now
                            </Button>

                            {applyError && (
                                <Alert variant="danger" className="mt-3 mb-0">
                                    {applyError}
                                </Alert>
                            )}
                        </div>

                        {/* Job Description */}
                        <div
                            className="p-4 mb-4"
                            style={{
                                background: 'var(--bg-secondary)',
                                borderRadius: 'var(--radius-lg)',
                                border: '1px solid var(--border-color)'
                            }}
                        >
                            <h3 className="mb-3" style={{ color: 'var(--text-primary)' }}>
                                Job Description
                            </h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                                {job.description}
                            </p>
                        </div>

                        {/* Requirements */}
                        <div
                            className="p-4 mb-4"
                            style={{
                                background: 'var(--bg-secondary)',
                                borderRadius: 'var(--radius-lg)',
                                border: '1px solid var(--border-color)'
                            }}
                        >
                            <h3 className="mb-3" style={{ color: 'var(--text-primary)' }}>
                                Requirements
                            </h3>
                            <ul style={{ color: 'var(--text-secondary)', lineHeight: 2 }}>
                                {job.requirements.map((req, index) => (
                                    <li key={index}>{req}</li>
                                ))}
                            </ul>
                        </div>
                    </Col>

                    {/* Sidebar */}
                    <Col lg={4}>
                        {/* Company Info */}
                        <div
                            className="p-4 mb-4"
                            style={{
                                background: 'var(--bg-secondary)',
                                borderRadius: 'var(--radius-lg)',
                                border: '1px solid var(--border-color)'
                            }}
                        >
                            <h5 className="mb-3" style={{ color: 'var(--text-primary)' }}>
                                Company Information
                            </h5>
                            <p style={{ color: 'var(--text-secondary)' }}>
                                <strong>Company:</strong> {job.company}
                            </p>
                            <p style={{ color: 'var(--text-secondary)' }}>
                                <strong>Location:</strong> {job.location}
                            </p>
                            <p style={{ color: 'var(--text-secondary)' }}>
                                <strong>Job Type:</strong> {job.type}
                            </p>
                            <p style={{ color: 'var(--text-secondary)' }}>
                                <strong>Posted:</strong> {new Date(job.postedDate).toLocaleDateString()}
                            </p>
                            <p style={{ color: 'var(--text-secondary)' }}>
                                <strong>Applicants:</strong> {job.applicants}
                            </p>
                        </div>

                        {/* Similar Jobs */}
                        {similarJobs.length > 0 && (
                            <div
                                className="p-4"
                                style={{
                                    background: 'var(--bg-secondary)',
                                    borderRadius: 'var(--radius-lg)',
                                    border: '1px solid var(--border-color)'
                                }}
                            >
                                <h5 className="mb-3" style={{ color: 'var(--text-primary)' }}>
                                    Similar Jobs
                                </h5>
                                {similarJobs.map((similarJob) => (
                                    <Link
                                        key={similarJob.id}
                                        to={`/jobs/${similarJob.id}`}
                                        className="d-block mb-3 text-decoration-none"
                                        style={{
                                            padding: '1rem',
                                            background: 'var(--bg-primary)',
                                            borderRadius: 'var(--radius-md)',
                                            border: '1px solid var(--border-color)',
                                            transition: 'all var(--transition-base)'
                                        }}
                                    >
                                        <h6 style={{ color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                                            {similarJob.title}
                                        </h6>
                                        <small style={{ color: 'var(--text-secondary)' }}>
                                            {similarJob.company}
                                        </small>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>

            {/* Apply Modal */}
            <Modal show={showApplyModal} onHide={() => setShowApplyModal(false)} centered>
                <Modal.Header closeButton style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                    <Modal.Title style={{ color: 'var(--text-primary)' }}>Apply for {job.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: 'var(--bg-secondary)' }}>
                    {applySuccess ? (
                        <Alert variant="success">
                            Application submitted successfully! 🎉
                        </Alert>
                    ) : (
                        <Form onSubmit={submitApplication}>
                            <Form.Group className="mb-3">
                                <Form.Label style={{ color: 'var(--text-secondary)' }}>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={user?.name || ''}
                                    disabled
                                    style={{
                                        background: 'var(--bg-primary)',
                                        border: '2px solid var(--border-color)',
                                        color: 'var(--text-primary)'
                                    }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label style={{ color: 'var(--text-secondary)' }}>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={user?.email || ''}
                                    disabled
                                    style={{
                                        background: 'var(--bg-primary)',
                                        border: '2px solid var(--border-color)',
                                        color: 'var(--text-primary)'
                                    }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label style={{ color: 'var(--text-secondary)' }}>Resume</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    style={{
                                        background: 'var(--bg-primary)',
                                        border: '2px solid var(--border-color)',
                                        color: 'var(--text-primary)'
                                    }}
                                />
                                <Form.Text style={{ color: 'var(--text-tertiary)' }}>
                                    Upload your resume (PDF, DOC, or DOCX)
                                </Form.Text>
                            </Form.Group>
                            {applyError && <Alert variant="danger">{applyError}</Alert>}
                            <Button type="submit" className="btn-gradient w-100">
                                Submit Application
                            </Button>
                        </Form>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default JobDetails;
