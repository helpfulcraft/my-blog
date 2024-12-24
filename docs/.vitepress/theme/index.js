// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import BlogList from './components/BlogList.vue'
import TagList from './components/TagList.vue'
import BlogEditor from './components/BlogEditorNew.vue'
import InlineEditor from './components/InlineEditor.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('BlogList', BlogList)
    app.component('TagList', TagList)
    app.component('BlogEditor', BlogEditor)
    app.component('InlineEditor', InlineEditor)
  }
}
