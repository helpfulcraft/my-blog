<template>
  <div class="editor-layout">
    <Content />
    <ClientOnly>
      <Suspense>
        <BlogEditor />
        <template #fallback>
          <div class="loading">
            <p>加载中...</p>
          </div>
        </template>
      </Suspense>
    </ClientOnly>
  </div>
</template>

<script setup>
import { Content } from 'vitepress'
import BlogEditor from './BlogEditor.vue'
</script>

<style scoped>
.editor-layout {
  padding: 20px;
  min-height: 100vh;
}

.loading {
  text-align: center;
  padding: 40px;
  font-size: 1.2em;
  color: #666;
}
</style>
