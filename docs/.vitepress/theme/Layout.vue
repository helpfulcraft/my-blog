<template>
  <div class="theme-container">
    <Layout>
      <template #nav-bar-content-before>
        <LoginButton class="nav-login-button" />
      </template>
      <template #doc-after>
        <DocContent />
      </template>
    </Layout>
  </div>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme'
import LoginButton from './components/LoginButton.vue'
import DocContent from './components/DocContent.vue'

const { Layout } = DefaultTheme
</script>

<style>
.nav-login-button {
  margin-right: 1rem;
}
</style>
