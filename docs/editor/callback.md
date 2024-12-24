---
title: GitHub 登录回调
sidebar: false
---

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const token = new URLSearchParams(window.location.search).get('token')
  if (token) {
    // 存储 token
    localStorage.setItem('github_token', token)
    // 跳转回编辑器页面
    window.location.href = '/editor/'
  } else {
    alert('登录失败：未获取到 token')
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
