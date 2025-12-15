import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../services/auth';

function ProtectedRoute({ children, requiredRole }) {
    const user = getCurrentUser();

    // Not authenticated
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Check role if specified
    if (requiredRole && user.role !== requiredRole) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;
