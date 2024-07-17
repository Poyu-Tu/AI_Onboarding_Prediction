# Best model for target 5: RandomForestRegressor(max_depth=10, min_samples_leaf=4, min_samples_split=10,n_estimators=200) with R² score: 0.09968934485807412
import pandas as pd
import numpy as np
import pickle
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.linear_model import Lasso, LassoCV
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.metrics import r2_score
from xgboost import XGBRegressor
from catboost import CatBoostRegressor

# 讀取xlsx檔案
file_path = 'OnboardingPrediction_dataset.xlsx'
df = pd.read_excel(file_path)

# 選擇自變量和目標變量
X = df.iloc[:, 30:]
X.columns = X.columns.astype(str)
y = df.iloc[:, 1:19]

# 合併自變量和目標變量，並去除缺失值
data = pd.concat([y, X], axis=1)
data = data.dropna()

# 分離自變量和目標變量
X = data.iloc[:, 18:]
y = data.iloc[:, 0:18]

# 將資料集分成訓練集和測試集
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 用於保存每個目標變量的選定特徵
selected_features = []

# 選擇特徵針對目標變量
target_index = 5  # '15day_WITS面試通過_percentage' 在 y 的第 6 列
lassocv = LassoCV(cv=5, random_state=0, max_iter=10000)
lassocv.fit(X_train, y_train.iloc[:, target_index])
alpha = lassocv.alpha_
lasso = Lasso(alpha=alpha)
lasso.fit(X_train, y_train.iloc[:, target_index])
coefficients = pd.DataFrame({'Feature': X_train.columns, 'Coefficient': lasso.coef_})
selected_features_for_target = coefficients[coefficients['Coefficient'] != 0]['Feature']
selected_features.append(selected_features_for_target)

# 分割數據集並生成訓練與測試集變數
X_train_selected = X_train[selected_features_for_target]
X_test_selected = X_test[selected_features_for_target]

# 定義模型和參數網格
models = {
    'RandomForest': RandomForestRegressor(),
    'XGBoost': XGBRegressor(),
    'GradientBoosting': GradientBoostingRegressor(),
    'CatBoost': CatBoostRegressor()
}

param_grids = {
    'RandomForest': {
        'n_estimators': [100, 200, 300],
        'max_depth': [None, 10, 20, 30],
        'min_samples_split': [2, 5, 10],
        'min_samples_leaf': [1, 2, 4]
    },
    'XGBoost': {
        'n_estimators': [100, 200, 300],
        'max_depth': [3, 6, 9],
        'learning_rate': [0.01, 0.1, 0.2],
        'subsample': [0.6, 0.8, 1.0],
        'colsample_bytree': [0.6, 0.8, 1.0]
    },
    'GradientBoosting': {
        'n_estimators': [100, 200, 300],
        'max_depth': [3, 6, 9],
        'learning_rate': [0.01, 0.1, 0.2],
        'subsample': [0.6, 0.8, 1.0]
    },
    'CatBoost': {
        'iterations': [100, 200, 300],
        'depth': [3, 6, 9],
        'learning_rate': [0.01, 0.1, 0.2],
        'l2_leaf_reg': [1, 3, 5]
    }
}

y_train_target = y_train.iloc[:, target_index]
y_test_target = y_test.iloc[:, target_index]

best_model = None
best_score = -np.inf
best_params = None

for model_name, model in models.items():
    param_grid = param_grids[model_name]
    grid_search = GridSearchCV(estimator=model, param_grid=param_grid, cv=5, n_jobs=-1, verbose=2)
    grid_search.fit(X_train_selected, y_train_target)

    # 預測並計算 R² 分數
    predictions = grid_search.best_estimator_.predict(X_test_selected)
    score = r2_score(y_test_target, predictions)
    print(f"Model: {model_name}, R² Score: {score}, Best Params: {grid_search.best_params_}")

    if score > best_score:
        best_score = score
        best_model = grid_search.best_estimator_
        best_params = grid_search.best_params_

print(f"Best model for target {target_index}: {best_model} with R² score: {best_score}")
print(f"Best parameters: {best_params}")

# 保存最佳模型
model_filename = f'15day_WITS面試通過_percentage_{target_index}.pkl'
with open(model_filename, 'wb') as f:
    pickle.dump(best_model, f)
