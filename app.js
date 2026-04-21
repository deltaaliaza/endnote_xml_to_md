// ========== Main Application ========== 

class EndNoteConverter {
    constructor() {
        this.xmlData = null;
        this.records = [];
        this.convertedData = [];
        this.warnings = {
            noDOI: [],
            noPDF: [],
            duplicateNames: [],
            multiPDF: []
        };
    }

    /**
     * 清理 XML 标签和实体，提取纯文本
     */
    cleanXMLText(text) {
        if (!text) return '';
        
        // 移除 <style> 标签及其内容
        let cleaned = text.replace(/<style[^>]*>.*?<\/style>/gi, '');
        
        // 移除所有其他 XML 标签
        cleaned = cleaned.replace(/<[^>]+>/g, '');
        
        // 解码 HTML/XML 实体
        const htmlEntities = {
            '&apos;': "'",
            '&quot;': '"',
            '&amp;': '&',
            '&lt;': '<',
            '&gt;': '>',
            '&#xD;': '\n',
            '&#xd;': '\n',
            '&#13;': '\n'
        };
        
        Object.keys(htmlEntities).forEach(entity => {
            cleaned = cleaned.split(entity).join(htmlEntities[entity]);
        });
        
        // 处理其他数字实体
        cleaned = cleaned.replace(/&#(\d+);/g, (match, dec) => {
            return String.fromCharCode(parseInt(dec, 10));
        });
        
        // 处理十六进制实体
        cleaned = cleaned.replace(/&#x([0-9a-fA-F]+);/g, (match, hex) => {
            return String.fromCharCode(parseInt(hex, 16));
        });
        
        // 规范化空白
        cleaned = cleaned.replace(/\s+/g, ' ').trim();
        
        return cleaned;
    }

    /**
     * 从 PDF URI 提取文件名
     * 例如: internal-pdf://1404596415/Al-Adwan-2021-Novel.pdf -> Al-Adwan-2021-Novel.pdf
     */
    extractPDFFilename(pdfUri) {
        if (!pdfUri) return null;
        const parts = pdfUri.split('/');
        return parts[parts.length - 1];
    }

    /**
     * 清理文件名，移除非法字符
     */
    sanitizeFilename(filename) {
        // 保留字母、数字、中文、空格、连字符、下划线
        let sanitized = filename
            .replace(/[<>:"|?*\x00-\x1F]/g, '') // 移除 Windows 非法字符
            .replace(/[\\/]/g, '-') // 用连字符替换路径分隔符
            .trim();
        
        // 移除前后的点和空格
        sanitized = sanitized.replace(/^[\s.]+|[\s.]+$/g, '');
        
        // 限制长度（不包括扩展名）
        if (sanitized.length > 200) {
            sanitized = sanitized.substring(0, 200);
        }
        
        return sanitized;
    }

    /**
     * 生成文件名
     * 优先级：1. PDF 文件名 2. Author-Year-Title 3. Title
     */
    generateFilename(record) {
        let filename = null;
        
        // 优先级 1: 从 PDF 文件名生成
        const pdfUrls = this.getPDFUrls(record);
        if (pdfUrls.length > 0) {
            const pdfFilename = this.extractPDFFilename(pdfUrls[0]);
            if (pdfFilename) {
                // 移除 .pdf 扩展名
                filename = pdfFilename.replace(/\.pdf$/i, '');
            }
        }
        
        // 优先级 2: Author-Year-Title
        if (!filename) {
            const author = this.getFirstAuthor(record);
            const year = this.getYear(record);
            const title = this.getTitle(record);
            
            if (author && year && title) {
                const shortTitle = title.substring(0, 50).replace(/[^\w\s\-]/g, '');
                filename = `${author}-${year}-${shortTitle}`;
            }
        }
        
        // 优先级 3: 仅使用标题
        if (!filename) {
            const title = this.getTitle(record);
            if (title) {
                filename = title.substring(0, 100).replace(/[^\w\s\-]/g, '');
            }
        }
        
        // 默认值
        if (!filename) {
            filename = 'untitled';
        }
        
        filename = this.sanitizeFilename(filename);
        return filename;
    }

    /**
     * 处理重复文件名，添加数字后缀
     */
    handleDuplicateFilenames(convertedData) {
        const nameCount = {};
        const result = convertedData.map(item => {
            const baseName = item.md_filename;
            const count = nameCount[baseName] || 0;
            nameCount[baseName] = count + 1;
            
            if (count > 0) {
                item.md_filename = `${baseName}_${count + 1}`;
                item.has_conflict = true;
            } else {
                item.has_conflict = false;
            }
            
            return item;
        });
        
        // 记录衝突
        result.forEach(item => {
            if (item.has_conflict) {
                this.warnings.duplicateNames.push(item.md_filename);
            }
        });
        
        return result;
    }

    /**
     * 从 record 提取各种信息
     */
    getTextContent(record, xpath) {
        const paths = xpath.split('/');
        let current = record;
        
        for (const path of paths) {
            if (!current) return null;
            const elements = current.getElementsByTagName(path);
            if (elements.length === 0) return null;
            current = elements[0];
        }
        
        if (!current) return null;
        return this.cleanXMLText(current.textContent);
    }

    getTitle(record) {
        return this.getTextContent(record, 'titles/title') || '(无标题)';
    }

    getSecondaryTitle(record) {
        return this.getTextContent(record, 'titles/secondary-title');
    }

    getJournal(record) {
        return this.getTextContent(record, 'periodical/full-title') || 
               this.getSecondaryTitle(record) || '';
    }

    getYear(record) {
        return this.getTextContent(record, 'dates/year') || '';
    }

    getDOI(record) {
        return this.getTextContent(record, 'electronic-resource-num') || '';
    }

    getAbstract(record) {
        return this.getTextContent(record, 'abstract') || '';
    }

    getNotes(record) {
        return this.getTextContent(record, 'notes') || '';
    }

    getFirstAuthor(record) {
        const authorElements = record.getElementsByTagName('author');
        if (authorElements.length === 0) return null;
        return this.cleanXMLText(authorElements[0].textContent);
    }

    getAllAuthors(record) {
        const authors = [];
        const authorElements = record.getElementsByTagName('author');
        
        for (let i = 0; i < authorElements.length; i++) {
            const author = this.cleanXMLText(authorElements[i].textContent);
            if (author) {
                authors.push(author);
            }
        }
        
        return authors;
    }

    getPDFUrls(record) {
        const urls = [];
        const urlElements = record.querySelectorAll('pdf-urls url');
        
        for (let i = 0; i < urlElements.length; i++) {
            const url = this.cleanXMLText(urlElements[i].textContent);
            if (url) {
                urls.push(url);
            }
        }
        
        return urls;
    }

    getKeywords(record) {
        const keywords = [];
        const keywordElements = record.getElementsByTagName('keyword');
        
        for (let i = 0; i < keywordElements.length; i++) {
            const keyword = this.cleanXMLText(keywordElements[i].textContent);
            if (keyword) {
                keywords.push(keyword);
            }
        }
        
        return keywords;
    }

    /**
     * 将数据转换为 YAML 格式（严格 YAML 规范）
     * 所有字符串值一律加双引号，所有数组元素一律加双引号
     */
    toYAML(data) {
        const yaml = [];
        
        // 定义字段顺序
        const fieldOrder = [
            'type', 'title', 'authors', 'year', 'journal', 'doi',
            'pdf_file', 'source_pdf_uri', 'extra_pdf_files',
            'raw_keywords', 'concepts', 'check_status', 'source'
        ];
        
        // 按定义的顺序输出字段
        for (const key of fieldOrder) {
            if (!(key in data)) continue;
            
            const value = data[key];
            
            if (value === null || value === undefined) {
                // 不输出 null 或 undefined
                continue;
            } else if (Array.isArray(value)) {
                if (value.length === 0) {
                    yaml.push(`${key}: []`);
                } else {
                    yaml.push(`${key}:`);
                    value.forEach(item => {
                        // 所有数组元素一律加双引号
                        const escapedItem = String(item).replace(/"/g, '\\"');
                        yaml.push(`  - "${escapedItem}"`);
                    });
                }
            } else if (typeof value === 'string') {
                // 所有字符串值一律加双引号
                const escapedValue = value
                    .replace(/\\/g, '\\\\') // 先转义反斜杠
                    .replace(/"/g, '\\"')   // 再转义双引号
                    .replace(/\n/g, '\\n') // 换行符用 \n 表示
                    .replace(/\r/g, '\\r'); // 回车符用 \r 表示
                yaml.push(`${key}: "${escapedValue}"`);
            } else if (typeof value === 'number') {
                // 数字直接输出（不加引号）
                yaml.push(`${key}: ${value}`);
            } else {
                // 其他类型转字符串后加引号
                const escapedValue = String(value)
                    .replace(/\\/g, '\\\\')
                    .replace(/"/g, '\\"')
                    .replace(/\n/g, '\\n');
                yaml.push(`${key}: "${escapedValue}"`);
            }
        }
        
        return yaml.join('\n');
    }

    /**
     * 生成 Markdown 文件内容（改进版本，适合 Obsidian paper note）
     */
    generateMarkdown(record, filename) {
        const title = this.getTitle(record);
        const authors = this.getAllAuthors(record);
        const year = this.getYear(record);
        const journal = this.getJournal(record);
        const doi = this.getDOI(record);
        const pdfUrls = this.getPDFUrls(record);
        const pdfFile = pdfUrls.length > 0 ? this.extractPDFFilename(pdfUrls[0]) : '';
        const extraPDFs = pdfUrls.slice(1);
        const keywords = this.getKeywords(record);
        const abstract = this.getAbstract(record);
        const notes = this.getNotes(record);

        // YAML frontmatter
        const frontmatterData = {
            type: 'paper',
            title: title,
            authors: authors,
            year: year ? parseInt(year) || year : '',
            journal: journal,
            doi: doi,
            pdf_file: pdfFile,
            source_pdf_uri: pdfUrls.length > 0 ? pdfUrls[0] : '',
            extra_pdf_files: extraPDFs,
            raw_keywords: keywords,
            concepts: [],
            check_status: 'needs-review',
            source: 'EndNote XML'
        };

        const frontmatter = this.toYAML(frontmatterData);

        // 改善 notes 的排版
        const formattedNotes = this.formatNotes(notes);

        // 正文：使用 ## 标题，固定 8 个章节
        const sections = [
            '## Abstract',
            abstract || '',
            '',
            '## Notes',
            formattedNotes || '',
            '',
            '## AI Summary',
            '',
            '',
            '## Research Question',
            '',
            '',
            '## Method',
            '',
            '',
            '## Key Findings',
            '',
            '',
            '## Limitations',
            '',
            '',
            '## My Notes',
            ''
        ];

        const markdown = `---\n${frontmatter}\n---\n\n${sections.join('\n')}`;
        
        return markdown;
    }

    /**
     * 改善 Notes 的排版
     * 处理换行符、多余空白，让其保持可读性
     */
    formatNotes(notes) {
        if (!notes) return '';
        
        // 移除开头和结尾的空白
        let formatted = notes.trim();
        
        // 保留原有的换行（可能是 \n 或文字中的换行符）
        // 规范化为单一换行符
        formatted = formatted
            .replace(/\r\n/g, '\n')  // Windows 换行
            .replace(/\r/g, '\n')    // Mac 换行
            .replace(/\n\n+/g, '\n'); // 多个连续换行合并为单个
        
        // 如果内容很长且没有换行，考虑保持原样（避免强制换行破坏结构）
        // 但如果有明显的段落分隔符，保留它们
        
        return formatted;
    }

    /**
     * 解析 XML 文件
     */
    parseXML(xmlString) {
        try {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
            
            // 检查解析错误
            if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
                throw new Error('XML 解析失败：' + xmlDoc.getElementsByTagName('parsererror')[0].textContent);
            }
            
            const records = xmlDoc.getElementsByTagName('record');
            console.log(`找到 ${records.length} 条记录`);
            
            return Array.from(records);
        } catch (error) {
            console.error('XML 解析错误:', error);
            throw error;
        }
    }

    /**
     * 转换所有记录
     */
    convertRecords(xmlString) {
        try {
            this.records = this.parseXML(xmlString);
            this.convertedData = [];
            this.warnings = {
                noDOI: [],
                noPDF: [],
                duplicateNames: [],
                multiPDF: []
            };

            // 转换每条记录
            this.records.forEach((record, index) => {
                const filename = this.generateFilename(record);
                const doi = this.getDOI(record);
                const pdfUrls = this.getPDFUrls(record);
                const keywords = this.getKeywords(record);
                const abstract = this.getAbstract(record);
                const notes = this.getNotes(record);

                // 记录警告
                if (!doi) {
                    this.warnings.noDOI.push(`记录 ${index + 1}: ${this.getTitle(record)}`);
                }
                if (pdfUrls.length === 0) {
                    this.warnings.noPDF.push(`记录 ${index + 1}: ${this.getTitle(record)}`);
                }
                if (pdfUrls.length > 1) {
                    this.warnings.multiPDF.push(`记录 ${index + 1}: ${this.getTitle(record)} (${pdfUrls.length} 个文件)`);
                }

                const markdown = this.generateMarkdown(record, filename);

                this.convertedData.push({
                    index: index + 1,
                    md_filename: filename,
                    title: this.getTitle(record),
                    authors: this.getAllAuthors(record),
                    year: this.getYear(record),
                    doi: doi,
                    pdf_file: pdfUrls.length > 0 ? this.extractPDFFilename(pdfUrls[0]) : '',
                    source_pdf_uri: pdfUrls.length > 0 ? pdfUrls[0] : '',
                    extra_pdf_files: pdfUrls.slice(1),
                    keywords_count: keywords.length,
                    has_abstract: !!abstract,
                    has_notes: !!notes,
                    has_keywords: keywords.length > 0,
                    markdown: markdown,
                    record: record
                });
            });

            // 处理重复文件名
            this.convertedData = this.handleDuplicateFilenames(this.convertedData);

            return this.convertedData;
        } catch (error) {
            console.error('转换错误:', error);
            throw error;
        }
    }

    /**
     * 获取统计数据
     */
    getStatistics() {
        return {
            total: this.records.length,
            success: this.convertedData.length,
            noDOI: this.warnings.noDOI.length,
            noPDF: this.warnings.noPDF.length,
            duplicates: this.warnings.duplicateNames.length,
            multiPDF: this.warnings.multiPDF.length
        };
    }

    /**
     * 生成转换报告
     */
    generateReport() {
        return this.convertedData.map(item => ({
            md_filename: item.md_filename,
            title: item.title,
            authors: item.authors.join('; '),
            year: item.year,
            doi: item.doi,
            pdf_file: item.pdf_file,
            source_pdf_uri: item.source_pdf_uri,
            extra_pdf_files: item.extra_pdf_files.join('; '),
            has_abstract: item.has_abstract,
            has_notes: item.has_notes,
            has_keywords: item.has_keywords,
            keywords_count: item.keywords_count,
            warnings: this.getRecordWarnings(item.md_filename).join('; ')
        }));
    }

    /**
     * 获取某条记录的警告
     */
    getRecordWarnings(filename) {
        const warnings = [];
        const item = this.convertedData.find(d => d.md_filename === filename);
        
        if (!item) return warnings;
        
        if (!item.doi) warnings.push('缺少 DOI');
        if (item.source_pdf_uri === '') warnings.push('缺少 PDF');
        if (item.has_conflict) warnings.push('文件名衝突（已自动处理）');
        if (item.extra_pdf_files.length > 0) warnings.push(`${item.extra_pdf_files.length} 个额外 PDF`);
        
        return warnings;
    }
}

// ========== UI Controller ==========

class UIController {
    constructor() {
        this.converter = new EndNoteConverter();
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // 文件上传
        const uploadArea = document.getElementById('uploadArea');
        const xmlFile = document.getElementById('xmlFile');

        uploadArea.addEventListener('click', () => xmlFile.click());
        uploadArea.addEventListener('dragover', e => {
            e.preventDefault();
            uploadArea.classList.add('drag-over');
        });
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('drag-over');
        });
        uploadArea.addEventListener('drop', e => {
            e.preventDefault();
            uploadArea.classList.remove('drag-over');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                this.handleFileSelect(files[0]);
            }
        });

        xmlFile.addEventListener('change', e => {
            if (e.target.files.length > 0) {
                this.handleFileSelect(e.target.files[0]);
            }
        });

        // 下载按钮
        document.getElementById('downloadZipBtn').addEventListener('click', () => this.downloadZip());
        document.getElementById('downloadReportBtn').addEventListener('click', () => this.downloadReport());
    }

    handleFileSelect(file) {
        document.getElementById('fileName').textContent = file.name;
        document.getElementById('fileInfo').style.display = 'block';

        const reader = new FileReader();
        reader.onload = e => {
            this.processXML(e.target.result);
        };
        reader.readAsText(file, 'UTF-8');
    }

    processXML(xmlString) {
        const loadingOverlay = document.getElementById('loadingOverlay');
        loadingOverlay.style.display = 'flex';

        setTimeout(() => {
            try {
                this.converter.convertRecords(xmlString);
                this.updateUI();
                loadingOverlay.style.display = 'none';
            } catch (error) {
                alert('处理 XML 失败：' + error.message);
                loadingOverlay.style.display = 'none';
                console.error(error);
            }
        }, 100);
    }

    updateUI() {
        this.showStatistics();
        this.showPreview();
        this.showWarnings();
        this.showSampleOutput();
        this.showDownloadSection();
    }

    showStatistics() {
        const stats = this.converter.getStatistics();
        document.getElementById('totalRecords').textContent = stats.total;
        document.getElementById('successCount').textContent = stats.success;
        document.getElementById('noDOICount').textContent = stats.noDOI;
        document.getElementById('noPDFCount').textContent = stats.noPDF;
        document.getElementById('conflictCount').textContent = stats.duplicates;
        document.getElementById('multiPDFCount').textContent = stats.multiPDF;
        document.getElementById('statisticsSection').style.display = 'block';
    }

    showPreview() {
        const tbody = document.querySelector('.preview-table tbody');
        tbody.innerHTML = '';

        this.converter.convertedData.forEach(item => {
            const warnings = this.converter.getRecordWarnings(item.md_filename);
            const statusClass = warnings.length > 0 ? 'status-warning' : 'status-success';
            const statusText = warnings.length > 0 ? '有警告' : '正常';

            const row = document.createElement('tr');
            row.innerHTML = `
                <td><strong>${item.md_filename}.md</strong></td>
                <td>${this.truncate(item.title, 40)}</td>
                <td>${item.year}</td>
                <td>${item.doi ? '✓' : '—'}</td>
                <td>${item.pdf_file ? this.truncate(item.pdf_file, 30) : '—'}</td>
                <td>${item.keywords_count}</td>
                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
            `;
            tbody.appendChild(row);
        });

        document.getElementById('previewSection').style.display = 'block';
    }

    showWarnings() {
        const container = document.getElementById('warningsContainer');
        container.innerHTML = '';

        const warnings = this.converter.warnings;

        if (warnings.noDOI.length > 0) {
            const item = document.createElement('div');
            item.className = 'warning-item';
            item.innerHTML = `
                <strong>⚠️ 缺少 DOI (${warnings.noDOI.length} 条)</strong>
                <ul class="warning-list">
                    ${warnings.noDOI.slice(0, 5).map(w => `<li>${w}</li>`).join('')}
                    ${warnings.noDOI.length > 5 ? `<li>... 还有 ${warnings.noDOI.length - 5} 条</li>` : ''}
                </ul>
            `;
            container.appendChild(item);
        }

        if (warnings.noPDF.length > 0) {
            const item = document.createElement('div');
            item.className = 'warning-item';
            item.innerHTML = `
                <strong>⚠️ 缺少 PDF (${warnings.noPDF.length} 条)</strong>
                <ul class="warning-list">
                    ${warnings.noPDF.slice(0, 5).map(w => `<li>${w}</li>`).join('')}
                    ${warnings.noPDF.length > 5 ? `<li>... 还有 ${warnings.noPDF.length - 5} 条</li>` : ''}
                </ul>
            `;
            container.appendChild(item);
        }

        if (warnings.multiPDF.length > 0) {
            const item = document.createElement('div');
            item.className = 'warning-item';
            item.innerHTML = `
                <strong>ℹ️ 多个 PDF 附件 (${warnings.multiPDF.length} 条)</strong>
                <p style="margin-top: 8px; font-size: 13px; color: #6b7280;">
                    这些记录有多个 PDF 文件。第一个已作为 pdf_file，其余保存在 extra_pdf_files。
                </p>
                <ul class="warning-list">
                    ${warnings.multiPDF.slice(0, 5).map(w => `<li>${w}</li>`).join('')}
                    ${warnings.multiPDF.length > 5 ? `<li>... 还有 ${warnings.multiPDF.length - 5} 条</li>` : ''}
                </ul>
            `;
            container.appendChild(item);
        }

        if (warnings.noDOI.length > 0 || warnings.noPDF.length > 0 || warnings.multiPDF.length > 0) {
            document.getElementById('warningsSection').style.display = 'block';
        }
    }

    showSampleOutput() {
        if (this.converter.convertedData.length > 0) {
            const sample = this.converter.convertedData[0].markdown;
            document.getElementById('sampleOutput').textContent = sample;
            document.getElementById('sampleSection').style.display = 'block';
        }
    }

    showDownloadSection() {
        document.getElementById('downloadSection').style.display = 'block';
    }

    truncate(text, length) {
        return text.length > length ? text.substring(0, length) + '...' : text;
    }

    async downloadZip() {
        const btn = document.getElementById('downloadZipBtn');
        btn.disabled = true;
        btn.textContent = '正在生成...';

        try {
            const zip = new JSZip();

            // 添加所有 Markdown 文件
            this.converter.convertedData.forEach(item => {
                const filename = `${item.md_filename}.md`;
                zip.file(filename, item.markdown, { date: new Date() });
            });

            // 添加转换报告
            const report = this.converter.generateReport();
            const reportJSON = JSON.stringify(report, null, 2);
            zip.file('conversion-report.json', reportJSON);

            // 添加 README
            const readme = this.generateReadme();
            zip.file('README.txt', readme);

            // 生成并下载 ZIP
            const content = await zip.generateAsync({ type: 'blob' });
            saveAs(content, 'endnote-to-obsidian.zip');
        } catch (error) {
            alert('下载失败：' + error.message);
            console.error(error);
        } finally {
            btn.disabled = false;
            btn.textContent = '📦 下载全部 Markdown 檔案 (ZIP)';
        }
    }

    downloadReport() {
        try {
            const report = this.converter.generateReport();
            const csv = this.convertToCSV(report);
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            saveAs(blob, 'conversion-report.csv');
        } catch (error) {
            alert('下载报告失败：' + error.message);
            console.error(error);
        }
    }

    convertToCSV(data) {
        if (!data || data.length === 0) return '';

        const headers = Object.keys(data[0]);
        const rows = data.map(item =>
            headers.map(header => {
                const value = item[header];
                const escaped = (value + '').replace(/"/g, '""');
                return `"${escaped}"`;
            }).join(',')
        );

        return [headers.join(','), ...rows].join('\n');
    }

    generateReadme() {
        const stats = this.converter.getStatistics();
        return `
EndNote XML → Obsidian Markdown 轉換結果
==========================================

轉換統計:
- 總記錄數: ${stats.total}
- 成功轉換: ${stats.success}
- 缺少 DOI: ${stats.noDOI}
- 缺少 PDF: ${stats.noPDF}
- 檔名衝突: ${stats.duplicates}
- 多個 PDF: ${stats.multiPDF}

使用方法:
1. 解壓此 ZIP 檔案
2. 選擇所有 .md 檔案（除了本文件和報告）
3. 複製到您的 Obsidian Vault 的合適目錄
4. 在 Obsidian 中檢查和完善內容

檔案說明:
- *.md: Obsidian Markdown 檔案，包含 YAML frontmatter
- conversion-report.json: 詳細的轉換報告
- conversion-report.csv: 可在 Excel 中開啟的報告

YAML Frontmatter 欄位:
- type: 固定為 'paper'
- title: 論文標題
- authors: 作者列表
- year: 發佈年份
- journal: 期刊名稱
- doi: 數字對象識別碼
- pdf_file: 主 PDF 檔名
- source_pdf_uri: 原始 PDF URI（用於參考）
- extra_pdf_files: 額外的 PDF 附件
- raw_keywords: 從 EndNote 提取的關鍵詞
- concepts: 留空待填（用於個人知識管理）
- check_status: 檢查狀態（預設為 'needs-review'）

注意:
- 第一個 PDF 作為 pdf_file，其他保存在 extra_pdf_files
- 缺少 DOI 或 PDF 的記錄仍會轉換，但會標記為 needs-review
- 所有文件名都已清理，移除了非法字符
- 重複的檔名會自動加上數字後綴

問題排查:
- 如果檔名看起來亂碼，請確保您的編輯器使用 UTF-8 編碼
- 如果 Obsidian 無法識別 frontmatter，檢查 YAML 的縮進和語法

生成時間: ${new Date().toLocaleString()}
工具版本: v1.0
        `;
    }
}

// ========== Initialization ==========

document.addEventListener('DOMContentLoaded', () => {
    new UIController();
    console.log('應用已初始化');
});
