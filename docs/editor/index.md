---
title: 文章编辑器
sidebar: false
---

<script setup>
import { defineAsyncComponent } from 'vue'

const BlogEditorNew = defineAsyncComponent(() =>
  import('../.vitepress/theme/components/BlogEditorNew.vue')
)
</script>

<ClientOnly>
  <BlogEditorNew />
</ClientOnly>

<style>
.editor-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
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
</style>
