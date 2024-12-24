---
title: VitePress 博客写作指南
date: 2024-12-24
tags: ['指南', '写作']
description: 学习如何在 VitePress 博客中创建和组织文章
---

# VitePress 博客写作指南

## Markdown 基础语法

### 标题

#### 语法
```md
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
```

#### 最佳实践
- 一篇文章只使用一个一级标题
- 按层级组织内容
- 避免跳级使用标题

### 文本格式化

#### 基础格式
```md
**粗体文本**
*斜体文本*
***粗斜体文本***
~~删除线文本~~
`行内代码`
```

效果如下：
- **粗体文本**
- *斜体文本*
- ***粗斜体文本***
- ~~删除线文本~~
- `行内代码`

#### 高级格式
##### 下标和上标
```md
H~2~O
X^2^
```

##### 高亮标记
```md
==高亮文本==
```

## Markdown 增强功能

### 提示框

#### 基础提示框
```md
::: tip 提示
这是一个提示信息
:::
```

效果如下：

::: tip 提示
这是一个提示信息
:::

#### 其他类型提示框
```md
::: warning 警告
这是一个警告信息
:::

::: danger 危险
这是一个危险警告
:::

::: info 信息
这是一个信息框
:::
```

效果如下：

::: warning 警告
这是一个警告信息
:::

::: danger 危险
这是一个危险警告
:::

::: info 信息
这是一个信息框
:::

### 代码块

#### 基础代码块
##### 语法
```md
\```js
const hello = 'Hello World'
console.log(hello)
\```
```

##### 效果
```js
const hello = 'Hello World'
console.log(hello)
```

#### 高亮代码块
##### 语法
```md
\```js{1,3-4}
const hello = 'Hello World'    // 第1行高亮
console.log(hello)
const msg = 'VitePress'        // 第3行高亮
console.log(msg)               // 第4行高亮
\```
```

##### 效果
```js{1,3-4}
const hello = 'Hello World'    // 第1行高亮
console.log(hello)
const msg = 'VitePress'        // 第3行高亮
console.log(msg)               // 第4行高亮
```

### 表格

#### 基础表格
##### 语法
```md
| 特性 | 语法 | 效果 |
|:-----|:----:|-----:|
| 左对齐 | `:---` | 文本 |
| 居中 | `:---:` | 文本 |
| 右对齐 | `---:` | 文本 |
```

##### 效果
| 特性 | 语法 | 效果 |
|:-----|:----:|-----:|
| 左对齐 | `:---` | 文本 |
| 居中 | `:---:` | 文本 |
| 右对齐 | `---:` | 文本 |

### 数学公式

#### 行内公式
##### 语法
```md
爱因斯坦质能方程：$E = mc^2$
```

##### 效果
爱因斯坦质能方程：$E = mc^2$

#### 独立公式
##### 语法
```md
巴塞尔问题：
$$ 
\sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6}
$$
```

##### 效果
巴塞尔问题：
$$ 
\sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6}
$$

### 任务列表

#### 基础任务列表
##### 语法
```md
- [ ] 未完成的任务
- [x] 已完成的任务
```

##### 效果
- [ ] 未完成的任务
- [x] 已完成的任务

#### 嵌套任务列表
##### 语法
```md
- [ ] 主任务 1
  - [ ] 子任务 1.1
  - [x] 子任务 1.2
- [ ] 主任务 2
  - [ ] 子任务 2.1
    - [ ] 子任务 2.1.1
    - [x] 子任务 2.1.2
```

##### 效果
- [ ] 主任务 1
  - [ ] 子任务 1.1
  - [x] 子任务 1.2
- [ ] 主任务 2
  - [ ] 子任务 2.1
    - [ ] 子任务 2.1.1
    - [x] 子任务 2.1.2

## 图片管理

### 目录结构
```
docs/public/images/
├── posts/
│   └── example/
│       └── cat.jpg        # 示例图片
└── assets/
    └── logo.png          # 网站 Logo
```

### 图片引用

#### 基础图片
```md
![示例图片](https://doc-fd.zol-img.com.cn/t_s640x2000/g7/M00/0C/0B/ChMkK2VpgFmIE7-jAADYgO_v2CQAAXxOQNgUVIAANiY556.jpg)
```

效果如下：

![示例图片](https://doc-fd.zol-img.com.cn/t_s640x2000/g7/M00/0C/0B/ChMkK2VpgFmIE7-jAADYgO_v2CQAAXxOQNgUVIAANiY556.jpg)

#### 带属性的图片
```md
<img src="https://doc-fd.zol-img.com.cn/t_s640x2000/g7/M00/0C/0B/ChMkK2VpgFmIE7-jAADYgO_v2CQAAXxOQNgUVIAANiY556.jpg" 
     alt="可爱的猫咪" 
     title="点击查看大图"
     width="300" 
     loading="lazy">
```

效果如下：

<img src="https://doc-fd.zol-img.com.cn/t_s640x2000/g7/M00/0C/0B/ChMkK2VpgFmIE7-jAADYgO_v2CQAAXxOQNgUVIAANiY556.jpg" 
     alt="可爱的猫咪" 
     title="点击查看大图"
     width="300" 
     loading="lazy">

#### 图片组
```md
<div class="image-group">
  <img src="https://doc-fd.zol-img.com.cn/t_s640x2000/g7/M00/0C/0B/ChMkK2VpgFmIE7-jAADYgO_v2CQAAXxOQNgUVIAANiY556.jpg" width="200" alt="猫咪 1">
  <img src="https://doc-fd.zol-img.com.cn/t_s640x2000/g7/M00/0C/0B/ChMkK2VpgFmIE7-jAADYgO_v2CQAAXxOQNgUVIAANiY556.jpg" width="200" alt="猫咪 2">
</div>
```

效果如下：

<div class="image-group">
  <img src="https://doc-fd.zol-img.com.cn/t_s640x2000/g7/M00/0C/0B/ChMkK2VpgFmIE7-jAADYgO_v2CQAAXxOQNgUVIAANiY556.jpg" width="200" alt="猫咪 1">
  <img src="https://doc-fd.zol-img.com.cn/t_s640x2000/g7/M00/0C/0B/ChMkK2VpgFmIE7-jAADYgO_v2CQAAXxOQNgUVIAANiY556.jpg" width="200" alt="猫咪 2">
</div>

#### 图片说明
```md
<figure>
  <img src="https://doc-fd.zol-img.com.cn/t_s640x2000/g7/M00/0C/0B/ChMkK2VpgFmIE7-jAADYgO_v2CQAAXxOQNgUVIAANiY556.jpg" alt="猫咪特写">
  <figcaption>图 1: 一只正在思考人生的猫咪</figcaption>
</figure>
```

效果如下：

<figure>
  <img src="https://doc-fd.zol-img.com.cn/t_s640x2000/g7/M00/0C/0B/ChMkK2VpgFmIE7-jAADYgO_v2CQAAXxOQNgUVIAANiY556.jpg" alt="猫咪特写">
  <figcaption>图 1: 一只正在思考人生的猫咪</figcaption>
</figure>

### 图片最佳实践

#### 存储建议
- 将图片存放在 `docs/public/images` 目录下
- 按文章或类别组织图片目录
- 使用有意义的文件名
- 提供适当大小的缩略图

#### 性能优化
- 压缩图片以减少加载时间
- 使用 `loading="lazy"` 延迟加载
- 提供合适的图片尺寸
- 使用 WebP 格式（如果可能）

#### 可访问性
- 始终添加有意义的 `alt` 属性
- 使用 `figure` 和 `figcaption` 添加说明
- 确保图片文字对比度足够

#### 响应式设计
- 使用相对宽度（如 `width="100%"`）
- 考虑使用 `max-width` 限制最大尺寸
- 提供不同分辨率的图片版本

## 写作技巧

### 文章结构

#### 标题层级
- 使用一个一级标题作为文章标题
- 用二级标题划分主要章节
- 用三级标题细分具体内容
- 保持层级不超过四级

#### 内容组织
- 开头说明文章目的和主要内容
- 使用列表和表格组织信息
- 用代码块展示示例
- 用提示框强调重要信息
- 结尾总结关键点

### 格式规范

#### 基础规范
- 中英文之间加空格
- 代码块指定语言
- 图片添加有意义的描述
- 使用统一的标点符号

#### 高级规范
- 使用清晰的标题和副标题
- 使用短句和短段落
- 避免使用过多的缩写和专业术语
- 使用有意义的链接文本
