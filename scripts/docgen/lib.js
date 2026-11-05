// lib.js — docgen 公共排版工具：配色、段落/标题/列表/图片/表格/提示框，以及统一的 A4 文档外壳。
// 用法：const K = require("./lib")(figDir); 然后 K.P / K.H1 / K.Img … ；K.makeDoc({ title, header, children }) 返回 Document。
// 协作者：build-report-plan.js、build-tech-plan.js。非目标：不负责内容。
const fs = require("fs");
const path = require("path");
const {
  Document, Paragraph, TextRun, Table, TableRow, TableCell, ImageRun, AlignmentType,
  WidthType, ShadingType, BorderStyle, LevelFormat, PageBreak, Footer, Header, PageNumber, HeadingLevel,
} = require("docx");

module.exports = function (FIG) {
const NAVY = "1F3A68", TEAL = "0B6E5C", AMBER = "B9770E", GREY = "6B7280", LIGHT = "EEF3F8", SOFT = "E6F6F1", WARN = "FFF4E2";
  const FONT = { ascii: "Arial", hAnsi: "Arial", eastAsia: "Microsoft YaHei", cs: "Arial" };
  const W = 9638; // content width DXA (A4, 2cm margins)
  
  const sizeOf = (p) => { const b = fs.readFileSync(p); return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) }; };
  
  function runs(text, base = {}) {
    // **bold** markup
    const out = [];
    text.split(/(\*\*[^*]+\*\*)/).forEach((t) => {
      if (!t) return;
      if (t.startsWith("**")) out.push(new TextRun({ ...base, text: t.slice(2, -2), bold: true, font: FONT }));
      else out.push(new TextRun({ ...base, text: t, font: FONT }));
    });
    return out;
  }
  const P = (text, opt = {}) => new Paragraph({ children: runs(text, opt.run || {}), spacing: { after: 120, line: 320 }, alignment: opt.align, ...(opt.para || {}) });
  const H1 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: t, font: FONT })] });
  const H2 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: t, font: FONT })] });
  const B = (t, lvl = 0) => new Paragraph({ numbering: { reference: "bul", level: lvl }, children: runs(t), spacing: { after: 60, line: 300 } });
  const N = (t, ref = "num") => new Paragraph({ numbering: { reference: ref, level: 0 }, children: runs(t), spacing: { after: 60, line: 300 } });
  const Caption = (t) => new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 60, after: 240 }, children: [new TextRun({ text: t, font: FONT, size: 18, color: GREY })] });
  const PB = () => new Paragraph({ children: [new PageBreak()] });
  
  function Img(file, widthPx = 640) {
    const p = path.join(FIG, file);
    const s = sizeOf(p);
    const h = Math.round(widthPx * s.h / s.w);
    return new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 120, after: 60 }, keepNext: true,
      children: [new ImageRun({ type: "png", data: fs.readFileSync(p), transformation: { width: widthPx, height: h },
        altText: { title: file, description: file, name: file } })] });
  }
  
  function ImgGrid(items, px = 290) {
    const nb = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
    const nbs = { top: nb, bottom: nb, left: nb, right: nb };
    const half = W / 2;
    const rows = [];
    for (let i = 0; i < items.length; i += 2) {
      rows.push(new TableRow({ cantSplit: true, children: items.slice(i, i + 2).map(([f, cap]) => {
        const p = path.join(FIG, f); const sz = sizeOf(p);
        return new TableCell({ width: { size: half, type: WidthType.DXA }, borders: nbs, margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [
          new Paragraph({ alignment: AlignmentType.CENTER, children: [new ImageRun({ type: "png", data: fs.readFileSync(p), transformation: { width: px, height: Math.round(px * sz.h / sz.w) }, altText: { title: f, description: cap, name: f } })] }),
          new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 40, after: 120 }, children: [new TextRun({ text: cap, font: FONT, size: 17, color: GREY })] })] });
      }) }));
    }
    return new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: [half, half], rows });
  }
  const border = { style: BorderStyle.SINGLE, size: 4, color: "C9D3E0" };
  const borders = { top: border, bottom: border, left: border, right: border };
  function Tbl(header, rows, widths) {
    const total = widths.reduce((a, b) => a + b, 0);
    const cell = (t, i, isHead) => new TableCell({
      width: { size: widths[i], type: WidthType.DXA }, borders,
      shading: isHead ? { fill: NAVY, type: ShadingType.CLEAR, color: "auto" } : undefined,
      margins: { top: 70, bottom: 70, left: 110, right: 110 },
      children: String(t).split("\n").map((line) => new Paragraph({ spacing: { after: 0, line: 280 },
        children: runs(line, isHead ? { bold: true, color: "FFFFFF", size: 19 } : { size: 19 }) })),
    });
    return new Table({
      width: { size: total, type: WidthType.DXA }, columnWidths: widths,
      rows: [new TableRow({ tableHeader: true, cantSplit: true, children: header.map((h, i) => cell(h, i, true)) }),
        ...rows.map((r) => new TableRow({ cantSplit: true, children: r.map((c, i) => cell(c, i, false)) }))],
    });
  }
  function Box(lines, fill = SOFT, edge = TEAL) {
    const b = { style: BorderStyle.SINGLE, size: 4, color: fill };
    return new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: [W], rows: [new TableRow({ cantSplit: true, children: [new TableCell({
      width: { size: W, type: WidthType.DXA }, shading: { fill, type: ShadingType.CLEAR, color: "auto" },
      borders: { top: b, bottom: b, right: b, left: { style: BorderStyle.SINGLE, size: 24, color: edge } },
      margins: { top: 120, bottom: 120, left: 200, right: 200 },
      children: lines.map((l) => new Paragraph({ spacing: { after: 60, line: 300 }, children: runs(l) })) })] })] });
  }
  const Gap = () => new Paragraph({ spacing: { after: 120 }, children: [] });
  
  
  function makeDoc({ title, header, children }) {
    return new Document({
      creator: "极增科技", title,
      styles: {
        default: { document: { run: { font: FONT, size: 21, color: "1A1A1A" } } },
        paragraphStyles: [
          { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
            run: { font: FONT, size: 32, bold: true, color: NAVY },
            paragraph: { spacing: { before: 360, after: 180 }, keepNext: true, outlineLevel: 0,
              border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: TEAL, space: 4 } } } },
          { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
            run: { font: FONT, size: 26, bold: true, color: TEAL },
            paragraph: { spacing: { before: 240, after: 120 }, keepNext: true, outlineLevel: 1 } },
        ],
      },
      numbering: { config: [
        { reference: "bul", levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 480, hanging: 280 } } } }] },
        { reference: "num", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 480, hanging: 320 } } } }] },
      ] },
      sections: [{
        properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1134, bottom: 1134, left: 1134, right: 1134 } } },
        headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: header, font: FONT, size: 16, color: GREY })] })] }) },
        footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [
          new TextRun({ text: "第 ", font: FONT, size: 16, color: GREY }), new TextRun({ children: [PageNumber.CURRENT], size: 16, color: GREY }),
          new TextRun({ text: " 页 / 共 ", font: FONT, size: 16, color: GREY }), new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 16, color: GREY }),
          new TextRun({ text: " 页", font: FONT, size: 16, color: GREY })] })] }) },
        children,
      }],
    });
  }

  return { NAVY, TEAL, AMBER, GREY, LIGHT, SOFT, WARN, FONT, W, runs, P, H1, H2, B, N, Caption, PB, Img, ImgGrid, Tbl, Box, Gap, makeDoc,
    Paragraph, TextRun, AlignmentType };
};
