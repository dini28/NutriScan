import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShieldCheck,
    Clock,
    MapPin,
    Users,
    Building2,
    ChevronDown,
    ArrowRight,
    Star,
    Flame
} from 'lucide-react';
import { listings } from '../../../data/listings';
import './Menu.css';

const Menu = () => {
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [expandedId, setExpandedId] = useState(null);

    const filters = [
        { value: 'all', label: 'All', count: listings.length },
        { value: 'urgent', label: 'Urgent', count: listings.filter(i => i.urgent).length },
        { value: 'nearby', label: 'Nearby', count: listings.filter(i => parseFloat(i.distance) < 3).length },
        { value: 'high-score', label: 'Top Rated', count: listings.filter(i => i.freshness > 95).length }
    ];

    const getFreshnessColor = (score) => {
        if (score >= 97) return { bg: '#ecfdf5', text: '#059669', icon: '#10b981' };
        if (score >= 94) return { bg: '#f0fdf4', text: '#16a34a', icon: '#22c55e' };
        return { bg: '#fffbeb', text: '#d97706', icon: '#f59e0b' };
    };

    const filteredListings = listings.filter(item => {
        if (selectedFilter === 'all') return true;
        if (selectedFilter === 'urgent') return item.urgent;
        if (selectedFilter === 'nearby') return parseFloat(item.distance) < 3;
        if (selectedFilter === 'high-score') return item.freshness > 95;
        return true;
    });

    return (
        <section className="menu-section" id="food-menu">
            <div className="menu-wrap">

                {/* Header */}
                <motion.div
                    className="menu-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="live-badge">
                        <span className="live-dot"></span>
                        Live Feed
                    </div>

                    <h2>Available <span className="highlight">Food Listings</span></h2>

                    <p>Real-time surplus food ready for immediate NGO pickup and community distribution.</p>
                </motion.div>

                {/* Quick Stats */}
                <motion.div
                    className="quick-stats"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <div className="stat">
                        <span className="stat-num">{listings.length}</span>
                        <span className="stat-text">Active Now</span>
                    </div>
                    <div className="stat">
                        <span className="stat-num">{listings.reduce((sum, item) => sum + item.portions, 0)}</span>
                        <span className="stat-text">Total Portions</span>
                    </div>
                    <div className="stat">
                        <span className="stat-num">{listings.filter(i => i.urgent).length}</span>
                        <span className="stat-text">Urgent</span>
                    </div>
                </motion.div>

                {/* Filters */}
                <motion.div
                    className="filters"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {filters.map((filter) => (
                        <motion.button
                            key={filter.value}
                            className={`filter-chip ${selectedFilter === filter.value ? 'active' : ''}`}
                            onClick={() => setSelectedFilter(filter.value)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {filter.label}
                            <span className="chip-count">{filter.count}</span>
                        </motion.button>
                    ))}
                </motion.div>

                {/* Listings */}
                <div className="listings">
                    <AnimatePresence mode="popLayout">
                        {filteredListings.map((item, i) => {
                            const colors = getFreshnessColor(item.freshness);
                            const isExpanded = expandedId === item.id;

                            return (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3, delay: i * 0.05 }}
                                    className="listing"
                                >
                                    {/* Urgent Banner */}
                                    {item.urgent && (
                                        <motion.div
                                            className="urgent-banner"
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            <Flame size={14} />
                                            Urgent Pickup Required
                                        </motion.div>
                                    )}

                                    <div className="listing-main">
                                        {/* Left Info */}
                                        <div className="listing-info">
                                            <h3 className="listing-title">{item.name}</h3>

                                            <div className="listing-meta">
                                                <span className="meta-item">
                                                    <Building2 size={14} />
                                                    {item.restaurant}
                                                </span>
                                                <span className="meta-sep">•</span>
                                                <span className="meta-item">
                                                    <MapPin size={14} />
                                                    {item.location}
                                                </span>
                                                <span className="meta-sep">•</span>
                                                <span className="meta-item">
                                                    <Clock size={14} />
                                                    {item.timeAgo} ago
                                                </span>
                                            </div>

                                            <div className="listing-tags">
                                                <span className="tag category-tag">{item.category}</span>
                                                <span className="tag">{item.distance} away</span>
                                                <span className="tag">{item.pickup}</span>
                                            </div>
                                        </div>

                                        {/* Right Stats */}
                                        <div className="listing-stats">
                                            {/* Portions */}
                                            <div className="stat-card">
                                                <Users size={18} color="#10b981" />
                                                <div className="stat-card-info">
                                                    <span className="stat-card-num">{item.portions}</span>
                                                    <span className="stat-card-label">servings</span>
                                                </div>
                                            </div>

                                            {/* Freshness */}
                                            <motion.div
                                                className="freshness-pill"
                                                style={{
                                                    backgroundColor: colors.bg,
                                                    color: colors.text
                                                }}
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                <ShieldCheck size={16} color={colors.icon} />
                                                <span className="freshness-num">{item.freshness}%</span>
                                            </motion.div>

                                            {/* Action Button */}
                                            <motion.button
                                                className="claim-btn"
                                                whileHover={{ scale: 1.05, x: 4 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                                            >
                                                {isExpanded ? 'Close' : 'Claim'}
                                                <ArrowRight size={16} />
                                            </motion.button>
                                        </div>
                                    </div>

                                    {/* Expanded Details */}
                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                className="listing-details"
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <div className="details-grid">
                                                    <div className="detail-item">
                                                        <span className="detail-label">Expires in</span>
                                                        <span className="detail-value">{item.expires}</span>
                                                    </div>
                                                    <div className="detail-item">
                                                        <span className="detail-label">Pickup Window</span>
                                                        <span className="detail-value">Next 3 hours</span>
                                                    </div>
                                                    <div className="detail-item">
                                                        <span className="detail-label">Storage</span>
                                                        <span className="detail-value">Refrigerated</span>
                                                    </div>
                                                    <div className="detail-item">
                                                        <span className="detail-label">Contact</span>
                                                        <span className="detail-value">View Number</span>
                                                    </div>
                                                </div>

                                                <motion.button
                                                    className="confirm-btn"
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <ShieldCheck size={18} />
                                                    Confirm Pickup Request
                                                </motion.button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {/* Load More */}
                {filteredListings.length > 0 && (
                    <motion.div
                        className="load-more"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <motion.button
                            className="load-more-btn"
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Load More Listings
                            <ChevronDown size={18} />
                        </motion.button>
                        <p className="helper-text">
                            <Star size={14} />
                            All listings are quality verified
                        </p>
                    </motion.div>
                )}

                {/* Empty State */}
                {filteredListings.length === 0 && (
                    <motion.div
                        className="empty-state"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        {/* Filter icon placeholder or usage */}
                        <h3>No listings found</h3>
                        <p>Try adjusting your filters or check back later</p>
                        <motion.button
                            className="reset-btn"
                            onClick={() => setSelectedFilter('all')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Reset Filters
                        </motion.button>
                    </motion.div>
                )}

            </div>
        </section>
    );
};

export default Menu;
