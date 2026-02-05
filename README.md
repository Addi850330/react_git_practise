# OFFICIAL_WEBSITE_FRONTEND

公司官方網站前端專案，採用 **React + Vite** 架構，負責官方網站的 UI 與前端互動邏輯。  
本專案為前後端分離架構，前端獨立開發與部署。

---

## 📦 技術架構（Tech Stack）

- **Framework**：React
- **Build Tool**：Vite
- **Language**：JavaScript（ES Module）
- **Lint**：ESLint（Flat Config）
- **Formatter**：Prettier
- **Version Control**：Git（Git Flow）
- **Package Manager**：npm

---

## 📁 專案結構說明

## 📁 專案結構說明

```txt
official_website_frontend/
├─ public/
├─ src/
│  ├─ assets/
│  ├─ components/
│  ├─ pages/
│  ├─ hooks/
│  ├─ services/
│  └─ main.jsx
├─ eslint.config.js
├─ vite.config.js
├─ index.html
├─ package.json
└─ README.md
```

---

## 🚀 開發環境啟動（Development）

1️⃣ 安裝套件

```bash
npm install
```

2️⃣ 啟動本地開發伺服器

```bash
npm run dev
```

啟動後，預設可於以下位置瀏覽：

```arduino
http://localhost:5173
```

---

## 🏗️ 建置專案（Build）

用於正式環境部署

```bash
npm run build
```

建置完成後，產出檔案會位於

```text
dist/
```

---

## 👀 預覽建置結果（Preview）

```bash
npm run preview
```

---

## 🧹 程式碼規範（Lint & Format）

ESLint 檢查

```bash
npm run lint
```

- 請在 提交程式碼前確保 lint 無 error

- ESLint 規則統一管理於 eslint.config.js

- Prettier 格式化

- 專案建議搭配 VSCode + Prettier Extension

- 儲存時會自動格式化程式碼（format on save）

---

## 🌱 Git 開發流程（Git Flow）

本專案使用的 Git Flow：

main # 正式上線分支
dev # 開發整合分支
feat/_ # 功能開發分支
fix/_ # Bug 修復分支

開發流程範例

```bash
git checkout dev
git checkout -b feat/homepage
```

完成後：

```bash
git checkout dev
git merge feat/homepage
```

❗ 請勿直接在 main 分支進行開發

---

## ⚠️ 開發注意事項

- 所有新功能請從 dev 開分支

- 提交前請確認：
  - npm run lint 無錯誤

  - 功能可正常啟動與操作

- 共用元件請放置於 src/components

- API 請集中於 src/services 管理，避免散落於頁面中

---

## 📄 備註

-本專案使用 Vite，不需 Webpack

-Node.js 建議版本：18 以上

-若遇到環境或建置問題，請先確認 Node 與 npm 版本
