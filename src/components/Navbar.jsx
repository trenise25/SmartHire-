import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar as BSNavbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { getCurrentUser, logout } from '../services/auth';

function Navbar() {
    const [darkMode, setDarkMode] = useState(false);
    const [user, setUser] = useState(null);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setDarkMode(true);
            document.documentElement.setAttribute('data-theme', 'dark');
        }

        // Get current user
        const currentUser = getCurrentUser();
        setUser(currentUser);

        // Handle scroll
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);

        if (newMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        }
    };

    const handleLogout = () => {
        logout();
        setUser(null);
        navigate('/');
    };

    return (
        <BSNavbar
            expand="lg"
            className={`py-3 ${scrolled ? 'navbar-scrolled' : ''}`}
            style={{
                background: scrolled ? 'var(--bg-primary)' : 'transparent',
                transition: 'all 0.3s ease',
                position: 'sticky',
                top: 0,
                zIndex: 1000
            }}
        >
            <Container>
                <BSNavbar.Brand as={Link} to="/" className="fw-bold fs-4">
                    <span className="gradient-text">SmartHire</span>
                </BSNavbar.Brand>

                <BSNavbar.Toggle aria-controls="basic-navbar-nav" />

                <BSNavbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center">
                        <Nav.Link as={Link} to="/" className="mx-2">Home</Nav.Link>
                        <Nav.Link as={Link} to="/jobs" className="mx-2">Jobs</Nav.Link>

                        {user ? (
                            <>
                                {user.role === 'candidate' && (
                                    <Nav.Link as={Link} to="/dashboard" className="mx-2">Dashboard</Nav.Link>
                                )}
                                {user.role === 'recruiter' && (
                                    <>
                                        <Nav.Link as={Link} to="/recruiter-dashboard" className="mx-2">Dashboard</Nav.Link>
                                        <Nav.Link as={Link} to="/analytics" className="mx-2">Analytics</Nav.Link>
                                    </>
                                )}

                                <NavDropdown
                                    title={user.name}
                                    id="user-dropdown"
                                    className="mx-2"
                                >
                                    <NavDropdown.Item onClick={handleLogout}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login" className="mx-2">Login</Nav.Link>
                                <Link to="/register" className="btn btn-primary ms-2">Sign Up</Link>
                            </>
                        )}

                        <button
                            onClick={toggleDarkMode}
                            className="btn btn-outline-secondary ms-3"
                            style={{
                                border: '2px solid var(--border-color)',
                                borderRadius: 'var(--radius-full)',
                                padding: '0.5rem 1rem',
                                background: 'var(--bg-primary)',
                                color: 'var(--text-primary)'
                            }}
                            aria-label="Toggle dark mode"
                        >
                            {darkMode ? '☀️' : '🌙'}
                        </button>
                    </Nav>
                </BSNavbar.Collapse>
            </Container>
        </BSNavbar>
    );
}

export default Navbar;
