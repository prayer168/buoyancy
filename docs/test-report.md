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
- GitHub Pages 部署與公開站複驗進行中；完成後補記公開驗證結果。
