import { motion } from 'framer-motion';
import NGODashboard from './NGODashboard';
import RestaurantDashboard from './RestaurantDashboard';
import './Dashboard.css';

const Dashboard = ({ user, listings, onAddDonation, onUpdateDonation }) => {
    return (
        <div className="dashboard-page">
            <div className="dashboard-container">
                <motion.div
                    className="dashboard-header"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="dashboard-title-group">
                        <span className="dashboard-badge">Dashboard</span>
                        <h2>Welcome back, <span className="highlight">{user.role === 'ngo' ? 'Partner NGO' : 'Partner Restaurant'}</span></h2>
                        <p>Manage your food {user.role === 'ngo' ? 'collections' : 'donations'} and track your social impact.</p>
                    </div>
                </motion.div>

                {user.role === 'ngo' ? (
                    <NGODashboard
                        listings={listings}
                        onUpdateDonation={onUpdateDonation}
                    />
                ) : (
                    <RestaurantDashboard
                        listings={listings}
                        onAddDonation={onAddDonation}
                        onUpdateDonation={onUpdateDonation}
                    />
                )}
            </div>
        </div>
    );
};

export default Dashboard;
