<template>
  <div class="inline-editor" v-if="isLoggedIn">
    <div 
      v-if="!isEditing" 
      class="content-display"
      @dblclick="startEditing"
    >
      <slot></slot>
      <button 
        class="edit-button" 
        @click="startEditing"
        title="编辑文章"
      >
        ✏️
      </button>
    </div>

    <div v-else class="editor-container">
      <div class="editor-toolbar">
        <button @click="insertMarkdown('**', '**')" title="粗体">B</button>
        <button @click="insertMarkdown('*', '*')" title="斜体">I</button>
        <button @click="insertMarkdown('# ')" title="标题">H</button>
        <button @click="insertMarkdown('- ')" title="列表">•</button>
        <button @click="insertMarkdown('[', '](url)')" title="链接">🔗</button>
        <button @click="insertMarkdown('![alt](', ')')" title="图片">🖼</button>
        <button @click="insertMarkdown('```\n', '\n```')" title="代码块">&lt;/&gt;</button>
        <div class="toolbar-right">
          <button @click="cancelEdit" class="cancel-button">取消</button>
          <button @click="saveChanges" class="save-button" :disabled="saving">
            {{ saving ? '保存中...' : '保存' }}
          </button>
        </div>
      </div>

      <div class="editor-main">
        <div class="editor-section">
          <textarea 
            ref="contentInput"
            v-model="editContent"
            class="content-textarea"
            @keydown.tab.prevent="handleTab"
            @keydown.ctrl.s.prevent="saveChanges"
            @keydown.esc="cancelEdit"
          ></textarea>
        </div>
        
        <div class="preview-section">
          <div 
            class="content-preview"
            v-html="renderedContent"
          ></div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="content-display">
    <slot></slot>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true
})

export default {
  props: {
    content: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    }
  },

  setup(props) {
    const isEditing = ref(false)
    const editContent = ref('')
    const isLoggedIn = ref(false)
    const contentInput = ref(null)
    const saving = ref(false)

    const renderedContent = computed(() => {
      return md.render(editContent.value || '')
    })

    onMounted(() => {
      const token = localStorage.getItem('github_token')
      if (token) {
        isLoggedIn.value = true
      }
    })

    function startEditing() {
      editContent.value = props.content
      isEditing.value = true
      // 在下一个 tick 后聚焦文本框
      setTimeout(() => {
        contentInput.value?.focus()
      }, 0)
    }

    function cancelEdit() {
      isEditing.value = false
      editContent.value = props.content
    }

    async function saveChanges() {
      if (!isLoggedIn.value) {
        alert('请先登录')
        return
      }

      saving.value = true

      try {
        const token = localStorage.getItem('github_token')
        
        // 获取当前文件内容
        const response = await fetch(`https://api.github.com/repos/helpfulcraft/my-blog/contents/${props.path}`, {
          headers: {
            'Authorization': `token ${token}`,
          }
        })
        
        if (!response.ok) {
          throw new Error('获取文件失败')
        }

        const fileData = await response.json()
        
        // 使用 TextEncoder 来处理 UTF-8 字符
        const encoder = new TextEncoder()
        const data = encoder.encode(editContent.value)
        const base64Content = btoa(String.fromCharCode(...new Uint8Array(data)))
        
        // 更新文件
        const updateResponse = await fetch(`https://api.github.com/repos/helpfulcraft/my-blog/contents/${props.path}`, {
          method: 'PUT',
          headers: {
            'Authorization': `token ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: `update: modify article content`,
            content: base64Content,
            sha: fileData.sha,
            branch: 'master'
          })
        })

        if (updateResponse.ok) {
          isEditing.value = false
          // 通知父组件内容已更新
          window.location.reload()
        } else {
          const errorData = await updateResponse.json()
          throw new Error(`保存失败: ${errorData.message}`)
        }
      } catch (error) {
        alert('保存失败：' + error.message)
        console.error('保存错误：', error)
      } finally {
        saving.value = false
      }
    }

    function insertMarkdown(prefix, suffix = '') {
      const textarea = contentInput.value
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const text = editContent.value
      const beforeText = text.substring(0, start)
      const selectedText = text.substring(start, end)
      const afterText = text.substring(end)

      editContent.value = beforeText + prefix + selectedText + suffix + afterText
      
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
      
      editContent.value = editContent.value.substring(0, start) + '  ' + editContent.value.substring(end)
      
      setTimeout(() => {
        textarea.setSelectionRange(start + 2, start + 2)
      }, 0)
    }

    return {
      isEditing,
      editContent,
      isLoggedIn,
      contentInput,
      saving,
      renderedContent,
      startEditing,
      cancelEdit,
      saveChanges,
      insertMarkdown,
      handleTab
    }
  }
}
</script>

<style scoped>
.inline-editor {
  position: relative;
}

.content-display {
  position: relative;
}

.edit-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s;
}

.content-display:hover .edit-button {
  opacity: 1;
}

.editor-container {
  margin: 1rem 0;
}

.editor-toolbar {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  margin-bottom: 1rem;
}

.editor-toolbar button {
  margin-right: 0.5rem;
  padding: 0.5rem;
  background: var(--vp-c-bg);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: var(--vp-c-text-1);
}

.editor-toolbar button:hover {
  background: var(--vp-c-brand);
  color: white;
}

.toolbar-right {
  margin-left: auto;
  display: flex;
  gap: 0.5rem;
}

.cancel-button {
  background: var(--vp-c-bg-mute) !important;
}

.save-button {
  background: var(--vp-c-brand) !important;
  color: white !important;
}

.save-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.editor-main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  height: 500px;
}

.content-textarea {
  width: 100%;
  height: 100%;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-family: monospace;
  resize: none;
}

.content-preview {
  height: 100%;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  overflow-y: auto;
}

:deep(.content-preview) {
  line-height: 1.6;
}

:deep(.content-preview h1),
:deep(.content-preview h2),
:deep(.content-preview h3),
:deep(.content-preview h4),
:deep(.content-preview h5),
:deep(.content-preview h6) {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  line-height: 1.25;
}

:deep(.content-preview h1) {
  font-size: 2em;
}

:deep(.content-preview h2) {
  font-size: 1.5em;
}

:deep(.content-preview h3) {
  font-size: 1.25em;
}

:deep(.content-preview p) {
  margin-top: 0;
  margin-bottom: 16px;
}

:deep(.content-preview code) {
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 85%;
  background-color: var(--vp-c-bg-soft);
  border-radius: 6px;
}

:deep(.content-preview pre code) {
  padding: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  background-color: var(--vp-c-bg-soft);
  border-radius: 6px;
  display: block;
}
</style>
