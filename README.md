# 農產品比價網

這是一個作物價格篩選與排序的網頁，可以查詢不同種類作物的價格，依照不同價格欄位或交易量進行排序，方便做價格比價與參考。

<img width="1913" height="898" alt="image" src="https://github.com/user-attachments/assets/9df9f617-58d3-4917-ba9c-4f36ecf10dce" />


## Demo

[demo link](https://a24985693.github.io/veg-price-compare/)


## 技術說明

- **JavaScript**：
  - 使用 Fetch API 取得公開的農產品 JSON 資料
  - 關鍵字搜尋、分類條件篩選及排序功能
- **SCSS**：
  - 變數管理，響應式設計
 

## 功能

- 輸入框搜尋作物名稱，選擇種類與排序欄位，可過濾及排序後渲染表格。
- tab 元素點擊切換作物種類篩選資料（蔬菜、水果、花卉）。
- 下拉選單可設定排序顯示（上價、中價、下價、平均價、交易量）。
- 表頭的箭頭可切換排序方向（升序、降序）。
