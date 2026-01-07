import { useState, useEffect } from 'react';

/**
 * Hook to track scroll position and provide a boolean trigger for thresholds.
 * @param {number} threshold - Scroll Y offset to trigger the state.
 * @returns {boolean} isScrolled - True if window.scrollY > threshold.
 */
const useScrollThreshold = (threshold = 20) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > threshold);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, [threshold]);

    return isScrolled;
};

export default useScrollThreshold;
