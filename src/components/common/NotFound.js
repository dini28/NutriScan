import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import './NotFound.css';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <h1 className="not-found-glitch" data-text="404">404</h1>
                <h2 className="not-found-title">Page Not Found</h2>
                <p className="not-found-text">
                    The coordinates you are looking for do not exist in this sector.
                    Please return to base.
                </p>
                <button onClick={() => navigate('/')} className="not-found-btn">
                    <Home size={20} />
                    Return to Base
                </button>
            </div>
        </div>
    );
};

export default NotFound;
