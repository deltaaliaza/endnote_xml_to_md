# 🔄 MD 結構改進總結

## 改變概述

已根據您的需求改進了工具生成的 Markdown 結構，使其支持 **Obsidian 文獻矩陣**和**研究缺口分析**。

---

## 核心改變

### 從簡單模板 → 結構化分析框架

**舊結構：**
```
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

**新結構（帶層級和子項目）：**
```
My Notes

----

AI Summary

Research Question
  ├─ Main RQ
  └─ Sub-questions

Method
  ├─ Research Design
  ├─ Sample/Data
  └─ Analysis Approach

Key Findings
  ├─ Finding 1
  ├─ Finding 2
  └─ Finding 3

Limitations
  ├─ Methodological
  └─ Contextual

Concepts
  ├─ Core Concepts [[[]]標記]
  ├─ Related Theory [[[]]標記]
  └─ Key Terms

Issues
  ├─ Tensions/Contradictions [[[]]標記]
  ├─ Unresolved Questions [[[]]標記]
  └─ Methodological Concerns

Gaps
  ├─ Knowledge Gaps [[[]]標記]
  ├─ Empirical Gaps
  └─ Theoretical Gaps [[[]]標記]

Cross-References
  ├─ Related Papers [[[]]標記]
  └─ Future Research Directions
```

---

## 🎯 改進的特點

### 1. 層級結構清晰
- 使用 `###` 子標題組織內容
- 每個主要部分都有明確的子類別
- 便於快速導航和定位

### 2. Obsidian 內部連結支持
- 在 `Concepts`、`Issues`、`Gaps`、`Related Papers` 中使用 `[[]]` 格式
- 自動建立論文之間的連接
- 支持圖譜視圖展示知識網絡

### 3. 結構化內容便於比較
- 相同的子標題使跨論文比較變得容易
- 便於提取建立對比表格
- 支持文獻矩陣的自動生成

### 4. 明確區分概念類型
- Core Concepts vs Related Theory vs Key Terms
- Knowledge Gaps vs Empirical Gaps vs Theoretical Gaps
- 便於不同角度的分析

---

## 📊 新結構如何支持文獻矩陣

### 1. 研究問題比較
```
論文 A → Main RQ: ?
論文 B → Main RQ: ?
論文 C → Main RQ: ?
→ 快速識別相似/相異的研究焦點
```

### 2. 方法論比較
```
論文 A → Research Design: Qualitative
論文 B → Research Design: Mixed Methods
論文 C → Research Design: Quantitative
→ 建立方法論多樣性矩陣
```

### 3. 概念網絡構建
```
[[Concept A]] → 出現在論文 1, 2, 5
[[Concept B]] → 出現在論文 2, 3, 4
→ 圖譜視圖自動顯示概念連接
```

### 4. 缺口跟踪
```
Knowledge Gap 1 → 由論文 A, C, E 提及
Knowledge Gap 2 → 由論文 B, D 提及
→ 優先級排序和頻率分析
```

---

## 🤖 配套資源

已創建以下文件以支持新結構的使用：

### 1. AI_PROMPT_TEMPLATES.md
包含 6 個 AI Prompt 模板：
- **Prompt 1**: 分析研究缺口
- **Prompt 2**: 建立概念聯繫
- **Prompt 3**: 識別研究張力
- **Prompt 4**: 建立文獻矩陣
- **Prompt 5**: 標記 Obsidian 連結
- **Prompt 6**: 生成搜索查詢

### 2. OBSIDIAN_MATRIX_WORKFLOW.md
完整的工作流指南：
- 新結構的詳細說明
- 在 Obsidian 中建立矩陣的步驟
- 進階技巧和最佳實踐
- 推薦的文件夾結構

### 3. SAMPLE_NEW_STRUCTURE.md
完整的範例論文筆記：
- 展示新結構的實際應用
- 所有部分都有具體內容
- 可作為參考模板

---

## 🔄 如何使用

### 步驟 1：生成 MD 檔
使用更新後的工具上傳 EndNote XML，生成新結構的 `.md` 檔

### 步驟 2：在 Obsidian 中整理
1. 將多個 `.md` 檔導入 Obsidian
2. 創建 `Literature Matrix` 中心筆記
3. 使用 `[[]]` 連結建立網絡

### 步驟 3：使用 AI Prompt
根據分析需求選擇合適的 prompt，協助填充各部分內容

### 步驟 4：構建矩陣
使用表格或圖譜視圖比較多篇論文

### 步驟 5：識別缺口
根據 Gaps 和 Issues 部分識別研究機會

---

## 📝 修改的代碼

### app.js - generateMarkdown() 方法
```javascript
// 從簡單的純文本段落標示
// 改為具有層級結構的 Markdown
// 包含子標題、列表項和內部連結預留位置
```

具體改變：
- 添加了 `##` 二級標題
- 添加了 `###` 三級標題用於子分類
- 在關鍵位置添加了 `[[]]` 佔位符
- 保持了 YAML frontmatter 的空行格式

---

## ✅ 驗證清單

確保新結構正確使用：

- [ ] 每個部分都有適當的子標題
- [ ] Concepts、Issues、Gaps、Related Papers 中使用 `[[]]` 格式
- [ ] 所有列表項都有佔位符便於填寫
- [ ] YAML frontmatter 在各字段間有空行
- [ ] 可以在 Obsidian 中正確識別
- [ ] 圖譜視圖能正確顯示連接

---

## 💡 使用建議

### 對於初次使用者
1. 參考 `SAMPLE_NEW_STRUCTURE.md` 了解格式
2. 遵循 `OBSIDIAN_MATRIX_WORKFLOW.md` 的步驟
3. 逐步填充各部分內容

### 對於進階使用者
1. 使用 AI Prompt 模板自動化內容生成
2. 建立複雜的文獻矩陣
3. 使用圖譜視圖進行視覺分析

### 對於大規模文獻回顧
1. 收集 20+ 篇相關論文
2. 統一概念術語
3. 建立中心矩陣筆記
4. 定期更新和優化

---

## 🎓 在文獻回顧中的應用

### 第 1 週：檔案準備
- 將 20 篇論文轉換為 `.md`
- 導入 Obsidian

### 第 2-3 週：內容填充
- 使用 AI Prompts 填充各部分
- 添加 `[[]]` 連結

### 第 4 週：矩陣構建
- 創建中心矩陣筆記
- 生成對比表格

### 第 5 週：缺口分析
- 整理所有 Gaps 部分
- 優先級排序
- 識別自己的研究方向

---

## 📞 支持文件

| 文件 | 內容 |
|------|------|
| **AI_PROMPT_TEMPLATES.md** | 6 個 AI 分析提示 |
| **OBSIDIAN_MATRIX_WORKFLOW.md** | 完整工作流指南 |
| **SAMPLE_NEW_STRUCTURE.md** | 完整範例論文 |
| **app.js** | 更新的生成邏輯 |

---

## 🚀 後續計劃

未來可能的增強：
- [ ] 自動從 PDF 提取摘要
- [ ] Obsidian 外掛整合
- [ ] 矩陣自動生成
- [ ] 缺口優先級自動排序
- [ ] 多語言支持

---

**結論：** 新結構將工具從簡單的格式轉換器升級為**文獻分析和研究規劃工具**，特別適合進行文獻回顧和識別研究缺口。

---

**準備好了嗎？** 開始使用新結構，在 Obsidian 中建立您的文獻矩陣！
