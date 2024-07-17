import pandas as pd
import numpy as np
import pickle
import gzip
import matplotlib.pyplot as plt

from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.linear_model import Lasso, LassoCV, LinearRegression 
from sklearn.svm import SVR
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
from xgboost import XGBRegressor

# 讀取xlsx檔案
file_path = 'OnboardingPrediction_dataset.xlsx'
df = pd.read_excel(file_path)


X = df.iloc[:,30:]
X.columns = X.columns.astype(str)
y = df.iloc[:,1:19]

data = pd.concat([y, X], axis=1)
data = data.dropna()
X = data.iloc[:,18:]
y = data.iloc[:,0:18]


X_train,X_test,y_train ,y_test = train_test_split(X, y, test_size=0.2, random_state=42)




selected_features = []

for i in range(y_train.shape[1]):
    print(f"Selected features for target {i}:")
    # 使用 LASSO CV 挑選 alpha
    lassocv = LassoCV(cv=5, random_state=0, max_iter=10000)
    lassocv.fit(X_train, y_train.iloc[:, i])
    alpha = lassocv.alpha_
    
    # 使用挑選出的 alpha 訓練 LASSO 模型
    lasso = Lasso(alpha=alpha)
    lasso.fit(X_train, y_train.iloc[:, i])

    # 取出 LASSO 挑選出來的特徵
    coefficients = pd.DataFrame({'Feature': X_train.columns, 'Coefficient': lasso.coef_})
    selected_features_for_target = coefficients[coefficients['Coefficient'] != 0]['Feature']
    selected_features.append(selected_features_for_target)

    # 分割數據集並生成訓練與測試集變數
    globals()[f'X{i+1}_train'] = X_train[selected_features_for_target]
    globals()[f'X{i+1}_test'] = X_test[selected_features_for_target]
    print(selected_features_for_target)

print(selected_features[0:17])

# 定義模型和參數網格


models = {
    'RandomForest': RandomForestRegressor(),
    'XGBoost': XGBRegressor(),
    'GradientBoosting': GradientBoostingRegressor()
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
    }
}

best_results = {}

for i in range(y_train.shape[1]):
    print(f"Evaluating models for target {i}:")

    X_train_selected = globals()[f'X{i+1}_train']
    X_test_selected = globals()[f'X{i+1}_test']
    y_train_target = y_train.iloc[:, i]
    y_test_target = y_test.iloc[:, i]

    best_model = None
    best_score = -np.inf
    best_params = None

    for model_name, model in models.items():
        param_grid = param_grids[model_name]
        grid_search = GridSearchCV(estimator=model, param_grid=param_grid, cv=5, n_jobs=-1, verbose=2)
        grid_search.fit(X_train_selected, y_train_target)

        # 预测并计算 R² 分数
        predictions = grid_search.best_estimator_.predict(X_test_selected)
        score = r2_score(y_test_target, predictions)
        print(f"Model: {model_name}, R² Score: {score}, Best Params: {grid_search.best_params_}")

        if score > best_score:
            best_score = score
            best_model = grid_search.best_estimator_
            best_params = grid_search.best_params_

    best_results[f'target_{i}'] = {
        'best_model': best_model,
        'best_score': best_score,
        'best_params': best_params
    }

    print(f"Best model for target {i}: {best_model} with R² score: {best_score}")
    print(f"Best parameters: {best_params}")

    # 保存最佳模型
    with open(f'best_model_target_{i}.pkl', 'wb') as f:
        pickle.dump(best_model, f)

# 打印所有目标变量的最佳结果
for target, result in best_results.items():
    print(f"{target}:")
    print(f"  Best Model: {result['best_model']}")
    print(f"  Best R² Score: {result['best_score']}")
    print(f"  Best Parameters: {result['best_params']}")