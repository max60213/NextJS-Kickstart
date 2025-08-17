# 🚀 Next.js Kickstarter

一個功能完整的 Next.js 15 專案模板，預先配置了現代化的技術棧和常用功能，讓你快速開始開發。

## ✨ 主要功能

- **Next.js 15** - 最新的 React 框架，支援 App Router
- **React 19** - 最新的 React 版本，包含新特性和優化
- **TypeScript** - 完整的類型安全支援
- **Tailwind CSS 4** - 現代化的 CSS 框架
- **國際化支援** - 使用 `next-intl` 進行多語言支援
- **動畫系統** - 整合 GSAP 和 Lenis 實現流暢的滾動動畫
- **3D 支援** - Three.js 整合，支援 3D 內容
- **響應式設計** - 支援觸控友好的互動體驗
- **開發工具** - ESLint、PostCSS 等開發工具預配置

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

## 📁 專案結構

```
nextjs-kickstart/
├── app/                    # Next.js App Router
│   ├── globals.css        # 全域樣式
│   ├── layout.tsx         # 根佈局
│   └── page.tsx           # 首頁
├── public/                 # 靜態資源
│   ├── next.svg           # Next.js logo
│   ├── vercel.svg         # Vercel logo
│   └── ...                # 其他 SVG 圖示
├── package.json            # 專案依賴
├── next.config.ts          # Next.js 配置
├── tailwind.config.js      # Tailwind CSS 配置
├── tsconfig.json           # TypeScript 配置
└── README.md               # 專案說明
```

## 🎯 使用指南

### 添加新頁面
在 `app/` 目錄下創建新的資料夾和 `page.tsx` 檔案：
```tsx
// app/about/page.tsx
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

## 🙏 致謝

感謝所有開源專案的貢獻者，讓這個 kickstarter 專案成為可能。

---

**開始你的 Next.js 專案之旅吧！** 🎉
