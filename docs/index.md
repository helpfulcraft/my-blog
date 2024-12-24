---
layout: home
title: 我的技术博客

hero:
  name: "我的技术博客"
  text: "记录学习和成长的点点滴滴"
  tagline: 分享技术经验，记录学习心得
  actions:
    - theme: brand
      text: 开始阅读
      link: /articles/
    - theme: alt
      text: 关于我
      link: /about/

features:
  - icon: 📝
    title: 文章分类
    details: 按主题分类整理的技术文章，方便查找和阅读。
    link: /articles/
  - icon: 🎨
    title: 标题颜色说明
    details: |
      <HeadingColors :colors="[
        { level: 'H1', color: '#2c3e50' },
        { level: 'H2', color: '#3498db' },
        { level: 'H3', color: '#16a085' },
        { level: 'H4', color: '#e67e22' },
        { level: 'H5', color: '#9b59b6' },
        { level: 'H6', color: '#e74c3c' }
      ]" />
      文章使用不同颜色区分标题层级，帮助理解文章结构。
    link: /articles/nested-headings-demo
  - icon: 📚
    title: 写作指南
    details: 提供完整的 Markdown 写作指南，帮助你更好地写作。
    link: /articles/writing-guide
---
