import { createContentLoader } from 'vitepress'

export default createContentLoader('articles/*.md', {
  includeSrc: true,  // 包含原始内容
  transform(raw) {
    return raw.map(page => {
      // 从文件路径中提取相对路径
      const relativePath = page.url.slice(1)  // 移除开头的 /
      return {
        ...page,
        content: page.src,  // 使用原始内容
        path: `docs/${relativePath}.md`  // 添加完整的文件路径
      }
    })
  }
})
