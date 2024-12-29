// GitHub OAuth 配置
const config = {
  clientId: 'Ov23lidgLe1RzdUISJ2R',
  clientSecret: '57f7add2e7d91efd06eef9ee99bea8ef35ff05cf',
  redirectUri: 'http://localhost:5173/auth/callback',
  scope: 'repo'
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
      'Authorization': `token ${token}`,
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
  const tokenUrl = 'https://github.com/login/oauth/access_token'
  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: config.clientId,
      client_secret: config.clientSecret,
      code: code,
      redirect_uri: config.redirectUri
    })
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
