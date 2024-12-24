<template>
  <div class="editor-layout">
    <Content />
    <ClientOnly>
      <BlogEditor />
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
}
</style>
