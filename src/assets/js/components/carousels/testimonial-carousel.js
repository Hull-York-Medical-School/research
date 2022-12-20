const TestimonialExists = document.querySelectorAll('section.testimonial-carousel')

for (i = 0; i < TestimonialExists.length; i++) {
  const Testimonial = document.querySelectorAll('.testimonial')
  const pager = document.querySelectorAll('.swiper-pagination')
  const next = document.querySelectorAll('.testimonial-next')
  const prev = document.querySelectorAll('.testimonial-prev')

  Testimonial[i].classList.add('testimonial-' + i)
  pager[i].classList.add('pager-' + i)
  next[i].classList.add('next-' + i)
  prev[i].classList.add('prev-' + i)

  var newsFeature = new Swiper('.testimonial-' + i, {
    spaceBetween: 30,
    speed: 800,
    autoHeight: true,
    // loop: true,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    pagination: {
      el: '.pager-' + i,
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.next-' + i,
      prevEl: '.prev-' + i
    }
  })
}
