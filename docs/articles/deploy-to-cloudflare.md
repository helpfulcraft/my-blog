---
title: 将 VitePress 博客部署到 Cloudflare Pages
date: 2024-12-24
description: 本文介绍如何将 VitePress 博客成功部署到 Cloudflare Pages，包括常见问题的解决方案
tags: ['VitePress', 'Cloudflare', '部署']
---

# 将 VitePress 博客部署到 Cloudflare Pages

在这篇文章中，我将分享如何将 VitePress 博客成功部署到 Cloudflare Pages 的经验。

## 准备工作

1. 一个 GitHub 仓库
2. Cloudflare 账号
3. VitePress 博客项目

## 部署步骤

### 1. 推送代码到 GitHub

首先，确保你的代码已经推送到 GitHub 仓库：

```bash
git add .
git commit -m "Initial commit"
git push origin master
```

### 2. Cloudflare Pages 配置

在 Cloudflare Pages 中，需要使用以下配置：

- 框架预设：VitePress
- 构建命令：npm install && npx vitepress build
- 构建输出目录：.vitepress/dist
- 根目录：/docs

### 3. 注意事项

- 确保所有依赖都在 package.json 的 dependencies 中
- 检查构建输出目录的路径是否正确
- 使用 npm install 确保依赖被正确安装

## 常见问题解决

如果遇到构建失败，通常可以检查：

1. 依赖是否正确安装
2. 构建命令是否正确
3. 输出目录路径是否正确

## 总结

通过以上步骤，你的 VitePress 博客应该已经成功部署到 Cloudflare Pages 了。现在你可以通过 Cloudflare 提供的域名访问你的博客了。

记住，每次推送代码到 GitHub 后，Cloudflare Pages 都会自动重新构建和部署你的网站。
