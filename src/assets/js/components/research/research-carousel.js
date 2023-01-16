const researchExists = document.querySelector('section.slider-image-banner')

if (document.body.contains(researchExists)) {
  var research = new Swiper('.research-one', {
    slidesPerView: 1,
    loop: true,
    speed: 800,
    spaceBetween: 30,
    preventInteractionOnTransition: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.research-next',
      prevEl: '.research-prev'
    },
    keyboard: {
      enabled: true
    },
    breakpoints: {
      // when window width is >= 576px
      576: {
        slidesPerView: 2
      },
      770: {
        slidesPerView: 1
      },
      1030: {
        slidesPerView: 2
      }
    },
    on: {
      init: function (research) {
        research.slides[research.activeIndex].removeAttribute('tabindex')
      },
      slideChangeTransitionStart: function (research) {
        research.slides.forEach((x) => x.setAttribute('tabindex', '-1'))
        research.slides[research.activeIndex].removeAttribute('tabindex')
        // research.slides[research.previousIndex].setAttribute("tabindex", "-1")
      },
      realIndexChange: function (research) {
        if (
          !document.activeElement.classList.contains('research-next') &&
          !document.activeElement.classList.contains('research-prev')
        ) {
          research.slides[research.activeIndex].focus()
        }
      }
    }
  })

  document.querySelector('.research-next').addEventListener('keypress', (event) => {
    if (event.key == 'Enter') {
      research.slideNext(800, false)

      research.slides.forEach((x) => x.setAttribute('tabindex', '-1'))
      research.slides[research.activeIndex].removeAttribute('tabindex')
    }
  })

  document.querySelector('.research-prev').addEventListener('keypress', (event) => {
    if (event.key == 'Enter') {
      research.slidePrev(800, false)

      research.slides.forEach((x) => x.setAttribute('tabindex', '-1'))
      research.slides[research.activeIndex].removeAttribute('tabindex')
    }
  })
}
