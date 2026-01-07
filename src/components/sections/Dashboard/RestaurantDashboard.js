import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Utensils,
    MapPin,
    Clock,
    ShieldCheck,
    CheckCircle,
    X,
    Trash2,
    AlertCircle
} from 'lucide-react';

const RestaurantDashboard = ({ listings, onAddDonation, onUpdateDonation }) => {
    const [showAddForm, setShowAddForm] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        portions: '',
        category: 'Vegetarian',
        location: '',
        expires: '',
        urgent: false
    });

    // Filter listings to show "your" donations (for demo, showing all or items added)
    const myDonationItems = listings.filter(item => item.restaurant === "Green Palace" || item.id > 6);

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddDonation({
            ...formData,
            restaurant: "Green Palace", // Simulated current user restaurant
        });
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
            setShowAddForm(false);
            setFormData({
                name: '',
                portions: '',
                category: 'Vegetarian',
                location: '',
                expires: '',
                urgent: false
            });
        }, 1500);
    };

    return (
        <div className="restaurant-dashboard">
            <div className="dash-hero-actions">
                <div className="dash-stats-panel">
                    <div className="panel-stat">
                        <span className="stat-v">172</span>
                        <span className="stat-l">Total Donations</span>
                    </div>
                    <div className="panel-stat">
                        <span className="stat-v">2,580</span>
                        <span className="stat-l">Portions Served</span>
                    </div>
                    <div className="panel-stat">
                        <span className="stat-v">4.9</span>
                        <span className="stat-l">Impact Rating</span>
                    </div>
                </div>

                <button
                    className="add-donation-btn"
                    onClick={() => setShowAddForm(true)}
                >
                    <Plus size={20} />
                    <span>Post New Donation</span>
                </button>
            </div>

            <AnimatePresence>
                {showAddForm && (
                    <motion.div
                        className="donation-form-container"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <div className="form-header">
                            <h3>Post Surplus Food</h3>
                            <button className="close-form" onClick={() => setShowAddForm(false)}><X size={20} /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="donation-form">
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Food Item Name</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Mixed Vegetable Curry"
                                        required
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Portions</label>
                                    <input
                                        type="number"
                                        placeholder="e.g. 25"
                                        required
                                        value={formData.portions}
                                        onChange={e => setFormData({ ...formData, portions: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        <option>Vegetarian</option>
                                        <option>Grain Base</option>
                                        <option>Protein Rich</option>
                                        <option>Fresh Produce</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Pickup Location</label>
                                    <div className="input-with-icon">
                                        <MapPin size={16} />
                                        <input
                                            type="text"
                                            placeholder="e.g. Sitapura, Jaipur"
                                            required
                                            value={formData.location}
                                            onChange={e => setFormData({ ...formData, location: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Expires In</label>
                                    <div className="input-with-icon">
                                        <Clock size={16} />
                                        <input
                                            type="text"
                                            placeholder="e.g. 3 hours"
                                            required
                                            value={formData.expires}
                                            onChange={e => setFormData({ ...formData, expires: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="form-group checkbox-group">
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={formData.urgent}
                                            onChange={e => setFormData({ ...formData, urgent: e.target.checked })}
                                        />
                                        <span>Mark as Urgent (Needs pickup within 1 hour)</span>
                                    </label>
                                </div>
                            </div>

                            <button type="submit" className="submit-form-btn" disabled={success}>
                                {success ? (
                                    <>
                                        <CheckCircle size={20} />
                                        <span>Submission Successful!</span>
                                    </>
                                ) : (
                                    <>
                                        <ShieldCheck size={20} />
                                        <span>Verify & Post Listing</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="manage-donations">
                <div className="section-header-dash">
                    <h3>Your Active Listings</h3>
                    <p>Real-time status of your contributions</p>
                </div>

                <div className="donation-items-list">
                    <AnimatePresence mode="popLayout">
                        {myDonationItems.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                className={`donation-item-row ${item.status}`}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                            >
                                <div className="item-main-info">
                                    <div className="item-icon-circle">
                                        <Utensils size={20} />
                                    </div>
                                    <div>
                                        <h4>{item.name}</h4>
                                        <span className="item-meta-dash">{item.portions} portions • {item.category}</span>
                                    </div>
                                </div>

                                <div className="item-status-pill">
                                    <span className={`pill ${item.status}`}>
                                        {item.status === 'available' && <Clock size={12} />}
                                        {item.status === 'claimed' && <AlertCircle size={12} />}
                                        {item.status === 'picked-up' && <CheckCircle size={12} />}
                                        {item.status}
                                    </span>
                                </div>

                                <div className="item-time-info">
                                    <span className="time-label">Added</span>
                                    <span className="time-value">{item.timeAgo}</span>
                                </div>

                                <div className="item-row-actions">
                                    {item.status === 'available' ? (
                                        <button className="delete-item-btn" title="Remove Listing">
                                            <Trash2 size={18} />
                                        </button>
                                    ) : (
                                        <div className="action-placeholder">
                                            <ShieldCheck size={18} />
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {myDonationItems.length === 0 && (
                        <div className="empty-state-mini">
                            <p>You haven't posted any donations yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RestaurantDashboard;
