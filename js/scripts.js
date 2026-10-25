/* ============================================
   Portfolio Scripts
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {

    /* ---- Sticky Nav ---- */
    const nav = document.getElementById('top-nav');
    const hero = document.querySelector('.hero');

    function updateNav() {
        if (window.scrollY > hero.offsetHeight - 80) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();


    /* ---- Mobile Nav Toggle ---- */
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            const icon = navToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-xmark');
            }
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }


    /* ---- Scroll Reveal ---- */
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0 && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.08,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => observer.observe(el));
    } else {
        // Fallback: show everything immediately
        revealElements.forEach(el => el.classList.add('revealed'));
    }


    /* ---- Scroll to Top ---- */
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    if (scrollToTopBtn) {
        function updateScrollToTop() {
            if (window.scrollY > 400) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        }
        window.addEventListener('scroll', updateScrollToTop, { passive: true });
        updateScrollToTop();
    }


    /* ---- Dynamic Duration Calculation ---- */
    function updateDynamicDurations() {
        function calcDuration(startYear, startMonthZeroIndexed, endYear = null, endMonthZeroIndexed = null) {
            const now = (endYear !== null && endMonthZeroIndexed !== null)
                ? new Date(endYear, endMonthZeroIndexed, 1)
                : new Date();
            const start = new Date(startYear, startMonthZeroIndexed, 1);
            
            let totalMonths = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth()) + 1;
            if (totalMonths < 1) totalMonths = 1;
            
            const years = Math.floor(totalMonths / 12);
            const months = totalMonths % 12;
            
            let parts = [];
            if (years > 0) parts.push(years === 1 ? '1 yr' : `${years} yrs`);
            if (months > 0) parts.push(months === 1 ? '1 mo' : `${months} mos`);
            return parts.length > 0 ? parts.join(' ') : '1 mo';
        }

        // Current Senior SE Role: Mar 2026 - Present (month index 2)
        const currentRoleEl = document.getElementById('current-role-duration');
        if (currentRoleEl) {
            currentRoleEl.textContent = calcDuration(2026, 2);
        }

        // Total ServiceNow Full-time Tenure: Jul 2022 - Present (month index 6)
        const snTotalEl = document.getElementById('servicenow-total-duration');
        if (snTotalEl) {
            snTotalEl.textContent = calcDuration(2022, 6);
        }
    }
    updateDynamicDurations();


    /* ---- Video Lightbox Modal ---- */
    const videoModal = document.getElementById('video-modal');
    const videoIframe = document.getElementById('video-modal-iframe');
    const videoTitle = document.getElementById('video-modal-title');
    const videoCloseBtn = document.getElementById('video-modal-close');
    const videoBackdrop = document.querySelector('.video-modal-backdrop');
    const videoTriggers = document.querySelectorAll('.video-trigger');

    function openVideoModal(videoId, title) {
        if (!videoModal || !videoIframe) return;
        if (videoTitle && title) {
            videoTitle.textContent = title;
        }
        const ytLink = document.getElementById('video-modal-yt-link');
        if (ytLink) {
            ytLink.href = `https://www.youtube.com/watch?v=${videoId}`;
        }
        let originParam = '';
        if (window.location.protocol.startsWith('http')) {
            originParam = `&origin=${encodeURIComponent(window.location.origin)}`;
        }
        videoIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&enablejsapi=1${originParam}`;
        videoModal.classList.add('active');
        videoModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeVideoModal() {
        if (!videoModal || !videoIframe) return;
        videoModal.classList.remove('active');
        videoModal.setAttribute('aria-hidden', 'true');
        // Clear src to immediately stop playback & audio
        videoIframe.src = '';
        document.body.style.overflow = '';
    }

    if (videoTriggers.length > 0 && videoModal) {
        videoTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                // Allow user to Ctrl+click / Cmd+click or middle-click to open YouTube directly in new tab
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
                e.preventDefault();
                const videoId = trigger.dataset.videoId;
                const title = trigger.dataset.videoTitle || 'Demo Video';
                if (videoId) {
                    openVideoModal(videoId, title);
                }
            });
        });

        if (videoCloseBtn) {
            videoCloseBtn.addEventListener('click', closeVideoModal);
        }

        if (videoBackdrop) {
            videoBackdrop.addEventListener('click', closeVideoModal);
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && videoModal.classList.contains('active')) {
                closeVideoModal();
            }
        });
    }

});

