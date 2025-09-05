    // As the user scrolls,the background opacity is updated (0 at scrollY = 0 to 1 at scrollY = 1500)
    // This doesn't seem to work on older browsers. Presumably the HTML tags I use here are new or something.
    window.addEventListener('scroll', () => {
      let scrollY = window.scrollY;
      let fraction = Math.min(scrollY / 1500, 1);
      document.body.style.setProperty('--bg-opacity', fraction);
      let fraction2 = (50 + 50 * Math.min(scrollY / 500, 1)) + '%';
      document.body.style.setProperty('--NavBarmovement', fraction2);
    });
    document.body.style.setProperty('--bg-image', "url('/images/farne-islands/FarneIslandsBackground1.jpg')");