import fs from 'node:fs';
const html=fs.readFileSync('index.html','utf8');
const js=fs.readFileSync('app.js','utf8');
const css=fs.readFileSync('styles.css','utf8');
const checks=[
  ['七個頁籤',(html.match(/role="tab"/g)||[]).length===7],
  ['十題四選一題庫',(js.match(/\{q:'/g)||[]).length===10&&js.includes("c:['")],
  ['八個生活應用案例',(js.match(/title:'/g)||[]).length===8],
  ['主互動具 aria-live',(html.match(/aria-live=/g)||[]).length>=4],
  ['支援降低動畫',css.includes('prefers-reduced-motion')],
  ['來源附查核日期',(html.match(/查核：2026-07-14/g)||[]).length===4],
  ['無外部圖片',!html.includes('<img')&&!css.includes('url(http')],
  ['沒有未完成占位',!/(待補|範例題|示範題|TODO|FIXME)/.test(html+js+css)],
  ['社群預覽 PNG 已建立',fs.existsSync('assets/social-preview.png')],
  ['正式 Open Graph 網址',html.includes('https://prayer168.github.io/buoyancy/assets/social-preview.png')&&html.includes('summary_large_image')],
  ['頁首年級膠囊已移除',!html.includes('class="header-badge"')],
  ['頁籤具放大與滑鼠反白樣式',css.includes('font-size:1.08rem')&&css.includes('@media(hover:hover)')]
];
let failed=0;for(const [name,ok] of checks){console.log(`${ok?'PASS':'FAIL'} ${name}`);if(!ok)failed++}if(failed)process.exit(1);console.log(`All ${checks.length} structural checks passed.`);
