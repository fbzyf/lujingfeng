# 上海陆精丰电子科技有限公司 - 门户网站

## 项目简介

这是上海陆精丰电子科技有限公司（香港联宝精工子公司）的官方门户网站，用于展示公司品牌形象、代理品牌和产品信息。

## 快速开始

### 如何预览网站

**最简单的方式：** 直接双击 `index.html` 文件，即可在浏览器中打开网站。

> 所有页面都是纯静态 HTML 文件，不需要安装任何软件。

### 如何部署到服务器

将整个项目文件夹上传到任意 Web 服务器即可，支持：
- **普通虚拟主机**：通过 FTP 上传所有文件
- **GitHub Pages**：免费托管，适合展示型网站
- **阿里云/腾讯云 OSS**：对象存储静态托管
- **Nginx / Apache**：任意 Web 服务器

### 发布前冒烟测试

```bash
cd /Users/yufeng/code/lujingfeng_lp
python3 -m http.server 8080   # 另开终端
python3 scripts/smoke_test.py --base http://localhost:8080
python3 scripts/smoke_test.py --base https://lpfbao.com   # 验证线上
```

仅检查本地文件结构：`python3 scripts/smoke_test.py --files-only`

Cursor 中可使用子代理 **lujingfeng-tester** 自动跑上述流程。

## 中英文双语

网站提供简体中文（默认）、繁体中文与英文三个版本，通过导航栏右上角按钮切换：

| 语言 | 入口 | 目录 |
|------|------|------|
| 简体中文 | `index.html` | 项目根目录 |
| 繁體中文 | `zh-tw/index.html` | `zh-tw/` 目录 |
| English | `en/index.html` | `en/` 目录 |

- 简体页：**繁體** / **EN**
- 繁体页：**简体** / **EN**
- 英文页：**简体** / **繁體**
- 修改内容时请同步更新根目录、`zh-tw/`、`en/` 下同名文件

## 网站结构

```
lujingfeng/
├── index.html          ← 首页（简体中文）
├── about.html          ← 关于我们（简体中文）
├── brands.html         ← 代理品牌（简体中文）
├── news.html           ← 新闻动态（简体中文）
├── contact.html        ← 联系我们（简体中文）
├── zh-tw/              ← 繁体中文页面目录
│   ├── index.html
│   ├── about.html
│   ├── brands.html
│   ├── news.html
│   └── contact.html
├── en/                 ← 英文页面目录
│   ├── index.html
│   ├── about.html
│   ├── brands.html
│   ├── news.html
│   └── contact.html
├── logo.png            ← 公司 Logo
├── css/
│   └── style.css       ← 全站样式
├── js/
│   └── main.js         ← 交互逻辑（含中英文表单/新闻文案）
├── images/             ← 图片资源目录
│   ├── hero/           ← 轮播图
│   └── brands/         ← 品牌 Logo 图片
└── readme.md           ← 本文件
```

## 页面说明

| 页面 | 文件 | 说明 |
|------|------|------|
| 首页 | `index.html` | Hero轮播图、公司简介、品牌展示网格、数据统计、最新新闻 |
| 关于我们 | `about.html` | 公司详细介绍、四大优势、六大服务领域 |
| 代理品牌 | `brands.html` | 7个品牌快速导航 + 详细介绍（含产品标签） |
| 新闻动态 | `news.html` | 新闻卡片列表，点击"查看详情"可展开全文 |
| 联系我们 | `contact.html` | 联系信息、在线留言表单、到达指引 |

## 代理品牌信息

| 品牌 | 中文名 | 产地 | 主要产品 |
|------|--------|------|----------|
| BOURNS | 柏恩 | 美国 | 电位器、编码器、电阻、电感、变压器、保护器件 |
| HDK | 北陆电气 | 日本 | 电位器、温湿度传感器 |
| KEC | 开益禧 | 韩国 | 功率器件 |
| NGI | 日本黑铅 | 日本 | 导电油墨、银浆、锂电池正负极导电剂 |
| Shin-Etsu | 信越 | 日本 | 热压导电纸、导电胶条、触控开关、高分子导电材料、医疗硅胶导管 |
| UTC | 友顺科技 | 台湾 | 功率器件 |
| WINBOND | 华邦电子 | 台湾 | 存储芯片 |

## 如何修改内容

### 修改公司信息
在每个 HTML 文件中搜索并替换以下信息：

**上海办公室（子公司）**
- **地址**：`上海市徐汇区华泾路505号`
- **电话**：`18017287575`
- **邮箱**：`josh@linpo.com`

**香港办公室（母公司 LPHK）**
- **地址**：`Unit 1602, Gravity, No. 29 Hing Yip Street, Kwun Tong, Kowloon, Hong Kong.`
- **电话**：`(852) 2755 8370`
- **邮箱**：`frankiewong@linpohk.com`

页脚与联系页已按「上海办公室 + 香港办公室」双栏展示；品牌叙事以 **Linpo Precision Limited（香港联宝精工）** 为母公司，上海陆精丰为子公司。

### 修改品牌信息
编辑 `brands.html` 文件，找到对应品牌的 `<section>` 标签修改内容。

### 添加新闻
编辑 `news.html` 文件，复制一个现有的新闻卡片 `<div class="col-lg-4 col-md-6 fade-in-up">` 区块，修改标题、日期、内容即可。同时需要在 `index.html` 首页的最新动态区域同步更新。

### 替换 Logo
将新的 Logo 图片命名为 `logo.png`，替换根目录下的同名文件即可。

### 替换品牌 Logo 图片
将品牌 Logo 图片放入 `images/brands/` 目录，然后在 HTML 中将 `<div class="brand-logo-placeholder">` 替换为 `<img>` 标签。

## 待处理事项

| 项目 | 位置 | 说明 |
|------|------|------|
| 关于我们「企业信息」侧栏卡片 | `about.html`、`zh-tw/about.html`、`en/about.html` | 已用 `d-none` 暂时隐藏，公司简介改为全宽展示；确定展示方案后去掉侧栏列上的 `d-none`，并将左侧列改回 `col-lg-7` |

## 技术说明

- **无需安装任何依赖**：所有外部资源（Bootstrap、图标）通过 CDN 引入
- **纯静态网站**：HTML + CSS + JavaScript，无需后端服务器
- **响应式设计**：基于 Bootstrap 5，自动适配手机、平板、电脑
- **联系表单**：通过 `mailto:` 方式发送邮件（会打开用户的邮件客户端）
- **滚动动画**：使用 IntersectionObserver API 实现元素入场动画

## 后续改进建议

1. **替换品牌 Logo 占位图**：目前品牌 Logo 使用文字占位，建议替换为真实品牌图片
2. **添加真实轮播图**：首页 Hero 区域可以添加公司实景照片或产品图片
3. **接入表单服务**：如需后台接收留言，可接入 Formspree 等免费表单服务
4. **添加 ICP 备案号**：网站上线后需在页脚添加 ICP 备案号
5. **SEO 优化**：可进一步优化各页面的 meta 标签和关键词
6. **添加统计代码**：可接入百度统计或 Google Analytics 了解访客数据
