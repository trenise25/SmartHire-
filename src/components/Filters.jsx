import { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

function Filters({ onFilterChange }) {
    const [filters, setFilters] = useState({
        query: '',
        type: 'all',
        location: 'all',
        remote: undefined,
        sortBy: 'date'
    });

    const [searchTimeout, setSearchTimeout] = useState(null);

    // Debounced search
    useEffect(() => {
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        const timeout = setTimeout(() => {
            onFilterChange(filters);
        }, 300); // 300ms debounce

        setSearchTimeout(timeout);

        return () => {
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
        };
    }, [filters]);

    const handleChange = (field, value) => {
        setFilters(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleReset = () => {
        const resetFilters = {
            query: '',
            type: 'all',
            location: 'all',
            remote: undefined,
            sortBy: 'date'
        };
        setFilters(resetFilters);
        onFilterChange(resetFilters);
    };

    return (
        <div
            className="p-4 mb-4"
            style={{
                background: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-color)'
            }}
        >
            <h5 className="mb-3" style={{ color: 'var(--text-primary)' }}>
                🔍 Filter Jobs
            </h5>

            <Form>
                <Row className="g-3">
                    <Col md={12}>
                        <Form.Group>
                            <Form.Label style={{ color: 'var(--text-secondary)' }}>
                                Search
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Job title, company, or skills..."
                                value={filters.query}
                                onChange={(e) => handleChange('query', e.target.value)}
                                className="form-control-custom"
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
                        <Form.Group>
                            <Form.Label style={{ color: 'var(--text-secondary)' }}>
                                Job Type
                            </Form.Label>
                            <Form.Select
                                value={filters.type}
                                onChange={(e) => handleChange('type', e.target.value)}
                                style={{
                                    background: 'var(--bg-primary)',
                                    border: '2px solid var(--border-color)',
                                    color: 'var(--text-primary)',
                                    borderRadius: 'var(--radius-md)'
                                }}
                            >
                                <option value="all">All Types</option>
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Contract">Contract</option>
                                <option value="Internship">Internship</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group>
                            <Form.Label style={{ color: 'var(--text-secondary)' }}>
                                Location
                            </Form.Label>
                            <Form.Select
                                value={filters.location}
                                onChange={(e) => handleChange('location', e.target.value)}
                                style={{
                                    background: 'var(--bg-primary)',
                                    border: '2px solid var(--border-color)',
                                    color: 'var(--text-primary)',
                                    borderRadius: 'var(--radius-md)'
                                }}
                            >
                                <option value="all">All Locations</option>
                                <option value="Remote">Remote</option>
                                <option value="San Francisco">San Francisco</option>
                                <option value="New York">New York</option>
                                <option value="Austin">Austin</option>
                                <option value="Seattle">Seattle</option>
                                <option value="Boston">Boston</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group>
                            <Form.Label style={{ color: 'var(--text-secondary)' }}>
                                Remote Only
                            </Form.Label>
                            <Form.Check
                                type="checkbox"
                                label="Show only remote jobs"
                                checked={filters.remote === true}
                                onChange={(e) => handleChange('remote', e.target.checked ? true : undefined)}
                                style={{ color: 'var(--text-secondary)' }}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group>
                            <Form.Label style={{ color: 'var(--text-secondary)' }}>
                                Sort By
                            </Form.Label>
                            <Form.Select
                                value={filters.sortBy}
                                onChange={(e) => handleChange('sortBy', e.target.value)}
                                style={{
                                    background: 'var(--bg-primary)',
                                    border: '2px solid var(--border-color)',
                                    color: 'var(--text-primary)',
                                    borderRadius: 'var(--radius-md)'
                                }}
                            >
                                <option value="date">Most Recent</option>
                                <option value="applicants">Most Popular</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    <Col md={12}>
                        <Button
                            variant="outline-secondary"
                            onClick={handleReset}
                            className="w-100"
                            style={{
                                border: '2px solid var(--border-color)',
                                color: 'var(--text-secondary)',
                                borderRadius: 'var(--radius-md)'
                            }}
                        >
                            Reset Filters
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export default Filters;
