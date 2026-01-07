import { useState, useEffect } from 'react';

/**
 * Hook to detect which section of a page is currently in view.
 * @param {string[]} sectionIds - Array of section IDs to monitor.
 * @param {number} offset - The offset from the top to trigger activation.
 * @returns {string} activeSection - The ID of the currently active section.
 */
const useScrollSpy = (sectionIds, offset = 120) => {
    const [activeSection, setActiveSection] = useState(sectionIds[0] || '');

    useEffect(() => {
        const handleScroll = () => {
            for (const id of sectionIds) {
                const element = document.getElementById(id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // Check if section is in the middle-top area of the viewport
                    if (rect.top <= offset && rect.bottom >= offset) {
                        setActiveSection(id);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, [sectionIds, offset]);

    return activeSection;
};

export default useScrollSpy;
