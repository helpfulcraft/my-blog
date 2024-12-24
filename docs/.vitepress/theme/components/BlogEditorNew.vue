<template>
  <div v-if="mounted" class="editor-container">
    <div v-if="!isLoggedIn" class="login-section">
      <h2>请先登录</h2>
      <button @click="handleLogin" class="login-button">
        使用 GitHub 登录
      </button>
    </div>
    
    <div v-else class="editor-form">
      <div class="form-header">
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
          <div class="tags-input-container">
            <div v-for="(tag, index) in tagsList" :key="index" class="tag-item">
              {{ tag }}
              <span class="tag-remove" @click="removeTag(index)">&times;</span>
            </div>
            <input 
              id="tag-input"
              v-model="currentTag"
              type="text"
              placeholder="输入标签后按回车"
              class="tag-input"
              @keydown.enter.prevent="addTag"
            />
          </div>
        </div>
      </div>

      <div class="editor-main">
        <div class="editor-section">
          <label for="content">编写内容：</label>
          <div class="editor-toolbar">
            <button @click="insertMarkdown('**', '**')" title="粗体">B</button>
            <button @click="insertMarkdown('*', '*')" title="斜体">I</button>
            <button @click="insertMarkdown('# ')" title="标题">H</button>
            <button @click="insertMarkdown('- ')" title="列表">•</button>
            <button @click="insertMarkdown('[', '](url)')" title="链接">🔗</button>
            <button @click="insertMarkdown('![alt](', ')')" title="图片">🖼</button>
            <button @click="insertMarkdown('```\n', '\n```')" title="代码块">&lt;/&gt;</button>
          </div>
          <textarea 
            id="content"
            ref="contentInput"
            v-model="content"
            placeholder="使用 Markdown 编写文章内容"
            class="form-textarea"
            rows="20"
            @keydown.tab.prevent="handleTab"
          ></textarea>
        </div>
        
        <div class="preview-section">
          <label>预览：</label>
          <div class="markdown-preview" v-html="renderedContent"></div>
        </div>
      </div>

      <div class="form-footer">
        <button @click="handlePublish" class="publish-button" :disabled="publishing">
          {{ publishing ? '发布中...' : '发布文章' }}
        </button>
        <button @click="saveDraft" class="draft-button">
          保存草稿
        </button>
      </div>
    </div>
  </div>
  <div v-else class="loading">
    加载中...
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true
})

export default {
  setup() {
    const title = ref('')
    const content = ref('')
    const currentTag = ref('')
    const tagsList = ref([])
    const description = ref('')
    const githubToken = ref('')
    const isLoggedIn = ref(false)
    const mounted = ref(false)
    const publishing = ref(false)
    const contentInput = ref(null)

    const renderedContent = computed(() => {
      return md.render(content.value || '')
    })

    onMounted(() => {
      mounted.value = true
      const token = localStorage.getItem('github_token')
      if (token) {
        githubToken.value = token
        isLoggedIn.value = true
      }
      // 加载草稿
      loadDraft()
    })

    function loadDraft() {
      const draft = localStorage.getItem('article_draft')
      if (draft) {
        const draftData = JSON.parse(draft)
        title.value = draftData.title || ''
        content.value = draftData.content || ''
        description.value = draftData.description || ''
        tagsList.value = draftData.tags || []
      }
    }

    function saveDraft() {
      const draftData = {
        title: title.value,
        content: content.value,
        description: description.value,
        tags: tagsList.value,
        lastSaved: new Date().toISOString()
      }
      localStorage.setItem('article_draft', JSON.stringify(draftData))
      alert('草稿已保存')
    }

    function addTag() {
      const tag = currentTag.value.trim()
      if (tag && !tagsList.value.includes(tag)) {
        tagsList.value.push(tag)
        currentTag.value = ''
      }
    }

    function removeTag(index) {
      tagsList.value.splice(index, 1)
    }

    function insertMarkdown(prefix, suffix = '') {
      const textarea = contentInput.value
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const text = content.value
      const beforeText = text.substring(0, start)
      const selectedText = text.substring(start, end)
      const afterText = text.substring(end)

      content.value = beforeText + prefix + selectedText + suffix + afterText
      
      // 恢复光标位置
      setTimeout(() => {
        textarea.focus()
        if (selectedText) {
          textarea.setSelectionRange(
            start + prefix.length,
            end + prefix.length
          )
        } else {
          textarea.setSelectionRange(
            start + prefix.length,
            start + prefix.length
          )
        }
      }, 0)
    }

    function handleTab(e) {
      const textarea = contentInput.value
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      
      content.value = content.value.substring(0, start) + '  ' + content.value.substring(end)
      
      setTimeout(() => {
        textarea.setSelectionRange(start + 2, start + 2)
      }, 0)
    }

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

      if (!title.value.trim()) {
        alert('请输入文章标题')
        return
      }

      if (!content.value.trim()) {
        alert('请输入文章内容')
        return
      }

      publishing.value = true

      try {
        const date = new Date().toISOString().split('T')[0]
        const fileName = title.value.toLowerCase().replace(/\s+/g, '-') + '.md'
        
        const fileContent = `---
title: ${title.value}
date: ${date}
description: ${description.value}
tags: [${tagsList.value.map(tag => `'${tag}'`).join(', ')}]
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
          tagsList.value = []
          description.value = ''
          // 清除草稿
          localStorage.removeItem('article_draft')
        } else {
          const errorData = await response.json()
          throw new Error(`发布失败: ${errorData.message}`)
        }
      } catch (error) {
        alert('发布失败：' + error.message)
        console.error('发布错误：', error)
      } finally {
        publishing.value = false
      }
    }

    return {
      title,
      content,
      currentTag,
      tagsList,
      description,
      githubToken,
      isLoggedIn,
      mounted,
      publishing,
      contentInput,
      renderedContent,
      handleLogin,
      handlePublish,
      saveDraft,
      addTag,
      removeTag,
      insertMarkdown,
      handleTab
    }
  }
}
</script>

<style scoped>
.editor-container {
  max-width: 1200px;
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

.form-header {
  margin-bottom: 20px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.editor-main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.editor-section,
.preview-section {
  flex: 1;
}

.editor-toolbar {
  margin-bottom: 10px;
  padding: 5px;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
}

.editor-toolbar button {
  margin-right: 5px;
  padding: 5px 10px;
  border: none;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.editor-toolbar button:hover {
  background: var(--vp-c-brand);
  color: white;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: var(--vp-c-text-1);
}

.form-input {
  width: 100%;
  padding: 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  font-size: 16px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.form-textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  font-size: 16px;
  font-family: monospace;
  resize: vertical;
  min-height: 400px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.markdown-preview {
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  min-height: 400px;
  background: var(--vp-c-bg);
  overflow-y: auto;
}

.tags-input-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
}

.tag-item {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 4px;
  font-size: 14px;
}

.tag-remove {
  margin-left: 4px;
  cursor: pointer;
}

.tag-input {
  border: none;
  outline: none;
  flex: 1;
  min-width: 100px;
  background: transparent;
  color: var(--vp-c-text-1);
}

.form-footer {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
}

.login-button,
.publish-button,
.draft-button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s;
}

.login-button,
.publish-button {
  background-color: var(--vp-c-brand);
  color: white;
}

.draft-button {
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.login-button:hover,
.publish-button:hover {
  background-color: var(--vp-c-brand-dark);
}

.draft-button:hover {
  background-color: var(--vp-c-bg-mute);
}

.login-button:active,
.publish-button:active,
.draft-button:active {
  transform: translateY(1px);
}

.publish-button:disabled {
  background-color: var(--vp-c-bg-mute);
  cursor: not-allowed;
}

:deep(.markdown-preview) {
  line-height: 1.6;
}

:deep(.markdown-preview h1),
:deep(.markdown-preview h2),
:deep(.markdown-preview h3),
:deep(.markdown-preview h4),
:deep(.markdown-preview h5),
:deep(.markdown-preview h6) {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  line-height: 1.25;
}

:deep(.markdown-preview h1) {
  font-size: 2em;
}

:deep(.markdown-preview h2) {
  font-size: 1.5em;
}

:deep(.markdown-preview h3) {
  font-size: 1.25em;
}

:deep(.markdown-preview p) {
  margin-top: 0;
  margin-bottom: 16px;
}

:deep(.markdown-preview code) {
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 85%;
  background-color: var(--vp-c-bg-soft);
  border-radius: 6px;
}

:deep(.markdown-preview pre code) {
  padding: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  background-color: var(--vp-c-bg-soft);
  border-radius: 6px;
  display: block;
}
</style>
