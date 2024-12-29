// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import Layout from './Layout.vue'
import NotionEditor from './components/NotionEditor.vue'
import InlineEditor from './components/InlineEditor.vue'
import DocContent from './components/DocContent.vue'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('NotionEditor', NotionEditor)
    app.component('InlineEditor', InlineEditor)
    app.component('DocContent', DocContent)
  }
}
