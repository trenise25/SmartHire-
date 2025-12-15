import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';
import { register } from '../services/auth';

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'candidate'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const getPasswordStrength = (password) => {
        if (password.length === 0) return { strength: 0, label: '', color: '' };
        if (password.length < 6) return { strength: 33, label: 'Weak', color: 'danger' };
        if (password.length < 10) return { strength: 66, label: 'Medium', color: 'warning' };
        return { strength: 100, label: 'Strong', color: 'success' };
    };

    const passwordStrength = getPasswordStrength(formData.password);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        try {
            const user = register({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: formData.role
            });

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
                                Create Account
                            </h1>
                            <p style={{ color: 'var(--text-secondary)' }}>
                                Join SmartHire and find your dream job
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
                                        Full Name
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        placeholder="Enter your full name"
                                        value={formData.name}
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
                                        placeholder="Create a password"
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
                                    {formData.password && (
                                        <div className="mt-2">
                                            <div
                                                className="progress"
                                                style={{ height: '5px', background: 'var(--border-color)' }}
                                            >
                                                <div
                                                    className={`progress-bar bg-${passwordStrength.color}`}
                                                    style={{ width: `${passwordStrength.strength}%` }}
                                                ></div>
                                            </div>
                                            <small style={{ color: `var(--${passwordStrength.color}-color)` }}>
                                                {passwordStrength.label}
                                            </small>
                                        </div>
                                    )}
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label style={{ color: 'var(--text-secondary)' }}>
                                        Confirm Password
                                    </Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirm your password"
                                        value={formData.confirmPassword}
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
                                        I am a...
                                    </Form.Label>
                                    <div>
                                        <Form.Check
                                            type="radio"
                                            name="role"
                                            value="candidate"
                                            label="Candidate (Looking for jobs)"
                                            checked={formData.role === 'candidate'}
                                            onChange={handleChange}
                                            style={{ color: 'var(--text-secondary)' }}
                                            className="mb-2"
                                        />
                                        <Form.Check
                                            type="radio"
                                            name="role"
                                            value="recruiter"
                                            label="Recruiter (Hiring talent)"
                                            checked={formData.role === 'recruiter'}
                                            onChange={handleChange}
                                            style={{ color: 'var(--text-secondary)' }}
                                        />
                                    </div>
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
                                    {loading ? 'Creating Account...' : 'Sign Up'}
                                </Button>

                                <div className="text-center">
                                    <p style={{ color: 'var(--text-secondary)' }}>
                                        Already have an account?{' '}
                                        <Link to="/login" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>
                                            Login
                                        </Link>
                                    </p>
                                </div>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Register;
