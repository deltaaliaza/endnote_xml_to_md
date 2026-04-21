# Markdown 輸出格式修正說明

## 修改概述

已修正 `app.js` 中的 Markdown 輸出邏輯，使生成的 `.md` 檔案更適合在 Obsidian 中作為 paper note 使用。

---

## 修改的重點

### 1. YAML Frontmatter 格式化（`toYAML` 方法）

**改進內容：**
- ✅ 所有字符串值一律加雙引號
- ✅ 所有數組元素一律加雙引號
- ✅ 字段順序固定為：`type` → `title` → `authors` → ... → `source`
- ✅ 不輸出 `null`、`undefined`、空字符串
- ✅ 正確轉義特殊字符（反斜杠、雙引號、換行符）
- ✅ 空陣列保持 `[]` 格式

**範例：**
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

### 2. Markdown 正文結構（`generateMarkdown` 方法）

**改進內容：**
- ✅ 使用 `##` 作為標題層級（而不是 `#`）
- ✅ 固定 8 個章節結構
- ✅ Abstract 和 Notes 填入 XML 原有內容
- ✅ 其他章節預設留空（不自動填充）
- ✅ frontmatter 後空一行再開始正文

**正文結構：**
```markdown
---
[YAML frontmatter]
---

## Abstract
[XML abstract 或空]

## Notes
[XML notes，經過排版改善 或空]

## AI Summary
[預留，內容為空]

## Research Question
[預留，內容為空]

## Method
[預留，內容為空]

## Key Findings
[預留，內容為空]

## Limitations
[預留，內容為空]

## My Notes
[預留，內容為空]
```

### 3. Notes 排版改善（新增 `formatNotes` 方法）

**改進內容：**
- ✅ 保留原有的換行符
- ✅ 規範化 Windows (`\r\n`)、Mac (`\r`)、Unix (`\n`) 的換行
- ✅ 移除多個連續空白行（合並為單行）
- ✅ 移除開頭和結尾的多餘空白
- ✅ 保持內容的可讀性，不做過度整理

**目的：** 讓從 EndNote 提取的 notes 在 Obsidian 中看起來乾淨、有序，而不是雜亂堆砌。

---

## 修改的文件

### `app.js`

修改了以下方法：

1. **`toYAML(data)` 方法** （約 380-430 行）
   - 重寫整個方法以符合嚴格 YAML 格式
   - 確保所有字符串加雙引號
   - 固定字段順序
   - 正確轉義特殊字符

2. **`generateMarkdown(record, filename)` 方法** （約 480-540 行）
   - 改進 Markdown 正文結構
   - 調用新的 `formatNotes` 方法
   - 使用 `##` 標題層級
   - 固定 8 個章節

3. **`formatNotes(notes)` 方法** （新增，約 540-560 行）
   - 新增方法用於改善 Notes 的排版
   - 規範化換行符
   - 移除多餘空白

---

## 使用效果

### 修改前
```markdown
---
type: paper
title: Some Title
authors:
  - Author1
  - Author2
year: 2021
...
---

## Abstract
[abstract text]
...
```

### 修改後
```markdown
---
type: "paper"
title: "Some Title"
authors:
  - "Author1"
  - "Author2"
year: 2021
journal: "Journal Name"
doi: "10.xxxx/xxxxx"
...
---

## Abstract
[abstract text]

## Notes
[notes, properly formatted]

## AI Summary

## Research Question

## Method

## Key Findings

## Limitations

## My Notes
```

---

## 向後相容性

✅ **不影響現有功能：**
- XML 解析邏輯未改變
- 檔案名生成邏輯未改變
- ZIP 打包邏輯未改變
- 統計和警告系統未改變
- 只修改了輸出格式

✅ **可直接替換：**
- 直接用新的 `app.js` 替換舊版本
- 無需修改 HTML 或 CSS
- 無需更新任何配置

---

## 測試建議

使用提供的 `My_EndNote_Library_20260211_3.xml` 測試檔案：

1. 上傳 XML 檔案
2. 查看預覽中的 Markdown 輸出
3. 驗證以下項目：
   - [ ] YAML 格式嚴謹（所有字符串有雙引號）
   - [ ] 字段順序正確
   - [ ] Abstract 和 Notes 有內容（如 XML 中存在）
   - [ ] 其他章節為空
   - [ ] Notes 排版乾淨
   - [ ] Obsidian 可正確識別 frontmatter
   - [ ] 看起來像一份可持續補寫的 paper note

---

## 更新說明

### 若要在 Obsidian 中使用

1. 用新版本工具重新轉換 XML
2. 下載新的 ZIP 檔案
3. 解壓到 Obsidian Vault
4. 打開檔案驗證格式

新生成的 `.md` 檔案應該：
- ✅ Frontmatter 完全嚴格 YAML 格式
- ✅ 在 Obsidian Properties 中顯示正確
- ✅ 看起來像一份專業的研究筆記範本
- ✅ 每個空白章節都可逐步補寫

---

## 常見問題

**Q: 為什麼 year 沒有引號？**
A: 數字類型在 YAML 中不需要引號。year 被解析為整數存儲。

**Q: 為什麼字段順序這麼嚴格？**
A: 為了提高可讀性和一致性。也便於未來在 Obsidian 中用 Dataview 查詢。

**Q: Notes 排版改善會改變內容嗎？**
A: 不會。只是規範化換行符和移除多餘空白，保留所有實際內容。

**Q: 可以自訂章節名稱嗎？**
A: 可以修改 `generateMarkdown` 方法中的 `sections` 陣列，但不建議改動，以保持一致性。

---

## 總結

這次修正使輸出的 `.md` 檔案：
1. ✅ YAML frontmatter 更嚴謹規範
2. ✅ Markdown 結構更清晰一致
3. ✅ Notes 內容排版更乾淨可讀
4. ✅ 在 Obsidian 中看起來更專業
5. ✅ 便於後續逐步補寫研究筆記

不影響：
- 檔案名生成
- XML 解析
- 統計功能
- ZIP 打包

可直接替換現有 `app.js` 使用。
