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
const showEditor = ref(false)

const { site } = useData()

onMounted(() => {
  // 检查本地存储中的 token
  const token = localStorage.getItem('github_token')
  if (token) {
    githubToken.value = token
    isLoggedIn.value = true
  }
  showEditor.value = true
})

async function handleLogin() {
  // GitHub OAuth 登录
  const clientId = 'Ov23liRHUKlP6b6PhVoC'
  // 使用 Cloudflare Worker 处理 OAuth
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

if (typeof window !== 'undefined') {
  const BlogEditor = defineAsyncComponent(() =>
    import('../.vitepress/theme/components/BlogEditor.vue')
  )
}
</script>

<ClientOnly>
  <Suspense>
    <template #default>
      <BlogEditor />
    </template>
    <template #fallback>
      <div class="loading">
        <p>加载中...</p>
      </div>
    </template>
  </Suspense>
</ClientOnly>

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

.loading {
  text-align: center;
  padding: 40px;
  font-size: 1.2em;
  color: #666;
}
</style>
