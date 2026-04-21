# EndNote XML → Obsidian Markdown 轉換工具

一個純前端靜態工具，將 EndNote 匯出的 XML 檔案轉換為 Obsidian 可用的 Markdown 檔案。

## ✨ 主要特性

- **完全本地處理**：所有檔案在您的瀏覽器中解析，資料不上傳到任何伺服器
- **無需後端依賴**：純靜態 HTML/CSS/JavaScript，可直接部署到 GitHub Pages
- **智能檔名生成**：優先使用 PDF 檔名，自動處理檔名衝突
- **完整信息保留**：提取標題、作者、DOI、摘要、關鍵詞等各種元數據
- **YAML Frontmatter**：生成符合 Obsidian 規範的 YAML frontmatter
- **多 PDF 支持**：自動識別並管理多個 PDF 附件
- **實時預覽**：顯示轉換統計、警告信息和預覽表格
- **批量匯出**：生成 ZIP 檔案和詳細的轉換報告

## 🚀 快速開始

### 在線使用
直接訪問 GitHub Pages：[待部署連結]

### 本地使用
1. 下載或克隆此項目
2. 在瀏覽器中打開 `index.html`
3. 上傳 EndNote XML 檔案
4. 下載轉換結果

### 獲取 EndNote XML 檔案
在 EndNote 中：
1. 選擇要匯出的參考文獻
2. 點選 File → Export
3. 選擇檔案格式為 XML
4. 儲存檔案

## 📋 使用流程

### 第 1 步：上傳 XML 檔案
- 點選上傳區域或拖曳檔案
- 工具會自動開始解析 XML

### 第 2 步：檢查轉換結果
- 查看轉換統計（總數、缺 DOI、缺 PDF 等）
- 檢查預覽表格中的前幾筆記錄
- 閱讀警告提示，瞭解特殊情況

### 第 3 步：下載結果
- 點選「下載全部 Markdown 檔案 (ZIP)」
- ZIP 包含所有 .md 檔案、轉換報告和 README

### 第 4 步：導入 Obsidian
1. 解壓 ZIP 檔案
2. 將 .md 檔案複製到您的 Obsidian Vault
3. 在 Obsidian 中檢查和完善內容

## 📁 輸出格式

### 檔名規則

檔名優先級：
1. **PDF 檔名**（推薦）：提取 PDF 檔名，去掉 .pdf 副檔名
   - 例如：`Al-Adwan-2021-Novel extension of the UTAUT mod.md`

2. **Author-Year-Title**：若無 PDF，使用 Author-Year-ShortTitle 格式
   - 例如：`Smith-2020-Introduction to machine learning.md`

3. **Title only**：若無作者或年份，使用標題
   - 例如：`The Future of Technology.md`

### Markdown 檔案結構

每個 `.md` 檔案包含：

```markdown
---
type: paper
title: "論文標題"
authors:
  - 作者1
  - 作者2
year: 2021
journal: "期刊名稱"
doi: "10.xxxx/xxxxx"
pdf_file: "Filename.pdf"
source_pdf_uri: "internal-pdf://xxxxx/Filename.pdf"
extra_pdf_files:
  - "OtherFile.pdf"
raw_keywords:
  - keyword1
  - keyword2
concepts: []
check_status: "needs-review"
source: "EndNote XML"
---

## Abstract
[論文摘要內容]

## Notes
[EndNote 筆記]

## AI Summary
[留空待填]

## Research Question
[留空待填]

## Method
[留空待填]

## Key Findings
[留空待填]

## Limitations
[留空待填]

## My Notes
[留空待填]
```

### YAML Frontmatter 欄位說明

| 欄位 | 說明 |
|------|------|
| `type` | 固定為 'paper'，用於 Obsidian 分類 |
| `title` | 論文標題 |
| `authors` | 作者列表（陣列格式） |
| `year` | 發佈年份 |
| `journal` | 期刊或會議名稱 |
| `doi` | 數字對象識別碼 |
| `pdf_file` | 主 PDF 檔名 |
| `source_pdf_uri` | 原始 PDF URI（用於參考） |
| `extra_pdf_files` | 額外的 PDF 附件列表 |
| `raw_keywords` | 從 EndNote 提取的原始關鍵詞 |
| `concepts` | 留空，用於個人分類或標籤 |
| `check_status` | 檢查狀態（needs-review / reviewed / completed） |
| `source` | 固定為 'EndNote XML'，標記資料來源 |

### Markdown 正文結構

頂部 YAML 後，文件包含以下固定段落（即使為空也保留）：

- **Abstract**：論文摘要（來自 EndNote 的 abstract 欄位）
- **Notes**：EndNote 筆記（來自 EndNote 的 notes 欄位）
- **AI Summary**：AI 摘要（留空待填）
- **Research Question**：研究問題（留空待填）
- **Method**：研究方法（留空待填）
- **Key Findings**：主要發現（留空待填）
- **Limitations**：研究局限（留空待填）
- **My Notes**：個人筆記（留空待填）

## 📊 轉換統計與警告

工具會提供以下統計信息：

- **總記錄數**：XML 中的總記錄數
- **成功轉換**：成功轉換的記錄數
- **缺少 DOI**：沒有 DOI 的記錄
- **缺少 PDF**：沒有 PDF 的記錄
- **檔名衝突**：檔名重複的記錄（已自動處理）
- **多個 PDF**：有多個 PDF 附件的記錄

### 警告類型

1. **缺少 DOI**：某些記錄沒有 DOI，但仍會轉換
2. **缺少 PDF**：某些記錄沒有 PDF 連結，但仍會轉換
3. **多個 PDF**：第一個 PDF 作為 `pdf_file`，其他保存在 `extra_pdf_files`
4. **檔名衝突**：重複的檔名會自動加上數字後綴（如 `file_2.md`）

## 🔧 技術細節

### 解析規則

#### XML 實體解碼
工具正確處理所有常見 XML 實體：
- `&apos;` → `'`
- `&quot;` → `"`
- `&amp;` → `&`
- `&#xD;` → `\n`（換行）
- 數字實體如 `&#13;` 和十六進制實體如 `&#x0D;`

#### 標籤移除
工具會移除所有 XML 標籤，包括 `<style>` 標籤及其內容，只保留純文本。

#### 重複檔名處理
同名檔案會自動加上遞增後綴：
- `file.md` → `file.md`
- `file.md` → `file_2.md`
- `file.md` → `file_3.md`

#### 檔名淨化
移除或替換的非法字符：
- Windows 非法字符：`< > : " | ? * \x00-\x1F`
- 路徑分隔符：`\ /`
保留字母、數字、中文、空格、連字符、下劃線。

### 技術棧

- **前端框架**：原生 HTML5/CSS3/JavaScript（無依賴）
- **XML 解析**：DOMParser（瀏覽器內置）
- **ZIP 生成**：[JSZip](https://stuk.github.io/jszip/)（v3.10.1，通過 CDN）
- **檔案下載**：[FileSaver.js](https://github.com/eligrey/FileSaver.js)（v2.0.5，通過 CDN）
- **部署**：GitHub Pages（靜態網站）

### 依賴說明

本工具只依賴兩個輕量級第三方庫，均通過 CDN 引入：

| 庫 | 用途 | 檔案大小 | 原因 |
|----|------|--------|------|
| JSZip | 瀏覽器端生成 ZIP 檔案 | ~35KB | 無瀏覽器原生 ZIP API |
| FileSaver | 下載檔案到本地 | ~5KB | 兼容性和跨瀏覽器支持 |

這些庫均在業界廣泛使用，經過驗證且穩定。

## 📦 部署到 GitHub Pages

### 方法 1：使用 GitHub Web 介面

1. Fork 此項目到您的 GitHub 帳戶
2. 進入 Repository Settings
3. 向下滾動到 "GitHub Pages" 部分
4. 選擇 Source 為 "main branch"
5. 點選 Save
6. 等待部署完成（通常 1-2 分鐘）
7. 訪問 `https://您的用戶名.github.io/项目名/`

### 方法 2：使用本地 Git

```bash
# 克隆項目
git clone https://github.com/您的用戶名/endnote-to-obsidian.git
cd endnote-to-obsidian

# 對檔案進行修改（如果需要）

# 推送到 GitHub
git add .
git commit -m "Update tool"
git push origin main
```

### 方法 3：簡單部署（無需 GitHub）

如果您只想在本地或其他伺服器使用：
1. 下載所有檔案
2. 在 Web 伺服器上提供這些檔案
3. 訪問 `index.html`

## 🐛 故障排查

### 上傳後沒有反應
- 檢查瀏覽器控制台（F12）是否有錯誤信息
- 確保 XML 檔案格式正確
- 嘗試用另一個瀏覽器

### 檔名亂碼
- 確保您的文本編輯器使用 UTF-8 編碼
- 確保 Obsidian 設定中啟用了 UTF-8 支持

### Obsidian 無法識別 Frontmatter
- 檢查 YAML 的縮進（必須用空格，不能用 Tab）
- 確保 `---` 單獨佔據一行
- 查看 Obsidian 的 Properties 設定是否正確

### ZIP 下載失敗
- 嘗試刷新頁面
- 清空瀏覽器快取
- 嘗試另一個瀏覽器

### PDF 檔名提取不正確
- 確保 EndNote 中的 PDF URL 格式為 `internal-pdf://xxxxx/FileName.pdf`
- 某些舊版本的 EndNote 可能使用不同格式

## 📝 邊界情況處理說明

### 1. 缺少標題
- 使用「(無標題)」作為佔位符
- 檔名使用 Author-Year 或隨機名稱

### 2. 缺少作者
- Frontmatter 中 `authors` 為空陣列
- 檔名中無作者部分

### 3. 多個 PDF
- 第一個作為 `pdf_file`
- 其他保存在 `extra_pdf_files` 陣列
- 在預覽和警告中標記

### 4. 重複檔名
- 自動加數字後綴
- 記錄在 `has_conflict` 欄位
- 在警告區域提示

### 5. 特殊字符
- XML 實體正確解碼
- 檔名中的特殊字符清理
- 保留 UTF-8 編碼支持

### 6. 空字段
- Frontmatter 中顯示為空字符串 `""`
- 不顯示 `null` 或 `undefined`
- 保留字段名便於後續編輯

### 7. 超長檔名
- 限制為 200 個字符（不含副檔名）
- 截斷時保留可讀性

## 💡 工作流建議

### 推薦用法

1. **首次轉換**
   - 上傳完整的 EndNote 庫
   - 檢查警告和統計信息
   - 下載 ZIP 並解壓

2. **檢查和修正**
   - 在 Obsidian 中逐個檢查記錄
   - 補充缺失的 DOI 和 PDF
   - 修正特殊字符或格式問題

3. **持續維護**
   - 在 Obsidian 中填充「My Notes」欄位
   - 分類修改 `concepts` 標籤
   - 更新 `check_status` 為 reviewed/completed

### 與 Obsidian 的集成

#### 建議的 Vault 結構
```
MyVault/
├── papers/
│   ├── paper1.md
│   ├── paper2.md
│   └── ...
├── notes/
│   └── ...
└── attachments/
    └── pdf/
```

#### Obsidian 設定建議

在 Obsidian 設定中：
- 啟用 YAML frontmatter 支持（Properties）
- 設定檔案連結分隔符為 `/`
- 啟用後向連結渲染
- 考慮安裝 MetaEdit 或 Dataview 外掛以利用 frontmatter 資訊

## 🔐 隱私與安全

- **完全離線**：所有處理在您的瀏覽器中進行
- **無資料上傳**：檔案不發送到任何伺服器
- **源碼公開**：您可以檢查完整的源碼
- **無追蹤**：工具不包含任何分析或追蹤代碼

## 📄 授權

本項目採用 MIT 授權。詳見 LICENSE 檔案。

## 🤝 貢獻

歡迎提出問題、建議和拉取請求！

## 📞 支持

如遇到問題，請：
1. 檢查本 README 的故障排查部分
2. 檢查瀏覽器控制台是否有錯誤信息
3. 提出 GitHub Issue（如果適用）

## 更新日誌

### v1.0（2024 年）
- 初始版本發布
- 支持 EndNote XML 解析
- 支持 Markdown 和 YAML frontmatter 生成
- 支持 ZIP 匯出和轉換報告
- 完整的 UTF-8 和中文支持

## 常見問題 (FAQ)

### Q: 工具支持哪些版本的 EndNote？
A: 工具支持 EndNote X9 及以上版本的 XML 匯出格式。如果您的 EndNote 版本無法匯出 XML，請先升級。

### Q: 能處理多大的 XML 檔案？
A: 理論上沒有限制，但非常大的檔案（>100MB）可能會導致瀏覽器變慢。建議分批轉換。

### Q: 轉換後可以重新轉換嗎？
A: 可以。只要保存了原始 XML，就可以隨時重新轉換。

### Q: 如何更新已轉換的記錄？
A: 在 EndNote 中更新，重新匯出 XML，然後重新轉換。新的 .md 檔案會覆蓋舊的。

### Q: 支持 Windows 和 Mac 嗎？
A: 支持。工具是基於 Web 的，在任何瀏覽器中都能運行。

### Q: 能用手機上傳檔案嗎？
A: 可以，但手機瀏覽器的檔案選擇器功能可能有限。推薦使用電腦。

---

**祝您使用愉快！** 🎉

如有任何反饋或建議，歡迎聯繫或提出 Issue。
