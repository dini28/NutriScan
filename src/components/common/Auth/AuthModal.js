import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    Building2,
    Heart,
    ArrowRight,
    ShieldCheck,
    Mail,
    Lock,
    AlertCircle,
    ChevronLeft
} from 'lucide-react';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose, onLogin }) => {
    const [step, setStep] = useState('selection'); // 'selection' or 'login'
    const [selectedRole, setSelectedRole] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const roles = [
        {
            id: 'restaurant',
            title: 'Restaurant',
            description: 'I want to donate surplus food to help others.',
            icon: <Building2 size={32} />,
            color: '#10b981',
            bgColor: '#ecfdf5'
        },
        {
            id: 'ngo',
            title: 'NGO / Charity',
            description: 'I want to claim and distribute food donations.',
            icon: <Heart size={32} />,
            color: '#3b82f6',
            bgColor: '#eff6ff'
        }
    ];

    const handleRoleSelect = (roleId) => {
        setSelectedRole(roleId);
        setStep('login');
        setError('');
    };

    const handleBack = () => {
        setStep('selection');
        setSelectedRole(null);
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // Role-specific credential validation for reliability
        if (selectedRole === 'ngo') {
            if (email === 'ngo@scan.com' && password === 'ngo123') {
                onLogin('ngo');
            } else {
                setError('Invalid NGO credentials. Please use the demo credentials provided.');
            }
        } else if (selectedRole === 'restaurant') {
            if (email === 'res@scan.com' && password === 'res123') {
                onLogin('restaurant');
            } else {
                setError('Invalid Restaurant credentials. Please use the demo credentials provided.');
            }
        }
    };

    return (
        <AnimatePresence>
            <div className="auth-modal-overlay">
                <motion.div
                    className="auth-modal-content"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                >
                    <button className="auth-modal-close" onClick={onClose}>
                        <X size={24} />
                    </button>

                    {step === 'login' && (
                        <button className="auth-modal-back" onClick={handleBack}>
                            <ChevronLeft size={20} />
                            <span>Back</span>
                        </button>
                    )}

                    <div className="auth-modal-header">
                        <div className="auth-modal-badge">
                            <ShieldCheck size={16} />
                            <span>Secure Access</span>
                        </div>
                        {step === 'selection' ? (
                            <>
                                <h2>Welcome to <span className="highlight">NutriScan</span></h2>
                                <p>Please select your partner type to continue</p>
                            </>
                        ) : (
                            <>
                                <h2>{selectedRole === 'ngo' ? 'NGO' : 'Restaurant'} <span className="highlight">Login</span></h2>
                                <p>Enter your credentials to manage your {selectedRole === 'ngo' ? 'pickups' : 'donations'}.</p>
                            </>
                        )}
                    </div>

                    <div className="auth-body">
                        <AnimatePresence mode="wait">
                            {step === 'selection' ? (
                                <motion.div
                                    key="selection"
                                    className="role-grid"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                >
                                    {roles.map((role) => (
                                        <motion.div
                                            key={role.id}
                                            className="role-card"
                                            whileHover={{ y: -5, scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleRoleSelect(role.id)}
                                        >
                                            <div
                                                className="role-icon"
                                                style={{ backgroundColor: role.bgColor, color: role.color }}
                                            >
                                                {role.icon}
                                            </div>
                                            <div className="role-info">
                                                <h3>{role.title}</h3>
                                                <p>{role.description}</p>
                                            </div>
                                            <div className="role-action">
                                                <span>Select</span>
                                                <ArrowRight size={18} />
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="login"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <form className="auth-form" onSubmit={handleSubmit}>
                                        {error && (
                                            <motion.div
                                                className="auth-error"
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                            >
                                                <AlertCircle size={18} />
                                                <span>{error}</span>
                                            </motion.div>
                                        )}

                                        <div className="form-group-auth">
                                            <label>Email Address</label>
                                            <div className="input-icon-group">
                                                <Mail size={18} />
                                                <input
                                                    type="email"
                                                    placeholder={selectedRole === 'ngo' ? 'ngo@scan.com' : 'res@scan.com'}
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group-auth">
                                            <label>Password</label>
                                            <div className="input-icon-group">
                                                <Lock size={18} />
                                                <input
                                                    type="password"
                                                    placeholder="••••••••"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <button type="submit" className="auth-submit-btn">
                                            <span>Sign In to Dashboard</span>
                                            <ArrowRight size={20} />
                                        </button>
                                    </form>

                                    <div className="credentials-tip">
                                        <h4><ShieldCheck size={14} /> {selectedRole.toUpperCase()} Credentials</h4>
                                        <div className="tip-item">
                                            <span>{selectedRole === 'ngo' ? 'ngo@scan.com / ngo123' : 'res@scan.com / res123'}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="auth-modal-footer">
                        <p>By continuing, you agree to NutriScan's <span className="footer-link">Terms of Service</span></p>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default AuthModal;
