import LazyLoad from 'vanilla-lazyload'

export const lazyLoadInstance = new LazyLoad({
  elements_selector: '.lazy',
  threshold: -50
})

lazyLoadInstance.update()
