import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../features/authSlice';

const Sidebar = () => {
  const dispatch = useDispatch();

  return (
    <div className="bg-light p-3" style={{ width: '200px', height: '100vh' }}>
      <h4>Menu</h4>
      <ul className="nav flex-column">
        <li className="nav-item mb-2"><Link to="/dashboard" className="nav-link">Dashboard</Link></li>
        <li className="nav-item mb-2"><Link to="/customers" className="nav-link">Customers</Link></li>
        <li className="nav-item mb-2"><Link to="/leads" className="nav-link">Leads</Link></li>
        <li className="nav-item mb-2"><Link to="/products" className="nav-link">Products</Link></li>
        <li className="nav-item mt-4">
          <button className="btn btn-danger w-100" onClick={() => dispatch(logout())}>Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
