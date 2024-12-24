---
title: Markdown 高级语法指南
date: 2024-12-24
tags: ['Markdown', '教程', '写作']
description: 学习 VitePress 中 Markdown 的高级用法和特殊功能
---

# Markdown 高级语法指南

## 1. 特殊容器

::: tip 提示
这是一个提示信息
:::

::: warning 警告
这是一个警告信息
:::

::: danger 危险
这是一个危险警告
:::

::: details 点击查看更多
这是一些隐藏的内容
:::

## 2. 代码块

### 基础代码块
```js
console.log('Hello World')
```

### 高亮特定行
```js{1,3-4}
console.log('这一行会高亮')
console.log('这一行不会高亮')
console.log('这一行会高亮') // 第3行
console.log('这一行也会高亮') // 第4行
```

### 显示行号
```js:line-numbers
console.log('第一行')
console.log('第二行')
console.log('第三行')
```

## 3. 表格

| 特性 | 支持 | 备注 |
|------|------|------|
| 表格 | ✅ | 支持对齐 |
| 脚注 | ✅ | 自动编号 |
| 任务列表 | ✅ | 可交互 |

## 4. LaTeX 数学公式

行内公式：$E = mc^2$

独立公式：
$$ 
\frac{1}{\pi} = \frac{2\sqrt{2}}{9801} \sum_{k=0}^{\infty} \frac{(4k)!(1103+26390k)}{(k!)^4 396^{4k}}
$$

## 5. 任务列表

- [x] 已完成任务
- [ ] 未完成任务
- [ ] 计划中的任务

## 6. 自定义容器

::: info 自定义标题
这是一个带有自定义标题的信息框
:::

## 7. 图片处理

### 基础图片
![示例图片](https://example.com/image.jpg)

### 自定义图片大小
<img src="https://example.com/image.jpg" alt="示例图片" width="300" />

## 8. 组件使用

<!-- 使用 Vue 组件 -->
<CustomComponent>
  这是组件内容
</CustomComponent>

## 9. 引用

> 这是一个引用
>> 这是嵌套引用

## 10. 高级链接

[外部链接](https://example.com)
[内部链接](./getting-started-with-vitepress.md)
[带标题的链接](https://example.com "鼠标悬停显示")

## 写作建议

1. **合理使用标题层级**
   - 文章只使用一个一级标题
   - 使用二级和三级标题组织内容
   - 避免过深的标题层级

2. **适当使用强调**
   - **重要内容**使用加粗
   - *补充说明*使用斜体
   - `代码`使用反引号

3. **使用特殊容器**
   - 使用 tip 容器突出提示
   - 使用 warning 容器标注警告
   - 使用 danger 容器标注危险

4. **代码展示**
   - 使用语法高亮
   - 标注重要行
   - 添加有意义的注释

## 结语

这篇文章展示了 VitePress 中 Markdown 的主要高级特性。你可以根据需要选择合适的语法来组织你的文章内容。记住，写作的关键是内容的清晰和结构的合理，这些特性都是为了帮助你更好地展示内容。
