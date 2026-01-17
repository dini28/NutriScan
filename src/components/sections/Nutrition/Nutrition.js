import { useState } from 'react';
import {
    Activity,
    Heart,
    Zap,
    TrendingUp,
    Shield,
    Leaf,
    Cpu
} from 'lucide-react';
import { recipes } from '../../../data/recipes';
import './Nutrition.css';

const Nutrition = () => {
    const [hoveredId, setHoveredId] = useState(null);

    const stats = [
        { label: 'Scanned Items', value: '4', icon: Activity },
        { label: 'Avg Accuracy', value: '98%', icon: Shield },
        { label: 'Quality Score', value: 'A+', icon: TrendingUp }
    ];

    const getMacroColor = (macro) => {
        const colors = {
            protein: '#10b981', // Green
            fat: '#3b82f6',     // Blue
            carbs: '#f59e0b'    // Amber
        };
        return colors[macro];
    };

    return (
        <section className="nutrition-section" id="nutritional-content">
            <div className="nutrition-container">

                {/* Header */}
                <div className="nutrition-header">
                    <div className="nutrition-badge">
                        <Cpu size={18} />
                        <span>IoT Nutrition Analysis</span>
                    </div>

                    <h2 className="nutrition-title">
                        Verified <span className="nutrition-accent">Nutritional</span> Data
                    </h2>

                    <p className="nutrition-subtitle">
                        Real-time molecular scanning provides accurate nutritional information
                        for every food item in our system.
                    </p>

                    {/* Stats Bar */}
                    <div className="nutrition-stats">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <div
                                    key={index}
                                    className="nutrition-stat-card"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="stat-icon-wrapper">
                                        <Icon size={18} color="#10b981" />
                                    </div>
                                    <div className="stat-info">
                                        <div className="stat-value">{stat.value}</div>
                                        <div className="stat-label">{stat.label}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Nutrition Cards Grid */}
                <div className="nutrition-grid">
                    {recipes.map((recipe, index) => {
                        const isHovered = hoveredId === recipe.id;

                        return (
                            <div
                                key={recipe.id}
                                className={`nutrition-card ${isHovered ? 'hovered' : ''}`}
                                onMouseEnter={() => setHoveredId(recipe.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {/* Card Glow */}
                                <div
                                    className="card-glow"
                                    style={{
                                        background: `radial-gradient(circle, ${recipe.color}30 0%, transparent 70%)`
                                    }}
                                ></div>

                                {/* Header */}
                                <div className="card-header">
                                    <div className="card-header-left">
                                        <h3 className="recipe-name">{recipe.name}</h3>
                                        <div className="scan-id">
                                            <Activity size={12} />
                                            <span>Scan #{recipe.id.toString().padStart(3, '0')}</span>
                                        </div>
                                    </div>

                                    <div className="card-header-right">
                                        <div className="calories-container">
                                            <div className="calories-value">{recipe.calories}</div>
                                            <div className="calories-label">kcal/100g</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Recipe Image/Illustration Container */}
                                <div className="card-visual-section">
                                    <div className="recipe-image-container">
                                        <div className="image-overlay"></div>
                                        {recipe.image ? (
                                            <img src={recipe.image} alt={recipe.name} className="recipe-img" />
                                        ) : (
                                            <div className="recipe-placeholder" style={{ background: `linear-gradient(135deg, ${recipe.color}20, ${recipe.color}40)` }}>
                                                <Leaf size={40} color={recipe.color} opacity={0.5} />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Quality Badge */}
                                <div className="quality-badge" style={{ color: recipe.color }}>
                                    <Shield size={14} />
                                    <span>{recipe.quality} Quality</span>
                                    {recipe.verified && <Zap size={12} fill="currentColor" />}
                                </div>

                                {/* Macros Section - Number Only */}
                                <div className="macros-grid">
                                    <div className="macro-item">
                                        <span className="macro-label" style={{ color: getMacroColor('protein') }}>Protein</span>
                                        <span className="macro-value">{recipe.protein}g</span>
                                    </div>
                                    <div className="macro-item">
                                        <span className="macro-label" style={{ color: getMacroColor('fat') }}>Fat</span>
                                        <span className="macro-value">{recipe.fat}g</span>
                                    </div>
                                    <div className="macro-item">
                                        <span className="macro-label" style={{ color: getMacroColor('carbs') }}>Carbs</span>
                                        <span className="macro-value">{recipe.carbs}g</span>
                                    </div>
                                </div>

                                {/* Benefits Footer */}
                                <div className="benefits-footer">
                                    <div className="benefit-icon">
                                        <Heart size={18} fill="#10b981" color="#10b981" />
                                    </div>
                                    <div className="benefit-content">
                                        <div className="benefit-title">Health Benefits</div>
                                        <div className="benefit-text">{recipe.benefits}</div>
                                    </div>
                                </div>

                                {/* Hover Border Effect */}
                                <div
                                    className="card-border"
                                    style={{
                                        background: `linear-gradient(135deg, ${recipe.color}40, transparent)`
                                    }}
                                ></div>
                            </div>
                        );
                    })}
                </div>

                {/* IoT Verification Notice */}
                <div className="verification-notice">
                    <div className="notice-icon">
                        <Shield size={24} color="#10b981" />
                    </div>
                    <div className="notice-content">
                        <h4 className="notice-title">IoT Verified Accuracy</h4>
                        <p className="notice-text">
                            All nutritional data verified by <strong>advanced IoT sensors</strong> with
                            molecular scanning technology. Accuracy within ±2%.
                        </p>
                    </div>
                    <div className="notice-badge">
                        <Leaf size={16} />
                        <span>Certified</span>
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="nutrition-decoration decoration-1"></div>
            <div className="nutrition-decoration decoration-2"></div>
            <div className="nutrition-decoration decoration-3"></div>
        </section>
    );
};

export default Nutrition;
