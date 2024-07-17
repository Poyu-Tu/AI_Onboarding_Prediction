import pickle

# 載入所有模型
models = {}

model_files = [
    "15day_arrival_percentage_17.pkl",
    "75day_arrival_percentage_13.pkl",
    "30day_Client_Pass_percentage_10.pkl",
    "60day_Client_Pass_percentage_8.pkl"
]

for model_file in model_files:
    with open(f"./{model_file}", "rb") as f:
        model_name = model_file.split('.')[0]
        models[model_name] = pickle.load(f)

def predict(model_name, input_data):
    model = models.get(model_name)
    if model is None:
        raise ValueError(f"Model {model_name} not found")
    pred = model.predict(input_data)[0]
    print(pred)
    return pred