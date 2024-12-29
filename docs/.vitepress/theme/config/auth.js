// GitHub OAuth 配置
export const authConfig = {
  // 开发环境
  development: {
    clientId: 'Ov23liRHUKlP6b6PhVoC',
    redirectUri: 'http://localhost:5173/auth/callback',
    apiEndpoint: 'https://auth.my-blog-helpfulcraft.pages.dev/oauth/callback'
  },
  // 生产环境
  production: {
    clientId: 'Ov23liRHUKlP6b6PhVoC',
    redirectUri: 'https://my-blog-helpfulcraft.pages.dev/auth/callback',
    apiEndpoint: 'https://auth.my-blog-helpfulcraft.pages.dev/oauth/callback'
  }
}
