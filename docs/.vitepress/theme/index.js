// .vitepress/theme/index.js
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import HeadingColors from './HeadingColors.vue'
import EditorLayout from './components/EditorLayout.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('HeadingColors', HeadingColors)
  },
  Layout: () => {
    // 检查当前路径是否是编辑器页面
    if (typeof window !== 'undefined' && window.location.pathname.includes('/editor')) {
      return h(EditorLayout)
    }
    return h(DefaultTheme.Layout)
  }
}
