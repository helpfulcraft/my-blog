---
title: 文章编辑器
sidebar: false
---

<script setup>
import { ref, onMounted } from 'vue'
import { useData } from 'vitepress'

const title = ref('')
const content = ref('')
const tags = ref('')
const description = ref('')
const githubToken = ref('')
const isLoggedIn = ref(false)

const { site } = useData()

async function handleLogin() {
  // GitHub OAuth 登录
  const clientId = 'Ov23liRHUKlP6b6PhVoC'
  // 使用 Cloudflare Worker 处理 OAuth
  const workerUrl = 'https://blog-oauth.你的worker子域名.workers.dev'
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
    
    // 使用 GitHub API 创建文件
    const response = await fetch(`https://api.github.com/repos/helpfulcraft/my-blog/contents/docs/articles/${fileName}`, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${githubToken.value}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `feat: add new article - ${title.value}`,
        content: btoa(fileContent),
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
      throw new Error('发布失败')
    }
  } catch (error) {
    alert('发布失败：' + error.message)
  }
}
</script>

<template>
  <div class="editor-container">
    <div v-if="!isLoggedIn" class="login-section">
      <h2>请先登录</h2>
      <button @click="handleLogin" class="login-button">
        使用 GitHub 登录
      </button>
    </div>
    
    <div v-else class="editor-form">
      <div class="form-group">
        <label for="title">标题：</label>
        <input 
          id="title"
          v-model="title"
          type="text"
          placeholder="文章标题"
          class="form-input"
        />
      </div>

      <div class="form-group">
        <label for="description">描述：</label>
        <input 
          id="description"
          v-model="description"
          type="text"
          placeholder="文章简短描述"
          class="form-input"
        />
      </div>

      <div class="form-group">
        <label for="tags">标签：</label>
        <input 
          id="tags"
          v-model="tags"
          type="text"
          placeholder="标签，用逗号分隔"
          class="form-input"
        />
      </div>

      <div class="form-group">
        <label for="content">内容：</label>
        <textarea 
          id="content"
          v-model="content"
          placeholder="使用 Markdown 编写文章内容"
          class="form-textarea"
          rows="20"
        ></textarea>
      </div>

      <button @click="handlePublish" class="publish-button">
        发布文章
      </button>
    </div>
  </div>
</template>

<style scoped>
.editor-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.login-section {
  text-align: center;
  padding: 40px 0;
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
}

.login-button:hover,
.publish-button:hover {
  background-color: var(--vp-c-brand-dark);
}
</style>