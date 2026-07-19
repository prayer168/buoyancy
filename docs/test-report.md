# 測試報告

日期：2026-07-14

## 環境與範圍

- Windows、Node.js、npm 與本機 Google Chrome（Playwright 驅動）
- 正式建置內容：`dist/index.html`、`dist/styles.css`、`dist/app.js`
- Viewport：1440×1000、768×1024、390×844
- 行動裝置額外以 `hasTouch: true`、`isMobile: true` 測試
- 頁面：任務、探索、實驗室、動畫、應用、闖關、資源

## 自動檢查

| 項目 | 結果 |
|---|---|
| `npm.cmd test`：7 頁籤、10 題、8 案例、ARIA、降低動畫、來源日期、資產與占位掃描 | 通過（8/8） |
| `node --check app.js` | 通過 |
| `npm.cmd run build` | 通過 |
| `npm.cmd audit --omit=dev` | 通過；0 個已知漏洞 |
| 頁面載入、錯誤覆蓋層、主控台與失敗請求 | 通過；修正 favicon 404 後為 0 錯誤 |
| 七頁籤切換與實質內容 | 通過 |
| 1440×1000、768×1024、390×844 七頁水平溢出 | 通過；全部 0 px |
| 鍵盤左右方向鍵切換頁籤 | 通過 |
| 觸控頁籤、翻牌與作答 | 通過 |
| `prefers-reduced-motion: reduce` | 通過 |

## 核心互動結果

- 實驗預設值：600 g、1000 cm³、淡水，結果「漂浮」，穩定排水量 600 cm³。
- 密度相等案例：1000 g、1000 cm³、淡水，結果「懸浮」。
- 高密度案例：1500 g、1000 cm³、淡水，結果「下沉」。
- 四階段動畫可逐步跳轉，步驟 4 同時顯示浮力、重量與同步說明。
- 應用卡可用滑鼠、鍵盤與觸控翻面，`aria-expanded` 同步更新。
- 十題全部正確時得分 10/10、40 個選項鎖定、總結顯示；錯答時同時標出選擇與正解並提供概念提示。

## 目視檢查與修正

第一次目視發現 SVG marker 隨線寬放大，箭頭遮住方塊；已改為 `markerUnits="userSpaceOnUse"` 並重新配置標籤。修正後確認：

- 受力箭頭方向、長短與文字可辨，未遮住物體或控制元件。
- 漂浮方塊約 60% 浸入淡水，與預設平均密度 0.60 g/cm³ 的教學數值一致。
- 動畫步驟 4 的上下、左右與合力箭頭均留在水槽內。
- 行動版淡入完成後文字、滑桿、分段按鈕與卡片清楚可讀，沒有裁切或水平溢出。

主要修正後證據：

- `docs/screenshots/desktop-explore-fixed.png`
- `docs/screenshots/desktop-lab-result.png`
- `docs/screenshots/desktop-animation-stage4.png`
- `docs/screenshots/mobile-lab-fixed.png`
- `docs/screenshots/mobile-apply-fixed.png`
- `docs/screenshots/mobile-quiz-complete.png`

## 剩餘限制與發布狀態

- 2026-07-14 收工前重新驗證 7 頁 × 3 種 viewport，共 21 組，內容、主控台、請求與水平溢出均通過。
- `git diff --cached --check` 通過。
- `assets/social-preview.png` 已驗證為 `image/png`、1200×630，並完成 Open Graph／Twitter Card 絕對網址設定與目視安全區檢查。
- GitHub Pages 已由 `main` 根目錄建置完成：<https://prayer168.github.io/buoyancy/>。
- 公開首頁、CSS、JavaScript、分享 PNG 與來源 SVG 均為 HTTP 200；公開 PNG MIME 為 `image/png`，尺寸為 1200×630。
- 公開站以 390×844、觸控模式複驗：水平溢出 0 px，漂浮結果與 600 cm³ 排水量正確，應用卡可翻面，測驗會鎖定選項。
- 公開站主控台錯誤與失敗請求均為 0；Open Graph、Twitter Card 與 data-URI favicon 已從渲染後 DOM 確認。

## 1.1.0 動手做實驗區驗證（2026-07-19）

- 「03 實驗室」新增三張實驗卡（浮力挑戰、浮沉子、自製小潛水艇），桌機三欄、1100 px 以下改單欄。
- 邏輯抽測（實際瀏覽器執行）：
  - 黏土凹槽 300 cm³＋預測漂浮 → 徽章「漂浮」，回饋顯示可排開 467 cm³＞300 g，物件浮於水面且碗緣高於水面線（中心 y=126.1、水面 y=118）。
  - 黏土凹槽 0（實心球）→ 徽章「沉底」，物件移至槽底。
  - 浮沉子力道 70% → 氣泡 0.92 cm³、排開水重 3.92 g＜4.00 g，徽章「沉到瓶底」；力道 0 回到「浮在水面附近」。
  - 潛水艇預設「保持懸浮」→ 進水 60%、平均密度 1.00 g/cm³、徽章「懸浮巡航」；95% 下潛、20% 上浮。
- 幾何檢查：碗狀凹槽弧線朝下（bbox y −3～16.6）、浮沉子與潛水艇本體在瓶身／水槽內、壓載艙水位 95% 時仍在艙框內。
- 修正兩項目視發現：「氣泡」標籤原本突出瓶身，改為瓶外底部靜態說明「滴管上端白色區＝氣泡」；潛水艇浮面位置下移 8px，潛望鏡不再高過水槽緣。
- 三個模擬物件的初始位置改為行內樣式，避免載入時從原點飛入。
- 新增 `#lab` 等網址 hash 深連結，載入時直接開啟對應頁籤。
- 1440×1000、768×1024、390×844 實測水平溢出皆 0 px；390 px 下三選項列寬 328.8 px 完整容納；主控台錯誤 0。
- `node --check app.js`、`npm test`（13/13）、正式 build、`npm audit --omit=dev`（0 漏洞）、`git diff --check` 通過。
- 證據：`docs/screenshots/maker-lab-desktop.png`、`docs/screenshots/maker-lab-mobile.png`（本機無頭擷取受 Windows 125% 縮放影響，右緣為擷取假影；實際視窗以幾何量測確認無裁切）。

## 1.0.1 頁首修正驗證

- 移除頁首右上角「國小高年級」膠囊；社群分享圖中的年級提示保留。
- `npm.cmd test` 通過 11/11、正式 build 通過、`npm.cmd audit --omit=dev` 為 0 個已知漏洞、`git diff --check` 通過。
- 1440×1000、768×1024、390×844 實際渲染均找不到 `.header-badge`，頁首只保留品牌區塊，水平溢出皆為 0 px。
- 主控台錯誤與失敗請求皆為 0；桌機與手機截圖目視確認沒有留下空白、偏移或裁切。
- 證據：`docs/screenshots/header-without-grade-desktop.png`、`docs/screenshots/header-without-grade-mobile.png`。

## 1.0.2 頁籤可讀性與反白驗證

- 七個頁籤文字放大：桌機 17.28 px、平板 15.68 px、手機 15.2 px；編號同步放大。
- 桌機滑鼠移入未選取頁籤後，背景為深藍、文字為白色、編號為黃色，並上移 2 px、出現柔和陰影。
- 鍵盤焦點提供同等深色反白，並保留 4 px 黃色焦點外框。
- 1440×1000、768×1024、390×844 的整頁水平溢出皆為 0 px；手機導覽列保留可水平滑動設計。
- 主控台錯誤與失敗請求皆為 0；`npm.cmd test` 通過 12/12，正式 build、套件安全檢查及 `git diff --check` 通過。
- 證據：`docs/screenshots/tabs-hover-desktop.png`、`docs/screenshots/tabs-large-mobile.png`。

## 1.0.3 靜態頁籤捲動驗證

- 頁籤導覽的計算樣式為 `position: static`，不再黏附視窗頂端。
- 在闖關長頁面捲動 650 px 後，頁籤底部座標分別為桌機 −458 px、平板 −467 px、手機 −492 px，三種尺寸均完全離開視窗。
- 1440×1000、768×1024、390×844 的水平溢出皆為 0 px；主控台錯誤與失敗請求皆為 0。
- `npm.cmd test` 通過 13/13，正式 build、套件安全檢查及 `git diff --check` 通過。
- 證據：`docs/screenshots/tabs-static-scrolled-desktop.png`、`docs/screenshots/tabs-static-scrolled-mobile.png`。
