# 📊 新 MD 結構與 Obsidian 文獻矩陣工作流

## 📝 新的 Markdown 結構

工具現在生成的 `.md` 檔案包含**結構化的子標題和列表項**，便於在 Obsidian 中建立文獻矩陣和研究缺口分析。

---

## 🔧 結構明細

### 1. My Notes（個人筆記）
```markdown
## My Notes

[用戶個人想法、旁註、提示要點]
```

---

### 2. AI Summary（摘要）
```markdown
## AI Summary

[用 AI 生成的論文摘要 - 用普通段落文字，無特定格式]
```

---

### 3. Research Question（研究問題）
```markdown
## Research Question

### Main RQ
- [主要研究問題]

### Sub-questions
- [子問題 1]
- [子問題 2]
```

**在 Obsidian 中的用途：**
- 用於比較不同論文的研究焦點
- 識別相似或相關的研究問題
- 發現未被回答的問題（研究缺口）

---

### 4. Method（方法）
```markdown
## Method

### Research Design
- [研究設計類型：定性、定量、混合等]

### Sample/Data
- [樣本規模、來源、背景等]

### Analysis Approach
- [分析方法、編碼、統計方法等]
```

**在 Obsidian 中的用途：**
- 比較不同研究的方法論
- 識別哪些方法被頻繁使用
- 發現方法論缺口

---

### 5. Key Findings（主要發現）
```markdown
## Key Findings

### Finding 1
- [發現描述，可包含關鍵數據或結論]

### Finding 2
- [發現描述]

### Finding 3
- [發現描述]
```

**在 Obsidian 中的用途：**
- 跨多篇論文比較發現
- 識別一致性或衝突的結果
- 發現實證缺口

---

### 6. Limitations（局限）
```markdown
## Limitations

### Methodological
- [方法論上的局限]

### Contextual
- [背景/適用範圍上的局限]
```

**在 Obsidian 中的用途：**
- 理解每篇論文的適用範圍
- 識別為什麼需要後續研究

---

### 7. Concepts（概念）
```markdown
## Concepts

### Core Concepts
- [[Concept Name 1]]
- [[Concept Name 2]]
- [[Concept Name 3]]

### Related Theory
- [[Theory Name 1]]
- [[Theory Name 2]]

### Key Terms
- [術語 1]：定義
- [術語 2]：定義
```

**在 Obsidian 中的用途：**
- 用 [[]] 內部連結建立概念網絡
- 回溯哪些論文使用了相同概念
- 建立概念間的關係圖

---

### 8. Issues（議題/張力）
```markdown
## Issues

### Tensions/Contradictions
- [[Issue Name 1]]
- [[Issue Name 2]]

### Unresolved Questions
- [[Question Topic 1]]
- [[Question Topic 2]]

### Methodological Concerns
- [關注點 1]
- [關注點 2]
```

**在 Obsidian 中的用途：**
- 識別領域內存在的爭議或未解決問題
- 用 [[]] 連結到相關議題筆記
- 發現需要深入研究的矛盾點

---

### 9. Gaps（研究缺口）
```markdown
## Gaps

### Knowledge Gaps
- [[Gap Topic 1]]
- [[Gap Topic 2]]

### Empirical Gaps
- [缺口 1]
- [缺口 2]

### Theoretical Gaps
- [[Theory Gap 1]]
- [[Theory Gap 2]]
```

**在 Obsidian 中的用途：**
- 直接識別該論文認為的研究缺口
- 用 [[]] 連結到相關缺口主題筆記
- 這是識別自己研究方向的關鍵資訊

---

### 10. Cross-References（交叉參考）
```markdown
## Cross-References

### Related Papers
- [[Related Paper Title]]
- [[Related Paper Title]]

### Future Research Directions
- [該論文暗示的未來方向]
```

**在 Obsidian 中的用途：**
- 用 [[]] 連結到其他論文筆記
- 追踪文獻之間的引用關係
- 自動建立文獻圖譜

---

## 🎯 在 Obsidian 中建立文獻矩陣

### 步驟 1：準備基礎
1. 將多篇論文的 `.md` 檔導入 Obsidian
2. 每篇論文都遵循上述結構
3. 使用相同的概念術語（保持一致性）

### 步驟 2：建立中心筆記
創建 `Literature Review` 或 `Literature Matrix` 筆記：

```markdown
# Literature Review - [主題]

## Included Papers
- [[Paper 1 Title]]
- [[Paper 2 Title]]
- [[Paper 3 Title]]

## Research Questions Across Papers
| Paper | Main RQ | Sub-questions |
|-------|---------|---------------|
| [[Paper 1]] | ? | ?, ? |
| [[Paper 2]] | ? | ?, ? |

## Methodology Comparison
| Paper | Design | Sample | Analysis |
|-------|--------|--------|----------|
| [[Paper 1]] | Qualitative | 20 interviews | Thematic |
| [[Paper 2]] | Quantitative | 500 surveys | Statistical |

## Key Findings Synthesis
### Finding Type A
- [[Paper 1]]: Finding description
- [[Paper 2]]: Similar/Different finding

## Concepts Network
### Core Concept 1 [[Concept]]
- Used in: [[Paper 1]], [[Paper 2]], [[Paper 3]]
- Definition: ...
- Relationships: [[Related Concept]]

## Research Gaps Summary
### Knowledge Gap 1
- Identified by: [[Paper 1]], [[Paper 2]]
- Potential research direction: ...

### Empirical Gap 1
- Context not studied: ...
- Suggestion: Future studies should explore...
```

### 步驟 3：使用 Obsidian 功能

#### 圖譜視圖（Graph View）
- 打開圖譜視圖，視覺化所有論文、概念、缺口的連接
- 用顏色標籤區分（如 #paper, #concept, #gap）
- 識別最多被連結的概念（這些是領域核心）

#### 回溯鏈接（Backlinks）
- 打開任何概念筆記（如 [[Learner-centered pedagogy]]）
- 在「回溯鏈接」面板中看到所有提及此概念的論文
- 快速比較不同論文如何理解同一概念

#### 標籤系統
在 frontmatter 中添加標籤：
```yaml
tags: [literature-review, MOOC, learner-centered, research-gap-identified]
```

然後可以通過標籤過濾論文。

#### 搜尋功能
- 搜尋 `## Gaps` 找出所有提及的研究缺口
- 搜尋 `### Knowledge Gaps` 專門找知識缺口

---

## 📊 文獻矩陣範例

使用新結構後，您可以快速生成這樣的矩陣：

### 研究方法比較矩陣
```
論文 | 設計 | 樣本規模 | 領域 | 分析方法
----|-----|--------|------|--------
Paper A | Qualitative | 11 participants | MOOC | Thematic Analysis
Paper B | Mixed | 500 students | Online Learning | Statistics + Interviews
Paper C | Quantitative | 1200 surveys | Pedagogy | Regression Analysis
```

### 概念使用矩陣
```
概念 | Paper A | Paper B | Paper C | 定義一致性
-----|--------|--------|--------|----------
[[Facilitation]] | ✓ 核心 | ✓ 邊緣 | ✗ | 部分一致
[[Learner agency]] | ✓ | ✓ 核心 | ✓ | 一致
[[Autonomy]] | ✓ | ✓ | ✓ 核心 | 一致
```

### 研究缺口矩陣
```
缺口類型 | 論文 A | 論文 B | 論文 C | 頻率
--------|--------|--------|--------|-----
Student experience | ✓ | ✗ | ✓ | 中等
Cross-cultural | ✓ | ✓ | ✗ | 高
Long-term impact | ✓ | ✓ | ✓ | 高
```

---

## 💡 進階技巧

### 1. 概念去重複
如果多篇論文使用不同名稱表示同一概念：
- 創建 `[[Concept Name - Main]]` 筆記
- 在其他變體中添加重定向（使用 `---` 和 alias）

### 2. 缺口優先級排序
在中心筆記中為缺口排序：
```markdown
## Research Gaps (Priority Order)

### 🔴 High Priority (mentioned by 3+ papers)
- [[Gap 1]]
- [[Gap 2]]

### 🟡 Medium Priority (mentioned by 2 papers)
- [[Gap 3]]

### 🟢 Low Priority (mentioned by 1 paper)
- [[Gap 4]]
```

### 3. 時間演進追踪
按年份組織論文，追踪概念如何演變：
```markdown
## Concept Evolution: [[Facilitation]]

2010-2015:
- [[Paper A - 2012]]: Definition 1
- [[Paper B - 2015]]: Definition 2

2015-2020:
- [[Paper C - 2018]]: Definition 3 (evolved from 2)
- [[Paper D - 2020]]: Definition 4 (synthesis)
```

### 4. 理論框架對比
識別論文使用的不同理論框架：
```markdown
## Theoretical Frameworks

### Framework A: [[TAM - Technology Acceptance Model]]
- Used by: [[Paper A]], [[Paper B]]
- Strengths: ...
- Limitations: ...

### Framework B: [[Situated Learning Theory]]
- Used by: [[Paper C]]
- Strengths: ...
- Limitations: ...

### Framework C: [[Constructivist Learning]]
- Used by: [[Paper D]], [[Paper E]]
- How it differs from A: ...
```

---

## 🔗 推薦的文件夾結構

```
Obsidian Vault/
├── Literature Review/
│   ├── Literature Matrix.md (中心筆記)
│   ├── Papers/
│   │   ├── Paper 1 - Title.md
│   │   ├── Paper 2 - Title.md
│   │   └── ...
│   ├── Concepts/
│   │   ├── Learner-centered pedagogy.md
│   │   ├── MOOCs.md
│   │   └── ...
│   ├── Research Gaps/
│   │   ├── Gap 1 - Topic.md
│   │   ├── Gap 2 - Topic.md
│   │   └── ...
│   └── Issues/
│       ├── Issue 1 - Tension.md
│       ├── Issue 2 - Question.md
│       └── ...
```

---

## ✅ 檢查清單

使用新結構時，確認：

- [ ] 每篇論文都有完整的 10 個部分
- [ ] 所有概念名稱在論文間保持一致
- [ ] 用 [[]] 格式標記所有核心概念、缺口、議題
- [ ] 在 Concepts 和 Issues 中充分使用內部連結
- [ ] 有中心的 Literature Matrix 筆記
- [ ] 定期檢查圖譜視圖，確保連結結構清晰
- [ ] 使用 AI Prompt 模板來豐富各個部分的內容

---

**建議：** 開始時可能需要手動調整前 2-3 篇論文的結構，但一旦模式確立，後續文獻分析會變得更系統且高效。
