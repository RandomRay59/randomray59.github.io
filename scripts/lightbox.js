// Lightbox.js code. This generates a magnified "lightbox" of an image once an image is clicked on to magnify.
// The same code was re-used for the lightboxes on the www.luastro.space website
// I did use ChatGPT to fix parts of it, I won't lie, but I understand the basics of how it works.
// Some lightbox <div> code is required on the page to load up the lightbox itself.

    (function() {
      // Only images within .feature-item open the lightbox:
      const items = Array.from(document.querySelectorAll('.feature-item img'));
      const lightbox   = document.getElementById('lightbox');
      const lbContent  = lightbox.querySelector('.lightbox-content');
      const lbImg      = lbContent.querySelector('img');
      const lbCaption  = lbContent.querySelector('.lb-caption');
      const closeBtn   = lbContent.querySelector('.lb-close');
      const maxBtn     = lbContent.querySelector('.lb-maximize');
      const prevBtn    = lbContent.querySelector('.lb-prev');
      const nextBtn    = lbContent.querySelector('.lb-next');
      let currentIndex = 0;

      function showLightbox(idx) {
        currentIndex = idx;
        const imgEl = items[idx];
        lbImg.src    = imgEl.src;
        lbImg.alt    = imgEl.alt;
        lbCaption.textContent = imgEl.closest('.feature-item').dataset.caption || imgEl.alt || '';
        lightbox.classList.add('open');
      }

      function hideLightbox() {
        lightbox.classList.remove('open');
        if (document.fullscreenElement) document.exitFullscreen();
      }

      function showPrev() { showLightbox((currentIndex - 1 + items.length) % items.length); }
      function showNext() { showLightbox((currentIndex + 1) % items.length); }

      items.forEach((img, idx) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', e => {
          e.preventDefault();
          showLightbox(idx);
        });
      });

      closeBtn.addEventListener('click', e => { e.stopPropagation(); hideLightbox(); });
      lightbox.addEventListener('click', hideLightbox);
      lbContent.addEventListener('click', e => e.stopPropagation());
      prevBtn.addEventListener('click', e => { e.stopPropagation(); showPrev(); });
      nextBtn.addEventListener('click', e => { e.stopPropagation(); showNext(); });
      maxBtn.addEventListener('click', e => {
	 e.stopPropagation();
	  if (!document.fullscreenElement) {
	    lbContent.requestFullscreen();
	  } else {
	    document.exitFullscreen();
	  }
	});


      document.addEventListener('keydown', e => {
        if (!lightbox.classList.contains('open')) return;
        if (e.key === 'Escape') hideLightbox();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'Enter') maxBtn.click();
      });
    })();