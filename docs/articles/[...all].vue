<template>
  <div class="article-container">
    <NotionEditor
      v-if="article" 
      :content="article.content"
      :path="article.path"
    />
    <div v-else class="not-found">
      文章未找到
    </div>
  </div>
</template>

<script setup>
import { data as articles } from './[...all].paths'
import { useData } from 'vitepress'
import NotionEditor from '../.vitepress/theme/components/NotionEditor.vue'

const { page } = useData()
const article = articles.find(a => a.url === page.value.relativePath)
</script>

<style scoped>
.article-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.not-found {
  text-align: center;
  padding: 2rem;
  color: var(--vp-c-text-2);
}
</style>
