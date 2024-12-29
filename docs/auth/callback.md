# GitHub 认证回调页面

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search)
  const code = urlParams.get('code')
  
  if (code) {
    // 调用 Cloudflare Worker 处理认证
    fetch(`https://auth.my-blog-fqw.pages.dev/auth?code=${code}`)
      .then(response => response.text())
      .then(html => {
        document.body.innerHTML = html
      })
      .catch(error => {
        console.error('Auth error:', error)
        document.body.innerHTML = '认证失败，请重试'
      })
  }
})
</script>

正在处理 GitHub 认证，请稍候...
