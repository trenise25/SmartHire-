import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { getAnalytics, getJobTypeDistribution, getApplicationsOverTime } from '../services/api';
import KPICard from '../components/KPICard';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

function Analytics() {
    const [analytics, setAnalytics] = useState(null);
    const [jobTypeData, setJobTypeData] = useState(null);
    const [applicationsOverTime, setApplicationsOverTime] = useState(null);

    useEffect(() => {
        // Get analytics data
        const analyticsData = getAnalytics();
        setAnalytics(analyticsData);

        // Get job type distribution
        const typeDistribution = getJobTypeDistribution();
        setJobTypeData({
            labels: Object.keys(typeDistribution),
            datasets: [{
                label: 'Jobs by Type',
                data: Object.values(typeDistribution),
                backgroundColor: [
                    'rgba(99, 102, 241, 0.8)',
                    'rgba(236, 72, 153, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                ],
                borderColor: [
                    'rgb(99, 102, 241)',
                    'rgb(236, 72, 153)',
                    'rgb(16, 185, 129)',
                    'rgb(245, 158, 11)',
                ],
                borderWidth: 2
            }]
        });

        // Get applications over time
        const appsOverTime = getApplicationsOverTime();
        setApplicationsOverTime({
            labels: appsOverTime.map(item => new Date(item.date).toLocaleDateString()),
            datasets: [{
                label: 'Applications',
                data: appsOverTime.map(item => item.count),
                borderColor: 'rgb(99, 102, 241)',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                tension: 0.4,
                fill: true
            }]
        });
    }, []);

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: 'var(--text-primary)',
                    font: {
                        size: 12
                    }
                }
            },
            title: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: 'var(--text-secondary)'
                },
                grid: {
                    color: 'var(--border-color)'
                }
            },
            x: {
                ticks: {
                    color: 'var(--text-secondary)'
                },
                grid: {
                    color: 'var(--border-color)'
                }
            }
        }
    };

    const pieOptions = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    color: 'var(--text-primary)',
                    font: {
                        size: 12
                    }
                }
            }
        }
    };

    if (!analytics) {
        return (
            <Container className="py-5 text-center">
                <div className="spinner mx-auto"></div>
            </Container>
        );
    }

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', paddingTop: '2rem', paddingBottom: '2rem' }}>
            <Container>
                <h1 className="fw-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                    Analytics Dashboard
                </h1>

                {/* KPI Cards */}
                <Row className="g-4 mb-4">
                    <Col md={3}>
                        <KPICard
                            title="Total Jobs"
                            value={analytics.totalJobs}
                            icon="💼"
                            color="primary"
                        />
                    </Col>
                    <Col md={3}>
                        <KPICard
                            title="Total Applications"
                            value={analytics.totalApplications}
                            icon="📝"
                            color="success"
                        />
                    </Col>
                    <Col md={3}>
                        <KPICard
                            title="Active Jobs"
                            value={analytics.activeJobs}
                            icon="🚀"
                            color="info"
                        />
                    </Col>
                    <Col md={3}>
                        <KPICard
                            title="Pending Applications"
                            value={analytics.pendingApplications}
                            icon="⏳"
                            color="warning"
                        />
                    </Col>
                </Row>

                {/* Application Status Breakdown */}
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
                            <h3 className="fw-bold mb-1" style={{ color: 'var(--warning-color)' }}>
                                {analytics.pendingApplications}
                            </h3>
                            <p className="mb-0" style={{ color: 'var(--text-secondary)' }}>
                                Pending
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
                            <h3 className="fw-bold mb-1" style={{ color: 'var(--success-color)' }}>
                                {analytics.shortlistedApplications}
                            </h3>
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
                            <h3 className="fw-bold mb-1" style={{ color: 'var(--danger-color)' }}>
                                {analytics.rejectedApplications}
                            </h3>
                            <p className="mb-0" style={{ color: 'var(--text-secondary)' }}>
                                Rejected
                            </p>
                        </div>
                    </Col>
                </Row>

                {/* Charts */}
                <Row className="g-4">
                    {/* Applications Over Time */}
                    <Col lg={8}>
                        <div
                            className="p-4"
                            style={{
                                background: 'var(--bg-secondary)',
                                borderRadius: 'var(--radius-lg)',
                                border: '1px solid var(--border-color)'
                            }}
                        >
                            <h4 className="mb-4" style={{ color: 'var(--text-primary)' }}>
                                Applications Over Time
                            </h4>
                            {applicationsOverTime && (
                                <Line data={applicationsOverTime} options={chartOptions} />
                            )}
                        </div>
                    </Col>

                    {/* Job Type Distribution */}
                    <Col lg={4}>
                        <div
                            className="p-4"
                            style={{
                                background: 'var(--bg-secondary)',
                                borderRadius: 'var(--radius-lg)',
                                border: '1px solid var(--border-color)',
                                height: '100%'
                            }}
                        >
                            <h4 className="mb-4" style={{ color: 'var(--text-primary)' }}>
                                Job Type Distribution
                            </h4>
                            {jobTypeData && (
                                <Pie data={jobTypeData} options={pieOptions} />
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Analytics;
