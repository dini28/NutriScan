import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    MapPin,
    Clock,
    Package,
    AlertTriangle,
    ChevronRight,
    ShieldCheck,
    Truck,
    RotateCcw,
    CheckCircle
} from 'lucide-react';

const NGODashboard = ({ listings, onUpdateDonation }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('find'); // 'find' or 'pickups'

    const availableListings = listings.filter(l => l.status === 'available');
    const myPickups = listings.filter(l => l.status === 'claimed' || l.status === 'picked-up');

    const displayListings = activeTab === 'find'
        ? availableListings.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.restaurant.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : myPickups;

    return (
        <div className="ngo-dashboard">
            <div className="dashboard-tabs">
                <button
                    className={`tab-btn ${activeTab === 'find' ? 'active' : ''}`}
                    onClick={() => setActiveTab('find')}
                >
                    <Search size={18} />
                    <span>Find Fresh Food</span>
                    {availableListings.length > 0 && <span className="tab-count">{availableListings.length}</span>}
                </button>
                <button
                    className={`tab-btn ${activeTab === 'pickups' ? 'active' : ''}`}
                    onClick={() => setActiveTab('pickups')}
                >
                    <Truck size={18} />
                    <span>My Pickups</span>
                    {myPickups.filter(l => l.status === 'claimed').length > 0 && (
                        <span className="tab-count warning">{myPickups.filter(l => l.status === 'claimed').length}</span>
                    )}
                </button>
            </div>

            <div className="dashboard-controls">
                {activeTab === 'find' && (
                    <div className="search-bar">
                        <Search size={20} />
                        <input
                            type="text"
                            placeholder="Search by food item or restaurant..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                )}
                <div className="stats-row-mini">
                    <div className="mini-stat">
                        <span className="mini-stat-label">Available Near You</span>
                        <span className="mini-stat-value">{availableListings.length}</span>
                    </div>
                    <div className="mini-stat">
                        <span className="mini-stat-label">Successful Pickups</span>
                        <span className="mini-stat-value">{myPickups.filter(l => l.status === 'picked-up').length}</span>
                    </div>
                </div>
            </div>

            <div className="listings-grid-dash">
                <AnimatePresence mode="popLayout">
                    {displayListings.map((item) => (
                        <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className={`dash-card ${item.status === 'claimed' ? 'claimed' : ''} ${item.status === 'picked-up' ? 'picked-up' : ''}`}
                        >
                            <div className="dash-card-header">
                                <div>
                                    <div className="card-top-info">
                                        <h3>{item.name}</h3>
                                        {item.status === 'picked-up' && (
                                            <span className="status-badge success">
                                                <CheckCircle size={10} />
                                                Completed
                                            </span>
                                        )}
                                    </div>
                                    <span className="restaurant-name">{item.restaurant}</span>
                                </div>
                                {item.urgent && item.status === 'available' && (
                                    <div className="urgent-badge-mini">
                                        <AlertTriangle size={12} />
                                        <span>Urgent</span>
                                    </div>
                                )}
                            </div>

                            <div className="dash-card-body">
                                <div className="dash-meta">
                                    <div className="meta-row">
                                        <MapPin size={14} />
                                        <span>{item.location} ({item.distance})</span>
                                    </div>
                                    <div className="meta-row">
                                        <Package size={14} />
                                        <span>{item.portions} portions available</span>
                                    </div>
                                    <div className="meta-row">
                                        <Clock size={14} />
                                        <span>{item.status === 'picked-up' ? 'Picked up ' + item.timeAgo : 'Expires in ' + item.expires}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="dash-card-footer">
                                {item.status === 'available' ? (
                                    <button
                                        className="claim-action-btn"
                                        onClick={() => onUpdateDonation(item.id, { status: 'claimed' })}
                                    >
                                        <span>Claim This Donation</span>
                                        <ChevronRight size={18} />
                                    </button>
                                ) : item.status === 'claimed' ? (
                                    <div className="pickup-actions">
                                        <button
                                            className="pickup-complete-btn"
                                            onClick={() => onUpdateDonation(item.id, { status: 'picked-up', timeAgo: 'just now' })}
                                        >
                                            <Truck size={18} />
                                            <span>Mark as Picked Up</span>
                                        </button>
                                        <button
                                            className="pickup-cancel-btn"
                                            onClick={() => onUpdateDonation(item.id, { status: 'available' })}
                                            title="Cancel Pickup"
                                        >
                                            <RotateCcw size={18} />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="completed-notice">
                                        <ShieldCheck size={18} />
                                        <span>Food Rescued & Verified</span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {displayListings.length === 0 && (
                <div className="empty-dash">
                    <Package size={48} />
                    <p>{activeTab === 'find' ? 'No food listings available right now.' : 'You haven\'t claimed any food yet.'}</p>
                </div>
            )}
        </div>
    );
};

export default NGODashboard;
