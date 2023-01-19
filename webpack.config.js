const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const Dotenv = require('dotenv-webpack')

module.exports = {
  mode: 'production',
  entry: {
    site: path.resolve(__dirname, 'src/assets/js/site.js'),
    common: path.resolve(__dirname, 'src/assets/js/common.js'),
    swiper: path.resolve(__dirname, 'src/assets/js/swiper.js'),
    // carousels
    'research-carousel': path.resolve(__dirname, 'src/assets/js/components/research/research-carousel.js'),
    'testimonial-carousel': path.resolve(__dirname, 'src/assets/js/components/carousels/testimonial-carousel.js'),
    'news-carousel': path.resolve(__dirname, 'src/assets/js/components/carousels/news-and-events-carousel.js'),
    'stories-carousel': path.resolve(__dirname, 'src/assets/js/components/carousels/stories-carousel.js'),
    'general-carousel': path.resolve(__dirname, 'src/assets/js/components/carousels/text-slide.js')
  },
  output: {
    path: path.resolve(__dirname, './build/assets/js'),
    filename: '[name].js'
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, '/src/assets/js/components'),
      'cms-config': path.resolve(__dirname, '/contensis-config.js')
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new Dotenv({
      allowEmptyValues: true,
      systemvars: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  }
}
