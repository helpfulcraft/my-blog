# GitHub 认证回调页面

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search)
  const code = urlParams.get('code')
  
  if (code) {
    // 这里需要一个后端服务来处理 GitHub OAuth
    fetch('YOUR_BACKEND_URL/auth/github', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code })
    })
    .then(response => response.json())
    .then(data => {
      // 发送 token 给父窗口
      window.opener.postMessage({
        type: 'github_auth',
        token: data.access_token
      }, window.location.origin)
      
      // 关闭窗口
      window.close()
    })
    .catch(error => {
      console.error('Auth error:', error)
      alert('认证失败，请重试')
    })
  }
})
</script>

正在处理 GitHub 认证，请稍候...
