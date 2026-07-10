document.addEventListener("DOMContentLoaded", function () {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        observer.observe(item);
    });

    // --- Staggered timeline layout (desktop) ---
    // Pulls each card up so left/right cards interleave instead of
    // leaving the opposite column empty. Card heights vary, so this is
    // computed at runtime rather than with a fixed CSS margin.
    const OVERLAP_RATIO = 0.5; // next card starts at 50% of the previous card's height
    const MIN_OFFSET = 70;     // but never closer than this (px) to the previous card's top
    const SAME_SIDE_GAP = 24;  // min gap between consecutive same-side cards

    function layoutTimeline() {
        const items = document.querySelectorAll('.timeline .timeline-item');
        if (!items.length) return;

        // Reset, then bail on mobile (single column needs no stagger)
        items.forEach(item => { item.style.marginTop = ''; });
        if (!window.matchMedia('(min-width: 768px)').matches) return;

        for (let i = 1; i < items.length; i++) {
            const offset = Math.max(MIN_OFFSET, items[i - 1].offsetHeight * OVERLAP_RATIO);
            let desiredTop = items[i - 1].offsetTop + offset;
            if (i >= 2) {
                const sameSideBottom = items[i - 2].offsetTop + items[i - 2].offsetHeight;
                desiredTop = Math.max(desiredTop, sameSideBottom + SAME_SIDE_GAP);
            }
            const shift = desiredTop - items[i].offsetTop;
            if (shift < 0) items[i].style.marginTop = shift + 'px';
        }
    }

    layoutTimeline();
    window.addEventListener('load', layoutTimeline); // re-run once fonts/images settle

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(layoutTimeline, 150);
    });
});
