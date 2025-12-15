import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { getJobs } from '../services/api';
import JobCard from '../components/JobCard';

function Home() {
    const [featuredJobs, setFeaturedJobs] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Get featured jobs (most recent 6)
        const jobs = getJobs();
        const featured = jobs.slice(0, 6);
        setFeaturedJobs(featured);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        // Navigate to jobs page with search query
        window.location.href = `/jobs?q=${encodeURIComponent(searchQuery)}`;
    };

    return (
        <div>
            {/* Hero Section */}
            <section className="hero-section text-white text-center position-relative">
                <Container className="position-relative" style={{ zIndex: 1 }}>
                    <div className="animate-fade-in">
                        <h1 className="display-3 fw-bold mb-4">
                            Find Your Dream Job with <span className="gradient-text" style={{ color: 'white' }}>SmartHire</span>
                        </h1>
                        <p className="lead mb-5" style={{ fontSize: '1.25rem', opacity: 0.9 }}>
                            Connect with top companies and discover opportunities that match your skills
                        </p>

                        {/* Search Bar */}
                        <Form onSubmit={handleSearch} className="mb-5">
                            <Row className="justify-content-center">
                                <Col md={8} lg={6}>
                                    <div className="d-flex gap-2">
                                        <Form.Control
                                            type="text"
                                            placeholder="Job title, skills, or company..."
                                            size="lg"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            style={{
                                                borderRadius: 'var(--radius-lg)',
                                                padding: '1rem 1.5rem',
                                                fontSize: '1.1rem',
                                                border: 'none'
                                            }}
                                        />
                                        <Button
                                            type="submit"
                                            size="lg"
                                            className="btn-gradient"
                                            style={{
                                                padding: '1rem 2rem',
                                                borderRadius: 'var(--radius-lg)',
                                                fontWeight: 600,
                                                whiteSpace: 'nowrap'
                                            }}
                                        >
                                            🔍 Search
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </Form>

                        {/* Stats */}
                        <Row className="justify-content-center text-center mt-5">
                            <Col xs={6} md={3}>
                                <h3 className="fw-bold mb-0">1000+</h3>
                                <p className="mb-0" style={{ opacity: 0.8 }}>Active Jobs</p>
                            </Col>
                            <Col xs={6} md={3}>
                                <h3 className="fw-bold mb-0">500+</h3>
                                <p className="mb-0" style={{ opacity: 0.8 }}>Companies</p>
                            </Col>
                            <Col xs={6} md={3}>
                                <h3 className="fw-bold mb-0">10K+</h3>
                                <p className="mb-0" style={{ opacity: 0.8 }}>Candidates</p>
                            </Col>
                            <Col xs={6} md={3}>
                                <h3 className="fw-bold mb-0">95%</h3>
                                <p className="mb-0" style={{ opacity: 0.8 }}>Success Rate</p>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </section>

            {/* Featured Jobs Section */}
            <section className="py-5" style={{ background: 'var(--bg-primary)' }}>
                <Container>
                    <div className="text-center mb-5">
                        <h2 className="fw-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                            Featured Jobs
                        </h2>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            Explore our handpicked opportunities from top companies
                        </p>
                    </div>

                    <Row className="g-4 mb-4">
                        {featuredJobs.map((job) => (
                            <Col key={job.id} md={6} lg={4}>
                                <JobCard job={job} />
                            </Col>
                        ))}
                    </Row>

                    <div className="text-center">
                        <Link
                            to="/jobs"
                            className="btn btn-lg btn-gradient"
                            style={{
                                padding: '0.75rem 2rem',
                                borderRadius: 'var(--radius-lg)',
                                fontWeight: 600
                            }}
                        >
                            Browse All Jobs →
                        </Link>
                    </div>
                </Container>
            </section>

            {/* How It Works Section */}
            <section className="py-5" style={{ background: 'var(--bg-secondary)' }}>
                <Container>
                    <div className="text-center mb-5">
                        <h2 className="fw-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                            How It Works
                        </h2>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            Get hired in three simple steps
                        </p>
                    </div>

                    <Row className="g-4">
                        <Col md={4}>
                            <div className="text-center p-4">
                                <div
                                    className="mb-3 mx-auto"
                                    style={{
                                        width: '80px',
                                        height: '80px',
                                        borderRadius: '50%',
                                        background: 'var(--gradient-primary)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '2rem'
                                    }}
                                >
                                    📝
                                </div>
                                <h4 style={{ color: 'var(--text-primary)' }}>Create Profile</h4>
                                <p style={{ color: 'var(--text-secondary)' }}>
                                    Sign up and build your professional profile in minutes
                                </p>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="text-center p-4">
                                <div
                                    className="mb-3 mx-auto"
                                    style={{
                                        width: '80px',
                                        height: '80px',
                                        borderRadius: '50%',
                                        background: 'var(--gradient-primary)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '2rem'
                                    }}
                                >
                                    🔍
                                </div>
                                <h4 style={{ color: 'var(--text-primary)' }}>Search Jobs</h4>
                                <p style={{ color: 'var(--text-secondary)' }}>
                                    Browse thousands of jobs and filter by your preferences
                                </p>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="text-center p-4">
                                <div
                                    className="mb-3 mx-auto"
                                    style={{
                                        width: '80px',
                                        height: '80px',
                                        borderRadius: '50%',
                                        background: 'var(--gradient-primary)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '2rem'
                                    }}
                                >
                                    🎯
                                </div>
                                <h4 style={{ color: 'var(--text-primary)' }}>Get Hired</h4>
                                <p style={{ color: 'var(--text-secondary)' }}>
                                    Apply with one click and track your application status
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* CTA Section */}
            <section className="py-5" style={{ background: 'var(--bg-primary)' }}>
                <Container>
                    <div
                        className="text-center p-5 text-white"
                        style={{
                            background: 'var(--gradient-primary)',
                            borderRadius: 'var(--radius-xl)'
                        }}
                    >
                        <h2 className="fw-bold mb-3">Ready to Start Your Journey?</h2>
                        <p className="mb-4" style={{ fontSize: '1.1rem', opacity: 0.9 }}>
                            Join thousands of professionals who found their dream jobs
                        </p>
                        <div className="d-flex gap-3 justify-content-center flex-wrap">
                            <Link
                                to="/register"
                                className="btn btn-light btn-lg"
                                style={{
                                    padding: '0.75rem 2rem',
                                    borderRadius: 'var(--radius-lg)',
                                    fontWeight: 600
                                }}
                            >
                                Sign Up Now
                            </Link>
                            <Link
                                to="/jobs"
                                className="btn btn-outline-light btn-lg"
                                style={{
                                    padding: '0.75rem 2rem',
                                    borderRadius: 'var(--radius-lg)',
                                    fontWeight: 600,
                                    border: '2px solid white'
                                }}
                            >
                                Browse Jobs
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    );
}

export default Home;
