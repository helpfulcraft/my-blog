<template>
  <div class="login-container">
    <button v-if="!isLoggedIn" @click="login" class="login-button">
      {{ loading ? '登录中...' : '使用 GitHub 登录' }}
    </button>
    <div v-else class="user-info">
      <img :src="userAvatar" :alt="userName" class="avatar" />
      <span class="username">{{ userName }}</span>
      <button @click="logout" class="logout-button">退出</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAuthUrl, getUserInfo } from '../utils/auth'

const isLoggedIn = ref(false)
const loading = ref(false)
const userAvatar = ref('')
const userName = ref('')

async function checkAuth() {
  const token = localStorage.getItem('github_token')
  if (!token) return

  try {
    const user = await getUserInfo(token)
    isLoggedIn.value = true
    userAvatar.value = user.avatar_url
    userName.value = user.login
  } catch (error) {
    console.error('Auth check failed:', error)
    localStorage.removeItem('github_token')
  }
}

function login() {
  loading.value = true
  const authUrl = getAuthUrl()
  const authWindow = window.open(authUrl, 'github-oauth', 'width=600,height=800')

  if (!authWindow) {
    alert('弹窗被阻止，请允许弹窗后重试')
    loading.value = false
    return
  }

  const messageHandler = async (event) => {
    if (event.origin !== window.location.origin) return
    
    if (event.data?.type === 'github_auth') {
      const { token } = event.data
      if (!token) {
        console.error('No token received')
        loading.value = false
        return
      }

      localStorage.setItem('github_token', token)
      await checkAuth()
      loading.value = false
      authWindow?.close()
      window.removeEventListener('message', messageHandler)
    }
  }

  window.addEventListener('message', messageHandler)
  setTimeout(() => {
    window.removeEventListener('message', messageHandler)
    loading.value = false
  }, 300000)
}

function logout() {
  localStorage.removeItem('github_token')
  isLoggedIn.value = false
  userAvatar.value = ''
  userName.value = ''
}

onMounted(() => {
  checkAuth()
})
</script>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.login-button,
.logout-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

.login-button {
  background-color: var(--vp-c-brand);
  color: white;
}

.login-button:hover {
  background-color: var(--vp-c-brand-dark);
}

.logout-button {
  background-color: var(--vp-c-gray-light-4);
  color: var(--vp-c-text-1);
}

.logout-button:hover {
  background-color: var(--vp-c-gray-light-3);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
}

.username {
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}
</style>
