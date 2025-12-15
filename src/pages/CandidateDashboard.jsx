import { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Badge, Form, Button } from 'react-bootstrap';
import { getCurrentUser } from '../services/auth';
import { getUserApplications, getJobById, getJobs } from '../services/api';
import JobCard from '../components/JobCard';

function CandidateDashboard() {
    const [user, setUser] = useState(null);
    const [applications, setApplications] = useState([]);
    const [recommendedJobs, setRecommendedJobs] = useState([]);
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        phone: '',
        location: ''
    });

    useEffect(() => {
        const currentUser = getCurrentUser();
        setUser(currentUser);

        if (currentUser) {
            // Get user applications
            const userApps = getUserApplications(currentUser.email);
            const appsWithJobs = userApps.map(app => ({
                ...app,
                job: getJobById(app.jobId)
            }));
            setApplications(appsWithJobs);

            // Get recommended jobs (random for demo)
            const allJobs = getJobs();
            const recommended = allJobs.slice(0, 3);
            setRecommendedJobs(recommended);

            // Set profile data
            setProfileData({
                name: currentUser.name,
                email: currentUser.email,
                phone: '',
                location: ''
            });
        }
    }, []);

    const getStatusBadge = (status) => {
        const statusMap = {
            'Pending': 'status-pending',
            'Shortlisted': 'status-shortlisted',
            'Rejected': 'status-rejected'
        };
        return statusMap[status] || 'status-pending';
    };

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', paddingTop: '2rem', paddingBottom: '2rem' }}>
            <Container>
                <h1 className="fw-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                    Candidate Dashboard
                </h1>

                {/* Stats Cards */}
                <Row className="g-4 mb-4">
                    <Col md={4}>
                        <div
                            className="p-4 text-center"
                            style={{
                                background: 'var(--bg-secondary)',
                                borderRadius: 'var(--radius-lg)',
                                border: '1px solid var(--border-color)'
                            }}
                        >
                            <h2 className="fw-bold mb-1" style={{ color: 'var(--primary-color)' }}>
                                {applications.length}
                            </h2>
                            <p className="mb-0" style={{ color: 'var(--text-secondary)' }}>
                                Total Applications
                            </p>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div
                            className="p-4 text-center"
                            style={{
                                background: 'var(--bg-secondary)',
                                borderRadius: 'var(--radius-lg)',
                                border: '1px solid var(--border-color)'
                            }}
                        >
                            <h2 className="fw-bold mb-1" style={{ color: 'var(--success-color)' }}>
                                {applications.filter(app => app.status === 'Shortlisted').length}
                            </h2>
                            <p className="mb-0" style={{ color: 'var(--text-secondary)' }}>
                                Shortlisted
                            </p>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div
                            className="p-4 text-center"
                            style={{
                                background: 'var(--bg-secondary)',
                                borderRadius: 'var(--radius-lg)',
                                border: '1px solid var(--border-color)'
                            }}
                        >
                            <h2 className="fw-bold mb-1" style={{ color: 'var(--warning-color)' }}>
                                {applications.filter(app => app.status === 'Pending').length}
                            </h2>
                            <p className="mb-0" style={{ color: 'var(--text-secondary)' }}>
                                Pending
                            </p>
                        </div>
                    </Col>
                </Row>

                {/* Applications Table */}
                <div
                    className="p-4 mb-4"
                    style={{
                        background: 'var(--bg-secondary)',
                        borderRadius: 'var(--radius-lg)',
                        border: '1px solid var(--border-color)'
                    }}
                >
                    <h3 className="mb-3" style={{ color: 'var(--text-primary)' }}>
                        My Applications
                    </h3>

                    {applications.length === 0 ? (
                        <p style={{ color: 'var(--text-secondary)' }}>
                            You haven't applied to any jobs yet. <a href="/jobs" style={{ color: 'var(--primary-color)' }}>Browse jobs</a>
                        </p>
                    ) : (
                        <div className="table-responsive">
                            <Table hover style={{ color: 'var(--text-primary)' }}>
                                <thead>
                                    <tr>
                                        <th>Job Title</th>
                                        <th>Company</th>
                                        <th>Applied Date</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {applications.map((app) => (
                                        <tr key={app.id}>
                                            <td>{app.job?.title || 'N/A'}</td>
                                            <td>{app.job?.company || 'N/A'}</td>
                                            <td>{new Date(app.appliedDate).toLocaleDateString()}</td>
                                            <td>
                                                <span className={getStatusBadge(app.status)}>
                                                    {app.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    )}
                </div>

                {/* Profile Section */}
                <div
                    className="p-4 mb-4"
                    style={{
                        background: 'var(--bg-secondary)',
                        borderRadius: 'var(--radius-lg)',
                        border: '1px solid var(--border-color)'
                    }}
                >
                    <h3 className="mb-3" style={{ color: 'var(--text-primary)' }}>
                        Profile Information
                    </h3>

                    <Form>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label style={{ color: 'var(--text-secondary)' }}>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={profileData.name}
                                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
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
                                    <Form.Label style={{ color: 'var(--text-secondary)' }}>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={profileData.email}
                                        disabled
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
                                    <Form.Label style={{ color: 'var(--text-secondary)' }}>Phone</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        placeholder="Enter phone number"
                                        value={profileData.phone}
                                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
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
                                        placeholder="Enter location"
                                        value={profileData.location}
                                        onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
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
                                    <Form.Label style={{ color: 'var(--text-secondary)' }}>Resume</Form.Label>
                                    <Form.Control
                                        type="file"
                                        accept=".pdf,.doc,.docx"
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
                        <Button className="btn-gradient">
                            Update Profile
                        </Button>
                    </Form>
                </div>

                {/* Recommended Jobs */}
                <div>
                    <h3 className="mb-3" style={{ color: 'var(--text-primary)' }}>
                        Recommended Jobs
                    </h3>
                    <Row className="g-4">
                        {recommendedJobs.map((job) => (
                            <Col key={job.id} md={6} lg={4}>
                                <JobCard job={job} />
                            </Col>
                        ))}
                    </Row>
                </div>
            </Container>
        </div>
    );
}

export default CandidateDashboard;
