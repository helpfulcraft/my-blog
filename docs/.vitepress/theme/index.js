// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import BlogEditor from './components/BlogEditorNew.vue'
import InlineEditor from './components/InlineEditor.vue'
import Article from './components/Article.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('BlogEditor', BlogEditor)
    app.component('InlineEditor', InlineEditor)
    app.component('Article', Article)
  }
}
