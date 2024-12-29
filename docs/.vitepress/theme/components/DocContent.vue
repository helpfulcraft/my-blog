<template>
  <div class="doc-content">
    <InlineEditor
      v-if="isArticlePage"
      :content="content"
      :path="relativePath"
    >
      <Content />
    </InlineEditor>
    <Content v-else />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useData } from 'vitepress'
import InlineEditor from './InlineEditor.vue'

const route = useRoute()
const { page } = useData()

// 检查是否为文章页面
const isArticlePage = computed(() => {
  return route.path.startsWith('/articles/')
})

// 获取文章内容
const content = computed(() => {
  return page.value.content || ''
})

// 获取相对路径
const relativePath = computed(() => {
  // 从路由路径构建文件路径
  const path = route.path
  if (path.endsWith('/')) {
    return `docs${path}index.md`
  }
  return `docs${path}.md`
})
</script>

<style scoped>
.doc-content {
  width: 100%;
}
</style>
