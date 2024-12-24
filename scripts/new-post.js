import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = path.join(__dirname, '../docs/articles');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function createPost() {
  // 获取文章信息
  const title = await question('文章标题: ');
  const tags = (await question('标签 (用逗号分隔): ')).split(',').map(tag => tag.trim());
  const description = await question('简短描述: ');

  // 生成文件名
  const fileName = title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '') + '.md';

  // 生成日期
  const date = new Date().toISOString().split('T')[0];

  // 生成文章内容
  const content = `---
title: ${title}
date: ${date}
tags: ${JSON.stringify(tags)}
description: ${description}
---

# ${title}

`;

  // 写入文件
  const filePath = path.join(POSTS_DIR, fileName);
  fs.writeFileSync(filePath, content);

  console.log(`\n✅ 文章创建成功！`);
  console.log(`📝 文件位置: ${filePath}`);
  console.log(`\n开始写作吧！完成后运行以下命令发布：`);
  console.log(`git add .`);
  console.log(`git commit -m "docs: add ${fileName}"`);
  console.log(`git push origin master`);

  rl.close();
}

createPost().catch(console.error);
