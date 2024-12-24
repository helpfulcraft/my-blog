<template>
  <div class="notion-editor" @click="enableEdit">
    <div v-if="!isEditing" class="content-display">
      <div v-html="renderedContent"></div>
      <div v-if="isLoggedIn" class="edit-hint">
        点击任意位置开始编辑
      </div>
    </div>

    <template v-else>
      <div class="editor-toolbar" v-if="isLoggedIn">
        <button @click="saveChanges" :disabled="saving" class="save-button">
          {{ saving ? '保存中...' : '保存' }}
        </button>
        <button @click="cancelEdit" class="cancel-button">
          取消
        </button>
      </div>

      <editor-content 
        :editor="editor" 
        class="editor-content"
      />
    </template>
  </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true
})

export default {
  components: {
    EditorContent,
  },

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
    const isLoggedIn = ref(false)
    const saving = ref(false)
    const editor = ref(null)

    const renderedContent = ref('')

    watch(() => props.content, (newContent) => {
      renderedContent.value = md.render(newContent)
    }, { immediate: true })

    onMounted(() => {
      const token = localStorage.getItem('github_token')
      if (token) {
        isLoggedIn.value = true
      }

      editor.value = new Editor({
        extensions: [
          StarterKit.configure({
            heading: {
              levels: [1, 2, 3, 4, 5, 6]
            }
          }),
          Placeholder.configure({
            placeholder: '开始编写...'
          })
        ],
        content: props.content,
        editorProps: {
          attributes: {
            class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none'
          }
        }
      })
    })

    onBeforeUnmount(() => {
      editor.value?.destroy()
    })

    function enableEdit() {
      if (!isLoggedIn.value || isEditing.value) return
      isEditing.value = true
    }

    function cancelEdit() {
      isEditing.value = false
      editor.value?.commands.setContent(props.content)
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
        const data = encoder.encode(editor.value?.getHTML())
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

    return {
      editor,
      isEditing,
      isLoggedIn,
      saving,
      renderedContent,
      enableEdit,
      cancelEdit,
      saveChanges
    }
  }
}
</script>

<style>
.notion-editor {
  position: relative;
  min-height: 100px;
}

.content-display {
  position: relative;
  cursor: text;
}

.edit-hint {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  opacity: 0;
  transition: opacity 0.2s;
}

.content-display:hover .edit-hint {
  opacity: 1;
}

.editor-toolbar {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  margin-bottom: 1rem;
}

.editor-content {
  padding: 1rem;
  min-height: 500px;
}

.ProseMirror {
  outline: none;
}

.ProseMirror p.is-editor-empty:first-child::before {
  color: #adb5bd;
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}

/* 编辑器内容样式 */
.ProseMirror h1 {
  font-size: 2em;
  margin-bottom: 0.5em;
}

.ProseMirror h2 {
  font-size: 1.5em;
  margin-bottom: 0.5em;
}

.ProseMirror h3 {
  font-size: 1.17em;
  margin-bottom: 0.5em;
}

.ProseMirror p {
  margin-bottom: 0.5em;
}

.ProseMirror ul,
.ProseMirror ol {
  padding-left: 1.5em;
  margin-bottom: 0.5em;
}

.ProseMirror code {
  background: var(--vp-c-bg-soft);
  padding: 0.2em 0.4em;
  border-radius: 4px;
  font-family: monospace;
}

.ProseMirror pre {
  background: var(--vp-c-bg-soft);
  padding: 1em;
  border-radius: 4px;
  overflow-x: auto;
}

.ProseMirror blockquote {
  border-left: 4px solid var(--vp-c-brand);
  padding-left: 1em;
  margin-left: 0;
  font-style: italic;
}

/* 按钮样式 */
.save-button,
.cancel-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.save-button {
  background: var(--vp-c-brand);
  color: white;
}

.save-button:hover {
  background: var(--vp-c-brand-dark);
}

.save-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.cancel-button {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.cancel-button:hover {
  background: var(--vp-c-bg-mute);
}
</style>
