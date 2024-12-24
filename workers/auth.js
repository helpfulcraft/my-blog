// GitHub OAuth 配置
const clientId = 'Ov23liCN7hteMLHGth2i'
const clientSecret = '01f5074e2b44ca2d4416cac15f34537e8602b079'
const redirectUri = 'https://my-blog-helpfulcraft.pages.dev/auth/callback'

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const code = url.searchParams.get('code')

    if (!code) {
      return new Response('Missing code parameter', { status: 400 })
    }

    try {
      // 使用授权码获取访问令牌
      const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code,
          redirect_uri: redirectUri,
        }),
      })

      const tokenData = await tokenResponse.json()

      if (tokenData.error) {
        throw new Error(tokenData.error_description || tokenData.error)
      }

      // 验证令牌
      const userResponse = await fetch('https://api.github.com/user', {
        headers: {
          'Authorization': `token ${tokenData.access_token}`,
          'User-Agent': 'My-Blog-Auth',
        },
      })

      if (!userResponse.ok) {
        throw new Error('Failed to verify token')
      }

      // 返回成功响应
      return new Response(
        `
        <html>
          <body>
            <script>
              window.opener.postMessage(
                {
                  type: 'github_auth',
                  token: '${tokenData.access_token}'
                },
                '${url.origin}'
              );
              window.close();
            </script>
          </body>
        </html>
        `,
        {
          headers: {
            'Content-Type': 'text/html',
          },
        }
      )
    } catch (error) {
      return new Response(
        `认证失败: ${error.message}`,
        { status: 500 }
      )
    }
  }
}
