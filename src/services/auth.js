// Authentication service using localStorage

// Demo users
const DEMO_USERS = [
    {
        id: 1,
        name: 'John Doe',
        email: 'candidate@demo.com',
        password: 'demo123',
        role: 'candidate'
    },
    {
        id: 2,
        name: 'Jane Recruiter',
        email: 'recruiter@demo.com',
        password: 'demo123',
        role: 'recruiter'
    }
];

// Initialize users in localStorage
const initializeUsers = () => {
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify(DEMO_USERS));
    }
};

// Register a new user
export const register = (userData) => {
    initializeUsers();
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if user already exists
    const existingUser = users.find(user => user.email === userData.email);
    if (existingUser) {
        throw new Error('User with this email already exists');
    }

    // Create new user
    const newUser = {
        id: users.length + 1,
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: userData.role || 'candidate'
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Auto login after registration
    const userSession = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
    };

    localStorage.setItem('currentUser', JSON.stringify(userSession));

    return userSession;
};

// Login user
export const login = (email, password) => {
    initializeUsers();
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        throw new Error('Invalid email or password');
    }

    // Create session
    const userSession = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    };

    localStorage.setItem('currentUser', JSON.stringify(userSession));

    return userSession;
};

// Logout user
export const logout = () => {
    localStorage.removeItem('currentUser');
};

// Get current logged-in user
export const getCurrentUser = () => {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
};

// Check if user is authenticated
export const isAuthenticated = () => {
    return getCurrentUser() !== null;
};

// Check if user has specific role
export const hasRole = (role) => {
    const user = getCurrentUser();
    return user && user.role === role;
};

// Update user profile
export const updateProfile = (userData) => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        throw new Error('No user logged in');
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.id === currentUser.id);

    if (userIndex !== -1) {
        users[userIndex] = {
            ...users[userIndex],
            ...userData,
            id: currentUser.id, // Preserve ID
            email: currentUser.email // Preserve email
        };

        localStorage.setItem('users', JSON.stringify(users));

        // Update current session
        const updatedSession = {
            id: currentUser.id,
            name: userData.name || currentUser.name,
            email: currentUser.email,
            role: currentUser.role
        };

        localStorage.setItem('currentUser', JSON.stringify(updatedSession));

        return updatedSession;
    }

    throw new Error('User not found');
};
