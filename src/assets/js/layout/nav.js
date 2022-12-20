export const menu = () => {
  return {
    isMenuOpen: false,
    isSearchOpen: false,
    screenSize: 0,
    freeze() {
      let root = document.getElementsByTagName('body')[0]
      if (this.isMenuOpen !== false || this.isSearchOpen !== false) {
        root.style = 'overflow: hidden'
      } else {
        root.style = ''
      }
    }
  }
}

window.menu = menu
