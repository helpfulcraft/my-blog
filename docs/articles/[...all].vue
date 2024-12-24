<template>
  <div class="article-container">
    <Article 
      v-if="article" 
      :content="article.content"
      :path="article.path"
    />
  </div>
</template>

<script setup>
import { data as articles } from './[...all].paths'
import { useData } from 'vitepress'

const { page } = useData()
const article = articles.find(a => a.url === page.value.relativePath)
</script>

<style scoped>
.article-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
}
</style>
