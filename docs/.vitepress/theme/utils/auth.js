// GitHub OAuth 配置
const config = {
  clientId: 'Ov23lidgLe1RzdUISJ2R',
  redirectUri: import.meta.env.DEV 
    ? 'http://localhost:5173/auth/callback'
    : 'https://oauth-login.my-blog-fqw.pages.dev/auth/callback',
  scope: 'repo',
  workerUrl: 'https://auth.my-blog-helpfulcraft.pages.dev'
}

// 获取授权 URL
export function getAuthUrl() {
  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    scope: config.scope,
    state: Math.random().toString(36).substring(7)
  })
  return `https://github.com/login/oauth/authorize?${params.toString()}`
}

// 获取用户信息
export async function getUserInfo(token) {
  const response = await fetch('https://api.github.com/user', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github.v3+json'
    }
  })
  if (!response.ok) {
    throw new Error('Failed to get user info')
  }
  return response.json()
}

// 处理认证回调
export async function handleCallback(code) {
  const response = await fetch(`${config.workerUrl}/oauth/callback?code=${code}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  })

  if (!response.ok) {
    throw new Error('Failed to get access token')
  }

  const data = await response.json()
  if (data.error) {
    throw new Error(data.error_description || data.error)
  }

  return data.access_token
}
