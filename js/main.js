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

        // === Smooth Scroll (for any remaining in-page anchors) ===
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

        // === Active Nav via pathname ===
        (function() {
            const filename = window.location.pathname.split('/').pop() || 'index.html';
            document.querySelectorAll('.nav-links a, .mobile-nav-links a').forEach(link => {
                if (link.getAttribute('href') === filename) link.classList.add('nav-active');
            });
        })();

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
            // Announce to screen readers via persistent live region
            let announcer = document.getElementById('srAnnouncer');
            if (!announcer) {
                announcer = document.createElement('div');
                announcer.id = 'srAnnouncer';
                announcer.setAttribute('aria-live', 'polite');
                announcer.setAttribute('aria-atomic', 'true');
                announcer.className = 'sr-only';
                document.body.appendChild(announcer);
            }
            announcer.textContent = '';
            requestAnimationFrame(() => { announcer.textContent = msg; });

            const t = document.createElement('div');
            t.className = 'form-toast' + (isError ? ' error' : '');
            t.setAttribute('role', 'status');
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
                        showToast("Thank you! We'll get back to you soon.");
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

        // === Exhibition Form Submission ===
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
                const imgSrc = row.image || row['image url'] || '';
                const imgHtml = imgSrc
                    ? `<div class="ann-card-img-wrap"><img class="ann-card-img" src="${imgSrc}" alt="${row.title || 'Announcement'}" loading="lazy" onerror="this.closest('.ann-card-img-wrap').outerHTML='<div class=ann-card-img-placeholder>🎨</div>'"></div>`
                    : `<div class="ann-card-img-placeholder">🎨</div>`;
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
        void track.offsetWidth;
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
        e.preventDefault();
        dx = mx;
        track.style.transform = 'translate3d(' + (-100 + (dx / width) * 100) + '%,0,0)';
    }, { passive: false });

    viewport.addEventListener('touchend', () => {
        if (animating || !dragging) { dragging = false; return; }
        dragging = false;
        const threshold = width * 0.25;
        if (dx <= -threshold)      settle(-200, idx + 1);
        else if (dx >= threshold)  settle(0, idx - 1);
        else                       settle(-100, idx);
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

    function openAt(index) {
        current = ((index % items.length) + items.length) % items.length;
        overlay.classList.add('lb-open');
        document.body.style.overflow = 'hidden';
        lbPrev.style.display = items.length === 1 ? 'none' : '';
        lbNext.style.display = items.length === 1 ? 'none' : '';
        if (IS_TOUCH) {
            viewer.show(items, current);
        } else {
            lbImg.src = items[current].src;
            lbImg.alt = items[current].alt;
            lbCap.textContent = items.length === 1
                ? items[current].caption
                : items[current].caption + '  ·  ' + (current + 1) + ' / ' + items.length;
        }
        lbClose.focus();
    }

    function close() {
        overlay.classList.remove('lb-open');
        lbImg.src = '';
        document.body.style.overflow = '';
    }

    document.querySelector('#services')?.addEventListener('click', e => {
        const siImg = e.target.closest('.si-img');
        if (!siImg || siImg.classList.contains('ws-slideshow')) return;
        items = [{
            src:     siImg.querySelector('img').src,
            alt:     siImg.querySelector('img').alt,
            caption: siImg.closest('.service-item').querySelector('h5')?.textContent || ''
        }];
        openAt(0);
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

// === My Artworks Lightbox ===
(function () {
    const overlay  = document.getElementById('galleryLb');
    const lbImg    = document.getElementById('galleryLbImg');
    const lbCap    = document.getElementById('galleryLbCaption');
    const lbClose  = document.getElementById('galleryLbClose');
    const lbPrev   = document.getElementById('galleryLbPrev');
    const lbNext   = document.getElementById('galleryLbNext');
    if (!overlay) return;

    const cards = Array.from(document.querySelectorAll('#gallery .gallery-grid .gallery-item'));
    const items = cards.map(card => ({
        src:     card.querySelector('img').src,
        alt:     card.querySelector('img').alt,
        caption: card.querySelector('.gallery-info h4')?.textContent || ''
    }));
    let current = 0;
    const viewer = IS_TOUCH
        ? createSwipeViewer(overlay, (i, t) => items[i].caption + '  ·  ' + (i + 1) + ' / ' + t, i => { current = i; })
        : null;

    function openAt(index) {
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

    cards.forEach((card, i) => card.addEventListener('click', () => openAt(i)));

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
    let current    = 0;
    let lbIndex    = 0;
    let hoverTimer = null;

    function showSlide(index) {
        const next = ((index % slides.length) + slides.length) % slides.length;
        if (next === current) return;
        const outgoing = slides[current];
        outgoing.classList.remove('active');
        outgoing.classList.add('leaving');
        setTimeout(() => outgoing.classList.remove('leaving'), 1500);
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
        new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!hoverTimer) hoverTimer = setInterval(() => {
                        if (overlay.classList.contains('lb-open')) return;
                        showSlide(current + 1);
                    }, 1500);
                } else {
                    clearInterval(hoverTimer);
                    hoverTimer = null;
                    resetSlides();
                }
            });
        }, { threshold: 0.45 }).observe(slideshow);
    } else {
        slideshow.addEventListener('mouseenter', () => {
            hoverTimer = setInterval(() => showSlide(current + 1), 1500);
        });
        slideshow.addEventListener('mouseleave', () => {
            clearInterval(hoverTimer);
            hoverTimer = null;
            resetSlides();
        });
    }

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
makeWorkshopSlideshow('diwali-slideshow',    'diwaliLb');
makeWorkshopSlideshow('summerartcamps-slideshow', 'summerArtCampsLb');
makeWorkshopSlideshow('gifting-slideshow',   'giftingLb');
makeWorkshopSlideshow('custom-paintings-slideshow', 'customPaintingsLb');
makeWorkshopSlideshow('weddingportrait-slideshow', 'weddingPortraitLb');
makeWorkshopSlideshow('personalizedportraits-slideshow', 'personalizedPortraitsLb');
makeWorkshopSlideshow('wallmurals-slideshow', 'wallMuralsLb');
makeWorkshopSlideshow('threedpainting-slideshow', 'threeDPaintingLb');
makeWorkshopSlideshow('fabricwearable-slideshow', 'fabricWearableLb');
makeWorkshopSlideshow('flower-slideshow',           'flowerLb');
makeWorkshopSlideshow('holicolor-slideshow',        'holiColorLb');
makeWorkshopSlideshow('ganesha-slideshow',          'ganeshaLb');

// === Classes page cards ===
makeWorkshopSlideshow('stilllife-slideshow',    'stillLifeLb');
makeWorkshopSlideshow('watercolour-slideshow',  'waterColourLb');
makeWorkshopSlideshow('landscapes-slideshow',   'landscapesLb');
makeWorkshopSlideshow('portrait-slideshow',     'portraitLb');
makeWorkshopSlideshow('resinart-slideshow',     'resinArtLb');
makeWorkshopSlideshow('abstractart-slideshow',  'abstractArtLb');
makeWorkshopSlideshow('charcoalart-slideshow',  'charcoalArtLb');
makeWorkshopSlideshow('penink-slideshow',       'peninkLb');
makeWorkshopSlideshow('drypastel-slideshow',    'dryPastelLb');
makeWorkshopSlideshow('oilpastel-slideshow',    'oilPastelLb');
makeWorkshopSlideshow('madhubani-slideshow',    'madhubaniLb');
makeWorkshopSlideshow('lippan-slideshow',       'lippanLb');
makeWorkshopSlideshow('glasspainting-slideshow','glassPaintingLb');
makeWorkshopSlideshow('fridgemagnets-slideshow','fridgeMagnetsLb');
makeWorkshopSlideshow('flowermaking-slideshow', 'flowerMakingLb');
makeWorkshopSlideshow('macrame-slideshow',      'macrameLb');
makeWorkshopSlideshow('planter-slideshow',      'planterLb');
makeWorkshopSlideshow('easteregg-slideshow',    'eastereggLb');

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

// === Back to Top ===
(function () {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 400) btn.classList.add('visible');
        else btn.classList.remove('visible');
    }, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

// === Classes Show More (mobile) ===
(function () {
    const grid = document.getElementById('classesGrid');
    const showMoreBtn = document.getElementById('classesShowMore');
    if (!grid || !showMoreBtn) return;

    const INITIAL = 9;
    const cards = Array.from(grid.querySelectorAll('.class-card-compact'));
    const label = showMoreBtn.querySelector('span');

    function applyHide() {
        if (window.innerWidth <= 767) {
            cards.forEach((c, i) => {
                if (i >= INITIAL && !showMoreBtn.classList.contains('expanded')) {
                    c.classList.add('mobile-hidden');
                }
            });
        } else {
            cards.forEach(c => c.classList.remove('mobile-hidden'));
        }
    }
    applyHide();

    showMoreBtn.addEventListener('click', function () {
        const expanded = this.classList.contains('expanded');
        if (expanded) {
            cards.forEach((c, i) => { if (i >= INITIAL) c.classList.add('mobile-hidden'); });
            label.textContent = 'Show all classes';
            grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            cards.forEach(c => c.classList.remove('mobile-hidden'));
            label.textContent = 'Show fewer';
        }
        this.classList.toggle('expanded');
    });
})();
