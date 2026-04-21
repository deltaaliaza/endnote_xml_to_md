# 🚀 快速開始指南

本文件為最簡潔的使用說明。詳細文檔請見 README.md。

## ⚡ 30 秒快速開始

### 1️⃣ 打開工具
- 訪問：`https://您的GitHub用戶名.github.io/endnote-to-obsidian/`（部署後）
- 或者：在瀏覽器中打開本地 `index.html`

### 2️⃣ 上傳 EndNote XML
1. 在 EndNote 中：File → Export → 選擇 XML 格式
2. 保存 XML 檔案
3. 在工具中點選上傳區或拖曳檔案

### 3️⃣ 下載結果
1. 查看轉換統計和警告（如有）
2. 點選「下載全部 Markdown 檔案 (ZIP)」
3. 解壓到您的 Obsidian Vault

### 4️⃣ 在 Obsidian 中使用
1. 解壓 ZIP 檔案
2. 複製 .md 檔案到 Obsidian Vault
3. 開始使用和編輯

**完成！** ✨

---

## 📋 檢查清單

部署到 GitHub Pages：

- [ ] Fork 或複製此項目到 GitHub
- [ ] 進入 Repository Settings → Pages
- [ ] 選擇 Source 為 main branch
- [ ] 等待 1-2 分鐘
- [ ] 訪問給定的 URL

本地運行：

- [ ] 下載所有檔案到同一資料夾
- [ ] 在瀏覽器中打開 `index.html`
- [ ] 開始使用

---

## 📁 檔案結構

```
📦 项目文件（只需这些）
├── index.html       ← 打開這個
├── styles.css
├── app.js
└── README.md        ← 詳細文檔
```

---

## ❓ 常見問題

### Q: 檔案會上傳到伺服器嗎？
**A:** 不會。所有處理都在您的瀏覽器中進行。資料不會被上傳。

### Q: 支持 Mac/Windows/Linux 嗎？
**A:** 支持。只要有瀏覽器就可以使用。

### Q: 如何更新工具？
**A:** 在 GitHub 上推送新代碼，GitHub Pages 會自動更新。

### Q: 可以離線使用嗎？
**A:** 可以。下載所有檔案後在本地打開 index.html。

### Q: Obsidian 無法識別檔案？
**A:** 確保用 UTF-8 編碼。檢查 Obsidian 的 Properties 設定。

---

## 🎯 輸出格式

每個 Markdown 檔案包含：

```markdown
---
type: paper
title: "論文標題"
authors: [作者列表]
year: 2021
doi: "10.xxxx/xxxxx"
pdf_file: "Filename.pdf"
...
---

## Abstract
論文摘要

## Notes
您的筆記

## 其他章節
（留空待填）
```

檔名優先規則：
1. **PDF 檔名**：`Author-Year-Title.md` (推薦)
2. **Title 只**：`Title.md`

---

## 📊 見了什麼數據？

| 統計項 | 說明 |
|--------|------|
| 總記錄數 | XML 中的全部記錄 |
| 成功轉換 | 成功轉換的記錄 |
| 缺 DOI | 沒有 DOI 的記錄（仍會轉換） |
| 缺 PDF | 沒有 PDF 的記錄（仍會轉換） |
| 檔名衝突 | 重複檔名（已自動處理） |
| 多個 PDF | 有多個 PDF 的記錄 |

---

## 🔧 技術規格

- **瀏覽器支持**：Chrome、Firefox、Safari、Edge（最新版本）
- **檔案大小**：HTML+CSS+JS 共 55KB（外部庫通過 CDN）
- **編碼**：UTF-8（完全支持中文）
- **依賴**：只依賴 JSZip 和 FileSaver（通過 CDN）
- **部署**：GitHub Pages、本地伺服器、或直接打開

---

## 📖 相關文檔

| 文件 | 用途 |
|------|------|
| README.md | 完整使用文檔 |
| DEPLOY.md | 部署到 GitHub Pages |
| TEST.md | 完整測試指南 |
| CHECKLIST.md | 項目清單和維護指南 |

---

## 🎓 使用提示

### 最佳實踐

1. **首次轉換**
   - 上傳小的測試檔案
   - 檢查轉換結果
   - 確認格式符合預期

2. **批量轉換**
   - 可以多次上傳不同的 XML
   - 每次都會生成新的轉換
   - 結果相互獨立

3. **在 Obsidian 中整理**
   - 檢查 `check_status` 欄位
   - 填充 `My Notes` 和 `concepts`
   - 建立相互連結

### 工作流建議

```
EndNote
   ↓ (Export XML)
This Tool
   ↓ (Convert to Markdown)
Obsidian Vault
   ↓ (Organize & Link)
Knowledge Base
```

---

## 💡 故障排查

### 上傳後沒反應
→ 檢查瀏覽器控制台（F12）是否有紅色錯誤

### 檔名看起來亂碼
→ 確保編輯器使用 UTF-8 編碼

### Obsidian 看不到 frontmatter
→ 檢查 YAML 的縮進（用空格不用 Tab）

### 下載失敗
→ 清除瀏覽器快取（Ctrl+Shift+Delete）

### 其他問題
→ 參考 README.md 或 TEST.md

---

## 🌐 部署 URL

部署後，您的工具會在：

```
https://您的GitHub用戶名.github.io/endnote-to-obsidian/
```

替換為您的實際用戶名和 repository 名稱。

---

## 📞 需要幫助？

1. **最常見的問題** → 見上方的故障排查
2. **詳細的文檔** → 參考 README.md
3. **測試工具** → 參考 TEST.md
4. **部署問題** → 參考 DEPLOY.md
5. **專案詳情** → 參考 CHECKLIST.md

---

## 🎉 就這樣！

現在您可以：
- ✅ 上傳 EndNote XML
- ✅ 自動轉換為 Markdown
- ✅ 匯入 Obsidian
- ✅ 開始建立知識庫

祝您使用愉快！🚀

---

**最後更新**：2024 年 
**版本**：1.0.0
