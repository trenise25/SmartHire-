import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';
import { login } from '../services/auth';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const user = login(formData.email, formData.password);

            // Redirect based on role
            if (user.role === 'recruiter') {
                navigate('/recruiter-dashboard');
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fillDemo = (role) => {
        if (role === 'candidate') {
            setFormData({
                email: 'candidate@demo.com',
                password: 'demo123',
                rememberMe: false
            });
        } else {
            setFormData({
                email: 'recruiter@demo.com',
                password: 'demo123',
                rememberMe: false
            });
        }
    };

    return (
        <div
            style={{
                background: 'var(--bg-primary)',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                paddingTop: '2rem',
                paddingBottom: '2rem'
            }}
        >
            <Container>
                <Row className="justify-content-center">
                    <Col md={6} lg={5}>
                        <div className="text-center mb-4">
                            <h1 className="fw-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                                Welcome Back
                            </h1>
                            <p style={{ color: 'var(--text-secondary)' }}>
                                Login to access your account
                            </p>
                        </div>

                        <Card
                            className="p-4"
                            style={{
                                background: 'var(--bg-secondary)',
                                border: '1px solid var(--border-color)',
                                borderRadius: 'var(--radius-lg)'
                            }}
                        >
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label style={{ color: 'var(--text-secondary)' }}>
                                        Email Address
                                    </Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="form-control-custom"
                                        style={{
                                            background: 'var(--bg-primary)',
                                            border: '2px solid var(--border-color)',
                                            color: 'var(--text-primary)',
                                            borderRadius: 'var(--radius-md)'
                                        }}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label style={{ color: 'var(--text-secondary)' }}>
                                        Password
                                    </Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        className="form-control-custom"
                                        style={{
                                            background: 'var(--bg-primary)',
                                            border: '2px solid var(--border-color)',
                                            color: 'var(--text-primary)',
                                            borderRadius: 'var(--radius-md)'
                                        }}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Check
                                        type="checkbox"
                                        name="rememberMe"
                                        label="Remember me"
                                        checked={formData.rememberMe}
                                        onChange={handleChange}
                                        style={{ color: 'var(--text-secondary)' }}
                                    />
                                </Form.Group>

                                {error && (
                                    <Alert variant="danger" className="mb-3">
                                        {error}
                                    </Alert>
                                )}

                                <Button
                                    type="submit"
                                    className="btn-gradient w-100 mb-3"
                                    disabled={loading}
                                    style={{
                                        padding: '0.75rem',
                                        borderRadius: 'var(--radius-md)',
                                        fontWeight: 600
                                    }}
                                >
                                    {loading ? 'Logging in...' : 'Login'}
                                </Button>

                                <div className="text-center">
                                    <p style={{ color: 'var(--text-secondary)' }}>
                                        Don't have an account?{' '}
                                        <Link to="/register" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>
                                            Sign Up
                                        </Link>
                                    </p>
                                </div>
                            </Form>
                        </Card>

                        {/* Demo Credentials */}
                        <div className="mt-4">
                            <Alert variant="info">
                                <h6 className="mb-2">Demo Credentials:</h6>
                                <div className="d-flex gap-2 flex-wrap">
                                    <Button
                                        variant="outline-primary"
                                        size="sm"
                                        onClick={() => fillDemo('candidate')}
                                    >
                                        Fill Candidate Demo
                                    </Button>
                                    <Button
                                        variant="outline-success"
                                        size="sm"
                                        onClick={() => fillDemo('recruiter')}
                                    >
                                        Fill Recruiter Demo
                                    </Button>
                                </div>
                            </Alert>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Login;
