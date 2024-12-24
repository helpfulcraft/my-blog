---
title: 开始使用 VitePress 搭建个人博客
date: 2024-12-24
tags: ['VitePress', '教程', '入门']
description: 从零开始学习如何使用 VitePress 搭建个人博客
---

# 开始使用 VitePress 搭建个人博客

::: info
发布日期：2024-12-24  
作者：Your Name
:::

## 为什么选择 VitePress？

VitePress 是一个基于 Vite 和 Vue 的静态网站生成器，它具有以下优势：

1. **极快的开发体验**
   - 基于 Vite 构建，启动和热更新速度极快
   - 开发服务器秒级启动

2. **简单易用**
   - 配置简单直观
   - Markdown 支持丰富
   - 可以直接在 Markdown 中使用 Vue 组件

3. **美观的默认主题**
   - 现代化的设计
   - 自适应暗黑模式
   - 响应式布局

## 快速开始

1. 创建项目：
```bash
npm create vitepress@latest
```

2. 安装依赖：
```bash
cd my-blog
npm install
```

3. 启动开发服务器：
```bash
npm run dev
```

## 基础配置

VitePress 的配置文件位于 `.vitepress/config.js`：

```javascript
export default {
  title: 'My Blog',
  description: 'A VitePress Blog',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Articles', link: '/articles/' }
    ]
  }
}
```

## 写作技巧

1. **使用 Frontmatter**
```yaml
---
title: 文章标题
date: 2024-12-24
tags: ['VitePress', 'Blog']
---
```

2. **使用 Markdown 扩展语法**
::: tip
这是一个提示框
:::

::: warning
这是一个警告框
:::

3. **使用 Vue 组件**
你可以直接在 Markdown 中使用 Vue 组件！

## 部署

VitePress 生成的是静态网站，可以轻松部署到任何静态网站托管服务：

1. 构建网站：
```bash
npm run build
```

2. 部署到 Cloudflare Pages：
   - 连接你的 GitHub 仓库
   - 设置构建命令：`npm run build`
   - 设置输出目录：`docs/.vitepress/dist`

## 结语

VitePress 是一个强大而简单的博客框架，希望这篇文章能帮助你快速上手！
