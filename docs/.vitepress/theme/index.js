// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import HeadingColors from './HeadingColors.vue'
import BlogEditor from './components/BlogEditor.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('HeadingColors', HeadingColors)
    app.component('BlogEditor', BlogEditor)
  }
}
