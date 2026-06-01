import numpy as np
import pandas as pd
import joblib

# load artifacts
scaler = joblib.load("ml/scaler.pkl")
columns = joblib.load("ml/columns.pkl")

def preprocess_input(data):
    if data.get("Goal") == "maintain":
        data["Goal"] = "maintenance"

    df = pd.DataFrame([data])

    # one-hot encoding (same as training)
    df = pd.get_dummies(df)

    # align with training columns (CRITICAL FIX)
    df = df.reindex(columns=columns, fill_value=0)

    X = df.values.astype(np.float32)

    # scale ONLY first 6 numeric features (same as training)
    X[:, :6] = scaler.transform(X[:, :6])

    return X