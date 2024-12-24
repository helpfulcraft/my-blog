---
title: GitHub 登录回调
sidebar: false
---

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vitepress'

const router = useRouter()

onMounted(async () => {
  const code = new URLSearchParams(window.location.search).get('code')
  if (code) {
    // 这里需要一个后端服务来处理 OAuth token 交换
    // 为了安全考虑，client_secret 不能在前端存储
    // 你需要部署一个简单的后端服务来处理这个请求
    
    try {
      // 存储 token
      localStorage.setItem('github_token', 'YOUR_TOKEN')
      // 跳转回编辑器页面
      window.location.href = '/editor/'
    } catch (error) {
      alert('登录失败：' + error.message)
    }
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
