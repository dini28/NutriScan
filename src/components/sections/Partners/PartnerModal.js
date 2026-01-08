import { motion, AnimatePresence } from 'framer-motion';
import {
    MapPin,
    Star,
    Award,
    MessageSquare,
    ExternalLink,
    Building2,
    Heart,
    Users,
    CheckCircle,
    Clock,
    X
} from 'lucide-react';
import './PartnerModal.css';

const PartnerModal = ({ selectedPartner, activeTab, onClose }) => {
    return (
        <AnimatePresence>
            {selectedPartner && (
                <div className="modal-overlay" onClick={onClose}>
                    <motion.div
                        className="profile-modal premium-style"
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 30 }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Decorative Background Elements */}
                        <div className="modal-decorations">
                            <div className="decoration-dot dot-1" />
                            <div className="decoration-dot dot-2" />
                            <div className="decoration-dot dot-3" />
                        </div>

                        <div className="modal-bg-glow" />

                        <button className="close-modal-btn" onClick={onClose}>
                            <X size={24} />
                        </button>

                        <div className="modal-content-grid">
                            {/* Left Column: Brand Identity */}
                            <div className="modal-side-profile">
                                <div className="profile-hero-card">
                                    <div className="hero-visual-wrapper">
                                        <div className="hero-logo-container">
                                            <img src={selectedPartner.logo} alt={selectedPartner.name} />
                                        </div>
                                    </div>

                                    <div className="profile-info-header">
                                        <div className="hero-badge">{selectedPartner.type}</div>
                                        <h2 className="hero-title-font">{selectedPartner.name}</h2>
                                        <button
                                            className="location-btn-premium"
                                            onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedPartner.name + ' ' + selectedPartner.location)}`, '_blank')}
                                        >
                                            <MapPin size={16} />
                                            <span>{selectedPartner.location}</span>
                                        </button>
                                    </div>

                                    <div className="trust-badges">
                                        <div className="trust-pill">
                                            <Star size={18} fill="currentColor" className="text-amber" />
                                            <span className="hero-title-font">{selectedPartner.rating}</span>
                                        </div>
                                        <div className="trust-pill verified">
                                            <Award size={18} />
                                            <span>Verified</span>
                                        </div>
                                    </div>

                                    <div className="action-stack">
                                        <button className="btn-primary full-width">
                                            <MessageSquare size={20} />
                                            Collaborate Now
                                        </button>
                                        <button className="btn-secondary full-width">
                                            <ExternalLink size={20} />
                                            Visit Web
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Detailed Impact */}
                            <div className="modal-main-details">
                                {/* Mission Section */}
                                <section className="detail-section">
                                    <div className="section-title-wrap">
                                        <div className="title-icon-wrapper">
                                            <Building2 size={24} />
                                        </div>
                                        <h3 className="hero-title-font">Partner Mission</h3>
                                    </div>
                                    <div className="mission-content-card">
                                        <p>
                                            {activeTab === 'restaurants'
                                                ? `${selectedPartner.name} is a dedicated zero-waste leader in ${selectedPartner.location}, transforming daily surplus into direct community impact.`
                                                : `${selectedPartner.name} operates as a high-efficiency distribution hub in ${selectedPartner.location}, ensuring surplus food reaches families in need with precision.`
                                            }
                                        </p>
                                    </div>
                                </section>

                                {/* Impact Cards */}
                                <section className="detail-section no-margin">
                                    <div className="section-title-wrap">
                                        <div className="title-icon-wrapper text-rose">
                                            <Heart size={24} />
                                        </div>
                                        <h3 className="hero-title-font">Impact Metrics</h3>
                                    </div>
                                    <div className="impact-stats-grid">
                                        <div className="premium-impact-card">
                                            <div className="card-glow-effect" />
                                            <div className="impact-icon-box">
                                                <Users size={28} />
                                            </div>
                                            <div className="impact-data">
                                                <div className="impact-number hero-title-font">
                                                    {activeTab === 'restaurants' ? selectedPartner.portionsServed : selectedPartner.peopleServed}+
                                                </div>
                                                <div className="impact-label">Total Reach</div>
                                            </div>
                                            <div className="card-progress">
                                                <div className="progress-track">
                                                    <div className="progress-fill-premium" style={{ width: '85%' }} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="premium-impact-card secondary">
                                            <div className="card-glow-effect" />
                                            <div className="impact-icon-box">
                                                <CheckCircle size={28} />
                                            </div>
                                            <div className="impact-data">
                                                <div className="impact-number hero-title-font">
                                                    {activeTab === 'restaurants' ? 'GOLD' : 'CERT'}
                                                </div>
                                                <div className="impact-label">Current Status</div>
                                            </div>
                                            <div className="card-progress">
                                                <div className="progress-track">
                                                    <div className="progress-fill-premium" style={{ width: '100%' }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* Recent Activity Timeline */}
                                <section className="detail-section no-margin">
                                    <div className="section-title-wrap">
                                        <div className="title-icon-wrapper text-amber">
                                            <Clock size={24} />
                                        </div>
                                        <h3 className="hero-title-font">Recent Impact Feed</h3>
                                    </div>
                                    <div className="activity-timeline-premium">
                                        {[
                                            { time: '2 hours ago', text: 'Rescued 45 portions of surplus grains.' },
                                            { time: 'Yesterday', text: 'Verified quality for a large meal donation.' },
                                            { time: '2 days ago', text: 'Onboarded 2 new local community partners.' }
                                        ].map((event, idx) => (
                                            <div key={idx} className="timeline-event-premium">
                                                <div className="event-dot-premium" />
                                                <div className="event-details">
                                                    <span className="event-time-stamp">{event.time}</span>
                                                    <p className="event-description">{event.text}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default PartnerModal;
