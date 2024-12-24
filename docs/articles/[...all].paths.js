import { createContentLoader } from 'vitepress'

export default createContentLoader('articles/*.md', {
  transform(raw) {
    return raw.map(page => {
      return {
        ...page,
        content: page.content,
        path: page.url.replace(/^\//, '')
      }
    })
  }
})
