export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 处理 CORS
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    // 处理 OAuth 回调
    if (url.pathname === "/oauth/callback") {
      const code = url.searchParams.get("code");
      if (!code) {
        return new Response("Missing code parameter", { status: 400 });
      }

      try {
        // 交换 code 获取 access token
        const tokenResponse = await fetch(
          "https://github.com/login/oauth/access_token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              client_id: env.GITHUB_CLIENT_ID,
              client_secret: env.GITHUB_CLIENT_SECRET,
              code,
            }),
          }
        );

        const data = await tokenResponse.json();
        
        if (!data.access_token) {
          throw new Error('Failed to get access token');
        }
        
        // 重定向回编辑器页面，将 token 作为 URL 参数
        // 使用实际的博客网站域名
        return Response.redirect(
          `https://my-blog.pages.dev/editor/callback?token=${data.access_token}`,
          302
        );
      } catch (error) {
        return new Response(`Error: ${error.message}`, { status: 500 });
      }
    }

    return new Response("Not found", { status: 404 });
  },
};
