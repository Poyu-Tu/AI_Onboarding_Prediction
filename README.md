# 到職率預測AI助理 🤖

## 目錄
1. [專案描述](#專案描述)
2. [使用技術](#使用技術)
3. [文件結構](#文件結構)
4. [安裝指南](#安裝指南)
5. [使用說明](#使用說明)
6. [所使用的預測模型](#所使用的預測模型)
7. [數據集](#數據集)
8. [貢獻](#貢獻)
9. [授權](#授權)

## 專案描述
到職率預測AI助理是基於 flask 框架並結合前後端開發及模型訓練的人工智慧工具，用於預測面試者在不同時間點（15天、30天、60天和75天）的到職率。這些預測模型可以幫助公司更好地評估面試者可能的到職情況，減少多餘的等待成本並進一步做出更好的招募決策招募人員。

## 使用技術

- 前端：HTML、CSS、JavaScript
- 後端：Python、Machine Learning(pandas、Numpy、scikit-learn)

## 文件結構
- **.git/**: Git 版本控制相關的隱藏目錄。
- **.gitignore**: 指定哪些文件應該被 Git 忽略。
- **__pycache__/**: Python 編譯後的字節碼文件夾。
- **15day_arrival_percentage_17.pkl**: 第 15 天正式入職率模型訓練。
- **30day_Client_Pass_percentage_10.pkl**: 第 30 天客戶端面試通過率模型訓練。
- **60day_Client_Pass_percentage_8.pkl**: 第 60 天客戶端面試通過率模型訓練。
- **75day_arrival_percentage_13.pkl**: 第 75 天正式入職率模型訓練。
- **ALLmodels/**: 包含所有模型的資料夾。(裡頭有訓練好的18個模型，但只有4個是穩定的，故先放4個模型供使用者選擇，後續再來調整其餘模型。)
- **flaskAPP.py**: Flask 應用程序。
- **modelLoad.py**: 模型加載腳本。
- **OnboardingPrediction_dataset.xlsx**: 預測模型所使用的數據集。
- **static/**: 靜態文件資料夾（如 CSS、JavaScript）。
- **templates/**: HTML 模板文件資料夾。
- **OnboardingPredictionAI.pdf**: 本工具的 PDF 簡報文件。

## 安裝指南

以下是安裝步驟：

1. 克隆此倉庫到本地：
   ```bash
   git clone https://github.com/Poyu-Tu/AI_Onboarding_Prediction.git
   ```

2. 進入專案目錄：
   ```bash
   cd 240717_OnboardingPredictionAI_someModel
   ```

3. 建立虛擬環境並激活：
   ```bash
   python3 -m venv venv # 建立虛擬環境
   
   source env/bin/activate # 啟動虛擬環境 (Mac 作業系統)
   source env\Scripts\activate # 啟動虛擬環境 (Windows 作業系統)
   ```

4. 安裝所需的依賴：
   ```bash
   pip install -r requirements.txt
   ```

5. 啟動 Flask 應用：
   ```bash
   python flaskAPP.py
   ```

## 使用說明

在瀏覽器中打開 `http://127.0.0.1:5000`，即可使用到職率預測AI助理。

1. 進入首頁後點擊任意處可進入到職率預測AI助理頁面。
2. 將想預測的選項選起來，最後挑選模型，即可進行預測。
3. 按下Predict ! 後，系統會跳出所選預測結果。

## 所使用的預測模型

- 預測模型文件儲存在根目錄下，具體包括 15 天、30 天、60 天和 75 天的到職率預測模型。
- 使用 `modelLoad.py` 加載這些模型，並進行預測。

## 數據集

- 預測所使用的數據集儲存在 `OnboardingPrediction_dataset.xlsx` 文件中。

## 貢獻

歡迎任何形式的貢獻！如果你想要貢獻，請遵循以下步驟：

1. **Fork 本儲存庫**：點擊 GitHub 頁面右上角的 "Fork" 按鈕。
2. **創建分支**：在你的儲存庫中創建一個新分支來開發你的變更。
```bash
git checkout -b feature-branch
```
3. **提交更改**：將你的變更提交到該分支。
```bash
git commit -m "Add some feature"
```
4. **推送到 GitHub**：將你的分支推送到 GitHub。
```bash
git push origin feature-branch
```
5. **開 Pull Request**：在 GitHub 上開一個 Pull Request，描述你的變更，等待維護者的審核與合併。

## 授權

此專案採用 MIT 授權條款。詳情請參閱 [LICENSE 文件](LICENSE)。