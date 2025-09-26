import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CustomerManagement from './pages/CustomerManagement';
import LeadManagement from './pages/LeadManagement';
import ProductManagement from './pages/ProductManagement';
import Sidebar from './components/sidebar';

function App() {
  const token = useSelector(state => state.auth?.token);

  return (
    <Router>
      {token ? (
        <div className="d-flex">
          <Sidebar />
          <div className="flex-grow-1 p-3">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/customers" element={<CustomerManagement />} />
              <Route path="/leads" element={<LeadManagement />} />
              <Route path="/products" element={<ProductManagement />} />
              {/* Catch-all for unknown routes */}
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* Redirect any unauthenticated route to /login */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
