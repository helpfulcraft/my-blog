import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 文章目录路径
const ARTICLES_DIR = path.join(__dirname, '../articles')
const EXCLUDE_FILES = ['index.md']

// 读取文章元数据
function getArticleMetadata(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    const { data, content: markdown } = matter(content)
    const title = data.title || path.basename(filePath, '.md')
    return {
      title,
      date: data.date || new Date(),
      tags: data.tags || [],
      description: data.description || '',
      link: `/articles/${path.basename(filePath, '.md')}`
    }
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error)
    return null
  }
}

// 获取所有文章
function getAllArticles() {
  const articles = []
  
  const files = fs.readdirSync(ARTICLES_DIR)
  
  files.forEach(file => {
    if (file.endsWith('.md') && !EXCLUDE_FILES.includes(file)) {
      const filePath = path.join(ARTICLES_DIR, file)
      const metadata = getArticleMetadata(filePath)
      if (metadata) {
        articles.push(metadata)
      }
    }
  })
  
  return articles.sort((a, b) => new Date(b.date) - new Date(a.date))
}

// 按标签分组文章
function groupArticlesByTags(articles) {
  const groups = {}
  
  // 确保每篇文章都被处理
  articles.forEach(article => {
    console.log('Processing article:', article.title, 'with tags:', article.tags)
    
    if (Array.isArray(article.tags)) {
      article.tags.forEach(tag => {
        if (!groups[tag]) groups[tag] = []
        groups[tag].push(article)
      })
    }
  })
  
  // 按标签名称排序
  const sortedGroups = {}
  Object.keys(groups).sort().forEach(tag => {
    sortedGroups[tag] = groups[tag].sort((a, b) => new Date(b.date) - new Date(a.date))
  })
  
  return sortedGroups
}

// 生成侧边栏配置
function generateSidebar(articles) {
  console.log('Generating sidebar with articles:', articles.length)
  
  const tagGroups = groupArticlesByTags(articles)
  const sidebar = []
  
  // 按标签分组
  Object.entries(tagGroups).forEach(([tag, tagArticles]) => {
    console.log(`Adding tag group: ${tag} with ${tagArticles.length} articles`)
    sidebar.push({
      text: `${tag} (${tagArticles.length})`,
      collapsed: true,
      items: tagArticles.map(article => ({
        text: article.title,
        link: article.link
      }))
    })
  })
  
  return sidebar
}

// 生成文章列表页面内容
function generateArticlesList(articles) {
  const content = [`# 文章列表\n`]
  
  // 按标签分组
  const tagGroups = groupArticlesByTags(articles)
  content.push(`## 文章分类\n`)
  Object.entries(tagGroups).forEach(([tag, tagArticles]) => {
    content.push(`### ${tag} (${tagArticles.length})`)
    tagArticles.forEach(article => {
      const date = new Date(article.date).toLocaleDateString('zh-CN')
      content.push(`- [${article.title}](${article.link}) - ${date}`)
    })
    content.push('')
  })
  
  return content.join('\n')
}

// 主函数
export function generateBlogConfig() {
  const articles = getAllArticles()
  const sidebar = generateSidebar(articles)
  const articlesList = generateArticlesList(articles)
  
  // 更新文章列表页面
  fs.writeFileSync(
    path.join(ARTICLES_DIR, 'index.md'),
    articlesList
  )
  
  return {
    sidebar: {
      '/articles/': sidebar
    }
  }
}
