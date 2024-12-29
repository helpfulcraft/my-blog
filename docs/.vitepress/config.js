import { defineConfig } from 'vitepress'
import { generateBlogConfig } from './genSidebar'

// 获取自动生成的博客配置
const blogConfig = generateBlogConfig()

export default defineConfig({
  // 站点配置
  title: "My Tech Blog",
  description: "A personal blog about technology and programming",
  lang: 'zh-CN',
  lastUpdated: true,

  markdown: {
    math: true,
    lineNumbers: true,
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息'
    },
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    },
    // 配置 TOC
    toc: {
      level: [1, 2, 3, 4, 5, 6]
    }
  },

  // 主题配置
  themeConfig: {
    // 导航栏
    nav: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/articles/' },
      { text: '关于', link: '/about/' },
      { text: '写文章', link: '/editor/' }
    ],

    // 使用自动生成的侧边栏配置
    sidebar: {
      '/articles/': [
        {
          text: '示例',
          items: [
            { text: '多级标题示例文章', link: '/articles/nested-headings-demo' }
          ]
        },
        ...blogConfig.sidebar['/articles/'] || []
      ]
    },

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/helpfulcraft' }
    ],

    // 页脚
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright 2024-present'
    },

    // 搜索
    search: {
      provider: 'local'
    },

    // 文章元数据
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },

    // 编辑链接
    editLink: {
      pattern: 'https://github.com/helpfulcraft/my-blog/edit/master/docs/:path',
      text: '在 GitHub 上编辑此页'
    },

    // 文章目录配置
    outline: {
      level: 'deep',     // 显示所有级别的标题
      label: '目录'      // 目录标题
    }
  }
})
