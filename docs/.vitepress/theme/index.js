// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import HeadingColors from './HeadingColors.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('HeadingColors', HeadingColors)
  }
}
