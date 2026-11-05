# docgen：生成给人看的 Word 方案文档

- `make_figs.py <figdir>`：用 matplotlib 生成方案配图（需要 Hiragino Sans GB 字体）。
- `build-report-plan.js <figdir> <out.docx>`：用 docx（npm）生成《AI企业分析报告-产品方案.docx》。
- 样例截图：`pdftoppm -r 110 -png -f N -l N docs/产品规划/样例/奥托立夫战略评估报告.pdf <figdir>/s-xxx`（文件名见 build 脚本里的 s-*.png）。
- 检查排版：LibreOffice 转 PDF。本机需设置 FONTCONFIG_FILE 指向含 /System/Library/Fonts 的 fonts.conf，否则中文不显示。
- 公共排版工具在 `lib.js`（两份方案共用）。
- 技术方案：`python3 make_tech_figs.py <figdir>`；编辑器示意图用无头 Chrome 截图：`"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --hide-scrollbars --force-device-scale-factor=2 --window-size=1440,680 --screenshot=<figdir>/fig-tech-editor.png file://$PWD/editor-mockup.html`；然后 `node build-tech-plan.js <figdir> docs/产品规划/AI企业分析报告-技术方案.docx`。
- 工作台方案：`python3 make_wb_figs.py <figdir>`；对话示意和经营会示意用无头 Chrome 截图 `wb-chat-mockup.html`（1440×800）与 `wb-meeting-mockup.html`（1440×640），分别存为 `fig-wb-chat.png`、`fig-wb-meeting.png`；然后 `node build-workbench-plan.js <figdir> docs/产品规划/经营工作台-产品方案.docx`。
- node 需要能找到 `docx` 包（NODE_PATH 指向装了 docx@9 的 node_modules）。
