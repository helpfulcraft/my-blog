// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import HeadingColors from './HeadingColors.vue'
import BlogEditorNew from './components/BlogEditorNew.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('HeadingColors', HeadingColors)
    app.component('BlogEditorNew', BlogEditorNew)
  }
}
