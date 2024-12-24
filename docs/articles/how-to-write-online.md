---
title: 如何在线编写博客文章
date: 2024-12-24
description: 使用 GitHub 在线编辑功能快速创建和编辑博客文章
tags: ['教程', 'GitHub', '写作']
---

# 如何在线编写博客文章

本文将介绍如何使用 GitHub 的在线编辑功能来创建和编辑博客文章。

## 创建新文章

1. 访问 [GitHub 仓库](https://github.com/helpfulcraft/my-blog)
2. 进入 `docs/articles` 目录
3. 点击右上角的 "Add file" > "Create new file"
4. 文件名格式：`your-article-name.md`（使用英文，用连字符连接单词）

## 文章格式

每篇文章都需要包含以下前置信息（Front Matter）：

```yaml
---
title: 文章标题
date: YYYY-MM-DD
description: 文章描述
tags: ['标签1', '标签2']
---
```

可以参考 [文章模板](https://github.com/helpfulcraft/my-blog/blob/master/docs/articles/article-template.md)。

## 在线编辑步骤

1. 在 GitHub 仓库中找到要编辑的文章
2. 点击文件右上角的铅笔图标（Edit this file）
3. 使用 Markdown 格式编辑文章
4. 在页面底部填写提交信息（如："docs: update article content"）
5. 点击 "Commit changes"

## Markdown 语法参考

### 标题
```markdown
# 一级标题
## 二级标题
### 三级标题
```

### 格式化
```markdown
**粗体**
*斜体*
~~删除线~~
```

### 列表
```markdown
- 无序列表项
1. 有序列表项
```

### 代码
````markdown
```javascript
console.log('Hello, World!');
```
````

### 链接和图片
```markdown
[链接文字](链接URL)
![图片描述](图片URL)
```

## 自动部署

提交更改后，Cloudflare Pages 将自动检测到更改并重新部署网站。通常需要等待 1-2 分钟才能在网站上看到更改。

## 注意事项

1. 文件名请使用英文小写字母，单词之间用连字符（-）连接
2. 确保 Front Matter 格式正确，否则可能导致构建失败
3. 图片建议上传到图床或 GitHub 仓库的 `docs/public` 目录
4. 提交前可以使用 Preview 功能预览文章效果

## 本地预览（可选）

如果你想在本地预览文章效果，可以克隆仓库后运行：

```bash
npm install
npm run dev
```

这样就可以在 `http://localhost:5173` 预览网站效果了。
