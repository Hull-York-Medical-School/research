import GLightbox from 'glightbox'

export const gallery = GLightbox({
  selector: '.gallery',
  plyr: {
    css: 'https://cdn.plyr.io/3.5.6/plyr.css', // Default not required to include
    js: 'https://cdn.plyr.io/3.5.6/plyr.js', // Default not required to include
    config: {
      ratio: '16:9', // or '4:3'
      muted: false,
      hideControls: true,
      youtube: {
        noCookie: true,
        rel: 0,
        showinfo: 0,
        iv_load_policy: 3
      },
      vimeo: {
        byline: false,
        portrait: false,
        title: false,
        speed: true,
        transparent: false
      }
    }
  }
})
