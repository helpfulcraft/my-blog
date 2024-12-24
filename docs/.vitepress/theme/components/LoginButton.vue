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

<script>
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const isLoggedIn = ref(false)
    const loading = ref(false)
    const userAvatar = ref('')
    const userName = ref('')

    // GitHub OAuth 配置
    const clientId = 'Ov23liCN7hteMLHGth2i'
    const redirectUri = 'https://my-blog-helpfulcraft.pages.dev/auth/callback'
    const scope = 'repo'

    async function checkAuth() {
      const token = localStorage.getItem('github_token')
      if (token) {
        try {
          const response = await fetch('https://api.github.com/user', {
            headers: {
              'Authorization': `token ${token}`,
              'User-Agent': 'My-Blog'
            }
          })
          if (response.ok) {
            const data = await response.json()
            isLoggedIn.value = true
            userAvatar.value = data.avatar_url
            userName.value = data.login
          } else {
            localStorage.removeItem('github_token')
          }
        } catch (error) {
          console.error('Auth check failed:', error)
          localStorage.removeItem('github_token')
        }
      }
    }

    function login() {
      loading.value = true
      const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`
      const authWindow = window.open(authUrl, 'github-oauth', 'width=600,height=800')

      window.addEventListener('message', async (event) => {
        if (event.origin !== window.location.origin) return
        
        if (event.data.type === 'github_auth') {
          const { token } = event.data
          localStorage.setItem('github_token', token)
          await checkAuth()
          loading.value = false
          authWindow?.close()
        }
      })
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

    return {
      isLoggedIn,
      loading,
      userAvatar,
      userName,
      login,
      logout
    }
  }
}
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
  transition: all 0.2s;
}

.login-button {
  background: var(--vp-c-brand);
  color: white;
}

.login-button:hover {
  background: var(--vp-c-brand-dark);
}

.logout-button {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.logout-button:hover {
  background: var(--vp-c-bg-mute);
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
