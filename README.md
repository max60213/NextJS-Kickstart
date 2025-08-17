# 🚀 Next.js Kickstarter

一個功能完整的 Next.js 15 專案模板，預先配置了現代化的技術棧和常用功能，讓你快速開始開發。

## ✨ 主要功能

- **Next.js 15** - 最新的 React 框架，支援 App Router
- **React 19** - 最新的 React 版本，包含新特性和優化
- **TypeScript** - 完整的類型安全支援
- **Tailwind CSS 4** - 現代化的 CSS 框架
- **國際化支援** - 使用 `next-intl` 進行多語言支援
- **Headless CMS** - 整合 `Strapi`，附帶新聞列表與文章頁範例
- **GSAP 動畫** - 專業級動畫函式庫，支援複雜動畫序列和滾動觸發
- **Lenis 滾動** - 流暢滾動函式庫，提供絲滑的滾動體驗
- **3D 支援** - Three.js 整合，支援 3D 內容
- **開發工具** - ESLint、PostCSS 等開發工具預配置

## 📋 待完成項目

- **頁面切換轉場效果**

## 🛠️ 技術棧

### 核心框架
- **Next.js** `15.4.6` - React 全端框架
- **React** `19.1.0` - 使用者介面函式庫
- **TypeScript** `^5` - 靜態類型檢查

### 樣式與 UI
- **Tailwind CSS** `^4` - 實用優先的 CSS 框架
- **PostCSS** - CSS 後處理器
  - `postcss-import` - CSS 導入支援
  - `postcss-mixins` - CSS 混入功能
  - `postcss-nested` - 巢狀 CSS 支援

### 動畫與互動
- **GSAP** `^2.1.2` - 專業級動畫函式庫
- **Lenis** `^1.3.8` - 流暢滾動函式庫

### 3D 與多媒體
- **Three.js** `^0.178.0` - 3D 圖形函式庫

### 國際化
- **next-intl** `^4.3.4` - Next.js 國際化解決方案

### 資料來源
- **Strapi CMS** - Headless CMS，提供內容管理與 API 供應

### 開發工具
- **ESLint** `^9` - 程式碼品質檢查
- **Autoprefixer** `^10.4.21` - CSS 瀏覽器前綴自動添加

## 🚀 快速開始

### 前置需求
- Node.js 18+ 
- npm 或 yarn

### 安裝依賴
```bash
npm install
```

### 開發模式
```bash
npm run dev
```
專案將在 [http://localhost:3000](http://localhost:3000) 啟動，並啟用 Turbopack 加速開發。

### 建置專案
```bash
npm run build
```

### 啟動生產環境
```bash
npm start
```

### 程式碼檢查
```bash
npm run lint
```

## 🧰 Strapi CMS 整合

本專案已內建與 Strapi 的整合範例：`app/[locale]/news/page.tsx`（文章列表）與 `app/[locale]/news/[slug]/page.tsx`（單篇文章）。

### 1) 環境變數

請新增 `.env` 檔案並設定 CMS API URL（擇一）：

```bash
# 本機 Strapi（預設 port 1337）
NEXT_PUBLIC_API_URL=http://localhost:1337

# 或：雲端/自架 CMS 網域
# NEXT_PUBLIC_API_URL=https://cms.your-domain.com
```

### 2) 圖片網域白名單

若你使用 CMS 上傳圖片，需要允許圖片網域（已預設本機與範例網域）：

```ts
// next.config.ts（節錄）
images: {
  remotePatterns: [
    { protocol: 'http', hostname: 'localhost', port: '1337', pathname: '/uploads/**' },
    { protocol: 'https', hostname: 'cms.maxlin.tw', pathname: '/uploads/**' },
  ],
},
```

### 3) Strapi 內容結構建議

以 `Article` 為例（對應本專案新聞頁）：
- `documentId`：供前端路由使用（本專案以此作為 `slug`）
- `title`、`description`
- `cover`：單一媒體（建議開啟多尺寸 `formats`）
- `author`：關聯（含 `name`）
- `category`：關聯（含 `name`, `slug`）
- `blocks`：Dynamic Zone（例如 `shared.rich-text`, `shared.quote`, `shared.media`, `shared.slider`）

Strapi 權限：請確保公開角色（Public）已允許 `Article` 的 `find` 與 `findOne`。

### 4) API 介接

本專案以 REST API 介接，常用端點如下：

```text
GET /api/articles?populate=*&pagination[page]=1&pagination[pageSize]=10
GET /api/articles/:id?populate=*
```

單篇頁面以 `documentId` 作為路由參數，並於伺服器端讀取內容（含 60 秒 revalidate）：

```ts
// 片段：app/[locale]/news/[slug]/page.tsx（簡化）
const getArticle = async (id: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${baseUrl}/api/articles/${id}?populate=*`, { next: { revalidate: 60 } });
  if (!res.ok) return null;
  const result = await res.json();
  return result.data;
};
```

### 5) 部署與最佳化

- 建議於生產環境設置合理的 `Cache-Control` 與 Next.js `revalidate` 以減少 API 壓力
- 若有自訂網域的 CMS 圖片，請記得同步更新 `next.config.ts` 的 `images.remotePatterns`
- 需跨網域時，請於 Strapi 設定 CORS 允許你的前端網域

### 6) 快速啟動 Strapi（可選）

- 參考官方文件快速建立專案：[Strapi Quick Start](https://docs.strapi.io/dev-docs/quick-start)
- 預設管理後台位址為 `http://localhost:1337/admin`

## 📁 專案結構

```
nextjs-kickstart/
├── app/                    # Next.js App Router
│   └── [locale]/          # 國際化路由層級
│       ├── globals.css    # 全域樣式
│       ├── layout.tsx     # 根佈局
│       ├── page.tsx       # 首頁
│       ├── about/         # 關於頁面
│       │   └── page.tsx
│       ├── news/          # 新聞頁面
│       │   ├── page.tsx   # 新聞列表
│       │   └── [slug]/    # 單篇新聞
│       │       └── page.tsx
│       └── components/    # 共用元件
│           ├── Navigation.tsx
│           ├── LocaleSwitcher.tsx
│           └── LocaleSwitcherSelect.tsx
├── i18n/                   # 國際化配置
│   ├── navigation.ts
│   ├── request.ts
│   └── routing.ts
├── messages/               # 多語言訊息
│   ├── en.json
│   └── zh-TW.json
├── public/                 # 靜態資源
│   ├── next.svg           # Next.js logo
│   ├── vercel.svg         # Vercel logo
│   └── ...                # 其他 SVG 圖示
├── package.json            # 專案依賴
├── next.config.ts          # Next.js 配置
├── postcss.config.mjs      # PostCSS 配置
├── tsconfig.json           # TypeScript 配置
├── middleware.ts           # 國際化中間件
└── README.md               # 專案說明
```

## 🎯 使用指南

### 添加新頁面
在 `app/[locale]/` 目錄下創建新的資料夾和 `page.tsx` 檔案：
```tsx
// app/[locale]/about/page.tsx
export default function AboutPage() {
  return <div>關於我們</div>
}
```

### 使用 Tailwind CSS
直接在 JSX 中使用 Tailwind 類別：
```tsx
<div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
  <h1 className="text-4xl font-bold text-white">Hello World</h1>
</div>
```

### 添加動畫
使用 GSAP 創建流暢動畫：
```tsx
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'

export default function AnimatedComponent() {
  useGSAP(() => {
    gsap.from('.animate-me', { opacity: 0, y: 50, duration: 1 })
  })

  return <div className="animate-me">動畫內容</div>
}
```

### 國際化
使用 `next-intl` 進行多語言支援：
```tsx
import { useTranslations } from 'next-intl'

export default function LocalizedComponent() {
  const t = useTranslations('common')
  return <h1>{t('title')}</h1>
}
```

## 🔧 配置說明

### Next.js 配置
專案使用預設的 Next.js 配置，你可以根據需求在 `next.config.ts` 中進行調整。

### Tailwind CSS 配置
Tailwind CSS 4 已預配置，支援最新的 CSS 功能。

### TypeScript 配置
TypeScript 已配置為嚴格模式，確保程式碼品質。

## 📦 可選功能

### 添加狀態管理
如果需要狀態管理，可以考慮：
- Zustand - 輕量級狀態管理
- Redux Toolkit - 企業級狀態管理
- Jotai - 原子化狀態管理

### 添加測試
建議添加測試框架：
- Jest + React Testing Library
- Vitest + Testing Library
- Playwright - E2E 測試

### 添加 API 路由
在 `app/api/` 目錄下創建 API 路由：
```tsx
// app/api/hello/route.ts
export async function GET() {
  return Response.json({ message: 'Hello World' })
}
```

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request 來改善這個專案！

## 📄 授權

MIT License



---

**開始你的 Next.js 專案之旅吧！** 🎉
