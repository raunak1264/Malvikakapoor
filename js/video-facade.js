// === Click-to-play YouTube player ===
// Shows only a poster until the visitor presses play, then swaps in the
// YouTube player in the same frame. Without JavaScript the link opens YouTube.
(function () {
    document.querySelectorAll('[data-youtube-id]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const id = link.dataset.youtubeId;
            const frame = document.createElement('iframe');
            frame.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&playsinline=1&rel=0&modestbranding=1';
            frame.title = link.dataset.youtubeTitle || 'YouTube video';
            frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
            frame.allowFullscreen = true;
            frame.referrerPolicy = 'strict-origin-when-cross-origin';
            const holder = link.parentElement;
            holder.classList.add('is-playing');
            link.replaceWith(frame);
            frame.focus();
        });
    });
})();
