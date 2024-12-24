// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import HeadingColors from './HeadingColors.vue'
import EditorLayout from './components/EditorLayout.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('HeadingColors', HeadingColors)
  },
  Layout: EditorLayout
}
