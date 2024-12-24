// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import HeadingColors from './HeadingColors.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('HeadingColors', HeadingColors)
  }
}
