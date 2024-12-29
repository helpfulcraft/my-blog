# GitHub 认证回调页面

<script setup>
import { onMounted } from 'vue'
import { handleCallback } from '../.vitepress/theme/utils/auth'

onMounted(async () => {
  const urlParams = new URLSearchParams(window.location.search)
  const code = urlParams.get('code')
  const error = urlParams.get('error')
  const error_description = urlParams.get('error_description')
  
  if (error) {
    console.error('GitHub OAuth error:', error, error_description)
    document.body.innerHTML = `认证失败：${error_description || error}`
    return
  }
  
  if (!code) {
    console.error('No code received')
    document.body.innerHTML = '认证失败：未收到授权码'
    return
  }

  try {
    console.log('Exchanging code for token...')
    const token = await handleCallback(code)
    
    if (token) {
      if (window.opener) {
        window.opener.postMessage({
          type: 'github_auth',
          token: token
        }, window.location.origin)
        document.body.innerHTML = '认证成功！请关闭此窗口。'
      } else {
        document.body.innerHTML = '认证成功，但无法与主窗口通信。请手动关闭此窗口。'
      }
    } else {
      throw new Error('获取 token 失败')
    }
  } catch (error) {
    console.error('Auth error:', error)
    document.body.innerHTML = `认证失败：${error.message}`
  }
})
</script>

<style>
body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  padding: 20px;
  text-align: center;
  line-height: 1.6;
}
</style>

正在处理 GitHub 认证，请稍候...
