import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    HeartHandshake,
    Heart,
    Users,
    MapPin,
    Star,
    Utensils,
    Building2,
    ArrowRight,
    X,
    Search
} from 'lucide-react';
import { restaurants, ngos } from '../../../data/partners';
import PartnerModal from './PartnerModal';
import './Partners.css';

const Partners = () => {
    const [activeTab, setActiveTab] = useState('restaurants');
    const [hoveredId, setHoveredId] = useState(null);
    const [selectedPartner, setSelectedPartner] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const totalRestaurantStats = {
        donations: restaurants.reduce((sum, r) => sum + r.totalDonations, 0),
        portions: restaurants.reduce((sum, r) => sum + r.portionsServed, 0),
        partners: restaurants.length
    };

    const totalNGOStats = {
        served: ngos.reduce((sum, n) => sum + n.peopleServed, 0),
        partners: ngos.length,
        locations: ngos.length * 3
    };

    const data = activeTab === 'restaurants' ? restaurants : ngos;

    const filteredData = data.filter(partner =>
        partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        partner.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section className="partners-section" id="partners">
            <div className="partners-wrap">

                {/* Header */}
                <motion.div
                    className="partners-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-badge">
                        <HeartHandshake size={16} />
                        Our Partners
                    </span>

                    <h2>
                        Building a <span className="highlight">Hunger-Free</span> Community
                    </h2>

                    <p>
                        Join our network of restaurants and NGOs working together to eliminate food waste
                        and feed those in need.
                    </p>
                </motion.div>

                {/* Impact Stats */}
                <motion.div
                    className="impact-banner"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <div className="impact-stat">
                        <div className="impact-icon" style={{ background: '#ecfdf5', color: '#10b981' }}>
                            <Utensils size={24} />
                        </div>
                        <div className="impact-info">
                            <span className="impact-num">{totalRestaurantStats.partners}</span>
                            <span className="impact-label">Restaurant Partners</span>
                        </div>
                    </div>

                    <div className="impact-divider"></div>

                    <div className="impact-stat">
                        <div className="impact-icon" style={{ background: '#eff6ff', color: '#3b82f6' }}>
                            <Heart size={24} />
                        </div>
                        <div className="impact-info">
                            <span className="impact-num">{totalNGOStats.partners}</span>
                            <span className="impact-label">NGO Partners</span>
                        </div>
                    </div>

                    <div className="impact-divider"></div>

                    <div className="impact-stat">
                        <div className="impact-icon" style={{ background: '#fef3c7', color: '#f59e0b' }}>
                            <Users size={24} />
                        </div>
                        <div className="impact-info">
                            <span className="impact-num">{(totalNGOStats.served / 1000).toFixed(0)}K+</span>
                            <span className="impact-label">People Served</span>
                        </div>
                    </div>
                </motion.div>

                {/* Tab Switcher */}
                <motion.div
                    className="tab-switcher"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <motion.button
                        className={`tab-btn ${activeTab === 'restaurants' ? 'active' : ''}`}
                        onClick={() => setActiveTab('restaurants')}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Utensils size={18} />
                        Partner Restaurants
                        <span className="tab-count">{restaurants.length}</span>
                    </motion.button>

                    <motion.button
                        className={`tab-btn ${activeTab === 'ngos' ? 'active' : ''}`}
                        onClick={() => setActiveTab('ngos')}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Heart size={18} />
                        Partner NGOs
                        <span className="tab-count">{ngos.length}</span>
                    </motion.button>
                </motion.div>

                {/* Search Bar */}
                <motion.div
                    className="partners-search"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="search-input-wrapper">
                        <Search size={18} className="search-icon-decor" />
                        <input
                            type="text"
                            placeholder={`Search ${activeTab === 'restaurants' ? 'restaurants' : 'NGOs'} by name or location...`}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <button className="clear-search" onClick={() => setSearchTerm('')}>
                                <X size={14} />
                            </button>
                        )}
                    </div>
                </motion.div>

                <motion.div
                    className="partners-grid"
                    layout
                >
                    {filteredData.map((partner, i) => {
                        const isHovered = hoveredId === partner.id;
                        const isRestaurant = activeTab === 'restaurants';

                        return (
                            <motion.div
                                key={partner.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                                className="partner-card"
                                onMouseEnter={() => setHoveredId(partner.id)}
                                onMouseLeave={() => setHoveredId(null)}
                            >
                                <div className="card-inner">
                                    {/* Brand Side */}
                                    <div className="card-brand">
                                        <motion.div
                                            className="partner-logo-box"
                                            animate={isHovered ? {
                                                scale: 1.05,
                                                boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                                            } : {
                                                scale: 1,
                                                boxShadow: "0 10px 20px rgba(0,0,0,0.05)"
                                            }}
                                        >
                                            <div className="logo-wrapper">
                                                <img
                                                    src={partner.logo}
                                                    alt={partner.name}
                                                    className="logo-img"
                                                />
                                            </div>
                                        </motion.div>

                                        <div className="brand-info">
                                            <div className="partner-type-tag">{partner.type}</div>
                                            <h3 className="partner-name">{partner.name}</h3>
                                            <div className="partner-location-text">
                                                <MapPin size={14} />
                                                {partner.location}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Side */}
                                    <div className="card-details">
                                        <div className="detail-header">
                                            <div className="rating-badge">
                                                <Star size={14} fill="currentColor" />
                                                <span>{partner.rating}</span>
                                            </div>
                                            <span className="joined-date">
                                                {isRestaurant ? `Since ${partner.joined}` : `Est. ${partner.established}`}
                                            </span>
                                        </div>

                                        <div className="stats-grid">
                                            {isRestaurant ? (
                                                <>
                                                    <div className="mini-stat">
                                                        <span className="mini-stat-val">{partner.totalDonations}</span>
                                                        <span className="mini-stat-lbl">Donations</span>
                                                    </div>
                                                    <div className="mini-stat">
                                                        <span className="mini-stat-val">{(partner.portionsServed / 1000).toFixed(1)}k</span>
                                                        <span className="mini-stat-lbl">Portions</span>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="mini-stat">
                                                        <span className="mini-stat-val">{(partner.peopleServed / 1000).toFixed(1)}k</span>
                                                        <span className="mini-stat-lbl">Served</span>
                                                    </div>
                                                    <div className="mini-stat">
                                                        <span className="mini-stat-val">{partner.partnersCount}</span>
                                                        <span className="mini-stat-lbl">Partners</span>
                                                    </div>
                                                </>
                                            )}
                                        </div>

                                        <div className="impact-highlight">
                                            <div className="impact-icon-box">
                                                <Heart size={16} />
                                            </div>
                                            <div className="impact-text">
                                                <span className="impact-title">Positive Impact</span>
                                                <p>{isRestaurant ? partner.impact : partner.focus}</p>
                                            </div>
                                        </div>

                                        <motion.button
                                            className="action-link"
                                            animate={isHovered ? { x: 5 } : { x: 0 }}
                                            onClick={() => setSelectedPartner(partner)}
                                        >
                                            View Impact Profile
                                            <ArrowRight size={16} />
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    className="partners-cta"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <div className="cta-content">
                        <h3>Want to join our mission?</h3>
                        <p>
                            {activeTab === 'restaurants'
                                ? "Become a partner restaurant and make a difference while reducing waste."
                                : "Register your NGO to receive quality surplus food for your community programs."}
                        </p>
                    </div>
                    <motion.button
                        className="cta-button"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Building2 size={18} />
                        {activeTab === 'restaurants' ? "Become a Partner Restaurant" : "Register Your NGO"}
                        <ArrowRight size={18} />
                    </motion.button>
                </motion.div>
            </div>

            <PartnerModal
                selectedPartner={selectedPartner}
                activeTab={activeTab}
                onClose={() => setSelectedPartner(null)}
            />
        </section>
    );
};

export default Partners;
