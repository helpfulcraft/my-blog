---
title: GitHub 登录回调
sidebar: false
---

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vitepress'

onMounted(async () => {
  const token = new URLSearchParams(window.location.search).get('token')
  if (token) {
    // 存储 token
    localStorage.setItem('github_token', token)
    // 跳转回编辑器页面
    window.location.href = '/editor/'
  }
})
</script>

<template>
  <div class="callback-container">
    <h2>正在处理登录...</h2>
  </div>
</template>

<style scoped>
.callback-container {
  text-align: center;
  padding: 40px;
}
</style>