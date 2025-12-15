import { useState, useEffect } from 'react';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import { searchJobs } from '../services/api';
import JobCard from '../components/JobCard';
import Filters from '../components/Filters';

function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const jobsPerPage = 9;

    useEffect(() => {
        // Get initial jobs
        const allJobs = searchJobs();
        setJobs(allJobs);
        setFilteredJobs(allJobs);
        setLoading(false);

        // Check for search query in URL
        const params = new URLSearchParams(window.location.search);
        const query = params.get('q');
        if (query) {
            handleFilterChange({ query });
        }
    }, []);

    const handleFilterChange = (filters) => {
        setLoading(true);
        setTimeout(() => {
            const results = searchJobs(filters);
            setFilteredJobs(results);
            setCurrentPage(1); // Reset to first page
            setLoading(false);
        }, 300);
    };

    // Pagination logic
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
    const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', paddingTop: '2rem', paddingBottom: '2rem' }}>
            <Container>
                <div className="mb-4">
                    <h1 className="fw-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                        Browse Jobs
                    </h1>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Showing {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''}
                    </p>
                </div>

                <Row>
                    {/* Filters Sidebar */}
                    <Col lg={3} className="mb-4">
                        <Filters onFilterChange={handleFilterChange} />
                    </Col>

                    {/* Jobs Grid */}
                    <Col lg={9}>
                        {loading ? (
                            <div className="text-center py-5">
                                <div className="spinner mx-auto"></div>
                                <p className="mt-3" style={{ color: 'var(--text-secondary)' }}>
                                    Loading jobs...
                                </p>
                            </div>
                        ) : filteredJobs.length === 0 ? (
                            <div className="text-center py-5">
                                <h3 style={{ color: 'var(--text-secondary)' }}>
                                    No jobs found
                                </h3>
                                <p style={{ color: 'var(--text-tertiary)' }}>
                                    Try adjusting your filters
                                </p>
                            </div>
                        ) : (
                            <>
                                <Row className="g-4 mb-4">
                                    {currentJobs.map((job) => (
                                        <Col key={job.id} md={6} xl={4}>
                                            <JobCard job={job} />
                                        </Col>
                                    ))}
                                </Row>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="d-flex justify-content-center mt-4">
                                        <Pagination>
                                            <Pagination.Prev
                                                onClick={() => paginate(currentPage - 1)}
                                                disabled={currentPage === 1}
                                            />

                                            {[...Array(totalPages)].map((_, index) => {
                                                const pageNumber = index + 1;
                                                // Show first, last, current, and adjacent pages
                                                if (
                                                    pageNumber === 1 ||
                                                    pageNumber === totalPages ||
                                                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                                                ) {
                                                    return (
                                                        <Pagination.Item
                                                            key={pageNumber}
                                                            active={pageNumber === currentPage}
                                                            onClick={() => paginate(pageNumber)}
                                                        >
                                                            {pageNumber}
                                                        </Pagination.Item>
                                                    );
                                                } else if (
                                                    pageNumber === currentPage - 2 ||
                                                    pageNumber === currentPage + 2
                                                ) {
                                                    return <Pagination.Ellipsis key={pageNumber} />;
                                                }
                                                return null;
                                            })}

                                            <Pagination.Next
                                                onClick={() => paginate(currentPage + 1)}
                                                disabled={currentPage === totalPages}
                                            />
                                        </Pagination>
                                    </div>
                                )}
                            </>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Jobs;
