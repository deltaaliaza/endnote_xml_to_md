# 項目清單和文件說明

## 📦 完整項目結構

```
endnote-to-obsidian/
│
├── 📄 index.html                 # 主 HTML 文件（8KB）
├── 🎨 styles.css                 # 樣式表（12KB）
├── ⚙️  app.js                     # 主應用邏輯（35KB）
├── 📖 README.md                   # 使用文檔（20KB）
├── 🚀 DEPLOY.md                   # 部署指南（15KB）
├── 🧪 TEST.md                     # 測試指南（25KB）
├── 📋 CHECKLIST.md                # 本文件
├── .gitignore                    # Git 忽略文件
│
└── 📂 sample-output/              # 範例輸出（可選）
    ├── sample-markdown-1.md
    ├── sample-markdown-2.md
    └── conversion-report.json
```

## 📄 文件詳細說明

### 核心文件

#### 1. index.html（8KB）
**用途**：應用主頁面和 UI 結構

**包含內容**：
- HTML5 文件結構
- 上傳區域
- 統計信息卡片
- 預覽表格
- 警告區域
- 下載按鈕

**何時修改**：
- 更改頁面標題
- 修改 UI 佈局
- 調整表單欄位

**技術細節**：
- 使用語義 HTML5 標籤
- 響應式設計（移動和桌面）
- 無內聯樣式（使用 CSS 類）
- 無內聯腳本（依賴外部 JS）

#### 2. styles.css（12KB）
**用途**：應用樣式和主題

**包含內容**：
- CSS 變量（顏色、陰影、排版）
- 全局樣式
- 組件樣式
- 響應式媒體查詢
- 動畫和過渡

**何時修改**：
- 更改顏色主題
- 調整佈局
- 改進移動版體驗
- 添加新的 UI 組件

**技術特點**：
- 使用 CSS 變量便於主題切換
- Grid 和 Flexbox 佈局
- 移動優先設計
- 支持深色模式（可擴展）

#### 3. app.js（35KB）
**用途**：核心應用邏輯

**主要類和方法**：

**EndNoteConverter 類**：
- `parseXML(xmlString)` - 解析 XML 檔案
- `convertRecords(xmlString)` - 轉換所有記錄
- `cleanXMLText(text)` - 清理文本（實體解碼、標籤移除）
- `generateFilename(record)` - 生成檔案名
- `generateMarkdown(record, filename)` - 生成 Markdown
- `toYAML(data)` - 轉換為 YAML
- `getStatistics()` - 獲取統計信息
- `generateReport()` - 生成報告

**UIController 類**：
- `handleFileSelect(file)` - 處理檔案選擇
- `processXML(xmlString)` - 處理 XML
- `updateUI()` - 更新界面
- `showStatistics()` - 顯示統計
- `showPreview()` - 顯示預覽表格
- `downloadZip()` - 下載 ZIP
- `downloadReport()` - 下載報告

**何時修改**：
- 添加新的提取欄位
- 更改 Markdown 輸出格式
- 優化解析算法
- 添加新的轉換規則

**技術細節**：
- 模塊化設計（兩個主要類）
- DOMParser 用於 XML 解析
- 正則表達式用於文本處理
- 數組方法用於數據轉換

#### 4. README.md（20KB）
**用途**：完整的使用文檔

**包含的部分**：
- 功能介紹
- 快速開始
- 使用流程
- 輸出格式說明
- 技術細節
- 部署說明
- 故障排查
- 常見問題

**何時查看**：
- 首次使用工具
- 遇到問題時
- 了解輸出格式時
- 想要自訂工具時

**何時修改**：
- 添加新功能
- 修復已知問題
- 更新部署方式
- 更新常見問題

#### 5. DEPLOY.md（15KB）
**用途**：詳細的部署指南

**包含的部分**：
- 快速部署到 GitHub Pages
- 本地運行方法
- 自訂和擴展
- 常見部署問題
- 性能優化
- 安全考慮

**何時查看**：
- 準備部署到 GitHub Pages
- 想要本地運行
- 想要自訂工具
- 遇到部署問題時

**何時修改**：
- 更新部署流程
- 添加新的部署方式
- 記錄已知問題

#### 6. TEST.md（25KB）
**用途**：完整的測試和驗證指南

**包含的部分**：
- 測試環境設置
- 瀏覽器相容性表
- 10 類測試場景
- 邊界條件說明
- 性能基準
- 自動化測試建議

**何時查看**：
- 想要完整測試工具
- 報告錯誤時
- 修改代碼後驗證
- 確保品質時

**何時修改**：
- 添加新功能時更新測試
- 發現並修複錯誤時更新
- 改進測試覆蓋率時

#### 7. .gitignore
**用途**：Git 忽略文件規則

**包含內容**：
- OS 特定文件（.DS_Store 等）
- IDE 文件（.vscode, .idea 等）
- Node modules（如果使用）
- 編譯輸出
- 臨時文件
- 備份文件

**何時修改**：
- 添加新的開發工具
- 更改構建系統
- 添加新的輸出目錄

## 📊 文件大小總結

| 文件 | 大小 | 說明 |
|------|------|------|
| index.html | ~8KB | HTML 結構 |
| styles.css | ~12KB | 樣式表 |
| app.js | ~35KB | 應用邏輯 |
| README.md | ~20KB | 使用文檔 |
| DEPLOY.md | ~15KB | 部署指南 |
| TEST.md | ~25KB | 測試指南 |
| 外部依賴 (CDN) | ~45KB | JSZip + FileSaver |
| **總計** | **~160KB** | 全部下載 |

## 🔗 外部依賴

### CDN 連結

所有外部資源都通過 CDN 加載，無需手動安裝：

```html
<!-- JSZip - 用於生成 ZIP -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>

<!-- FileSaver - 用於下載文件 -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js"></script>
```

### 為什麼選擇這些庫？

| 庫 | 大小 | 選擇理由 |
|----|------|--------|
| JSZip | ~35KB | 無瀏覽器原生 ZIP API；JSZip 是事實標準 |
| FileSaver | ~5KB | 跨瀏覽器兼容性；支持大文件下載 |

### 替代方案

如果想要零外部依賴：
1. 使用 `<a>` 標籤逐個下載 Markdown 文件
2. 犧牲 ZIP 功能
3. 內置簡單的 ZIP 生成（但會大幅增加代碼）

## 🛠️ 開發工作流

### 本地開發

```bash
# 1. 克隆項目
git clone https://github.com/您的用戶名/endnote-to-obsidian.git
cd endnote-to-obsidian

# 2. 啟動本地服務器
python -m http.server 8000
# 或使用其他方法（見 DEPLOY.md）

# 3. 訪問 http://localhost:8000

# 4. 修改檔案

# 5. 測試（在瀏覽器中刷新）

# 6. 提交
git add .
git commit -m "說明改動"
git push
```

### 添加新功能

1. 在 `app.js` 中添加邏輯
2. 在 `index.html` 中添加 UI（如需要）
3. 在 `styles.css` 中添加樣式
4. 在 `TEST.md` 中添加測試用例
5. 在 `README.md` 中更新文檔

### 修複錯誤

1. 重現錯誤並記錄步驟
2. 在 `app.js` 中定位和修複
3. 在 `TEST.md` 中添加測試用例以防止回歸
4. 更新 `README.md` 的常見問題部分（如需要）

## 📈 維護和更新

### 定期維護任務

- [ ] 檢查依賴庫的最新版本
- [ ] 測試新瀏覽器版本
- [ ] 驗證 GitHub Pages 部署
- [ ] 清理和優化代碼
- [ ] 更新文檔

### 版本管理

建議使用語義版本控制：
- `v1.0` - 初始發布
- `v1.1` - 修複 bug
- `v2.0` - 新功能或重大改動

### 發布過程

1. 確保所有測試通過（見 TEST.md）
2. 更新 `README.md` 中的版本號
3. 創建 Git 標籤：`git tag v1.1`
4. 推送標籤：`git push origin v1.1`
5. 創建 GitHub Release（可選）

## 🔒 安全檢查清單

部署前檢查：

- [ ] 無 API key 或敏感信息在代碼中
- [ ] 無後端依賴或資料庫連接
- [ ] 無遠程代碼執行風險
- [ ] 無會話或身份驗證漏洞
- [ ] HTTPS 已啟用（GitHub Pages 默認）
- [ ] 依賴庫來自官方 CDN
- [ ] 無過時或已知漏洞的依賴

## 📞 故障排查檢查清單

**工具無法加載**：
- [ ] 檢查所有檔案是否上傳
- [ ] 檢查瀏覽器控制台錯誤（F12）
- [ ] 檢查 CDN 是否可訪問
- [ ] 嘗試隱私窗口（清除快取）

**XML 無法解析**：
- [ ] 確認檔案格式是 XML
- [ ] 確認檔案來自 EndNote
- [ ] 檢查檔案是否損壞
- [ ] 嘗試重新匯出

**下載失敗**：
- [ ] 檢查瀏覽器快取
- [ ] 確認有足夠的磁碟空間
- [ ] 嘗試另一個瀏覽器
- [ ] 檢查 JavaScript 是否啟用

**Obsidian 無法識別**：
- [ ] 確認檔案是 UTF-8 編碼
- [ ] 驗證 YAML frontmatter 格式
- [ ] 檢查 Obsidian 設定
- [ ] 重新加載 Vault

## 🎓 學習資源

### 相關技術

- [HTML5 文檔](https://html.spec.whatwg.org/)
- [CSS 指南](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [JavaScript 指南](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [XML 規範](https://www.w3.org/XML/)
- [YAML 語法](https://yaml.org/)
- [Git 教程](https://git-scm.com/doc)

### 相關工具

- [Obsidian 文檔](https://help.obsidian.md/)
- [EndNote 官網](https://endnote.com/)
- [GitHub Pages 文檔](https://docs.github.com/en/pages)
- [JSZip 文檔](https://stuk.github.io/jszip/)
- [FileSaver 文檔](https://github.com/eligrey/FileSaver.js)

## 📝 變更日誌

### v1.0（初始版本）
- ✅ XML 解析和轉換
- ✅ Markdown 和 YAML frontmatter 生成
- ✅ ZIP 匯出和報告生成
- ✅ 統計和警告信息
- ✅ 響應式設計
- ✅ 中文和 UTF-8 支持

### 計劃的功能（v2.0+）
- ⏳ 深色模式
- ⏳ 批量操作
- ⏳ 自訂 Markdown 模板
- ⏳ 預覽個別記錄
- ⏳ 撤銷/重做功能
- ⏳ 離線支持（Service Worker）
- ⏳ 拖放排序
- ⏳ 高級過濾和搜索

## 📞 支持和反饋

### 報告問題

如發現問題，請提供：
1. 瀏覽器和版本
2. 操作系統
3. 重現步驟
4. 預期和實際結果
5. 瀏覽器控制台錯誤信息

### 建議改進

歡迎任何改進建議，特別是：
- UI/UX 改進
- 性能優化
- 新功能請求
- 文檔改進
- 本地化支持

## 📜 授權

本項目採用 MIT 授權。詳見 LICENSE 文件。

---

**感謝使用 EndNote to Obsidian Converter！**

有任何問題，請參考相關文檔或提出 GitHub Issue。
