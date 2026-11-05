# docgen：生成给人看的 Word 方案文档

- `make_figs.py <figdir>`：用 matplotlib 生成方案配图（需要 Hiragino Sans GB 字体）。
- `build-report-plan.js <figdir> <out.docx>`：用 docx（npm）生成《AI企业分析报告-产品方案.docx》。
- 样例截图：`pdftoppm -r 110 -png -f N -l N docs/产品规划/样例/奥托立夫战略评估报告.pdf <figdir>/s-xxx`（文件名见 build 脚本里的 s-*.png）。
- 检查排版：LibreOffice 转 PDF。本机需设置 FONTCONFIG_FILE 指向含 /System/Library/Fonts 的 fonts.conf，否则中文不显示。
