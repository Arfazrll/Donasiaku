import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import DashboardDonatur from './features/donatur/DashboardDonatur';
import FormDonasi from './features/donatur/FormDonasi';
import EditDonasi from './features/donatur/EditDonasi';
import NotFound from './pages/NotFound';
import { isAuthenticated, getUserRole } from './utils/localStorage';

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && getUserRole() !== requiredRole) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          
          {/* Protected Routes - Donatur */}
          <Route 
            path="dashboard-donatur" 
            element={
              <ProtectedRoute requiredRole="donatur">
                <DashboardDonatur />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="donasi/buat" 
            element={
              <ProtectedRoute requiredRole="donatur">
                <FormDonasi />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="donasi/edit/:id" 
            element={
              <ProtectedRoute requiredRole="donatur">
                <EditDonasi />
              </ProtectedRoute>
            } 
          />
          
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;