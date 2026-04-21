# 部署指南

## 快速部署到 GitHub Pages

### 前置要求
- GitHub 帳戶
- 基本的 Git 知識（或使用 GitHub Web 介面）

### 方案 A：使用 GitHub Web 介面（推薦新手）

#### 步驟 1：準備檔案
1. 在您的電腦上創建一個資料夾，例如 `endnote-to-obsidian`
2. 將以下檔案放入該資料夾：
   - `index.html`
   - `styles.css`
   - `app.js`
   - `README.md`
   - `.gitignore`

#### 步驟 2：建立 GitHub Repository
1. 訪問 https://github.com/new
2. Repository name: `endnote-to-obsidian`（或其他名稱）
3. Description: 「EndNote XML to Obsidian Markdown Converter」（可選）
4. 選擇 **Public**（如果想公開分享）或 **Private**（個人使用）
5. 點選 **Create repository**

#### 步驟 3：上傳檔案到 GitHub
1. 在新建的 Repository 頁面，點選 **Add file** → **Upload files**
2. 選擇您準備的所有檔案（或拖曳上傳）
3. 在底部填寫 commit message，例如 「Initial commit」
4. 點選 **Commit changes**

#### 步驟 4：啟用 GitHub Pages
1. 進入 Repository 的 **Settings**
2. 找到左側菜單中的 **Pages**
3. 在 **Source** 選項中：
   - 選擇分支：`main`
   - 選擇資料夾：`/ (root)`
4. 點選 **Save**
5. GitHub 會開始部署，通常需要 1-2 分鐘

#### 步驟 5：訪問您的工具
- 部署完成後，您會看到 GitHub Pages 的 URL
- 通常格式為：`https://您的用戶名.github.io/endnote-to-obsidian/`
- 複製此 URL 到瀏覽器訪問

### 方案 B：使用 Git 命令行（適合開發者）

```bash
# 1. 克隆空 repository
git clone https://github.com/您的用戶名/endnote-to-obsidian.git
cd endnote-to-obsidian

# 2. 複製檔案到資料夾
# 複製 index.html, styles.css, app.js, README.md

# 3. 添加檔案
git add .

# 4. 提交
git commit -m "Initial commit: Add EndNote to Obsidian converter"

# 5. 推送到 GitHub
git push -u origin main

# 6. 在 GitHub Web 上啟用 Pages（同方案 A 第 4-5 步）
```

### 方案 C：本地運行（無需部署）

如果您只想在本地電腦上使用，無需上傳到 GitHub：

#### 方式 1：直接開啟
1. 將 `index.html`、`styles.css`、`app.js` 放在同一個資料夾
2. 在瀏覽器中打開 `index.html`
3. 開始使用

#### 方式 2：使用本地 Web 伺服器

如果遇到 CORS 或其他問題，建議使用本地 Web 伺服器。

**使用 Python：**
```bash
# Python 3
python -m http.server 8000

# 然後訪問 http://localhost:8000
```

**使用 Node.js：**
```bash
# 安裝 http-server
npm install -g http-server

# 運行
http-server

# 訪問顯示的 URL
```

**使用 VS Code Live Server 外掛：**
1. 在 VS Code 中安裝 Live Server 外掛
2. 右鍵點選 `index.html`
3. 選擇 **Open with Live Server**

## 檔案結構說明

```
endnote-to-obsidian/
├── index.html          # 主 HTML 檔案
├── styles.css          # 樣式表
├── app.js              # 主應用邏輯
├── README.md           # 使用文檔
├── DEPLOY.md           # 部署說明（本檔案）
└── .gitignore          # Git 忽略檔案
```

### 各檔案的作用

| 檔案 | 大小 | 說明 |
|------|------|------|
| index.html | ~8KB | HTML 結構和 UI 佈局 |
| styles.css | ~12KB | 樣式表，包含響應式設計 |
| app.js | ~35KB | 核心邏輯：XML 解析、Markdown 生成 |
| README.md | ~20KB | 詳細的使用文檔 |

## 自訂和擴展

### 修改工具標題和描述

編輯 `index.html` 第 7 行：
```html
<title>EndNote XML → Obsidian Markdown 轉換工具</title>
```

編輯 `index.html` 第 29-30 行：
```html
<h1>📚 EndNote XML → Obsidian Markdown 轉換工具</h1>
<p class="subtitle">將 EndNote 文獻庫轉換為 Obsidian 可用的 Markdown 檔案</p>
```

### 修改顏色主題

編輯 `styles.css` 的 `:root` 部分（第 10-22 行）：
```css
:root {
    --primary-color: #2563eb;      /* 主色調 */
    --primary-hover: #1d4ed8;      /* 懸停色 */
    --success-color: #10b981;      /* 成功色 */
    --warning-color: #f59e0b;      /* 警告色 */
    --error-color: #ef4444;        /* 錯誤色 */
    /* 其他顏色... */
}
```

### 修改 Markdown 輸出格式

編輯 `app.js` 中的 `generateMarkdown` 方法（約第 400 行）。

## 常見部署問題

### Q: 頁面無法加載
**A:** 檢查：
- 所有檔案是否都上傳到了 GitHub
- `.github/workflows` 中是否有部署設定
- GitHub Pages 是否已啟用

### Q: CSS 和 JS 無法加載
**A:** 這通常是因為：
1. 檔案沒有上傳
2. 路徑不正確
3. GitHub 的快取問題

**解決方案：**
- 清空瀏覽器快取（Ctrl+Shift+Delete）
- 使用隐私窗口（Incognito）重新訪問

### Q: URL 無法訪問
**A:** 如果您的 repository 名稱不是根目錄，URL 應該是：
```
https://您的用戶名.github.io/repository名稱/
```

檢查 GitHub 的 Pages 設定頁面，它會顯示準確的 URL。

### Q: 上傳大檔案時出錯
**A:** GitHub 有檔案大小限制。但本工具的檔案都很小，不會有此問題。

### Q: 想要自訂網域名稱
**A:** 在 GitHub Pages 設定中：
1. 進入 Repository 的 **Settings** → **Pages**
2. 在 **Custom domain** 欄位輸入您的網域
3. 按照提示更新 DNS 記錄

詳見：https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site

## 更新工具

### 如果您想更新工具（修復 bug 或添加功能）

**使用 Web 介面：**
1. 進入 GitHub repository
2. 點選要修改的檔案
3. 點選編輯按鈕（鉛筆圖標）
4. 修改內容
5. 點選 **Commit changes**

**使用 Git 命令：**
```bash
# 1. 進入本地資料夾
cd endnote-to-obsidian

# 2. 修改檔案

# 3. 提交更改
git add .
git commit -m "描述您的改動"
git push
```

更改會在 1-2 分鐘內自動部署到 GitHub Pages。

## 備份和版本控制

### 建議的工作流

1. **本地開發**
   - 在本地電腦上修改檔案
   - 用本地 Web 伺服器測試

2. **上傳到 GitHub**
   - 定期推送更改
   - 為每次重要更新創建 commit

3. **部署到 GitHub Pages**
   - GitHub 會自動從 main 分支部署
   - 無需額外操作

### 創建版本

```bash
# 創建版本標籤
git tag v1.0
git push origin v1.0

# 查看所有版本
git tag -l
```

## 性能優化

當前工具已經非常輕量：
- HTML：~8KB
- CSS：~12KB
- JavaScript：~35KB
- 外部依賴通過 CDN：JSZip (~35KB)、FileSaver (~5KB)

### 進一步優化的選項

1. **縮小代碼**
   - 使用 UglifyJS 或 Terser 縮小 JavaScript
   - 使用 cssnano 縮小 CSS

2. **啟用 Gzip 壓縮**
   - GitHub Pages 默認啟用

3. **使用 Service Worker**
   - 實現離線功能（高級）

## 安全考慮

由於工具是純前端，沒有後端和資料庫，安全性風險很低。但仍有以下建議：

1. **定期更新依賴**
   - 檢查 JSZip 和 FileSaver 的最新版本
   - 更新 CDN 連結中的版本號

2. **驗證 XML 輸入**
   - 工具已包含基本的 XML 解析驗證
   - 不會執行任何指令碼

3. **HTTPS**
   - GitHub Pages 默認使用 HTTPS
   - 如果使用自訂網域，需要設定 HTTPS

## 故障排查清單

如果遇到問題，逐一檢查：

- [ ] 所有檔案都上傳到了 GitHub
- [ ] GitHub Pages 已啟用
- [ ] 瀏覽器快取已清空
- [ ] 使用隐私窗口重試
- [ ] 檢查瀏覽器控制台是否有錯誤（F12）
- [ ] 確認 URL 正確
- [ ] 嘗試另一個瀏覽器
- [ ] 檢查 XML 檔案格式是否正確

## 技術支持

如有問題，可以：

1. **檢查本文檔的故障排查部分**
2. **查看 README.md 中的常見問題**
3. **在 GitHub 提出 Issue**（如果適用）
4. **查看瀏覽器控制台的錯誤信息**（F12 → Console）

## 相關資源

- [GitHub Pages 文檔](https://docs.github.com/en/pages)
- [Git 教程](https://git-scm.com/book/zh/v2)
- [Markdown 語法](https://www.markdownguide.org/)
- [Obsidian 官方文檔](https://help.obsidian.md/)
- [YAML 語法](https://yaml.org/)

---

祝部署順利！如有任何問題，請參考上述資源或提出 Issue。
