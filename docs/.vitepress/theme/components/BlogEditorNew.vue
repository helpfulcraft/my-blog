&lt;template&gt;
  &lt;div v-if=&quot;mounted&quot; class=&quot;editor-container&quot;&gt;
    &lt;div v-if=&quot;!isLoggedIn&quot; class=&quot;login-section&quot;&gt;
      &lt;h2&gt;请先登录&lt;/h2&gt;
      &lt;button @click=&quot;handleLogin&quot; class=&quot;login-button&quot;&gt;
        使用 GitHub 登录
      &lt;/button&gt;
    &lt;/div&gt;
    
    &lt;div v-else class=&quot;editor-form&quot;&gt;
      &lt;div class=&quot;form-group&quot;&gt;
        &lt;label for=&quot;title&quot;&gt;标题：&lt;/label&gt;
        &lt;input 
          id=&quot;title&quot;
          v-model=&quot;title&quot;
          type=&quot;text&quot;
          placeholder=&quot;文章标题&quot;
          class=&quot;form-input&quot;
        /&gt;
      &lt;/div&gt;

      &lt;div class=&quot;form-group&quot;&gt;
        &lt;label for=&quot;description&quot;&gt;描述：&lt;/label&gt;
        &lt;input 
          id=&quot;description&quot;
          v-model=&quot;description&quot;
          type=&quot;text&quot;
          placeholder=&quot;文章简短描述&quot;
          class=&quot;form-input&quot;
        /&gt;
      &lt;/div&gt;

      &lt;div class=&quot;form-group&quot;&gt;
        &lt;label for=&quot;tags&quot;&gt;标签：&lt;/label&gt;
        &lt;input 
          id=&quot;tags&quot;
          v-model=&quot;tags&quot;
          type=&quot;text&quot;
          placeholder=&quot;标签，用逗号分隔&quot;
          class=&quot;form-input&quot;
        /&gt;
      &lt;/div&gt;

      &lt;div class=&quot;form-group&quot;&gt;
        &lt;label for=&quot;content&quot;&gt;内容：&lt;/label&gt;
        &lt;textarea 
          id=&quot;content&quot;
          v-model=&quot;content&quot;
          placeholder=&quot;使用 Markdown 编写文章内容&quot;
          class=&quot;form-textarea&quot;
          rows=&quot;20&quot;
        &gt;&lt;/textarea&gt;
      &lt;/div&gt;

      &lt;button @click=&quot;handlePublish&quot; class=&quot;publish-button&quot;&gt;
        发布文章
      &lt;/button&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div v-else class=&quot;loading&quot;&gt;
    加载中...
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref, onMounted } from 'vue'

const title = ref('')
const content = ref('')
const tags = ref('')
const description = ref('')
const githubToken = ref('')
const isLoggedIn = ref(false)
const mounted = ref(false)

onMounted(() => {
  mounted.value = true
  const token = localStorage.getItem('github_token')
  if (token) {
    githubToken.value = token
    isLoggedIn.value = true
  }
})

function handleLogin() {
  const clientId = 'Ov23liRHUKlP6b6PhVoC'
  const workerUrl = 'https://blog-oauth.a1634358912.workers.dev'
  const redirectUri = `${workerUrl}/oauth/callback`
  const scope = 'repo'
  
  window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`
}

async function handlePublish() {
  if (!isLoggedIn.value) {
    alert('请先登录')
    return
  }

  try {
    const date = new Date().toISOString().split('T')[0]
    const fileName = title.value.toLowerCase().replace(/\s+/g, '-') + '.md'
    
    const fileContent = `---
title: ${title.value}
date: ${date}
description: ${description.value}
tags: [${tags.value.split(',').map(tag => `'${tag.trim()}'`).join(', ')}]
---

${content.value}
`
    
    // 使用 TextEncoder 来处理 UTF-8 字符
    const encoder = new TextEncoder()
    const data = encoder.encode(fileContent)
    const base64Content = btoa(String.fromCharCode(...new Uint8Array(data)))
    
    // 使用 GitHub API 创建文件
    const response = await fetch(`https://api.github.com/repos/helpfulcraft/my-blog/contents/docs/articles/${fileName}`, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${githubToken.value}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `feat: add new article - ${title.value}`,
        content: base64Content,
        branch: 'master'
      })
    })

    if (response.ok) {
      alert('文章发布成功！大约1-2分钟后可在网站上看到')
      // 清空表单
      title.value = ''
      content.value = ''
      tags.value = ''
      description.value = ''
    } else {
      const errorData = await response.json()
      throw new Error(`发布失败: ${errorData.message}`)
    }
  } catch (error) {
    alert('发布失败：' + error.message)
    console.error('发布错误：', error)
  }
}
&lt;/script&gt;

&lt;style scoped&gt;
.editor-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.loading {
  text-align: center;
  padding: 40px;
  font-size: 1.2em;
  color: #666;
}

.login-section {
  text-align: center;
  padding: 40px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.form-textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  font-family: monospace;
  resize: vertical;
}

.login-button,
.publish-button {
  background-color: var(--vp-c-brand);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;
}

.login-button:hover,
.publish-button:hover {
  background-color: var(--vp-c-brand-dark);
}

.login-button:active,
.publish-button:active {
  transform: translateY(1px);
}
&lt;/style&gt;
