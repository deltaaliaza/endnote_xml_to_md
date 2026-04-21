# 📚 EndNote XML → Obsidian Markdown 轉換工具

一個純前端靜態工具，將 EndNote 匯出的 XML 檔案轉換為 Obsidian 可用的 Markdown 檔案。

**特性：** 完全本地處理 | 無需後端 | 隱私安全 | GitHub Pages 部署

---

## ✨ 主要功能

### 核心轉換
- 📄 解析 EndNote XML 檔案
- 🔄 每條記錄轉換成一個 `.md` 檔案
- 📋 提取標題、作者、年份、期刊、DOI、關鍵詞等元數據
- 📦 生成 ZIP 檔案供下載
- 📊 轉換報告（JSON 格式）

### 智能檔名
- 優先使用 PDF 檔名（去掉 `.pdf` 副檔名）
- 備選方案：Author-Year-Title 格式
- 自動處理檔名衝突（自動添加 `_2`, `_3` 等後綴）
- 完全支援中文和特殊字符

### 數據完整性
- ✅ 正確解碼所有 XML 實體
- ✅ 規範的 YAML frontmatter
- ✅ UTF-8 編碼支持
- ✅ 多 PDF 附件管理

---

## 🚀 快速開始

### 在線使用
訪問：[GitHub Pages 部署地址]

### 本地運行
```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server
```
然後在瀏覽器打開 `http://localhost:8000`

### 獲取 EndNote XML
在 EndNote 中：`File → Export → 選擇 XML 格式`

---

## 📋 使用流程

### 第 1 步：上傳 XML
- 點選上傳區或拖曳檔案
- 工具會自動解析

### 第 2 步：檢查統計
- 查看轉換統計（總數、缺 DOI、缺 PDF 等）
- 檢查預覽表格

### 第 3 步：下載結果
- 點選「下載全部 Markdown 檔案 (ZIP)」
- 包含所有 `.md` 檔案和轉換報告

### 第 4 步：匯入 Obsidian
- 解壓 ZIP 檔案
- 將 `.md` 檔複製到 Vault
- 在 Obsidian 中打開使用

---

## 📁 輸出格式

### 檔名規則

#### 優先級 1：PDF 檔名
```
internal-pdf://xxxxx/Al-Adwan-2021-Novel extension of UTAUT.pdf
↓
Al-Adwan-2021-Novel extension of UTAUT.md
```

#### 優先級 2：Author-Year-Title
```
Author-Year-ShortTitle.md
```

#### 優先級 3：Title 只
```
Title.md
```

#### 衝突處理
```
file.md
file_2.md
file_3.md
```

---

## 📄 Markdown 檔案結構

### 1. YAML Frontmatter

```yaml
---
type: "paper"

title: "論文標題"

authors:
  - "作者1"
  - "作者2"

year: 2021

journal: "期刊名"

doi: "10.xxxx/xxxxx"

pdf_file: "Filename.pdf"

source_pdf_uri: "internal-pdf://xxxxx/Filename.pdf"

extra_pdf_files: []

raw_keywords:
  - "keyword1"
  - "keyword2"

concepts: []

check_status: "needs-review"

source: "EndNote XML"
---
```

### 2. Markdown 正文（固定模板）

```markdown
My Notes

----

AI Summary

Research Question

Method

Key Findings

Limitations

Concepts

Issues

Gaps
```

**說明：**
- `My Notes` - 用戶個人筆記
- `----` - 清晰的分隔符
- 其他段落預留空白，等待用戶填入 AI 萃取的內容
- 每段之間有單一空行

---

## 🎯 YAML Frontmatter 欄位說明

| 欄位 | 說明 | 來源 |
|------|------|------|
| `type` | 固定為 "paper" | 固定 |
| `title` | 論文標題 | XML `<title>` |
| `authors` | 作者列表（陣列） | XML `<author>` |
| `year` | 發佈年份 | XML `<year>` |
| `journal` | 期刊名稱 | XML `<secondary-title>` 或 `<full-title>` |
| `doi` | 數字對象識別碼 | XML `<electronic-resource-num>` |
| `pdf_file` | PDF 檔名（無路徑） | 從 PDF URL 提取 |
| `source_pdf_uri` | 原始 PDF URI（完整） | XML `<pdf-urls><url>` |
| `extra_pdf_files` | 額外 PDF 檔案列表 | 第 2 個以後的 PDF |
| `raw_keywords` | 原始關鍵詞列表 | XML `<keyword>` |
| `concepts` | 概念標籤（留空） | 預設空陣列 |
| `check_status` | 檔案狀態 | 固定 "needs-review" |
| `source` | 資料來源 | 固定 "EndNote XML" |

---

## 📊 轉換統計與警告

### 統計項目

| 項目 | 說明 |
|------|------|
| 總記錄數 | XML 中的全部記錄 |
| 成功轉換 | 成功轉換的記錄 |
| 缺少 DOI | 沒有 DOI 的記錄 |
| 缺少 PDF | 沒有 PDF 的記錄 |
| 檔名衝突 | 重複檔名（已自動處理） |
| 多個 PDF | 有多個 PDF 的記錄 |

### 警告類型

- **缺少 DOI** - 部分記錄無 DOI，但仍會轉換
- **缺少 PDF** - 部分記錄無 PDF，但仍會轉換
- **多個 PDF** - 第一個作為 `pdf_file`，其他在 `extra_pdf_files`
- **檔名衝突** - 自動添加數字後綴

---

## 🔧 技術規格

### 前端技術
- 原生 HTML5/CSS3/JavaScript（無框架）
- DOMParser 用於 XML 解析
- 完全本地處理

### 外部依賴（CDN）
- **JSZip** v3.10.1 - ZIP 生成
- **FileSaver.js** v2.0.5 - 檔案下載

### 部署
- GitHub Pages（推薦）
- 任何靜態 Web 伺服器
- 本地檔案直接打開

### 瀏覽器支持
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## 🔒 隱私與安全

- ✅ 完全本地處理（無伺服器上傳）
- ✅ 無 API key 或認證需求
- ✅ 源碼完全公開
- ✅ 無追蹤或分析代碼
- ✅ HTTPS 安全（GitHub Pages 默認）

---

## 📝 工作流建議

### 推薦用法

```
1. 在 EndNote 中選擇文獻 → 匯出 XML
2. 上傳至工具 → 自動轉換
3. 下載 ZIP 檔案
4. 解壓到 Obsidian Vault
5. 在 Obsidian 中逐步補寫內容
```

### Obsidian 整合

#### 建議的 Vault 結構
```
MyVault/
├── papers/
│   ├── paper1.md
│   ├── paper2.md
│   └── ...
├── notes/
└── attachments/pdf/
```

#### Obsidian 設定建議
- 啟用 YAML frontmatter 支持（Properties）
- 設定檔案連結分隔符為 `/`
- 啟用後向連結渲染
- 考慮安裝 Dataview 或 MetaEdit 外掛

---

## 🐛 常見問題

### Q：檔案會被上傳到伺服器嗎？
**A：** 不會。所有處理完全在您的瀏覽器中進行。

### Q：支持多大的 XML 檔案？
**A：** 理論上無限制，但非常大的檔案（>100MB）可能導致瀏覽器變慢。

### Q：可以修改輸出格式嗎？
**A：** 可以。修改 `app.js` 中的 `generateMarkdown()` 方法。

### Q：如何更新已轉換的記錄？
**A：** 在 EndNote 中更新 → 重新匯出 XML → 重新轉換。

### Q：Obsidian 無法識別 frontmatter？
**A：** 確保使用 UTF-8 編碼，檢查 YAML 縮進（用空格不用 Tab）。

---

## 🚀 部署到 GitHub Pages

### 步驟 1：建立 Repository
1. 訪問 https://github.com/new
2. Repository 名稱：`endnote-to-obsidian`（或其他名稱）
3. 選擇 **Public**
4. 點選 **Create repository**

### 步驟 2：上傳檔案
1. 點選 **Add file → Upload files**
2. 選擇所有檔案：
   - `index.html`
   - `styles.css`
   - `app.js`
   - `README.md`
3. 提交更改

### 步驟 3：啟用 Pages
1. 進入 **Settings → Pages**
2. Source: `main` 分支
3. 點選 **Save**

### 步驟 4：訪問
訪問 `https://您的用戶名.github.io/endnote-to-obsidian/`

---

## 📦 項目檔案

```
endnote-to-obsidian/
├── index.html          # 主網頁
├── styles.css          # 樣式表
├── app.js              # 核心邏輯
├── README.md           # 此檔案
├── DEPLOY.md           # 部署指南
├── TEST.md             # 測試指南
└── .gitignore          # Git 設定
```

---

## 🔄 更新歷史

### v1.0（當前版本）
- ✅ 完整 XML 解析
- ✅ 智能檔名生成
- ✅ YAML frontmatter（字段間有空行）
- ✅ 固定模板輸出（My Notes + 8 個預留段落）
- ✅ ZIP 匯出
- ✅ 完整文檔

---

## 📞 支持

### 文檔
- **快速開始** - 見本檔案上方
- **部署指南** - 見 DEPLOY.md
- **測試方法** - 見 TEST.md

### 故障排查
1. 查看相關文檔
2. 檢查瀏覽器控制台（F12）
3. 確認 XML 格式有效

---

## 📜 授權

MIT 授權 - 詳見 LICENSE 檔案

---

## 🙏 貢獻

歡迎提出 Issue 和 Pull Request！

---

**最後更新：2024 年  
版本：v1.0  
狀態：✅ 生產就緒**
