import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  User,
  Mail,
  MessageSquare,
  CheckCircle,
  MapPin,
  Phone,
  Clock,
  Heart,
  Utensils
} from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    type: 'general'
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email required';
    if (formData.message.length < 10) newErrors.message = 'Message too short (min 10 chars)';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    // TODO: Replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1200));

    setIsSubmitting(false);
    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
      setFormData({ name: '', email: '', message: '', type: 'general' });
    }, 4000);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      detail: 'Mumbai, Maharashtra',
      bg: '#fafafa',
      iconColor: '#ff3c00ff'
    },
    {
      icon: Mail,
      title: 'Email',
      detail: 'contact@foodrescue.org',
      bg: '#fafafa',
      iconColor: '#0084ffff'
    },
    {
      icon: Phone,
      title: 'Phone',
      detail: '+91 22 1234-5678',
      bg: '#fafafa',
      iconColor: '#00ff7bff'
    }
  ];

  const userTypes = [
    { value: 'restaurant', label: 'Restaurant', icon: Utensils },
    { value: 'ngo', label: 'NGO', icon: Heart },
    { value: 'general', label: 'General', icon: MessageSquare }
  ];

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">

        {/* Header */}
        <motion.div
          className="contact-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="contact-badge">
            <MessageSquare size={16} />
            <span>Get In Touch</span>
          </div>

          <h2 className="contact-title"
            style={{
              fontFamily: "Black Ops One",
            }}>
            Let's Build a
            <span className="contact-accent"
              style={{
                fontFamily: "Black Ops One",
              }}> Waste-Free World
            </span>
          </h2>

          <p className="contact-subtitle">
            Whether you're a restaurant looking to donate, an NGO needing supplies,
            or just curious about our mission we'd love to hear from you.
          </p>
        </motion.div>

        <div className="contact-grid">

          {/* Contact Info Cards */}
          <motion.div
            className="info-panel"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="info-cards">
              {contactInfo.map((info, i) => {
                const Icon = info.icon;
                return (
                  <motion.div
                    key={i}
                    className="info-card"
                    style={{ backgroundColor: info.bg }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                    whileHover={{ x: 6, scale: 1.02 }}
                  >
                    <div className="info-icon">
                      <Icon size={22} color={info.iconColor} strokeWidth={2.5} />
                    </div>
                    <div>
                      <div className="info-title">{info.title}</div>
                      <div className="info-detail">{info.detail}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              className="info-features"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="feature-item">
                <CheckCircle size={16} color="#10b981" />
                <span>24/7 support</span>
              </div>
              <div className="feature-item">
                <Clock size={16} color="#10b981" />
                <span>Reply within 24hrs</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div
            className="form-panel"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.div
                  key="form"
                  className="contact-form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >

                  {/* Type Selection */}
                  <div className="form-group">
                    <label className="form-label">I am a</label>
                    <div className="type-grid">
                      {userTypes.map((type) => {
                        const Icon = type.icon;
                        const isActive = formData.type === type.value;
                        return (
                          <motion.button
                            key={type.value}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, type: type.value }))}
                            className={`type-btn ${isActive ? 'active' : ''}`}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Icon size={18} />
                            <span>{type.label}</span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Name */}
                  <div className="form-group">
                    <label className="form-label">Name</label>
                    <div className="input-wrapper">
                      <User className="input-icon name-icon" size={18} />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="Your name"
                        className={`form-input ${errors.name ? 'error' : ''}`}
                      />
                    </div>
                    <AnimatePresence>
                      {errors.name && (
                        <motion.span
                          className="error-msg"
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {errors.name}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Email */}
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <div className="input-wrapper">
                      <Mail className="input-icon email-icon" size={18} />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="you@example.com"
                        className={`form-input ${errors.email ? 'error' : ''}`}
                      />
                    </div>
                    <AnimatePresence>
                      {errors.email && (
                        <motion.span
                          className="error-msg"
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {errors.email}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Message */}
                  <div className="form-group">
                    <label className="form-label">Message</label>
                    <div className="input-wrapper">
                      <MessageSquare className="input-icon textarea-icon" size={18} />
                      <textarea
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        placeholder="Tell us how we can help..."
                        rows="5"
                        className={`form-input form-textarea ${errors.message ? 'error' : ''}`}
                      />
                    </div>
                    <AnimatePresence>
                      {errors.message && (
                        <motion.span
                          className="error-msg"
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {errors.message}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`submit-btn ${isSubmitting ? 'loading' : ''}`}
                    whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner"></span>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={18} />
                      </>
                    )}
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  className="success-state"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
                >
                  <motion.div
                    className="success-icon"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <CheckCircle size={48} />
                  </motion.div>
                  <h3 className="success-title">Message Sent!</h3>
                  <p className="success-text">
                    Thanks for reaching out. We'll get back to you soon.
                  </p>
                  <motion.button
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData({ name: '', email: '', message: '', type: 'general' });
                    }}
                    className="success-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Send Another
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;