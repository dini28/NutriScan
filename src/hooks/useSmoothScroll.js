import { useCallback } from 'react';

/**
 * Hook to handle smooth scrolling to an element with a specified offset.
 * @param {number} offset - The offset from the top of the element (e.g., navbar height).
 * @returns {function} handleScroll - Function that takes an event and a target ID/href.
 */
const useSmoothScroll = (offset = 80) => {
    const scrollToTarget = useCallback((targetId) => {
        const id = targetId.replace('#', '');
        const element = document.getElementById(id);

        if (element) {
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }, [offset]);

    const handleLinkClick = useCallback((e, href) => {
        if (href.startsWith('#')) {
            e.preventDefault();
            scrollToTarget(href);
        }
    }, [scrollToTarget]);

    return { scrollToTarget, handleLinkClick };
};

export default useSmoothScroll;
