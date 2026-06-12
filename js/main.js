        // === Mobile Menu ===
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

        function toggleMobileMenu() {
            mobileMenuBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            mobileMenuOverlay.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        }
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        mobileMenuOverlay.addEventListener('click', toggleMobileMenu);
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mobileMenu.classList.contains('active')) toggleMobileMenu();
            });
        });

        // === Navbar Scroll ===
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.pageYOffset > 80) navbar.classList.add('scrolled');
            else navbar.classList.remove('scrolled');
        });

        // === Smooth Scroll ===
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const navHeight = document.getElementById('navbar').offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                }
            });
        });

        // === Filterable Classes ===
        const filterPills = document.querySelectorAll('.filter-pill');
        const classCards = document.querySelectorAll('#classesGrid .class-card-compact');

        filterPills.forEach(pill => {
            pill.addEventListener('click', () => {
                filterPills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                const category = pill.getAttribute('data-category');
                classCards.forEach(card => {
                    card.removeAttribute('data-mobile-hidden');
                    if (category === 'all' || card.getAttribute('data-category') === category) {
                        card.style.display = '';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });

        // === Classes Show More (mobile) ===
        (function() {
            const MOBILE_SHOW = 6;
            const grid = document.getElementById('classesGrid');
            const btn  = document.getElementById('classesShowMore');
            if (!grid || !btn) return;

            function applyMobileHide() {
                const allCards = grid.querySelectorAll('.class-card-compact');
                if (window.innerWidth >= 768) {
                    allCards.forEach(c => {
                        if (c.getAttribute('data-mobile-hidden') === 'true') {
                            c.removeAttribute('data-mobile-hidden');
                            c.style.display = '';
                        }
                    });
                    btn.style.display = 'none';
                    return;
                }
                // Restore previously mobile-hidden cards before re-evaluating,
                // so they aren't mistaken for filter-hidden cards on the next pass.
                allCards.forEach(c => {
                    if (c.getAttribute('data-mobile-hidden') === 'true') {
                        c.removeAttribute('data-mobile-hidden');
                        c.style.display = '';
                    }
                });
                let shown = 0;
                allCards.forEach(c => {
                    if (c.style.display === 'none') return; // filter-hidden
                    if (shown >= MOBILE_SHOW) {
                        c.setAttribute('data-mobile-hidden', 'true');
                        c.style.display = 'none';
                    }
                    shown++;
                });
                btn.style.display = shown > MOBILE_SHOW ? 'flex' : 'none';
                btn.classList.remove('expanded');
                btn.innerHTML = '<svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg> Show all classes';
            }

            btn.addEventListener('click', function() {
                const hidden = grid.querySelectorAll('[data-mobile-hidden="true"]');
                if (hidden.length) {
                    hidden.forEach(c => {
                        c.removeAttribute('data-mobile-hidden');
                        c.style.display = '';
                    });
                    btn.classList.add('expanded');
                    btn.innerHTML = '<svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg> Show fewer';
                } else {
                    applyMobileHide();
                }
            });

            // Re-apply when a filter pill is clicked
            document.getElementById('filterPills').addEventListener('click', function() {
                setTimeout(applyMobileHide, 10);
            });

            applyMobileHide();
            window.addEventListener('resize', applyMobileHide);
        })();

        // === Bottom Tab Bar active state ===
        (function() {
            const tabs = document.querySelectorAll('.bt-tab');
            const tabSections = ['about','announcementsFeed','classes','gallery','contact'];
            const sectionEls = tabSections.map(id => document.getElementById(id)).filter(Boolean);
            const tabObserver = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        tabs.forEach(t => {
                            t.classList.toggle('active', t.getAttribute('href') === '#' + entry.target.id);
                        });
                    }
                });
            }, { threshold: 0.3, rootMargin: '-10% 0px -50% 0px' });
            sectionEls.forEach(s => tabObserver.observe(s));
        })();

        // === Active Nav Indicator ===
        const navSections = document.querySelectorAll('section[id]');
        const desktopNavLinks = document.querySelectorAll('.nav-links a:not(.nav-book-btn)');
        const navActiveObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    desktopNavLinks.forEach(link => {
                        link.classList.remove('nav-active');
                        if (link.getAttribute('href') === '#' + entry.target.id) {
                            link.classList.add('nav-active');
                        }
                    });
                }
            });
        }, { threshold: 0.25, rootMargin: '-80px 0px -55% 0px' });
        navSections.forEach(s => navActiveObserver.observe(s));

        // === FAB Speed Dial (mobile) ===
        const fabGroup = document.getElementById('fabGroup');
        const fabTrigger = document.getElementById('fabTrigger');
        if (fabGroup && fabTrigger) {
            fabTrigger.addEventListener('click', e => {
                e.stopPropagation();
                fabGroup.classList.toggle('open');
            });
            document.addEventListener('click', e => {
                if (!fabGroup.contains(e.target)) fabGroup.classList.remove('open');
            });
        }

        // === Scroll Reveal ===
        const revealElements = document.querySelectorAll('.reveal');
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
        revealElements.forEach(el => revealObserver.observe(el));

        // === Toast Notification ===
        function showToast(msg, isError) {
            const t = document.createElement('div');
            t.className = 'form-toast' + (isError ? ' error' : '');
            t.textContent = msg;
            document.body.appendChild(t);
            requestAnimationFrame(() => t.classList.add('visible'));
            setTimeout(() => {
                t.classList.remove('visible');
                setTimeout(() => t.remove(), 400);
            }, 4500);
        }

        // === Google Sheets Form Submission (Contact Form) ===
        const scriptURL = 'https://script.google.com/macros/s/AKfycbyFkA-z3tQODVCqtsEYg2V9frPs-tqvVMnICtVFqDdaHRnA02LmDR5shin7NXDvICaP/exec';
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            contactForm.addEventListener('submit', e => {
                e.preventDefault();
                const originalText = submitBtn.innerText;
                submitBtn.innerText = 'Sending…';
                submitBtn.disabled = true;
                fetch(scriptURL, { method: 'POST', body: new FormData(contactForm) })
                    .then(() => {
                        showToast('Thank you! We’ll get back to you soon.');
                        contactForm.reset();
                        submitBtn.innerText = originalText;
                        submitBtn.disabled = false;
                    })
                    .catch(err => {
                        console.error('Error:', err.message);
                        showToast('Something went wrong. Please check your connection and try again.', true);
                        submitBtn.innerText = originalText;
                        submitBtn.disabled = false;
                    });
            });
        }

        // === Exhibition Form Submission (same Google Apps Script endpoint) ===
            const exhibitionScriptURL = 'https://script.google.com/macros/s/AKfycbz5aS7NpZZ-OKbwl6N0wF1y9NO0QTIWdvd3frhjBqvsQqv5kFzRMrZiO-MRBTIAVcHa2g/exec';

    const exhibitionForm = document.getElementById('exhibitionForm');

    if (exhibitionForm) {

        const exhibitionBtn = exhibitionForm.querySelector('button[type="submit"]');

        exhibitionForm.addEventListener('submit', e => {

            e.preventDefault();

            const originalText = exhibitionBtn.innerText;

            exhibitionBtn.innerText = 'Submitting…';

            exhibitionBtn.disabled = true;

            fetch(exhibitionScriptURL, {
                method: 'POST',
                body: new FormData(exhibitionForm)
            })

            .then(() => {

                showToast('Exhibition enquiry submitted successfully!');

                exhibitionForm.reset();

                exhibitionBtn.innerText = originalText;

                exhibitionBtn.disabled = false;

            })

            .catch(err => {

                console.error('Error:', err.message);

                showToast('Something went wrong. Please try again.', true);

                exhibitionBtn.innerText = originalText;

                exhibitionBtn.disabled = false;

            });
            });
        }

        // === Announcements Feed (JSONP — no CORS issues) ===
        function renderAnnouncements(rows) {
            const loading = document.getElementById('annLoading');
            const cardsEl = document.getElementById('annCards');
            const footer  = document.getElementById('annFooter');
            if (!Array.isArray(rows) || rows.length === 0) {
                loading.innerHTML = '<div class="ann-error">No announcements yet. <a href="https://www.instagram.com/malvika.kapoor.art" target="_blank" rel="noopener" style="color:var(--terracotta)">Check Instagram</a> for updates.</div>';
                return;
            }
            const latest = rows.slice(-2).reverse();
            cardsEl.innerHTML = latest.map(row => {
                // support both 'image' and 'image url' column names
                const imgSrc = row.image || row['image url'] || '';
                const imgHtml = imgSrc
                    ? `<div class="ann-card-img-wrap"><img class="ann-card-img" src="${imgSrc}" alt="${row.title || 'Announcement'}" loading="lazy" onerror="this.closest('.ann-card-img-wrap').outerHTML='<div class=ann-card-img-placeholder>🎨</div>'"></div>`
                    : `<div class="ann-card-img-placeholder">🎨</div>`;
                // format the date nicely: "Mon May 11 2026 00:00:00 GMT..." → "11 May 2026"
                let dateStr = row.date || '';
                try {
                    const d = new Date(dateStr);
                    if (!isNaN(d)) dateStr = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
                } catch(e) {}
                const dateHtml  = dateStr  ? `<div class="ann-card-date">${dateStr}</div>`     : '';
                const titleHtml = row.title ? `<div class="ann-card-title">${row.title}</div>` : '';
                const textHtml  = row.text  ? `<div class="ann-card-text">${row.text}</div>`   : '';
                return `<div class="ann-card">${imgHtml}<div class="ann-card-body">${dateHtml}${titleHtml}${textHtml}</div></div>`;
            }).join('');
            loading.style.display = 'none';
            cardsEl.style.display = 'grid';
            footer.style.display  = 'block';
        }

        // Load via <script> tag — bypasses CORS completely
        (function() {
            // Timeout fallback if script never calls back
            const timer = setTimeout(function() {
                const l = document.getElementById('annLoading');
                if (l && l.style.display !== 'none') {
                    l.innerHTML = '<div class="ann-error">Could not load announcements. <a href="https://www.instagram.com/malvika.kapoor.art" target="_blank" rel="noopener" style="color:var(--terracotta)">Check Instagram</a> for updates.</div>';
                }
            }, 6000);

            window._annTimer = timer;
            const origFn = window.renderAnnouncements;
            window.renderAnnouncements = function(rows) {
                clearTimeout(timer);
                origFn(rows);
            };

            const url = 'https://script.google.com/macros/s/AKfycbyhge-zQbsQmiCXdJfsMGg6eic5ZlJ6-njenRG23Vaa9dGwWAt1KX8orVghiQbZi6J4sg/exec?callback=renderAnnouncements';
            const s = document.createElement('script');
            s.src = url;
            s.onerror = function() {
                clearTimeout(timer);
                document.getElementById('annLoading').innerHTML = '<div class="ann-error">Could not load announcements. <a href="https://www.instagram.com/malvika.kapoor.art" target="_blank" rel="noopener" style="color:var(--terracotta)">Check Instagram</a> for updates.</div>';
            };
            document.body.appendChild(s);
        })();



// === Shared: Instagram-style drag-to-slide viewer for lightbox overlays (touch only) ===
const IS_TOUCH = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

// Builds a 3-cell sliding track [prev | current | next] inside an overlay and
// drives it with real-time finger drag. formatCounter(idx,total)->string fills
// the overlay's .lb-caption; onCommit(idx) syncs the caller's index after a slide.
function createSwipeViewer(overlay, formatCounter, onCommit) {
    const SLIDE_MS = 300;
    const counter = overlay.querySelector('.lb-caption');

    const viewport = document.createElement('div');
    viewport.className = 'lb-viewport';
    const track = document.createElement('div');
    track.className = 'lb-track';
    const cellImgs = [0, 1, 2].map(() => {
        const cell = document.createElement('div');
        cell.className = 'lb-cell';
        const img = document.createElement('img');
        cell.appendChild(img);
        track.appendChild(cell);
        return img;
    });
    viewport.appendChild(track);
    overlay.insertBefore(viewport, counter);
    overlay.classList.add('touch');

    let imgs = [], idx = 0, total = 0;
    let startX = 0, startY = 0, dx = 0, width = 0;
    let dragging = false, decided = false, animating = false, settleTimer = null;

    const wrap = i => ((i % total) + total) % total;

    function paint() {
        cellImgs[0].src = imgs[wrap(idx - 1)].src; cellImgs[0].alt = imgs[wrap(idx - 1)].alt;
        cellImgs[1].src = imgs[idx].src;           cellImgs[1].alt = imgs[idx].alt;
        cellImgs[2].src = imgs[wrap(idx + 1)].src; cellImgs[2].alt = imgs[wrap(idx + 1)].alt;
        track.classList.remove('animate');
        void track.offsetWidth;                      // reflow so the re-park isn't animated
        track.style.transform = 'translate3d(-100%,0,0)';
        counter.textContent = formatCounter(idx, total);
    }

    function settle(targetPct, newIdx) {
        animating = true;
        track.classList.add('animate');
        track.style.transform = 'translate3d(' + targetPct + '%,0,0)';
        clearTimeout(settleTimer);
        settleTimer = setTimeout(() => {
            idx = wrap(newIdx);
            if (onCommit) onCommit(idx);
            paint();
            animating = false;
        }, SLIDE_MS);
    }

    viewport.addEventListener('touchstart', e => {
        if (animating || e.touches.length !== 1) return;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        dx = 0; dragging = false; decided = false;
        width = viewport.clientWidth;
        track.classList.remove('animate');
    }, { passive: true });

    viewport.addEventListener('touchmove', e => {
        if (animating || e.touches.length !== 1) return;
        const mx = e.touches[0].clientX - startX;
        const my = e.touches[0].clientY - startY;
        if (!decided) {
            if (Math.abs(mx) < 8 && Math.abs(my) < 8) return;
            decided = true;
            dragging = Math.abs(mx) > Math.abs(my);
        }
        if (!dragging) return;
        e.preventDefault();                          // we own the horizontal gesture
        dx = mx;
        track.style.transform = 'translate3d(' + (-100 + (dx / width) * 100) + '%,0,0)';
    }, { passive: false });

    viewport.addEventListener('touchend', () => {
        if (animating || !dragging) { dragging = false; return; }
        dragging = false;
        const threshold = width * 0.25;
        if (dx <= -threshold)      settle(-200, idx + 1);
        else if (dx >= threshold)  settle(0, idx - 1);
        else                       settle(-100, idx);   // snap back, no index change
    });

    return {
        show(newImgs, startIdx) {
            imgs = newImgs; total = newImgs.length;
            idx = ((startIdx % total) + total) % total;
            animating = false; dragging = false; decided = false;
            clearTimeout(settleTimer);
            paint();
        }
    };
}

// === Services Lightbox ===
(function () {
    const overlay  = document.getElementById('lbOverlay');
    const lbImg    = document.getElementById('lbImg');
    const lbCap    = document.getElementById('lbCaption');
    const lbClose  = document.getElementById('lbClose');
    const lbPrev   = document.getElementById('lbPrev');
    const lbNext   = document.getElementById('lbNext');
    if (!overlay) return;

    let items = [];
    let current = 0;
    const viewer = IS_TOUCH
        ? createSwipeViewer(overlay, (i, t) => items[i].caption + '  ·  ' + (i + 1) + ' / ' + t, i => { current = i; })
        : null;

    function buildItems() {
        items = Array.from(document.querySelectorAll('#services .si-img:not(.ws-slideshow)')).map(el => ({
            src:     el.querySelector('img').src,
            alt:     el.querySelector('img').alt,
            caption: el.closest('.service-item').querySelector('h5')?.textContent || ''
        }));
    }

    function openAt(index) {
        if (!items.length) buildItems();
        current = ((index % items.length) + items.length) % items.length;
        overlay.classList.add('lb-open');
        document.body.style.overflow = 'hidden';
        if (IS_TOUCH) {
            viewer.show(items, current);
        } else {
            lbImg.src = items[current].src;
            lbImg.alt = items[current].alt;
            lbCap.textContent = items[current].caption + '  ·  ' + (current + 1) + ' / ' + items.length;
        }
        lbClose.focus();
    }

    function close() {
        overlay.classList.remove('lb-open');
        lbImg.src = '';
        document.body.style.overflow = '';
    }

    document.querySelector('#services .service-items')?.addEventListener('click', e => {
        const siImg = e.target.closest('.si-img');
        if (!siImg || siImg.classList.contains('ws-slideshow')) return;
        if (!items.length) buildItems();
        const index = Array.from(document.querySelectorAll('#services .si-img:not(.ws-slideshow)')).indexOf(siImg);
        openAt(index);
    });

    lbClose.addEventListener('click', close);
    lbPrev.addEventListener('click', () => openAt(current - 1));
    lbNext.addEventListener('click', () => openAt(current + 1));

    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });

    document.addEventListener('keydown', e => {
        if (!overlay.classList.contains('lb-open')) return;
        if (e.key === 'Escape')     close();
        if (e.key === 'ArrowLeft')  openAt(current - 1);
        if (e.key === 'ArrowRight') openAt(current + 1);
    });
})();

// === Shared: Workshop Hover Slideshow + Lightbox factory ===
function makeWorkshopSlideshow(slideshowId, lbId) {
    const slideshow = document.getElementById(slideshowId);
    const overlay   = document.getElementById(lbId);
    const lbImg     = overlay?.querySelector('.lb-img');
    const lbCounter = overlay?.querySelector('.lb-caption');
    const lbClose   = overlay?.querySelector('.lb-close');
    const lbPrev    = overlay?.querySelector('.lb-prev');
    const lbNext    = overlay?.querySelector('.lb-next');
    if (!slideshow || !overlay) return;

    const slides = Array.from(slideshow.querySelectorAll('.ws-slide'));
    const images = slides.map(s => ({ src: s.src, alt: s.alt }));
    let current    = 0;   // index of the visible hover/auto-cycle slide
    let lbIndex    = 0;   // index shown in the lightbox (decoupled from the cycle)
    let hoverTimer = null;

    // --- Improved crossfade: outgoing gets 'leaving', incoming gets 'active' ---
    function showSlide(index) {
        const next = ((index % slides.length) + slides.length) % slides.length;
        if (next === current) return;
        const outgoing = slides[current];
        outgoing.classList.remove('active');
        outgoing.classList.add('leaving');
        setTimeout(() => outgoing.classList.remove('leaving'), 900);
        current = next;
        slides[current].classList.add('active');
    }

    function resetSlides() {
        slides.forEach(s => { s.classList.remove('active', 'leaving'); });
        current = 0;
        slides[0].classList.add('active');
    }

    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

    if (isTouch) {
        // Mobile: auto-cycle when card is scrolled into view
        new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!hoverTimer) hoverTimer = setInterval(() => {
                        if (overlay.classList.contains('lb-open')) return;
                        showSlide(current + 1);
                    }, 900);
                } else {
                    clearInterval(hoverTimer);
                    hoverTimer = null;
                    resetSlides();
                }
            });
        }, { threshold: 0.45 }).observe(slideshow);
    } else {
        slideshow.addEventListener('mouseenter', () => {
            hoverTimer = setInterval(() => showSlide(current + 1), 900);
        });
        slideshow.addEventListener('mouseleave', () => {
            clearInterval(hoverTimer);
            hoverTimer = null;
            resetSlides();
        });
    }

    // --- Lightbox ---
    const viewer = IS_TOUCH
        ? createSwipeViewer(overlay, (i, t) => (i + 1) + ' / ' + t, i => { lbIndex = i; })
        : null;

    function openAt(index) {
        lbIndex = ((index % images.length) + images.length) % images.length;
        overlay.classList.add('lb-open');
        document.body.style.overflow = 'hidden';
        if (IS_TOUCH) {
            viewer.show(images, lbIndex);
        } else {
            lbImg.src = images[lbIndex].src;
            lbImg.alt = images[lbIndex].alt;
            lbCounter.textContent = (lbIndex + 1) + ' / ' + images.length;
        }
        lbClose.focus();
    }

    function close() {
        overlay.classList.remove('lb-open');
        lbImg.src = '';
        document.body.style.overflow = '';
    }

    slideshow.addEventListener('click', () => openAt(current));
    slideshow.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openAt(current); }
    });

    lbClose.addEventListener('click', close);
    lbPrev.addEventListener('click', () => openAt(lbIndex - 1));
    lbNext.addEventListener('click', () => openAt(lbIndex + 1));

    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });

    document.addEventListener('keydown', e => {
        if (!overlay.classList.contains('lb-open')) return;
        if (e.key === 'Escape')     close();
        if (e.key === 'ArrowLeft')  openAt(lbIndex - 1);
        if (e.key === 'ArrowRight') openAt(lbIndex + 1);
    });
}

makeWorkshopSlideshow('halloween-slideshow', 'halloweenLb');
makeWorkshopSlideshow('christmas-slideshow', 'christmasLb');
makeWorkshopSlideshow('clay-slideshow',      'clayLb');
makeWorkshopSlideshow('spatula-slideshow',   'spatulaLb');
makeWorkshopSlideshow('worli-slideshow',     'worliLb');
makeWorkshopSlideshow('sunday-slideshow',    'sundayLb');
makeWorkshopSlideshow('gifting-slideshow',   'giftingLb');
makeWorkshopSlideshow('custom-paintings-slideshow', 'customPaintingsLb');
makeWorkshopSlideshow('flower-slideshow',           'flowerLb');
makeWorkshopSlideshow('ganesha-slideshow',          'ganeshaLb');

// === Generic single-image lightbox for all non-slideshow cards ===
(function () {
    const overlay = document.getElementById('imageLb');
    if (!overlay) return;
    const lbImg   = overlay.querySelector('.lb-img');
    const lbClose = overlay.querySelector('.lb-close');

    function open(src, alt) {
        lbImg.src = src;
        lbImg.alt = alt;
        overlay.classList.add('lb-open');
        document.body.style.overflow = 'hidden';
        lbClose.focus();
    }

    function close() {
        overlay.classList.remove('lb-open');
        lbImg.src = '';
        document.body.style.overflow = '';
    }

    // Auto-wire every non-slideshow image container
    document.querySelectorAll('.wc-img:not(.ws-slideshow), .class-img-wrap:not(.ws-slideshow)').forEach(wrap => {
        const img = wrap.querySelector('img');
        if (!img) return;
        wrap.setAttribute('tabindex', '0');
        wrap.setAttribute('role', 'button');
        wrap.addEventListener('click', () => open(img.src, img.alt));
        wrap.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(img.src, img.alt); }
        });
    });

    lbClose.addEventListener('click', close);
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
    document.addEventListener('keydown', e => {
        if (!overlay.classList.contains('lb-open')) return;
        if (e.key === 'Escape') close();
    });
})();
