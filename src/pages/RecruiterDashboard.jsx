import { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Badge, Form, Button, Modal, Alert } from 'react-bootstrap';
import { getJobs, getApplications, getJobApplications, updateApplicationStatus, postJob } from '../services/api';
import KPICard from '../components/KPICard';

function RecruiterDashboard() {
    const [jobs, setJobs] = useState([]);
    const [applications, setApplications] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [jobApplications, setJobApplications] = useState([]);
    const [showPostJobModal, setShowPostJobModal] = useState(false);
    const [showApplicantsModal, setShowApplicantsModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [newJob, setNewJob] = useState({
        title: '',
        company: '',
        location: '',
        type: 'Full-time',
        remote: false,
        skills: '',
        salary: '',
        description: '',
        requirements: ''
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        const allJobs = getJobs();
        const allApplications = getApplications();
        setJobs(allJobs);
        setApplications(allApplications);
    };

    const handlePostJob = (e) => {
        e.preventDefault();

        const jobData = {
            ...newJob,
            skills: newJob.skills.split(',').map(s => s.trim()),
            requirements: newJob.requirements.split('\n').filter(r => r.trim())
        };

        postJob(jobData);
        setSuccessMessage('Job posted successfully!');
        setShowPostJobModal(false);
        loadData();

        // Reset form
        setNewJob({
            title: '',
            company: '',
            location: '',
            type: 'Full-time',
            remote: false,
            skills: '',
            salary: '',
            description: '',
            requirements: ''
        });

        setTimeout(() => setSuccessMessage(''), 3000);
    };

    const handleViewApplicants = (job) => {
        setSelectedJob(job);
        const apps = getJobApplications(job.id);
        setJobApplications(apps);
        setShowApplicantsModal(true);
    };

    const handleUpdateStatus = (applicationId, status) => {
        updateApplicationStatus(applicationId, status);
        const apps = getJobApplications(selectedJob.id);
        setJobApplications(apps);
        loadData();
    };

    const getStatusBadge = (status) => {
        const statusMap = {
            'Pending': 'status-pending',
            'Shortlisted': 'status-shortlisted',
            'Rejected': 'status-rejected'
        };
        return statusMap[status] || 'status-pending';
    };

    const totalJobs = jobs.length;
    const totalApplications = applications.length;
    const activeJobs = jobs.filter(job => {
        const daysOld = Math.floor((new Date() - new Date(job.postedDate)) / (1000 * 60 * 60 * 24));
        return daysOld <= 30;
    }).length;

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', paddingTop: '2rem', paddingBottom: '2rem' }}>
            <Container>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="fw-bold" style={{ color: 'var(--text-primary)' }}>
                        Recruiter Dashboard
                    </h1>
                    <Button
                        className="btn-gradient"
                        onClick={() => setShowPostJobModal(true)}
                    >
                        + Post New Job
                    </Button>
                </div>

                {successMessage && (
                    <Alert variant="success" className="mb-4">
                        {successMessage}
                    </Alert>
                )}

                {/* KPI Cards */}
                <Row className="g-4 mb-4">
                    <Col md={4}>
                        <KPICard
                            title="Total Jobs Posted"
                            value={totalJobs}
                            icon="💼"
                            color="primary"
                        />
                    </Col>
                    <Col md={4}>
                        <KPICard
                            title="Total Applications"
                            value={totalApplications}
                            icon="📝"
                            color="success"
                        />
                    </Col>
                    <Col md={4}>
                        <KPICard
                            title="Active Jobs"
                            value={activeJobs}
                            icon="🚀"
                            color="info"
                        />
                    </Col>
                </Row>

                {/* Posted Jobs Table */}
                <div
                    className="p-4"
                    style={{
                        background: 'var(--bg-secondary)',
                        borderRadius: 'var(--radius-lg)',
                        border: '1px solid var(--border-color)'
                    }}
                >
                    <h3 className="mb-3" style={{ color: 'var(--text-primary)' }}>
                        My Posted Jobs
                    </h3>

                    <div className="table-responsive">
                        <Table hover style={{ color: 'var(--text-primary)' }}>
                            <thead>
                                <tr>
                                    <th>Job Title</th>
                                    <th>Location</th>
                                    <th>Type</th>
                                    <th>Applicants</th>
                                    <th>Posted Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobs.slice(0, 10).map((job) => (
                                    <tr key={job.id}>
                                        <td>{job.title}</td>
                                        <td>{job.location}</td>
                                        <td>
                                            <Badge bg="primary" className="badge-custom badge-primary">
                                                {job.type}
                                            </Badge>
                                        </td>
                                        <td>{job.applicants || 0}</td>
                                        <td>{new Date(job.postedDate).toLocaleDateString()}</td>
                                        <td>
                                            <Button
                                                size="sm"
                                                variant="outline-primary"
                                                onClick={() => handleViewApplicants(job)}
                                            >
                                                View Applicants
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </Container>

            {/* Post Job Modal */}
            <Modal
                show={showPostJobModal}
                onHide={() => setShowPostJobModal(false)}
                size="lg"
                centered
            >
                <Modal.Header closeButton style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                    <Modal.Title style={{ color: 'var(--text-primary)' }}>Post New Job</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: 'var(--bg-secondary)' }}>
                    <Form onSubmit={handlePostJob}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label style={{ color: 'var(--text-secondary)' }}>Job Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        required
                                        value={newJob.title}
                                        onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                                        style={{
                                            background: 'var(--bg-primary)',
                                            border: '2px solid var(--border-color)',
                                            color: 'var(--text-primary)',
                                            borderRadius: 'var(--radius-md)'
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label style={{ color: 'var(--text-secondary)' }}>Company</Form.Label>
                                    <Form.Control
                                        type="text"
                                        required
                                        value={newJob.company}
                                        onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                                        style={{
                                            background: 'var(--bg-primary)',
                                            border: '2px solid var(--border-color)',
                                            color: 'var(--text-primary)',
                                            borderRadius: 'var(--radius-md)'
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label style={{ color: 'var(--text-secondary)' }}>Location</Form.Label>
                                    <Form.Control
                                        type="text"
                                        required
                                        value={newJob.location}
                                        onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                                        style={{
                                            background: 'var(--bg-primary)',
                                            border: '2px solid var(--border-color)',
                                            color: 'var(--text-primary)',
                                            borderRadius: 'var(--radius-md)'
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label style={{ color: 'var(--text-secondary)' }}>Job Type</Form.Label>
                                    <Form.Select
                                        value={newJob.type}
                                        onChange={(e) => setNewJob({ ...newJob, type: e.target.value })}
                                        style={{
                                            background: 'var(--bg-primary)',
                                            border: '2px solid var(--border-color)',
                                            color: 'var(--text-primary)',
                                            borderRadius: 'var(--radius-md)'
                                        }}
                                    >
                                        <option>Full-time</option>
                                        <option>Part-time</option>
                                        <option>Contract</option>
                                        <option>Internship</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label style={{ color: 'var(--text-secondary)' }}>Salary Range</Form.Label>
                                    <Form.Control
                                        type="text"
                                        required
                                        placeholder="e.g., $100,000 - $130,000"
                                        value={newJob.salary}
                                        onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                                        style={{
                                            background: 'var(--bg-primary)',
                                            border: '2px solid var(--border-color)',
                                            color: 'var(--text-primary)',
                                            borderRadius: 'var(--radius-md)'
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label style={{ color: 'var(--text-secondary)' }}>Skills (comma-separated)</Form.Label>
                                    <Form.Control
                                        type="text"
                                        required
                                        placeholder="React, JavaScript, CSS"
                                        value={newJob.skills}
                                        onChange={(e) => setNewJob({ ...newJob, skills: e.target.value })}
                                        style={{
                                            background: 'var(--bg-primary)',
                                            border: '2px solid var(--border-color)',
                                            color: 'var(--text-primary)',
                                            borderRadius: 'var(--radius-md)'
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={12}>
                                <Form.Group className="mb-3">
                                    <Form.Check
                                        type="checkbox"
                                        label="Remote Position"
                                        checked={newJob.remote}
                                        onChange={(e) => setNewJob({ ...newJob, remote: e.target.checked })}
                                        style={{ color: 'var(--text-secondary)' }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label style={{ color: 'var(--text-secondary)' }}>Job Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        required
                                        value={newJob.description}
                                        onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                                        style={{
                                            background: 'var(--bg-primary)',
                                            border: '2px solid var(--border-color)',
                                            color: 'var(--text-primary)',
                                            borderRadius: 'var(--radius-md)'
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label style={{ color: 'var(--text-secondary)' }}>Requirements (one per line)</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        required
                                        value={newJob.requirements}
                                        onChange={(e) => setNewJob({ ...newJob, requirements: e.target.value })}
                                        style={{
                                            background: 'var(--bg-primary)',
                                            border: '2px solid var(--border-color)',
                                            color: 'var(--text-primary)',
                                            borderRadius: 'var(--radius-md)'
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button type="submit" className="btn-gradient w-100">
                            Post Job
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Applicants Modal */}
            <Modal
                show={showApplicantsModal}
                onHide={() => setShowApplicantsModal(false)}
                size="lg"
                centered
            >
                <Modal.Header closeButton style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                    <Modal.Title style={{ color: 'var(--text-primary)' }}>
                        Applicants for {selectedJob?.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: 'var(--bg-secondary)' }}>
                    {jobApplications.length === 0 ? (
                        <p style={{ color: 'var(--text-secondary)' }}>No applications yet</p>
                    ) : (
                        <Table hover style={{ color: 'var(--text-primary)' }}>
                            <thead>
                                <tr>
                                    <th>Candidate</th>
                                    <th>Applied Date</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobApplications.map((app) => (
                                    <tr key={app.id}>
                                        <td>
                                            <div>
                                                <strong>{app.candidateName}</strong>
                                                <br />
                                                <small style={{ color: 'var(--text-secondary)' }}>
                                                    {app.candidateEmail}
                                                </small>
                                            </div>
                                        </td>
                                        <td>{new Date(app.appliedDate).toLocaleDateString()}</td>
                                        <td>
                                            <span className={getStatusBadge(app.status)}>
                                                {app.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="d-flex gap-2">
                                                {app.status !== 'Shortlisted' && (
                                                    <Button
                                                        size="sm"
                                                        variant="success"
                                                        onClick={() => handleUpdateStatus(app.id, 'Shortlisted')}
                                                    >
                                                        Shortlist
                                                    </Button>
                                                )}
                                                {app.status !== 'Rejected' && (
                                                    <Button
                                                        size="sm"
                                                        variant="danger"
                                                        onClick={() => handleUpdateStatus(app.id, 'Rejected')}
                                                    >
                                                        Reject
                                                    </Button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default RecruiterDashboard;
