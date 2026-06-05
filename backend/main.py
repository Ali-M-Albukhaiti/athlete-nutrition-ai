from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import torch

from model import NutritionModel
from utils import preprocess_input

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
y_scaler = joblib.load("ml/y_scaler.pkl")

INPUT_SIZE = len(preprocess_input({
    "Sport": "football",
    "Weight": 70.0,
    "Height": 175.0,
    "Age": 25,
    "Goal": "maintain",
    "PreviousDay2_Intensity": "medium",
    "PreviousDay2_Duration": 60.0,
    "PreviousDay1_Intensity": "medium",
    "PreviousDay1_Duration": 60.0,
    "CurrentDay_Intensity": "medium",
    "CurrentDay_Duration": 60.0,
})[0])

model = NutritionModel(INPUT_SIZE)

model.load_state_dict(
    torch.load("../ml/nutrition_model.pth", map_location="cpu")
)

model.eval()

# request schema
class AthleteInput(BaseModel):

    Sport: str
    Weight: float
    Height: float
    Age: int
    Goal: str

    PreviousDay2_Intensity: str
    PreviousDay2_Duration: float

    PreviousDay1_Intensity: str
    PreviousDay1_Duration: float

    CurrentDay_Intensity: str
    CurrentDay_Duration: float


@app.post("/predict")
def predict(data: AthleteInput):

    processed = preprocess_input(data.dict())

    print(processed)

    input_tensor = torch.tensor(processed, dtype=torch.float32)

    with torch.no_grad():
        prediction = model(input_tensor).numpy()

    calories = y_scaler.inverse_transform(
        prediction.reshape(-1, 1)
    )[0][0]

    return {
        "predicted_calories": round(float(calories), 2)
    }