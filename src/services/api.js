import jobsData from '../data/jobs.json';
import applicationsData from '../data/applications.json';

// Initialize localStorage with default data if not exists
const initializeData = () => {
  if (!localStorage.getItem('jobs')) {
    localStorage.setItem('jobs', JSON.stringify(jobsData));
  }
  if (!localStorage.getItem('applications')) {
    localStorage.setItem('applications', JSON.stringify(applicationsData));
  }
};

// Get all jobs
export const getJobs = () => {
  initializeData();
  const jobs = localStorage.getItem('jobs');
  return jobs ? JSON.parse(jobs) : [];
};

// Get job by ID
export const getJobById = (id) => {
  const jobs = getJobs();
  return jobs.find(job => job.id === parseInt(id));
};

// Search and filter jobs
export const searchJobs = (filters = {}) => {
  let jobs = getJobs();
  
  // Filter by search query
  if (filters.query) {
    const query = filters.query.toLowerCase();
    jobs = jobs.filter(job => 
      job.title.toLowerCase().includes(query) ||
      job.company.toLowerCase().includes(query) ||
      job.skills.some(skill => skill.toLowerCase().includes(query))
    );
  }
  
  // Filter by job type
  if (filters.type && filters.type !== 'all') {
    jobs = jobs.filter(job => job.type === filters.type);
  }
  
  // Filter by location
  if (filters.location && filters.location !== 'all') {
    jobs = jobs.filter(job => job.location.includes(filters.location));
  }
  
  // Filter by remote
  if (filters.remote !== undefined) {
    jobs = jobs.filter(job => job.remote === filters.remote);
  }
  
  // Filter by skills
  if (filters.skills && filters.skills.length > 0) {
    jobs = jobs.filter(job => 
      filters.skills.some(skill => 
        job.skills.some(jobSkill => 
          jobSkill.toLowerCase().includes(skill.toLowerCase())
        )
      )
    );
  }
  
  // Sort jobs
  if (filters.sortBy === 'date') {
    jobs.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
  } else if (filters.sortBy === 'applicants') {
    jobs.sort((a, b) => b.applicants - a.applicants);
  }
  
  return jobs;
};

// Get all applications
export const getApplications = () => {
  initializeData();
  const applications = localStorage.getItem('applications');
  return applications ? JSON.parse(applications) : [];
};

// Get applications for a specific user
export const getUserApplications = (userEmail) => {
  const applications = getApplications();
  return applications.filter(app => app.candidateEmail === userEmail);
};

// Get applications for a specific job
export const getJobApplications = (jobId) => {
  const applications = getApplications();
  return applications.filter(app => app.jobId === parseInt(jobId));
};

// Apply to a job
export const applyToJob = (jobId, candidateData) => {
  const applications = getApplications();
  
  // Check if already applied
  const existingApplication = applications.find(
    app => app.jobId === parseInt(jobId) && app.candidateEmail === candidateData.email
  );
  
  if (existingApplication) {
    throw new Error('You have already applied to this job');
  }
  
  const newApplication = {
    id: applications.length + 1,
    jobId: parseInt(jobId),
    candidateName: candidateData.name,
    candidateEmail: candidateData.email,
    status: 'Pending',
    appliedDate: new Date().toISOString().split('T')[0],
    resume: candidateData.resume || 'resume.pdf'
  };
  
  applications.push(newApplication);
  localStorage.setItem('applications', JSON.stringify(applications));
  
  // Update job applicant count
  const jobs = getJobs();
  const job = jobs.find(j => j.id === parseInt(jobId));
  if (job) {
    job.applicants = (job.applicants || 0) + 1;
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }
  
  return newApplication;
};

// Update application status
export const updateApplicationStatus = (applicationId, status) => {
  const applications = getApplications();
  const application = applications.find(app => app.id === parseInt(applicationId));
  
  if (application) {
    application.status = status;
    localStorage.setItem('applications', JSON.stringify(applications));
    return application;
  }
  
  throw new Error('Application not found');
};

// Post a new job (for recruiters)
export const postJob = (jobData) => {
  const jobs = getJobs();
  
  const newJob = {
    id: jobs.length + 1,
    ...jobData,
    postedDate: new Date().toISOString().split('T')[0],
    applicants: 0
  };
  
  jobs.push(newJob);
  localStorage.setItem('jobs', JSON.stringify(jobs));
  
  return newJob;
};

// Delete a job (for recruiters)
export const deleteJob = (jobId) => {
  const jobs = getJobs();
  const filteredJobs = jobs.filter(job => job.id !== parseInt(jobId));
  localStorage.setItem('jobs', JSON.stringify(filteredJobs));
  
  // Also delete related applications
  const applications = getApplications();
  const filteredApplications = applications.filter(app => app.jobId !== parseInt(jobId));
  localStorage.setItem('applications', JSON.stringify(filteredApplications));
};

// Get analytics data
export const getAnalytics = () => {
  const jobs = getJobs();
  const applications = getApplications();
  
  return {
    totalJobs: jobs.length,
    totalApplications: applications.length,
    activeJobs: jobs.filter(job => {
      const daysOld = Math.floor((new Date() - new Date(job.postedDate)) / (1000 * 60 * 60 * 24));
      return daysOld <= 30;
    }).length,
    pendingApplications: applications.filter(app => app.status === 'Pending').length,
    shortlistedApplications: applications.filter(app => app.status === 'Shortlisted').length,
    rejectedApplications: applications.filter(app => app.status === 'Rejected').length
  };
};

// Get job type distribution
export const getJobTypeDistribution = () => {
  const jobs = getJobs();
  const distribution = {};
  
  jobs.forEach(job => {
    distribution[job.type] = (distribution[job.type] || 0) + 1;
  });
  
  return distribution;
};

// Get applications over time
export const getApplicationsOverTime = () => {
  const applications = getApplications();
  const dateMap = {};
  
  applications.forEach(app => {
    dateMap[app.appliedDate] = (dateMap[app.appliedDate] || 0) + 1;
  });
  
  return Object.entries(dateMap)
    .sort((a, b) => new Date(a[0]) - new Date(b[0]))
    .map(([date, count]) => ({ date, count }));
};
